const db = require("../../models");
const Post = db.post;
const postStatusController = require("../postStatus/viewPostStatusById");
const postLabelController = require("../postLabel/viewPostLabelById");
const categoryController = require("../category/viewCategory");

exports.updatePostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const { title, body, categoryId, postStatusId, postLabelId } = req.body;

    // Update post details based on req.body
    if (title) post.title = title;
    if (body) post.body = body;
    if (categoryId) post.categoryId = categoryId;
    if (postStatusId) post.postStatusId = postStatusId;
    if (postLabelId) post.postLabelId = postLabelId;

    // Save the updated post to the database
    await post.save();

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
      postStatusId: undefined,
      postLabelId: undefined,
      categoryId: undefined,
    };

    res.status(200).json({ message: "Post Updated.", post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating post data" });
  }
};
