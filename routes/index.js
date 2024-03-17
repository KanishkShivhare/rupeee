var express = require("express");
var router = express.Router();
const Razorpay = require("Razorpay");

var instance = new Razorpay({
  key_id: "rzp_test_xl4Oq7FNGxV6YL",
  key_secret: "8v0LTeiH6lyb0wQoWkE7gzOv",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/create/orderId", (req, res) => {
  var options = {
    amount: req.body.amount, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send(order);
  });
});

router.post("/api/payment/verify", (req, res) => {
  const razorpayOrderId = req.body.response.razorpay_order_id;
  const razorpayPaymentId = req.body.response.razorpay_payment_id;
  const signature = req.body.response.razorpay_signature;
  const secret = "8v0LTeiH6lyb0wQoWkE7gzOv";
  var {
    validatePaymentVerification,
    validateWebhookSignature,
  } = require("../node_modules/razorpay/dist/utils/razorpay-utils");
  const result = validatePaymentVerification(
    { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
    signature,
    secret
  );
  res.send(result);
});

module.exports = router;
