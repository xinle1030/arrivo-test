const db = require("../../models");
const Payment = db.payment;
const userController = require("../user/viewUser");
const ENCODED_KEY = Buffer.from(process.env.BILLPLZ_API_KEY).toString("base64");
const PREMIUM_MEMBERSHIP = 2;
const fetch = require("node-fetch");

exports.createPayment = async (req, res) => {

  const userId = req.userId;
  const { amount } = req.body;

  if (!amount || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await userController.findUserById(userId);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.membership.id == 2) {
    return res
      .status(400)
      .json({ message: "You are already a premium member" });
  }

  try {
    const body = {
      collection_id: process.env.BILLPLZ_COLLECTION_ID,
      description: "Update Membership to Premium",
      email: user.email,
      name: user.fullName,
      amount: amount,
      callback_url: "http://localhost:8080/payment/transaction",
      redirect_url: "http://localhost:8080/payment/transaction",
    };

    // get bill from Billplz
    const bill = await fetch(process.env.BILLPLZ_ENDPOINT + "/bills", {
      method: "POST",
      headers: {
        Authorization: "Basic " + ENCODED_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await bill.json();

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating new payment" });
  }
};

exports.createPaymentTransaction = async (req, res) => {
  const userId = req.userId;
  const billplz = req.query.billplz;

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    // get bill from Billplz
    const getBill = await fetch(
      process.env.BILLPLZ_ENDPOINT + "/bills/" + billplz.id,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + ENCODED_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const bill = await getBill.json();

    // get transaction from Billplz
    const getTransaction = await fetch(
      process.env.BILLPLZ_ENDPOINT + "/bills/" + billplz.id + "/transactions",
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + ENCODED_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await getTransaction.json();
    const transaction = result.transactions[0];

    const dbTransaction = await db.sequelize.transaction();

    const payment = await Payment.create(
      {
        transactionId: transaction.id,
        amount: bill.amount,
        paymentMethod: transaction.payment_channel,
        status: transaction.status,
        completedAt: transaction.completed_at,
        userId: userId,
      },
      { dbTransaction }
    );

    user.membershipId = PREMIUM_MEMBERSHIP;

    await user.save({ dbTransaction }); // Pass the transaction to the save method

    // Commit the transaction since all operations are successful
    await dbTransaction.commit();

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
      membershipId: undefined,
    };

    const response = {
      id: payment.id,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      user: updatedUser, // Assuming userData is defined somewhere in your code
    };

    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    // If there's an error, rollback the transaction
    if (dbTransaction) {
      await dbTransaction.rollback();
    }
    res.status(500).json({ message: "Error creating payment transaction" });
  }
};
