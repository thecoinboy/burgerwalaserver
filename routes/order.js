import express from 'express'
import { createOrder, getAdminOrder, getOrderDetail, myOrders, processOrder } from '../controller/order.js';
import { adminAuth, isAuthenticated } from '../controller/auth.js'
export const orderRoute = express.Router();


orderRoute.post("/createorder", isAuthenticated, createOrder)
// orderRoute.post("/createorderonline", isAuthenticated, createOrderOnline)
orderRoute.get("/myorder", isAuthenticated, myOrders)
orderRoute.get("/order/:id", isAuthenticated, getOrderDetail)
orderRoute.get("/admin/orders", isAuthenticated, adminAuth, getAdminOrder)
orderRoute.get("/admin/order/:id",isAuthenticated, adminAuth, processOrder)

