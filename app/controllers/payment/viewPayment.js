const db = require("../../models");
const Payment = db.payment;
const userController = require("../user/viewUser");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();

    const updatedPayments = await Promise.all(
      payments.map(async (payment) => {
        try {
          const userData = await userController.findUserById(payment.userId);

          return {
            ...payment.get(),
            user: userData,
            userId: undefined,
          };
        } catch (err) {
          console.error(err);
          return null; // Or handle the error case as per your requirement
        }
      })
    );

    // Remove any null values (optional, if you want to remove errored payments)
    const filteredPayments = updatedPayments.filter(
      (payment) => payment !== null
    );

    res
      .status(200)
      .json({ message: "Payments Retrieved.", payments: filteredPayments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving payments data" });
  }
};

// Get the payment for a given payment id
exports.findPaymentById = async (id) => {
  console.log(id);
  return Payment.findByPk(id)
    .then(async (payment) => {

      const userData = await userController.findUserById(payment.userId);

      const updatedPayment = {
        ...payment.get(),
        user: userData,
        userId: undefined,
      };

      return updatedPayment;
    })
    .catch((err) => {
      console.log(">> Error while finding payment: ", err);
    });
};

exports.getPaymentById = async (req, res) => {
  const paymentId = req.params.id;

  try {
    const payment = await exports.findPaymentById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "Payment Retrieved.", payment: payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving payment data" });
  }
};
