const express = require("express");
// const bcrypt = require("bcrypt");
const { UserModel, validUser, validLogin, genToken } = require("../models/userModel");
const { authToken, atuhToken } = require("../auth/authToken");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ msg: "users work" })
});

router.get("/userInfo", atuhToken, async (req, res) => {
    let user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
    res.json({ user });
})

router.post("/uploadUserImage", async (req, res) => {
    let image = req.body.image;
    let user = await UserModel.findOne({ _id: req.tokenData._id });
    user.image = image;
    await user.save();
    res.json({ user });
})

router.post("/", async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let userExists = await UserModel.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists." });
        }

        let user = new UserModel(req.body);

        user.password = req.body.password;

        await user.save();
        let newToken = genToken(user._id);
        res.json({ token: newToken });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "We couldn't perform this action at this time, please try again later" });
    }
})

router.post("/login", async (req, res) => {
    let validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    console.log(validBody);

    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ message: "We couldn't find a user with this details." });
    }
    console.log(user);

    if(user.type !== req.body.type){
        return res.status(401).json({message: "You are : " + user.type})
    }

    let passValid = req.body.pass === user.pass;
    if (!passValid) {
        return res.status(401).json({ message: "We couldn't find a user with this details." });
    }
    console.log(passValid);

    let newToken = genToken(user._id);
    res.json({ token: newToken });
})

router.post("/edit", atuhToken, async (req, res) => {
    let user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });

    if(req.body.businessName)
    {
        user.businessName = req.body.businessName;
    }

    if(req.body.businessAddress){
        user.businessAddress = req.body.businessAddress;
    }
    
    if(req.body.businessEmail){
        user.businessEmail = req.body.businessEmail;
    }

    if(req.body.businessDescription){
        user.businessDescription = req.body.businessDescription;
    }

    if(req.body.firstName){
        user.firstName = req.body.firstName;
    }

    await user.save();

    res.json({ user });
})

module.exports = router;