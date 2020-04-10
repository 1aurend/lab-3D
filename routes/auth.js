import express from 'express'
import jwt from '../utils/signJwt'


const router = express.Router()

router.post('/', (req, res, next) => {
    console.log(req.body)
      if (req.body.password !== process.env.PASSWORD) {
        return res.status(401).send('Not Authorized')
      }
      next()
    },
  jwt
)

export default router