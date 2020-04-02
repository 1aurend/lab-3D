import jwt from 'jsonwebtoken'
import listAvailableLabs from './listAvailableLabs'
import chalk from 'chalk'
require('dotenv').config()


export default (req, res, next) => {
  const token = jwt.sign(
    {auth: 'oeb126 labs'},
    process.env.SECRET,
    {expiresIn: '3hr'}
  )
  const labList = listAvailableLabs()
  return res.header('Authorization', 'Bearer ' + token).send({authed: true, data: labList})
}
