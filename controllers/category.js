const categoryRouter = require('express').Router()
const { request } = require('http')
const Category = require('../models/category')
const Record = require('../models/record')

// GET : get all categories available
categoryRouter.get('/', (request, response) => {
    Category.find({})
    //.populate('records')
    .then(cat => {
        response.json(cat)
    })
})

// GET : get category by ID
categoryRouter.get('/:id', (request, response, next) => {
    Category.findById(request.params.id)
    //.populate('records')
    .then(category => {
        if (category) {
            response.json(category)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

// POST : create a new category
categoryRouter.post('/', (request, response, next) => {
    const body = request.body

    const category = new Category({
        name: body.name
    })

    category.save()
    .then(savedCategory => {
        response.json(savedCategory)
    })
    .catch(error => next(error))
})

// DELETE : delete category by ID
categoryRouter.delete('/:id', (request, response, next) => {
    Category.findByIdAndRemove(request.params.id)
    .then(() => {
        response.status(204).end()
    })
    .catch(error => next(error))

    Record.updateMany(
        {"category_id": request.params.id}, 
        {"category_id": "none"},
        {"$set":{"created": true}}
    ).then(updatedRecord => {
        response.json(updatedRecord)
    })
    .catch(error => next(error))
})

// PUT : update an existing category based on category id
categoryRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const category = {
        name: body.name
    }

    Category.findByIdAndUpdate(request.params.id, category, {new : true})
    .then(updatedCategory => {
        response.json(updatedCategory)
    })
    .catch(error => next(error))
})

module.exports = categoryRouter