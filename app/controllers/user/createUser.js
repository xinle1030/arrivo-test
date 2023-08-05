const db = require("../../models");
const config = require("../../config/auth.config");
const User = db.user;
const Role = db.role;
const membershipController = require("../membership/viewMembershipById");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { username, email, password, membershipId, fullName, roles } = req.body;

  if (!username || !email || !password || !membershipId || !fullName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      membershipId,
      fullName,
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      await user.setRoles(roles);
    } else {
      // Set user role = 1 if not provided
      const role = await Role.findOne({
        where: { name: "user" }, // Assuming "user" is the default role for normal users
      });

      await user.setRoles([role]);
    }

      try {
        const roles = await user.getRoles();
        const authorities = roles.map(
          (role) => "ROLE_" + role.name.toUpperCase()
        );

        const membershipData = await membershipController.findMembershipById(
          user.membershipId
        );

        const response = {
          id: user.id,
          username: user.username,
          password: user.password,
          email: user.email,
          fullName: user.fullName,
          membership: membershipData,
          roles: authorities,
        };

        res.status(201).send(response);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating new user" });
  }
};
