import jwt from 'jsonwebtoken'
import chalk from 'chalk'
import findAuthedSpecimens from './findAuthedSpecimens'
require('dotenv').config()


export default async function(req, res, next) {
  const token = req.headers.authorization.split(' ')[1]
  console.log(token);
  if (!token) {
    res.status(401).send('Not Authorized')
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET)
    console.log('here');
    const now = Date.now()/1000
    if (payload.auth === 'oeb126 labs' && payload.exp > now) {
      const db = findAuthedSpecimens(req.body.lab)
      res.send({db: db})
    }
  } catch (err) {
    res.status(401).send(err)
  }
}
