const db = require("../models/index");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminPanel = db.adminInfo
const homeBannerImg = db.banner_images
const homeBannerVideo = db.homeBannerVideo

const generalFunction = require('../generalFunctions/index')


const adminController = {

    PanelSignup: async (req, res) => {
        try {
            console.log("Enter in the code", 111)
            let { name, email, password, mobile } = req.body
            console.log("Enter the body", 222)
            let paneluserExisted = await adminPanel.findOne({ where: { email: email } })
            console.log("FINDING ERRROOORR", paneluserExisted)
            if (!paneluserExisted) {
                console.log('coming here.................')
                const salt = await bcrypt.genSalt();
                const encryptedPassword = await bcrypt.hash(password, salt);
                const Paneluser = await adminPanel.create({ email: email, password: encryptedPassword, username: name, mobile: mobile })
                if (Paneluser) {
                    res.status(200).json({
                        success: true,
                        message: "User has been Registered Successfully",
                        data: Paneluser,
                    })
                } else {
                    console.log("Enter the body", 33)
                    res.status(400).json({
                        success: false,
                        message: "Error something is wrong",
                    })
                }
            } else {
                console.log("EMAIL VERIFIED")
                res.status(201).send({ success: false, message: "Email already exist" });
            };
        } catch (err) {
            console.log("Enter the body", 444)
            res.status(500).send({
                success: false,
                message: err
            });
        }
    },

    PanelLogin: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const isPanelUserVerified = await adminPanel.findOne({ where: { email: email } })
            if (isPanelUserVerified) {
                const validatePass = await bcrypt.compare(password, isPanelUserVerified.password);
                if (validatePass == true) {
                    console.log('password match')
                    var token = generalFunction.signJwtAccessToken(isPanelUserVerified);
                    res.status(200).send({
                        success: true,
                        message: "Login Successfully",
                        accessToken: token,
                    });
                }
                else {
                    res.status(201).send({ success: false, message: "Invalid Password" });
                }
            } else {
                res.status(201).send({ success: false, message: "Invalid Email Id" });
            }
        } catch (err) {
            res.status(401).send({
                success: false,
                message: "Invalid Creadentials"
            });
        }
    },

    CreateBannerImage: async (req, res) => {
        try {
            console.log("IS THERE ANY UPDATE TO HOME BANNER")
            let { banner_image } = req.body
            console.log('Bnaner_img', banner_image)
            let admin_id = req.user.user_id
            console.log('Id', admin_id)

            if (!(banner_image)) {
                return res.status(400).json({
                    success: false,
                    message: "API validation required..",
                })
            }
            console.log('after validation',)
            const insertBannerData = await homeBannerImg.create({
                banner_image: await generalFunction.saveMediaLocally(banner_image),
                // banner_image: "img",
                admin_id: admin_id,
                status: "1",
            })
            console.log('create image')

            if (insertBannerData) {
                console.log('if insertbanner')

                return res.status(200).json({
                    success: true,
                    message: " Created",
                    data: insertBannerData
                })
            } else {
                console.log("Error in Else")
                return res.status(400).json({
                    success: false,
                    message: " invalid data !",
                })
            }
        } catch (err) {
            console.log("Error in Catch:", err.message || err);
            res.status(500).send({
                success: false,
                message: err
            });
        }
    },

    UpdateBannerImage: async (req, res) => {
        try {
            console.log(" Start Updating HomeBanner ")
            let status = "1"
            let { id, banner_image } = req.body
            console.log(id)
            const ishomeBannerExist = await homeBannerImg.findOne({ where: { id: id } });
            console.log('data.........', ishomeBannerExist);
            if (ishomeBannerExist) {
                console.log("updating...")
                const updatehomeBanner = await homeBannerImg.update({
                    banner_image: await generalFunction.saveMediaLocally(banner_image),
                    status: status,
                },
                    {
                        where: { id: id }
                    })
                if (updatehomeBanner) {
                    console.log("updated...")
                    let updatehomeData = await homeBannerImg.findOne({ where: { id: id } })
                    return res.status(200).json({
                        success: true,
                        message: "Updated Homebanner Data",
                        data: updatehomeData
                    })
                } else {
                    return res.status(201).json({
                        success: false,
                        message: "Error, Kindly Check Your ID Once !",
                    })
                }

            } else {
                return res.status(400).json({
                    success: false,
                    message: " Invalid ID, Kindly Check Your ID Once!",
                })
            }
        }
        catch {
            res.status(500).send({
                success: false,
                message: " Please pass the right id !"
            });
        }
    },

    UpdateBannerImageStatus: async (req, res) => {
        try {
            let { id, status } = req.body
            const ishomeBannerExist = await homeBannerImg.findOne({ where: { id: id } });
            console.log('data.........', ishomeBannerExist);
            if (ishomeBannerExist) {
                const homebannerStatus = await homeBannerImg.update({
                    status: status
                },
                    {
                        where: { id: id }
                    })
                return res.status(200).json({
                    success: true,
                    message: " HomeBanner Status Updated ",
                    data: ishomeBannerExist
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: " Invalid ID Data !",
                })
            }
        }
        catch {
            res.status(500).send({
                success: false,
                message: "Error,Check Your ID Once"
            });
        }
    },

    CreateBannerVideo: async (req, res) => {
        try {
            console.log("IS THERE ANY UPDATE TO HOME BANNER")
            let { banner_video } = req.body
            console.log("video")
            let admin_id = req.user.user_id
            console.log(admin_id, 'id')
            if (!(banner_video)) {
                return res.status(400).json({
                    success: false,
                    message: "API validation required..",
                })
            }
            console.log(9898)
            const insertBannerData = await homeBannerVideo.create({
                banner_video: await generalFunction.saveMediaLocally(banner_video),
                status: "1",
                admin_id: admin_id
            })
            console.log(insertBannerData.banner_video1, "VIDEO 1")
            if (insertBannerData) {
                console.log(insertBannerData, "Insert Banner Data")
                return res.status(200).json({
                    success: true,
                    message: " Created",
                    data: insertBannerData
                })
            } else {
                console.log("Else Banner Data")
                return res.status(400).json({
                    success: false,
                    message: " invalid data !",
                })
            }
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        }
    },

    UpdateBannerVideo: async (req, res) => {
        try {
            console.log(" Start Updating HomeBanner ")
            let status = "1"
            let { id, banner_video } = req.body
            const ishomeBannerExist = await homeBannerVideo.findOne({ where: { id: id } });
            console.log('data.........', ishomeBannerExist);
            if (ishomeBannerExist) {
                const updatehomeBannerVideo = await homeBannerVideo.update({
                    banner_video: await generalFunction.saveMediaLocally(banner_video),
                    status: status,
                },
                    {
                        where: { id: id }
                    })
                if (updatehomeBannerVideo) {
                    let updatehomeData = await homeBannerVideo.findOne({ where: { id: id } })
                    return res.status(200).json({
                        success: true,
                        message: "Updated Homebanner Data",
                        data: updatehomeData
                    })
                } else {
                    return res.status(201).json({
                        success: false,
                        message: "Error, Kindly Check Your ID Once !",
                    })
                }

            } else {
                return res.status(400).json({
                    success: false,
                    message: " Invalid ID, Kindly Check Your ID Once!",
                })
            }
        }
        catch {
            res.status(500).send({
                success: false,
                message: " Please pass the right id !"
            });
        }
    },







}

module.exports = adminController;

