const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
   res.status(200).json({ message: 'Hey there!' })
})

app.post('/', (req, res) => {
   res.send('Post req from homepage!')
})

app.listen(port, () => {
   console.log(`App running at http://localhost:${port}`)
})
