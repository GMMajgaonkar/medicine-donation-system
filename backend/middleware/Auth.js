import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        // console.log(token)
        // console.log(token)

        if (!token) {
            return res.status(401).json({ message: "Token Not Found" });
        }

        const decoded = jwt.verify(token, "medicine");

        //console.log("decoded:", decoded);

        req.user = decoded; // { userId: "64fa..." }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Incorrect Token" });
    }
};

export default userAuth;
