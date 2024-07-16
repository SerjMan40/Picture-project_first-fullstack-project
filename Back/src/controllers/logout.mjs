export const postLogoutHandler = (req, res) => {
  console.log('Logout request received')
  console.log('Current session user:', req.session.user)
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err)
      return res.status(500).send('Server Error')
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err)
        return res.status(500).send('Server Error')
      }
      res.clearCookie('connect.sid')
      console.log('Session destroyed and cookie cleared')
      return res.status(200).send('Logout successful')
    })
  })
}