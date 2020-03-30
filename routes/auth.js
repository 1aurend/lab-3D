import express from 'express'
import createToken from '../utils/jwt'
import passport from 'passport'
import chalk from 'chalk'

//process.env.PASSWORD

const router = express.Router()

router.post('/', (req, res, next) => {
    console.log(req.body)
      if (req.body.password !== process.env.PASSWORD) {
        return res.status(401).send('Not Authorized')
      }
      next()
    },
  createToken
)

export default router
