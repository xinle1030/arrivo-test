const db = require("../models");
const Role = db.role;
const Membership = db.membership;
const Post_Label = db.post_label;
const Post_Status = db.post_status;
const User = db.user;

exports.initial = () => {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "manager",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

  Membership.create({
    id: 1,
    name: "normal",
  });

  Membership.create({
    id: 2,
    name: "premium",
  });

  Post_Label.create({
    id: 1,
    name: "normal",
  });

  Post_Label.create({
    id: 2,
    name: "premium",
  });

  Post_Status.create({
    id: 1,
    name: "draft",
  });

  Post_Status.create({
    id: 2,
    name: "published",
  });

  Post_Status.create({
    id: 3,
    name: "pending review",
  });

};