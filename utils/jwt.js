import jwt from 'jsonwebtoken'
require('dotenv').config()


export default (req, res, next) => {
    let token = jwt.sign({
            id: req.user.googleID,
            task: 'toolsUi',
            iss: 'http://localhost:3000/'
        }, process.env.SECRET,
        {
            expiresIn: 60 * 30,
        })

    // let cookieOptions = {
    //   httpOnly: true,
    //   expires: 0,
    //   sameSite: false,
    //   domain: null,
    //   secure: false
    // }

    return res.header('Authorization', 'Bearer ' + token).send(JSON.stringify(req.user))
}
