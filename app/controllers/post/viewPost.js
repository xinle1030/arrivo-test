const db = require("../../models");
const Post = db.post;
const postStatusController = require("../postStatus/viewPostStatusById");
const postLabelController = require("../postLabel/viewPostLabelById");
const categoryController = require("../category/viewCategory");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
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

          return {
            ...post.get(),
            category: categoryData,
            postStatus: postStatusData,
            postLabel: postLabelData,
            postStatusId: undefined,
            postLabelId: undefined,
            categoryId: undefined,
          };
        } catch (err) {
          console.error(err);
          return null; // Or handle the error case as per your requirement
        }
      })
    );

    // Remove any null values (optional, if you want to remove errored posts)
    const filteredPosts = updatedPosts.filter((post) => post !== null);

    res.status(200).json({ message: "Posts Retrieved.", posts: filteredPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving posts data" });
  }
};

exports.getPostById = async (req, res) => {
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
      postStatusId: undefined,
      postLabelId: undefined,
      categoryId: undefined,
    };

    res.status(200).json({ message: "Post Retrieved.", post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving post data" });
  }
};

exports.getAllPostsByPostLabelId = async (req, res) => {
  const postLabelId = req.userMembershipId; // Access the user's membershipId from the req object

  if (postLabelId == 2){
    return exports.getAllPosts(req, res);
  }

  try {
    const posts = await Post.findAll({
      where: {
        postLabelId: postLabelId,
      },
    });

    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
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

          return {
            ...post.get(),
            category: categoryData,
            postStatus: postStatusData,
            postLabel: postLabelData,
            postStatusId: undefined,
            postLabelId: undefined,
            categoryId: undefined,
          };
        } catch (err) {
          console.error(err);
          return null; // Or handle the error case as per your requirement
        }
      })
    );

    // Remove any null values (optional, if you want to remove errored posts)
    const filteredPosts = updatedPosts.filter((post) => post !== null);

    res.status(200).json({ message: "Posts Retrieved.", posts: filteredPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving posts data" });
  }
};
