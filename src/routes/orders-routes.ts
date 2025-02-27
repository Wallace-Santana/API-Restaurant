import { Router } from "express"

import { Orderscontroller } from "@/controllers/orders-controller"

const ordersRoutes = Router()
const ordersController = new Orderscontroller()

ordersRoutes.post("/", ordersController.create)
ordersRoutes.get("/session-table/:table_session_id", ordersController.index)
ordersRoutes.get("/session-table/:table_session_id/total", ordersController.show)

export { ordersRoutes }