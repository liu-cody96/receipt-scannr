const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
	response.send('hello world')
})

// create/register a user with input username, input password, email
usersRouter.post('/', async (request, response) => {
	const { userName, email, password1, password2 } = request.body

	if (!(password1 === password2)) {
		response.status(400).send('Passwords do not match, please retype')
	}

    // TODO: add validation to return an error response when the email already exists or the username already exists

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password1, saltRounds)

	const user = new User({
		userName: userName,
		passwordHash: passwordHash,
		email: email
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

module.exports = usersRouter