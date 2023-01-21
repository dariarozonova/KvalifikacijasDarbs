require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')

const register = require('./register')

const login = require('./login')


const app = express()

app.use(cors())

const PORT = process.env.SERVER_PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

app.use('/api/register', register)

app.use('/api/login', login)


connection.connect((error) => {
    if (error) {
        console.error(error)
    } else {
        console.log(`MySQL connected: \n*User: ${process.env.DB_USER} \n*Database: ${process.env.DB_NAME}`)
    }
}),


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
