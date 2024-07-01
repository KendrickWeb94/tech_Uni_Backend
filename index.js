const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Tech_uni", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Sign Up Route without Password Hashing
app.post('/pages/SignUp', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

// Login Route without Password Hash Comparison
app.post("/Login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No Record existed");
            }
        })
        .catch(err => res.json(err));
});

// Route to Create User
app.post('/students', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.get('/students', (req, res) => {
    UserModel.find()
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

