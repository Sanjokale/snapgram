const express = require("express");
const {Router} = require('express')
const UserRoute = Router()

const { register, login, uploadAvatar, findUserById } = require("../controllers/users");
const { avatarUpload } = require("../middlewares/multer");

UserRoute.post("/register", register);
UserRoute.post("/login", login);
UserRoute.post("/upload-avatar/:id", avatarUpload.single("avatar"), uploadAvatar);
UserRoute.get("/user/:id", findUserById)

module.exports = UserRoute;
    