const recordRouter = require('express').Router()
const Record = require('../models/record')
const Category = require('../models/category')

// GET : get all records available
recordRouter.get('/', (request, response) => {
    Record.find({})
    .populate('category')
    .then(record => {
        response.json(record)
    })
})

// GET : get record by ID
recordRouter.get('/:id', (request, response, next) => {
    Record.findById(request.params.id)
    .populate('category')
    .then(record => {
        if (record) {
            response.json(record)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

// GET : get record between start date & end date YYYY-MM-DD
recordRouter.get('/find_by_date/:startDate&:endDate', (request, response, next) => {
    startDate = new Date(`${request.params.startDate}T00:00:00Z`)
    endDate = new Date(`${request.params.endDate}T23:59:59Z`)
    Record.find(
        {"date" : {
            $gte : startDate,
            $lte : endDate
        }}
    )
    .populate('category')
    .then(record => {
        if (record) {
            response.json(record)
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
        category: body.category,
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
        category_id: body.category_id,
        date: new Date()
    }

    Record.findByIdAndUpdate(request.params.id, record, {new : true})
    .then(updatedRecord => {
        response.json(updatedRecord)
    })
    .catch(error => next(error))
})

module.exports = recordRouter