const db = require("../../models");
const Payment = db.payment;
const userController = require("../user/viewUser");

exports.updatePaymentById = async (req, res) => {
  const paymentId = req.params.id;

  try {
    const payment = await Payment.findByPk(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const { amount, paymentMethod, status, userId } = req.body;

    // Update payment details based on req.body
    if (amount) payment.amount = amount;
    if (paymentMethod) payment.paymentMethod = paymentMethod;
    if (status) payment.status = status;
    if (userId) payment.userId = userId;

    // Save the updated payment to the database
    await payment.save();

    const userData = await userController.findUserById(payment.userId);

    const updatedPayment = {
      ...payment.get(),
      user: userData,
      userId: undefined,
    };

    res
      .status(200)
      .json({ message: "Payment Updated.", payment: updatedPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating payment data" });
  }
};
