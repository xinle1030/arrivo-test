const db = require("../../models");
const PostLabel = db.post_label;

// Get the postLabel for a given postLabel id
exports.findPostLabelById = async (id) => {
  return PostLabel.findByPk(id)
    .then((postLabel) => {
      const postLabelData = postLabel.get();
      return postLabelData;
    })
    .catch((err) => {
      console.log(">> Error while finding postLabel: ", err);
    });
};
