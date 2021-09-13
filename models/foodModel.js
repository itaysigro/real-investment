//יבוא מודול מונגוס
const mongoose = require("mongoose");

//יבוא מודול ג'וי
const Joi = require("joi");

//יוצר סכימה אשר דואג שרק הנתונים שאני הזנתי יהיו 
const foodSchema = new mongoose.Schema({
    name:String,
    img:String,
    cal:Number,
    price:Number
});

//בניית המודל שלנו במונגו
//במונגוס מודל הם מקבל שני משתנים 
//אחד את הקולקשיין(בתוך המסד נתונים שיצרתי)
//ושתיים את הפוד סכימה שאומרת לקולקשיין איך לפעול
const FoodModel = mongoose.model("foods",foodSchema);

//יצוא המודל שבניתי כדי שאחר כך נוכל להשתמש בו
exports.FoodModel = FoodModel;

//יוצא סכימה מפורטת יותר דרך ג'וי
//אשר מאפשרת לי להחזיר לצד לקוח איפה הטעות שלו
exports.validFood = (_bodyData) => {
    let joiSchema = Joi.object({

        //required=חובה למלא (כמו בhtml)
        //יוצר משתנה מסוג סטרינג אשר מקבל אפיונים מסוג מינ ומקס
        //מינ בסטרינג אומר מינימום שתי אותיות אפשר להכניס
        //מאקס אומר מקסימום אותיות שאפשר להכניס
        //תמונה תמיד תקבל סטרינג
        name:Joi.string().min(2).max(99).required(),
        img:Joi.string().min(2).max(300),
        
        //לעומת זאת בנאמבר 
        //האפיון מינ ומקס אומרים
        //מינ אומר המספר הכי קטן שאפשר להכניס
        //מקס אומר המספר המקסימלי שאפשר להכניס
        cal:Joi.number().min(1).max(9999).required(),
        price:Joi.number().min(1).max(9999).required(),

    })

    //לשאול את חי מה זה אומר הואלידט
    return joiSchema.validate(_bodyData);
}