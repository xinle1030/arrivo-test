const db = require("../../models");
const User = db.user;
const membershipController = require("../membership/viewMembershipById");

exports.deleteAllUsers = async (req, res) => {
  try {
    await User.destroy({
      where: {}, // Empty object to delete all users (no condition)
    });

    res.status(200).json({ message: "All users deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting users." });
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const roles = await user.getRoles();
    const authorities = roles.map((role) => "ROLE_" + role.name.toUpperCase());

    const membershipData = await membershipController.findMembershipById(
      user.membershipId
    );

    const updatedUser = {
      ...user.get(),
      roles: authorities,
      membership: membershipData,
    };

    await user.destroy(); // Delete the user from the database

    res.status(200).json({ message: "User Deleted.", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};


