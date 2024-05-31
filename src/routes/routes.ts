import { Router } from "express"
import categoryController from "../controllers/category.controller"
import authMiddleware from "../middleware/auth.middleware"
import authController from "../controllers/auth.controller"
const routes = Router()


// Auth - Login/Register

routes.post("/login", authController.login)
routes.post("/register",  authMiddleware.verifyEmail, authController.registerAdmin)
// Categorias
routes.get("/categorias", categoryController.getCategories)
routes.post("/categoria", authMiddleware.verifyToken,categoryController.createCategoryController)

export default routes