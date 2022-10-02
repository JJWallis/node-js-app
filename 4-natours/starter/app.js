const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
)

app.use(express.json())

app.use((req, res, next) => {
   console.log('Hello from the middleware!')
   next()
   // CODE ORDER:
   // if placed before controller -> be used for that route
   // if placed after -> not because controller ends req/res cycle (send back res)
})

app.use((req, res, next) => {
   req.requestTime = new Date().toISOString() // adds time of req
   next()
})

const getAllTours = (req, res) => {
   res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length, // only when sending arr -> easier for client
      data: {
         tours,
      },
   })
}

const getTour = (req, res) => {
   console.log(req.params)
   const targetId = parseInt(req.params.id)
   const tour = tours.find(({ id }) => id === targetId)

   if (tour) {
      res.status(200).json({
         status: 'success',
         data: {
            tour,
         },
      })
      return
   }

   res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
   })
}

const createTour = (req, res) => {
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
}

const updateTour = (req, res) => {
   if (parseInt(req.params.id) < tours.length) {
      res.status(200).json({
         status: 'success',
         data: {
            tour: 'Updated tour',
         },
      })
   }
}

const deleteTour = (req, res) => {
   if (parseInt(req.params.id) < tours.length) {
      res.status(204).json({
         status: 'success',
         data: null,
      })
   }
}

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.route('/api/v1/tours').get(getAllTours).post(createTour)

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

app.listen(port, () => {
   console.log(`App running at http://localhost:${port}`)
})
