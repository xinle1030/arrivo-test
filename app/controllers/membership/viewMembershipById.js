const db = require("../../models");
const Membership = db.membership;

// Get the membership for a given membership id
exports.findMembershipById = async (id) => {
  return Membership.findByPk(id)
    .then((membership) => {
      const membershipData = membership.get();
      return membershipData;
    })
    .catch((err) => {
      console.log(">> Error while finding membership: ", err);
    });
};
