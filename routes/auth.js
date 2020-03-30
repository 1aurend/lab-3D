import express from 'express'
import createToken from '../utils/jwt'
import passport from 'passport'
import chalk from 'chalk'

//process.env.PASSWORD

const router = express.Router()

router.post('/', (req, res) => {
  console.log(req.body);
  if (req.body.password === process.env.PASSWORD) {
    res.send(true)
  }
  res.send(false)
})

export default router
