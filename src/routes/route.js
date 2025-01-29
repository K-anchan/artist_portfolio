const express = require("express");
const adminController = require('../controllers/adminController')
const authToken = require("../middleware/auth")

const authRouter = express.Router();

// API ROUTES 
authRouter.get('/user1', (req, res) => {
    res.status(200).send({
        app: "Welcome to USER...!!!!!", message: "Any Update :)"
    })
})

// Admin Login Routes
authRouter.post("/admin/signup", adminController.PanelSignup);
authRouter.post("/admin/login", adminController.PanelLogin);
authRouter.post("/admin/createBannerImage", [authToken.verifyToken], adminController.CreateBannerImage)
authRouter.post("/admin/updateBannerImage", [authToken.verifyToken], adminController.UpdateBannerImage)
authRouter.post("/admin/createBannerVideo", [authToken.verifyToken], adminController.CreateBannerVideo)
authRouter.post("/admin/updateBannerVideo", [authToken.verifyToken], adminController.UpdateBannerVideo)





// Banner Images Routes






module.exports = authRouter