const db = require("../../models");
const config = require("../../config/auth.config");
const User = db.user;
const Role = db.role;
const membershipController = require("../membership/viewMembershipById");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    fullName: req.body.fullName,
    password: bcrypt.hashSync(req.body.password, 8),
    membershipId: req.body.membershipId,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
    include: ["membership"],
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

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
          email: user.email,
          fullName: user.fullName,
          membership: membershipData,
          roles: authorities,
          accessToken: token,
        };

        res.status(200).send(response);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
