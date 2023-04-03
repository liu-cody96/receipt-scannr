const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

// display the title lol
loginRouter.get('/title', async (request, response) => {
	response.status(200).send('Welcome To ReceiptScannR')
})

// post request to login a user
loginRouter.post('/', async (request, response) => {

	const { userName, password } = request.body
	// try to find the user by username
	const user = await User.findOne({ userName: userName })
	// compare the password with the hashed password
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)

	// if the user doesn't exist or the password is wrong, return 401
	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	const userForToken = {
		username: user.userName,
		id: user._id,
	}

	// create a token and send it in the response. expires in 3600 seconds, that is, in one hour
	const token = jwt.sign(
		userForToken,
		process.env.SECRET,
		{ expiresIn: 3600 }
	)

	response.status(200).send({ token: token, username: user.userName, email: user.email })
})

module.exports = loginRouter