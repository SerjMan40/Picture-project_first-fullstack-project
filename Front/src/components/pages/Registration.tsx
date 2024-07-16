import {Formik, Form, Field} from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {TextField, Button, Typography, Container, Grid} from '@mui/material'

import {RootState} from '../../redux/store'
import Footer from '../elements/Footer'
import './Registration.css'
import {
  isLogIn,
  registrationData,
  setRegistrationData,
} from '../../redux/slices/itemsSlices'
import {RegisterFormValues} from '../../types/interfaces'
import {notifyUserExists} from '../../utils/notify'
import ProtectedRoute from '../elements/ProtectedRoute'

const Registration = () => {
  const state = useSelector((state: RootState) => state.items.registrationData)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const initialValues = registrationData

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    username: Yup.string().required('Username is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        'Password must contain at least one letter and one number'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required'),
  })

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/register',
        values
      )
      if (response.status === 200) {
        dispatch(setRegistrationData({...values, isRegistering: true}))
        dispatch(isLogIn())
        navigate('/')
      }
    } catch (error: unknown) {
      console.error('Error during registration:', error)
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response
          ? error.response.data
          : 'Unknown error'
        notifyUserExists(errorMessage)
        navigate('/registration')
      } else {
        notifyUserExists('An unknown error occurred. Please try again.')
        navigate('/registration')
      }
    }
  }

  return (
    <ProtectedRoute redirectPath="/registration">
      <div className="img-background__blur">
        <div className="class-container">
          <main>
            <div className="registration-container">
              {state.isRegistering ? (
                <h1>You have successfully registered!</h1>
              ) : (
                <Container component="main" maxWidth="xs">
                  <div>
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{marginBottom: '20px'}}
                    >
                      Register
                    </Typography>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({isSubmitting, errors, touched}) => (
                        <Form>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                type="email"
                                name="email"
                                label="Email Address"
                                variant="outlined"
                                fullWidth
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                type="text"
                                name="username"
                                label="Username"
                                variant="outlined"
                                fullWidth
                                error={touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                as={TextField}
                                type="text"
                                name="firstName"
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                error={touched.firstName && !!errors.firstName}
                                helperText={
                                  touched.firstName && errors.firstName
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                as={TextField}
                                type="text"
                                name="lastName"
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                error={touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                type="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                error={touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                type="password"
                                name="confirmPassword"
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                error={
                                  touched.confirmPassword &&
                                  !!errors.confirmPassword
                                }
                                helperText={
                                  touched.confirmPassword &&
                                  errors.confirmPassword
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                              >
                                Register
                              </Button>
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/')}
                              >
                                Back
                              </Button>
                            </Grid>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Container>
              )}
            </div>
          </main>
          <div className="class-footer">
            <Footer />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Registration
