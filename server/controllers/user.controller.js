import UserModel from "../models/user.model.js";
import sendEmail from "../config/sendEmail.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.json({
                message: "Already register email",
                error: true,
                success: false,
            });
        }

        // hashpassword
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
        console.log("VerifyEmailUrl:", VerifyEmailUrl);
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from binkeyit",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl,
            }),
        });
        return res.json({
            message: "User register successfully",
            error: false,
            success: true,
            data: save,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

export async function verifyEmailController(req, res) {
    try {
        const { code } = req.body;

        const user = await UserModel.findOne({ _id: code });
        if (!user) {
            return res.status(400).json({
                message: "Invalid code",
                error: true,
                success: false,
            });
        }

        const updateUser = await UserModel.updateOne(
            { _id: code },
            {
                verify_email: true,
            }
        );

        return res.json({
            message: "Verify email successfully",
            success: true,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: true,
        });
    }
}

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Provide email or password",
                error: true,
                success: false,
            });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not register",
                error: true,
                success: false,
            });
        }
        const checkPassword = await bcryptjs.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "Check your password",
                error: true,
                success: false,
            });
        }
        if (user.status !== "Active") {
            return res.status(400).json({
                message: "Contact to Admin",
                error: true,
                success: false,
            });
        }

        const accessToken = await generatedAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        const cookiesOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
        };
        res.cookie("accessToken", accessToken, cookiesOption);
        res.cookie("refreshToken", refreshToken, cookiesOption);

        return res.json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

export async function logoutController(req, res) {
    try {
        const cookiesOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
        };
        res.clearCookie("accessToken", cookiesOption);
        res.clearCookie("refreshToken", cookiesOption);

        return res.json({
            message: "Logout successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}
