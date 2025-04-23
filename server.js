const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://localhost:27017/sit725_prac3", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection.once("open", () => {
    console.log("✅ Connected to MongoDB");
  });

  app.post("/submit", async (req, res) => {
    try {
      const { first_name, last_name, email } = req.body;
      const newUser = new User({ first_name, last_name, email });
      await newUser.save();
      res.json({ message: "✅ User saved successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "❌ Error saving user." });
    }
  });


  

const addNumbers = (number1, number2) => {
    var num1 = parseInt(number1)
    var num2 = parseInt(number2)
    var result = num1 + num2;
    return result;
}

app.get("/addTwoNumbers",(req,res) => {
    var number1 = req.query.number1;
    var number2 = req.query.number2;
    var result = addNumbers(number1,number2)
    res.json({statusCode: 200, data: result, message:"Success"})
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});