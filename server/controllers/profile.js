// routes here can only be accessed if the user is logged in
const jwt = require('jsonwebtoken')
const profileRouter = require('express').Router()
const User = require('../models/User')

// todo: how the hell do i fix this and return a 400 if the token doesnt exist
const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}

// get request to retrieve a user's information and return it as a response
profileRouter.post('/', async (request, response) => {
	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const user = await User.findById(decodedToken.id)

	response.json({ username: user.userName, email: user.email })
})

module.exports = profileRouter