const fs = require('fs')

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
)

const checkId = (_, res, next, val) => {
   if (parseInt(val) > tours.length) {
      return res.status(404).json({
         status: 'fail',
         message: 'Invalid ID',
      })
   }
   next()
}

const checkBody = (req, res, next) => {
   const { name, price } = req.body || {}

   if (![name, price].every((key) => key)) {
      return res.status(400).json({
         status: 'fail',
         message: 'Missing name or price',
      })
   }
   next()
}

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

   res.status(200).json({
      status: 'success',
      data: {
         tour,
      },
   })
}

const createTour = (req, res) => {
   const newId = tours[tours.length - 1].id + 1
   const newTour = { id: newId, ...req.body }

   tours.push(newTour) // reloads live server to get up-to-date data

   fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours), // convert write data to file!
      () => {
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
   res.status(200).json({
      status: 'success',
      data: {
         tour: 'Updated tour',
      },
   })
}

const deleteTour = (req, res) => {
   res.status(204).json({
      status: 'success',
      data: null,
   })
}

module.exports = {
   getAllTours,
   getTour,
   createTour,
   updateTour,
   deleteTour,
   checkId,
   checkBody,
}
