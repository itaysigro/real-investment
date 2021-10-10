const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    city: String,
    address: String,
    email: String,
    repeatEmail: String,
    dateOfBirth: String,
    password: String,
    repeatPassword: String,
    businessName: String,
    businessAddress: String,
    businessEmail: String,
    businessDescription: String,
    authorizedDealer: String,
    activeAccountPage: String,
    profitAndLoss: String,
    registrarOfCompanies: String,
    bookManagment: String,
    inpFile: String,
    type: String,
    role: {
        type: String, default: "regular"
    },
    date_created: {
        type: Date, default: Date.now()
    }
})



const UserModel = mongoose.model("users", userSchema);

exports.UserModel = UserModel;


exports.genToken = (_userId) => {
    let token = jwt.sign({ _id: _userId },
        "imriki", { expiresIn: "60mins" });
    return token;
}

exports.validUser = (_bodyData) => {
    let joiSchema = Joi.object({
        firstName: Joi.string().min(2).max(99).required(),
        lastName: Joi.string().min(2).max(99).required(),
        city: Joi.string().min(2).max(99).required(),
        address: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(2).max(99).required().email(),
        repeatEmail: Joi.string().min(2).max(99).required().email(),
        dateOfBirth: Joi.string().min(2).max(99).required(),
        password: Joi.string().min(2).max(99).required(),
        repeatPassword: Joi.string().min(2).max(99).required(),
        
        businessName: Joi.string().min(2).max(99).required(),
        businessAddress: Joi.string().min(2).max(99).required(),
        businessDescription:  Joi.string().min(2).max(99).required(),
        authorizedDealer: Joi.string().min(2).max(99).required(),
        activeAccountPage: Joi.string().min(2).max(99).required(),
        profitAndLoss: Joi.string().min(2).max(99).required(),
        registrarOfCompanies: Joi.string().min(2).max(99).required(),
        bookManagment: Joi.string().min(2).max(99).required(),
        type: Joi.string().min(2).max(99).required()
    })


    return joiSchema.validate(_bodyData);
}


exports.validLogin = (_bodyData) => {
    let joiSchema = Joi.object({
        email: Joi.string().min(2).max(99).required().email(),
        password: Joi.string().min(2).max(99).required(),
        type: Joi.string().min(2).max(99).required()
    })

    return joiSchema.validate(_bodyData);
}


