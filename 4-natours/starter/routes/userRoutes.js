const express = require('express')

const router = express.Router()

const getAllUsers = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'route not defined',
   })
}

const createUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'route not defined',
   })
}

const getUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'route not defined',
   })
}

const updateUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'route not defined',
   })
}

const deleteUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'route not defined',
   })
}

userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
