const {
  createPayment,
  updatePayment,
  viewPayment,
  deletePayment,
} = require("../controllers/payment");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/payments", [authJwt.verifyToken], createPayment.createPayment);

  app.post(
    "/api/payments/transaction",
    [authJwt.verifyToken],
    createPayment.createPaymentTransaction
  );

  app.get("/api/payments/all", viewPayment.getAllPayments);

  app.get("/api/payments/:id", viewPayment.getPaymentById);

  app.put("/api/payments/:id", updatePayment.updatePaymentById);

  app.delete("/api/payments/all", deletePayment.deleteAllPayments);

  app.delete("/api/payments/:id", deletePayment.deletePaymentById);
};
