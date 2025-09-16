const express = require("express");

const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
} = require("../utils/validators/reviewValidator");

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require("../services/reviewService");

const authService = require("../services/authService");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getReviews)
  .post(
    authService.protect,
    authService.allowedTO("user"),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .put(
    authService.protect,
    authService.allowedTO("user"),
    updateReviewValidator,
    updateReview
  )
  .delete(
    authService.protect,
    authService.allowedTO("user", "manager", "admin"),
    deleteReview
  );

module.exports = router;
