import express from 'express'
import cors from 'cors'

import './database/connection'
import routes from './routes'

const app = express()

const port = process.env.PORT || 1212

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port)