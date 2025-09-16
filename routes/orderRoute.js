const express = require("express");
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require("../services/orderService");

const authService = require("../services/authService");

const router = express.Router();

router.use(authService.protect);

router.get(
  '/checkout-session/:cartId',
  authService.allowedTO('user'),
  checkoutSession
);

router.route("/:cartId").post(authService.allowedTO("user"), createCashOrder);
router.get(
  "/",
  authService.allowedTO("user", "admin", "manager"),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get("/:id", findSpecificOrder);

router.put(
  '/:id/pay',
  authService.allowedTO('admin', 'manager'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  authService.allowedTO('admin', 'manager'),
  updateOrderToDelivered
);

module.exports = router;
