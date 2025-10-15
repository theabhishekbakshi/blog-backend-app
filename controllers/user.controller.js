import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) =>{
    const clerkUserId = req.auth?.userId;

    if(!clerkUserId){
        return res.status(401).json("Not authenticated!");
    }

    const user = await User.findOne({ clerkUserId })
    
    res.status(200).json(user.savedPosts)
}




// export const getUserSavedPosts = async (req, res) => {
//   try {
//     const clerkUserId = req.auth?.userId;
//     if (!clerkUserId) {
//       return res.status(401).json("Not authenticated!");
//     }

//     const user = await User.findOne({ clerkUserId });
//     if (!user) {
//       return res.status(404).json("User not found!");
//     }

//     return res.status(200).json(user.savedPosts || []);
//   } catch (err) {
//     console.error("Error in getUserSavedPosts:", err);
//     res.status(500).json("Server error while fetching saved posts!");
//   }
// };


export const savePost = async (req, res) =>{
    const clerkUserId = req.auth.userId;
    const postId = req.body.postId

    if(!clerkUserId){
        return res.status(401).json("Not authenticated!");
    }

    const user = await User.findOne({ clerkUserId })
    const isSaved = user.savedPosts.some((p) => p === postId)

    if(!isSaved){
        await User.findByIdAndUpdate(user._id, {
            $push: { savedPosts: postId }
        });
    }else{
        await User.findByIdAndUpdate(user._id, {
            $pull:{ savedPosts: postId }
        });
    }
    res.status(200).json(isSaved ? "Post Unsaved!" : "Post Saved!")

}