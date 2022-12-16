import { Order } from "../models/order.js"

// import { Intance } from "../server.js"


// export const createOrderOnline = async (req, res, next) => {
//     const { shippingInfo, orderItems, paymentMethod, itemsPrice, shippingCharges, totalAmount, taxPrice } = req.body
//     const user = req.user._id
//     const orderOptions = {
//         shippingInfo, orderItems, paymentMethod, itemsPrice, shippingCharges, totalAmount, taxPrice, user
//     }

//     const options = {
//         amount: Number(totalAmount) * 100,
//         currency: "INR",
//     };

//     try {
//         const order = await Intance.orders.create(options)
//         res.status(200).json({
//             success: true,
//             order,
//             orderOptions,
//         })
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             error,
//         })
//     }
// }

// export const paymentVerify = async (req, res, next) => {
//     const {
//         razorpay_payment_id,
//         razorpay_order_id,
//         razorpay_signature,
//         orderOptions,
//     } = req.body

//     const body = 


// }


export const createOrder = async (req, res, next) => {
    const { shippingInfo, orderItems, paymentMethod, itemsPrice, shippingCharges, totalAmount, taxPrice } = req.body
    const user = req.user._id
    const orderOptions = {
        shippingInfo, orderItems, paymentMethod, itemsPrice, shippingCharges, totalAmount, taxPrice, user
    }
    try {
        await Order.create(orderOptions)
        res.status(201).json({
            success: true,
            message: "Order placed successfully via cash on delivery"
        });
    } catch (error) {
        res.status(500).json({
            error,
        })
    }
}

export const myOrders = async (req, res, next) => {
    const orders = await Order.find({
        user: req.user._id
    })
    if (orders) {
        res.status(200).json({
            success: true,
            orders
        })
    } else (
        res.status(400).json({
            message: 'Orders not found'
        })
    )
};




export const getOrderDetail = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            res.status(200).json({
                success: true,
                order,
            })
        } else (
            res.status(404).json({
                message: "Invalid order id"
            })
        )

    } catch (error) {
        res.status(404).json({
            error,
        })
    }

};


export const getAdminOrder = async (req, res, next) => {
    const orders = await Order.find({}).populate("user", "name")
    if (orders) {
        res.status(200).json({
            success: true,
            orders
        })
    } else (
        res.status(400).json({
            message: 'Orders not found'
        })
    )
};


export const processOrder = async (req, res, next) => {
    try {
        const orders = await Order.findById(req.params.id)

        if (!orders) {
            res.status(404).json({
                message: "Invalid Order Id"
            })
        } else if (orders.orderStatus === "Preparing") {
            orders.orderStatus = "Shipped"
            res.status(200).json({
                message: 'Order shipped'
            })
        } else if (orders.orderStatus === "Shipped") {
            orders.orderStatus = "Delivered"
            orders.deliveredAt = new Date(Date.now());
            res.status(200).json({
                message: 'Order Delivered seccessfully'
            })
        } else if (orders.orderStatus === "Delivered") {
            res.status(400).json({
                message: "Food alreday delivered"
            })
        }

        await orders.save();

    } catch (error) {
        res.status(404).json({
            message: "Invalid Order Id",
            error,
        })
    }
};


