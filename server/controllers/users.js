const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})

// create/register a user with input username, input password, email
usersRouter.post('/', async (request, response) => {
	const { userName, email, firstName, lastName, password1, password2 } = request.body

	if (!(password1 === password2)) {
		return response.status(401).json({
			error: 'Passwords do not match, please retype'
		})
	}

	// validation to return an error response when the email already exists or the username already exists
	const checkUserName = await User.findOne({ userName: userName })
	if(checkUserName){
		return response.status(400).json({
			error: 'This username is already in use. Please come up with a different username.'
		})
	}
	const checkUserEmail = await User.findOne({ email: email })
	if(checkUserEmail){
		return response.status(400).json({
			error: 'This email is already in use. Please use a different email.'
		})
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password1, saltRounds)

	// save the user to the database
	const user = new User({
		userName: userName,
		firstName: firstName,
		lastName: lastName,
		passwordHash: passwordHash,
		email: email
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

module.exports = usersRouter