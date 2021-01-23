// node imports
const express = require("express");

// local imports
const userControllers = require("../controllers/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/login", auth, userControllers.login);

router.post("/signup", auth, userControllers.signup);

modules.export = router;
