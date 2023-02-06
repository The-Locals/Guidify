require('dotenv').config();
const router = require('express').Router();
const User = require('../models/userModel');
const UserManager = require('../db_managers/userManager');

router.use((err, req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.send({
        statusCode: 403,
      });
    }
  });

router.get("/username", async (req, res) => {
    try {
        const username = await UserManager.getUsernameById(req.session.user._id);
        res.send({
            statusCode: 200,
            username: username,
        })
    } catch (err) {
        console.log(err);
        res.send({
            statusCode: 500
        })
    }
});