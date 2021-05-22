const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("GET: book trip");
});

router.post("/", (req, res, next) => {
    res.send("POST: book trip");
});

router.patch("/", (req, res, next) => {
    res.send("UPDATE (patch): book trip");
});

module.exports = router;