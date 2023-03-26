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
// can only retrieve the info if the user has a JWT
profileRouter.get('/', async (request, response, next) => {
	// JSONWebToken error will get thrown here if there is no JWT
	try {
		const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
		console.log(decodedToken)
		if (!decodedToken.id) {
			return response.status(401).json({ error: 'token invalid' })
		}
		const user = await User.findById(decodedToken.id)
		response.json({ username: user.userName, email: user.email })
	}
	catch (error) {
		next(error)
	}
})

// TODO: Implement this route and integrate it with the frontend so that it actually displays receipt data
profileRouter.post('/receiptscanner', async (request, response, next) => {
	// JSONWebToken error will get thrown here if there is no JWT
	try {
		const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
		if (!decodedToken.id) {
			return response.status(401).json({ error: 'token invalid' })
		}
		console.log('You have permission to upload an image of a receipt')
		response.status(200).send('You have permission to upload an image of a receipt')
	}
	catch (error) {
		console.log('going next')
		next(error)
	}
})

/*
In order to create the logout API, we have to first check whether the request is valid
and then give the response to that request. And here, the important step is that to
log out a user, behind the scenes, we have to delete the JWT token from the Headers.
But unfortunately, we don’t have any such option to delete the JWT token from the Headers.
Hence, we will replace the JWT token with a blank string which is going to expire in 1 second.
The code for this looks as follows:
*/
// eslint-disable-next-line no-undef
profileRouter.put('/logout', async (req, res, next) => {
	const authHeader = req.headers['authorization']
	console.log(authHeader)
	try {
		jwt.sign(authHeader, '', { expiresIn: 0.5 } , (logout) => {
			if (logout) {
				res.send({ msg : 'You have been Logged Out' })
			} else {
				res.send({ msg:'Error' })
			}
		})
	}
	catch (error) {
		next(error)
	}
})

module.exports = profileRouter