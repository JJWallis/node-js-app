const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
)

app.use(express.json())

app.get('/api/v1/tours', (_, res) => {
   res.status(200).json({
      status: 'success',
      results: tours.length, // only when sending arr -> easier for client
      data: {
         tours,
      },
   })
})

app.post('/api/v1/tours', (req, res) => {
   const newId = tours[tours.length - 1].id + 1
   const newTour = { id: newId, ...req.body }

   tours.push(newTour) // reloads live server to get up-to-date data

   fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours), // convert write data to file!
      (err) => {
         // successful resource creation code
         res.status(201).json({
            status: 'success',
            data: {
               tour: newTour, // send back data just created
            },
         })
      }
   )
})

app.listen(port, () => {
   console.log(`App running at http://localhost:${port}`)
})
