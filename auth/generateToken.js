import jwt from 'jsonwebtoken';

export default function(member) {
    const payload = {
        id: member.id,
        name: member.name
    };

    const secret = process.env.SECRET;

    const options = {
        expiresIn: '2h'
    }

    return jwt.sign(payload, secret, options)
}