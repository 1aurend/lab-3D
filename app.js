import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import signIn from './routes/signin'
import s3 from './routes/s3'
import resources from './routes/resources'
const app = express()


require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

app.get('/api', (req, res) => {
  res.send('server is up')
})

app.get('/api/test', (req, res) => {
  res.send('got a request')
})

app.use('/api/signin', signIn)
app.use('/api/s3', s3)
app.use('/api/resources', resources)

app.listen(3001, () => console.log(`Listening on port 3001`))
