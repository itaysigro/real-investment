//יבוא מודול של בדיקת טוקן עם גייסון 
//npm i jsonwebtoken= ככה מתיקנים את המודל (רושמים בטרמינל בתיקייה של התוכנית)
const jwt = require("jsonwebtoken");

exports.atuhToken = (req, res, next) => {
    //לבדוק אם נשלח בכלל טוקן
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "you most send token111" });
    }

    //לבדוק אם הטוקן תקני או בתוקף
    try {
        let decodeToken = jwt.verify(token, "imriki");
        req.tokenData = decodeToken;
        // אם הכל בסדר נעבור לפונקציה הבאה
        next();

    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ msg: "token invalid or expired4444" });
    }
}