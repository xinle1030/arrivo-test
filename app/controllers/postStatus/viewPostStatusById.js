const db = require("../../models");
const PostStatus = db.post_status;

// Get the postStatus for a given postStatus id
exports.findPostStatusById = async (id) => {
  return PostStatus.findByPk(id)
    .then((postStatus) => {
      const postStatusData = postStatus.get();
      return postStatusData;
    })
    .catch((err) => {
      console.log(">> Error while finding postStatus: ", err);
    });
};
