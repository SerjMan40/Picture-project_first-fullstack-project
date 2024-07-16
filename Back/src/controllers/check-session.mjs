export const checkSession = async (req, res) => {
  console.log('GET request to /check-session')
  console.log('Current  user:', req.user) 
  console.log('Session ID:', req.sessionID)
  if (req.user) {
    return res.status(200).json({ isAuthenticated: true, user: req.user })
  } else {
    return res.status(400).json({ isAuthenticated: false })
  }
}
