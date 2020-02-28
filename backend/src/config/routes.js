const express = require('express')

module.exports = function(server) {
    const router = express.Router()
    server.use('/api', router)

    const todoService = require('../api/todo/todo-service')
    todoService.register(router, '/todos')
}