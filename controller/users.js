import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.js'
import { Order } from '../models/order.js'


export const myProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
}

export const ragister = async (req, res) => {
    const { name, email, password } = req.body
    const hashpassword = bcrypt.hashSync(password)
    const user = new User({
        name, email, password: hashpassword
    })
    const token = user.Token();
    const Check = await User.findOne({ email: email })
    if (Check) {
        res.status(201).json({
            message: "user already ragisterd"
        })
    } else {
        user.save();
        res.status(200).cookie('token', token, {
            httpOnly: true,
            expiresIn: '2hr',
            sameSite: 'none',
            secure:false
        }).json({ 
            message: "user ragistred successfully",
            user,
        })
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const find = await User.findOne({ email: email })
    const checkpassword = bcrypt.compareSync(password, find.password)
    const token = jwt.sign({ id: find._id }, process.env.JWT_SECRET)
    if (find) {
        if (checkpassword){
            res.status(200).cookie('token', token, {
                httpOnly: true,
                expiresIn: '2hr',
                sameSite:'none',
                secure:false
            }).json({
                message: "User loggedIn Successfully",
                user:find
            })
        } else (
            res.status(400).json({ message: "incorrect password" })
        )
    } else (
        res.status(400).json({ message: "invalid credential" })
    )
}

export const logOut = async (req, res, next) => {
    res.cookie("token", "", {
        expiresIn: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        message: "Logged out"
    })
}

export const getAdminUsers = async (req, res, next) => {
    const user = await User.find({})
    res.status(200).json({
        success: true,
        user,
    })
}

export const getAdminStats = async (req, res, next) => {
    const userCount = await User.countDocuments();
    const orders = await Order.find({});
    const preparingOrders = await orders.filter((i) => i.orderStatus === "Preparing");
    const ShippedOrders = await orders.filter((i) => i.orderStatus === "Shipped");
    const DeliveredOrders = await orders.filter((i) => i.orderStatus === "Delivered");
    let totalIncome = 0;

    orders.forEach((i) => {
        totalIncome += i.orderAmount
    })
    res.status(200).json({
        success: true,
        userCount,
        orderCount: {
            total: orders.length,
            preparing: preparingOrders.length,
            shipped: ShippedOrders.length,
            delivered: DeliveredOrders.length
        }
    })
}

