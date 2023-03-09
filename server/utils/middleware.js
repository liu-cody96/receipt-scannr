const logger = require('./logger')

// this function logs the request body to the console.
const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

// this function returns a 404 response every time there's an error that warrants a 404
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

// this function is meant to return 400 codes everytime there's an error that warrants a 400
const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
}