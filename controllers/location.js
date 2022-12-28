const locationRouter = require('express').Router()
const Location = require('../models/location')

// GET : get all locations available
locationRouter.get('/', (request, response) => {
    Location.find({})
    .then(locations => {
        response.json(locations)
    })
})

// GET : get location by ID
locationRouter.get('/:id', (request, response, next) => {
    Location.findById(request.params.id)
    .then(location => {
        if (location) {
            response.json(location)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

// POST : create a new location
locationRouter.post('/', (request, response, next) => {
    const body = request.body

    const location = new Location({
        name: body.name,
        address: body.address,
        category: body.category,
        lat: body.lat,
        lon: body.lon
    })

    location.save()
    .then(savedLocation => {
        response.json(savedLocation)
    })
    .catch(error => next(error))
})

// DELETE : delete item by ID
locationRouter.delete('/:id', (request, response, next) => {
    Location.findByIdAndRemove(request.params.id)
    .then(() => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

// PUT : update an existing location based on ID
locationRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const location = {
        name: body.name,
        address: body.address,
        category: body.category,
        lat: body.lat,
        lon: body.lon
    }

    Location.findByIdAndUpdate(request.params.id, location, {new : true})
    .then(updatedLocation => {
        response.json(updatedLocation)
    })
    .catch(error => next(error))
})

module.exports = locationRouter