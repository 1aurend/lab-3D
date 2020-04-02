import express from 'express'
import verify from '../utils/verifyJwt'


const router = express.Router()

router.post('/', (req, res, next) => {
    console.log(req.headers)
      if (!req.headers.authorization) {
        return res.status(401).send('Not Authorized')
      }
      next()
    },
  verify
)

export default router
