const express = require("express");
const {Router} = require('express')
const UserRoute = Router()

const { register, login } = require("../controllers/users");

UserRoute.post("/register", register);
UserRoute.post("/login", login);

module.exports = UserRoute;
  