const db = require("../../models");
const User = db.user;
const membershipController = require("../membership/viewMembershipById");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        try {
          const roles = await user.getRoles();
          const authorities = roles.map(
            (role) => "ROLE_" + role.name.toUpperCase()
          );

          const membershipData = await membershipController.findMembershipById(
            user.membershipId
          );

          return {
            ...user.get(),
            roles: authorities,
            membership: membershipData,
          };
        } catch (err) {
          console.error(err);
          return null; // Or handle the error case as per your requirement
        }
      })
    );

    // Remove any null values (optional, if you want to remove errored users)
    const filteredUsers = updatedUsers.filter((user) => user !== null);

    res.status(200).json({ message: "Users Retrieved.", users: filteredUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users data" });
  }
};


exports.getUserById = async (req, res) => {
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

    res.status(200).json({ message: "User Retrieved.", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user data" });
  }
};

