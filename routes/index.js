const express = require("express");
const router = express.Router();

router.get("/",(req,res) => {
    res.json({msg:"expres work 222"})
});

module.exports = router;