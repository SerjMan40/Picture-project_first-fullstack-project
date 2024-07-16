import {Button} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import {RootState} from '../../redux/store'
import LoginForm from '../elements/LoginForm'
import Footer from '../elements/Footer'
import './Home.css'
import ProtectedRoute from '../elements/ProtectedRoute'
import checkSession from '../../redux/thunks/checkSession'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLogin = useSelector((state: RootState) => state.items.isLogin)
  const isRegistered = useSelector(
    (state: RootState) => state.items.registrationData.isRegistering
  )
  const user = useSelector((state: RootState) => state.items.user)

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/logout',
        {},
        {
          withCredentials: true,
        }
      )
      if (response.status === 200) {
        dispatch(checkSession())
        navigate('/')
      } else {
        console.error('Failed to log out')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <ProtectedRoute>
      <div className="img-background">
        <div className="class-container">
          <main className="home-container">
            <h1>Painting store</h1>
            <>
              {isLogin ? (
                user ? (
                  <>
                    <h2>Welcome {user.firstName} !!!</h2>
                    <div className="home1">
                      <Button
                        onClick={logoutHandler}
                        color="primary"
                        variant="contained"
                      >
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>Loading user data...</p>
                )
              ) : (
                <LoginForm />
              )}
              {!isRegistered && !isLogin && (
                <div className="home1">
                  <Button
                    onClick={() => navigate('/registration')}
                    color="primary"
                    variant="contained"
                  >
                    Registration
                  </Button>
                </div>
              )}
            </>
          </main>
          <footer className="class-footer">
            <Footer />
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Home
