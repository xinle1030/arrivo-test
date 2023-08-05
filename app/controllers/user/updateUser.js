const db = require("../../models");
const User = db.user;
const Role = db.role;
const membershipController = require("../membership/viewMembershipById");

exports.updateUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, email, password, membershipId, fullName, roles } =
      req.body;

    // Update user details based on req.body
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = bcrypt.hashSync(password, 8);
    if (membershipId) user.membershipId = membershipId;
    if (fullName) user.fullName = fullName;

    if (roles) {
      const roleNames = Array.isArray(roles) ? roles : [roles]; // Ensure roles is an array
      const fetchedRoles = await Role.findAll({
        where: {
          name: {
            [Op.or]: roleNames,
          },
        },
      });

      await user.setRoles(fetchedRoles);
    }

    // Save the updated user to the database
    await user.save();

    // Retrieve updated user details with roles and membership data
    const fetchedRoles = await user.getRoles();
    const authorities = fetchedRoles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    const membershipData = await membershipController.findMembershipById(
      user.membershipId
    );

    const updatedUser = {
      ...user.get(),
      roles: authorities,
      membership: membershipData,
    };

    res.status(200).json({ message: "User Updated.", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user data" });
  }
};
