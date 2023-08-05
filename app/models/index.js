const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("../models/category.model.js")(sequelize, Sequelize);
db.membership = require("../models/membership.model.js")(sequelize, Sequelize);
db.payment = require("../models/payment.model.js")(sequelize, Sequelize);
db.post_label = require("../models/post_label.model.js")(sequelize, Sequelize);
db.post_status = require("../models/post_status.model.js")(
  sequelize,
  Sequelize
);
db.post = require("../models/post.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  onDelete: "CASCADE", // Enable cascading delete
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  onDelete: "CASCADE", // Enable cascading delete
});

db.membership.hasMany(db.user, { as: "users" });
db.user.belongsTo(db.membership, {
  foreignKey: "membershipId",
  as: "membership",
});

// db.category.hasMany(db.post, { as: "posts" });
// db.post.belongsTo(db.category, {
//   foreignKey: "categoryId",
//   as: "category",
// });

// db.user.hasMany(db.payment, { as: "payments" });
// db.payment.belongsTo(db.user, {
//   foreignKey: "paymentId",
//   as: "payment",
// });

// db.user.hasMany(db.post, { as: "posts" });
// db.post.belongsTo(db.user, {
//   foreignKey: "postId",
//   as: "post",
// });

db.ROLES = ["user", "admin", "moderator"];
db.POST_STATUSES = ["draft", "published", "pending review"];
db.POST_LABELS = ["normal", "premium"];
db.MEMBERSHIPS = ["normal", "premium"];

module.exports = db;
