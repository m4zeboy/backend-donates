import jwt from 'jsonwebtoken';

export default function(req, res, next) {
    const token = req.headers.authorization;
    const secret = process.env.SECRET;

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if(error) {
                return res.status(401).json({ message: 'Invalid Token'})
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        return res.status(401).json({ message: 'No token Provided.'})
    }
}