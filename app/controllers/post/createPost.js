const db = require("../../models");
const Post = db.post;
const postStatusController = require("../postStatus/viewPostStatusById");
const postLabelController = require("../postLabel/viewPostLabelById");
const categoryController = require("../category/viewCategory");

exports.createPost = async (req, res) => {
  const { title, body, categoryId, postStatusId, postLabelId } =
    req.body;

  if (
    !title ||
    !body ||
    !categoryId ||
    !postStatusId ||
    !postLabelId
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const post = await Post.create({
      title,
      body,
      categoryId,
      postStatusId,
      postLabelId,
    });

    try {
      const postStatusData = await postStatusController.findPostStatusById(
        post.postStatusId
      );

      const postLabelData = await postLabelController.findPostLabelById(
        post.postLabelId
      );

      const categoryData = await categoryController.findCategoryById(
        post.categoryId
      );

      const response = {
        title: post.title,
        body: post.body,
        category: categoryData,
        postStatus: postStatusData,
        postLabel: postLabelData,
      };

      res.status(201).send(response);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating new post" });
  }
};
