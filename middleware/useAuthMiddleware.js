const jwt = require('jsonwebtoken');

function userAuthMiddlware(req, res, next) {
    try {

        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        console.log(process.env.JWT_KEY)
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded)
        if (!decoded) {
            res.status(400)
            return next(new Error("Invalid User"))
        }
        req.session = {
            user: decoded
        }
        next()

    } catch (error) {
        console.log(error)
        res.status(400)
        return next(new Error("Invalid User"))
    }
}

function userAdminMiddlware(req, res, next) {
    console.log("sddjdhidhiudhui")
    try {

        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        console.log(process.env.JWT_KEY)
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded)
        // if (!decoded.isAdmin) {
        //     res.status(400)
        //     return next(new Error("Invalid User"))
        // }
        if(decoded.isAdmin){
           return next()
        }
        res.status(400)
        return next(new Error("User Are not access this resource"))

    } catch (error) {
        console.log(error)
        res.status(400)
        return next(new Error("Invalid User"))
    }
}

module.exports = { userAuthMiddlware, userAdminMiddlware }