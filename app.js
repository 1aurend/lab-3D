import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import auth from './routes/auth'
const app = express()


require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

app.get('/api', (req, res) => {
  res.send('server is up')
})

// app.use('/api/auth', auth)
// app.use('/', express.static(path.join(__dirname, '/client/build')))

app.listen(3001, () => console.log(`Listening on port 3001`))
