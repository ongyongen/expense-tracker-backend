// Custom middleware
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id or input fields' })
  } else {
    return response.status(400).json({ error: error.message })
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}

 // next() | next(error) indicate that current handler is complete &
 // will skip all remaining handlers (except error handling handlers)