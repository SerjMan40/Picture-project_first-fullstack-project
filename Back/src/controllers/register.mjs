import bcrypt from 'bcrypt'
import { addUserToDB, findUserByEmail, findUserByName } from '../services/usersService.mjs'

export const postRegisterHandler = async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body

  try {
    const existingUserByEmail = await findUserByEmail(email)
    if (existingUserByEmail) {
      return res.status(409).send('A user with this email already exists.')
    }
    const existingUserByName = await findUserByName(username)
    if (existingUserByName) {
      return res.status(409).send('A user with this username already exists.')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword
    }

    const addedUser = await addUserToDB(newUser)

    if (!addedUser) {
      throw new Error('Failed to add user to the database.')
    }

    req.login(addedUser, (err) => {
      if (err) {
        console.error('Login error:', err)
        return res.status(500).send('Server Error')
      }
      req.session.save((err) => {
        if (err) {
          return res.status(500).send('Server Error')
        }
        console.log(`User registered and logged in successfully: ${req.user}`)
        return res.status(200).send('User registered and logged in successfully')
      })
    })
  } catch (err) {
    console.error('Registration error:', err.message)
    res.status(500).send('Server Error')
  }
}