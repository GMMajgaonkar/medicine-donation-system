import User from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const RegisterUser = async (req, res) => {
    try {

        const { name, email, password, contact } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Username Required." })
        }

        if (!email) {
            return res.status(400).json({ message: "Email Required." })
        }

        if (!password) {
            return res.status(400).json({ message: "Email Required ." })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "password contain atleast more than 8 character or numbers" })
        }

        if (!contact) {
            return res.status(400).json({ message: "contact Required ." })
        }


        const hashPass = await bcrypt.hash(password, 10);

        const newUer = new User({
            name,
            email,
            password: hashPass,
            contact
        });

        const SaveUser = await newUer.save();

        const token = jwt.sign({ email, id: User._id }, "medicine")

        //console.log(token)
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",   // ✅ FIX
            secure: false,     // ✅ required on localhost
        }).json(
            {
                message: "registration successfull ",
                user: SaveUser,
                token: token
            },

        )

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const Login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "email Required." })
        }

        if (!password) {
            return res.status(400).json({ message: "Email Required , and contain atleast more than 8 character or numbers" })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "password contain atleast more than 8 character or numbers" })
        }
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "email not registerd" })
        }

        const passMatch = await bcrypt.compare(password, userExist.password)

        if (!passMatch) {
            return res.status(404).json({ message: "Incorrect Password" })
        }

        const token = jwt.sign({ id: userExist._id }, "medicine");
        //console.log(token)
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",   // ✅ FIX
            secure: false,     // ✅ required on localhost
        }).json({
            message: "Login Successfully",
            token,
            user: {
                name: userExist.name,
                email: userExist.email
            }
        })



    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const updateuser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id)

        if (!userExist)
            return res.status(200).json({ message: "student not exist" });

        const update = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ message: "user updated", update })
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const getall = async (req, res) => {
    try {
        const data = await Medicine.find();
        return res.status(200).json({ message: data })
    } catch (error) {
        return res.status(500).json({ message: error })

    }
}

export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", {
                maxAge: 0,
                httpOnly: true,
                sameSite: "Strict", // or 'strict' depending on your use case
            })
            .json({
                message: "Logged out successfully",
                success: true,
            });
    } catch (error) {
        return res.status(500).json({
            message: "Server error during logout",
            success: false,
        });
    }
};


