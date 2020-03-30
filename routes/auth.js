import express from 'express'
import createToken from '../utils/jwt'
import passport from 'passport'
import chalk from 'chalk'
import { Strategy as GoogleTokenStrategy } from 'passport-google-token'

//process.env.PASSWORD
