const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    try {
        console.log("Req body", req.body);
        const { name, email, password, fingerprint } = req.body;
        const user = new User({ name, email, password, fingerprint });
        await user.save();
        res.status(201).send("User registered successfully!");
    } catch (error) {
        res.status(400).send("Error in registration!");
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password, fingerprint } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch || user.fingerprint !== fingerprint) return res.status(400).send("Invalid credentials");

        const token = jwt.sign({ id: user._id }, "myjwtsecret", { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send("Logged in successfully");
    } catch (error) {
        res.status(500).send("Server error");
    }
};
