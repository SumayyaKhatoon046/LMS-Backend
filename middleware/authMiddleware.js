const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            });
        }


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        req.user = await User.findById(decoded.id)
            .select("-password");


        if (!req.user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

//       console.log("USER:", req.user);
console.log("ROLE:", req.user.role);

        next();


    } catch(error){

        res.status(401).json({
            message:"Invalid Token"
        });

    }
};


module.exports = protect;  