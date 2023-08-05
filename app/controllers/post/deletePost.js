const db = require("../../models");
const Post = db.post;
const postStatusController = require("../postStatus/viewPostStatusById");
const postLabelController = require("../postLabel/viewPostLabelById");
const categoryController = require("../category/viewCategory");

exports.deleteAllPosts = async (req, res) => {
  try {
    await Post.destroy({
      where: {}, // Empty object to delete all posts (no condition)
    });

    res.status(200).json({ message: "All posts deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting posts." });
  }
};

exports.deletePostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const postStatusData = await postStatusController.findPostStatusById(
      post.postStatusId
    );

    const postLabelData = await postLabelController.findPostLabelById(
      post.postLabelId
    );

    const categoryData = await categoryController.findCategoryById(
      post.categoryId
    );

    const updatedPost = {
      ...post.get(),
      category: categoryData,
      postStatus: postStatusData,
      postLabel: postLabelData,
    };

    await post.destroy(); // Delete the post from the database

    res.status(200).json({ message: "Post Deleted.", post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post" });
  }
};
