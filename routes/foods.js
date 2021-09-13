//יצירת משתנה בשם אקספרס ונותנים לו אפיונים של אקספרס
const express = require("express");

//משתנה שמעבירם אליו את המודל והולדיזציה 
const { FoodModel, validFood } = require("../models/foodModel")

//יצירת ראוטר
const router = express.Router();

router.get("/", async (req, res) => {
    let data = await FoodModel.find({});
    res.json({ data });
})

//לעלות נתונים למסד נתונים
router.post("/", async (req, res) => {
    //req.body
    //שלושת השורות הבאות בודקות אם ה מידע שקיבלתי מהבאדי תקין
    //רק אז נעדכן את המידע
    let validBody = validFood(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    let food = new FoodModel(req.body);
    await food.save();
    res.json(food);
})

//למחוק מהדאטה בייס לפי איי די (Id)
router.delete("/:idDel", async (req, res) => {
    try {
        let data = await FoodModel.deleteOne({ _id: req.params.idDel });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})


//לערוך מידע מהדאטה בייס לפי איי די נבחר (Id)
router.put("/:idEdit", async (req, res) => {
    let validBody = validFood(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let data = await FoodModel.updateOne({ _id: req.params.idEdit }, req.body);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})


//מודל אקספורט אפשר אחד בדף לשאול את חי
module.exports = router;