const UserList = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try{
        const { username, email, password} = req.body;
        const user = await UserList.findOne({email});
        if (user) {
            return res.status(409).json({message: 'User is already exist, you can login', success: false})
        }
        const userModel = new UserList({username, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({message: "Signup Successfully", success: true})
    } catch(err) {
        res.status(500).json({message: "Internal server error", success: false})
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await UserList.findOne({email});
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403).json({message: errorMsg, success: false})
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual){
            return res.status(403).json({message: errorMsg, success: false})
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        )
        res.status(201).json({message: "Login Successfully", success: true, jwtToken, email, username: user.username})
    } catch(err) {
        res.status(500).json({message: "", success: false})
    }
}
module.exports = {
    signup, login
}