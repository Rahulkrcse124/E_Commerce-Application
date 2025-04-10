const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  logout,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser
} = require("../controllers/userController");

const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");

//  REGISTER USER
// router.route("/register").post(registerUser);
router.post("/register", registerUser);



//LOGIN USER
router.post("/login", loginUser);



// FORGOT PASSWORD
router.post("/password/forgot", forgotPassword);



// RESET PASSWORD
router.put("/password/reset/:token", resetPassword);



// LOGOUT USER
router.get("/logout", logout);



// GET USER DETAILS
router.get("/me", isAuthenticatedUser, getUserDetails);


// UPDATE USER PASSWORD
router.put("/password/update", isAuthenticatedUser, updatePassword);



// UPDATE USER PROFILE
router.put("/me/update", isAuthenticatedUser, updateProfile);



// get all users(Admin)
router.get("/admin/users", isAuthenticatedUser, isAdmin, getAllUsers);



// get single user details(Admin)
router.get("/admin/user/:id", isAuthenticatedUser, isAdmin, getSingleUser);


// update user role --(Admin)
router.put("/admin/user/:id", isAuthenticatedUser, isAdmin, updateUserRole);


// delete user --(Admin)
router.delete("/admin/user/:id", isAuthenticatedUser, isAdmin, deleteUser);

module.exports = router;
