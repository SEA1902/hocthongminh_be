const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});
router.post("/register", userController.create);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

router.post("/update-information", userController.updateInformation);

router.post("/get-user-from-token", userController.getUserFromToken);

router.post("/change-password", userController.changePassword);

router.post(
  "/change-avatar",
  upload.single("avatar"),
  userController.changeAvatar
);

module.exports = router;
