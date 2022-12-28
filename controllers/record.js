const recordRouter = require('express').Router()
const Record = require('../models/record')

// GET : get all records available
recordRouter.get('/', (request, response) => {
    Record.find({})
    .then(locations => {
        response.json(locations)
    })
})

// GET : get record by ID
recordRouter.get('/:id', (request, response, next) => {
    Record.findById(request.params.id)
    .then(location => {
        if (location) {
            response.json(location)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

// POST : create a new record
recordRouter.post('/', (request, response, next) => {
    const body = request.body

    const record = new Record({
        name: body.name,
        price: body.price,
        date: new Date()
    })

    record.save()
    .then(savedRecord => {
        response.json(savedRecord)
    })
    .catch(error => next(error))
})

// DELETE : delete record by ID
recordRouter.delete('/:id', (request, response, next) => {
    Record.findByIdAndRemove(request.params.id)
    .then(() => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

// PUT : update an existing record based on ID
recordRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const record = {
        name: body.name,
        price: body.price,
        date: new Date()
    }

    Record.findByIdAndUpdate(request.params.id, record, {new : true})
    .then(updatedRecord => {
        response.json(updatedRecord)
    })
    .catch(error => next(error))
})

module.exports = recordRouter