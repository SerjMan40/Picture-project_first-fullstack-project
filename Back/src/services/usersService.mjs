import User from '../models/User.mjs'

export const readUsersFromDB = async () => {
  try {
    const users = await User.find()
    return users
  } catch (error) {
    console.error('Error reading users:', error)
    return []
  }
}

export const addUserToDB = async (user) => {
  try {
    const newUser = new User(user)
    const result = await newUser.save()
    console.log('New user added to DB:', result)
    return result
  } catch (error) {
    console.error('Error adding user:', error)
    return null
  }
}

export const findUserById = async (id) => {
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    console.error('Error finding user by ID:', error)
    return null
  }
}

export const findUserByName = async (username) => {
  try {
    const user = await User.findOne( {username })
    return user
  } catch (error) {
    console.error('Error finding user by name:', error)
    return null
  }
}

export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne( {email} )
    return user
  } catch (error) {
    console.error('Error finding user by email:', error)
    return null
  }
}

export const deleteUserFromDB = async (userId) => {
  try {
    const result = await User.findByIdAndDelete(userId)
    return result !== null
  } catch (error) {
    console.error('Error deleting user:', error)
    return false
  }
}
