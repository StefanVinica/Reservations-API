const express = require('express')
const path = require('path')
const UserService = require('./user-service')

const userRouter = express.Router()
const jsonBodyParser = express.json()

userRouter
  .post('/', jsonBodyParser, async (req, res, next) => {
    const { password, username, name, user_type } = req.body

    for (const field of ['name', 'username', 'password','user_type'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    try {
      const passwordError = UserService.validatePassword(password)

      if (passwordError)
        return res.status(400).json({ error: passwordError })

      const hasUserWithUserName = await UserService.hasUserWithUserName(
        req.app.get('db'),
        username
      )

      if (hasUserWithUserName)
        return res.status(400).json({ error: `Username already taken` })

      const hashedPassword = await  UserService.hashPassword(password)

      const newUser = {
        username,
        password: hashedPassword,
        name,
        user_type
      }

      const user = await UserService.insertUser(
        req.app.get('db'),
        newUser
      )
      
      newRestourant = {
        r_name: 'Name',
        r_adress: 'Adress',
        r_phone: 'Phone',
        r_type: 1,
        user_id: user.id
      }
      await UserService.createRestourant(req.app.get("db"), newRestourant);

      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${user.id}`))
        .json(UserService.serializeUser(user))
    } catch(error) {
      next(error)
    }
  })

module.exports = userRouter
