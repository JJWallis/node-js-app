const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const app = express()
const port = 3000

// 1. MIDDLEWARE

app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) => {
   console.log('Hello from the middleware!')
   next()
   // CODE ORDER:
   // if placed before controller -> be used for that route
   // if placed after -> not because controller ends req/res cycle (send back res)
})

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.listen(port, () => {
   console.log(`App running at http://localhost:${port}`)
})
