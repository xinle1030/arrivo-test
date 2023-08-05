const db = require("../../models");
const Payment = db.payment;
const userController = require("../user/viewUser");

exports.deleteAllPayments = async (req, res) => {
  try {
    await Payment.destroy({
      where: {}, // Empty object to delete all payments (no condition)
    });

    res.status(200).json({ message: "All payments deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting payments." });
  }
};

exports.deletePaymentById = async (req, res) => {
  const paymentId = req.params.id;

  try {
    const payment = await Payment.findByPk(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const userData = await userController.findUserById(payment.userId);


    const updatedPayment = {
      ...payment.get(),
      user: userData,
      userId: undefined,
    };

    await payment.destroy(); // Delete the payment from the database

    res.status(200).json({ message: "Payment Deleted.", payment: updatedPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting payment" });
  }
};


