import jwt from 'jsonwebtoken'
require('dotenv').config()


export default (req, res, next) => {
  const token = jwt.sign(
    {
    course: 'oeb126',
    other: 'some other payload data here'
    },
    process.env.SECRET,
    { expiresIn: 60 * 240 }
  )
  return res.header('Authorization', 'Bearer ' + token).send(true)
}
