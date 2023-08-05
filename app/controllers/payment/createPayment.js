const db = require("../../models");
const Payment = db.payment;
const userController = require("../user/viewUser");

exports.createPayment = async (req, res) => {
  const { id, amount, paymentMethod, status, userId } = req.body;

  if (!id || !amount || !paymentMethod || !status || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {

    const payment = await Payment.create({
      id,
      amount,
      paymentMethod,
      status,
      userId,
    });

      try {

        const userData = await userController.findUserById(payment.userId);

        const response = {
          id: payment.id,
          amount: payment.amount,
          paymentMethod: payment.paymentMethod,
          status: payment.status,
          user: userData,
        };

        res.status(201).send(response);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating new payment" });
  }
};
