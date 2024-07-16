import {Formik, Form, Field} from 'formik'
import axios from 'axios'
import {object, string} from 'yup'
import {Button, TextField, Grid, Container} from '@mui/material'
import {useDispatch} from 'react-redux'

import {
  setLoginData,
  setRegistrationData,
} from '../../redux/slices/itemsSlices'
import {LoginFormValues} from '../../types/interfaces'
import {notifyLogin} from '../../utils/notify'
import {useNavigate} from 'react-router-dom'
import checkSession from '../../redux/thunks/checkSession'

const validationSchema = object().shape({
  email: string().email('Invalid email').required('Email is required'),
  password: string().required('Password is required'),
})

const LoginForm = () => {
  const dispatch = useDispatch()

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  }
  const navigate = useNavigate()
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await axios.post('http://localhost:4000/login', values, {
        withCredentials: true,
      })
      if (response.status === 200) {
        dispatch(setLoginData(true))
        dispatch(setRegistrationData({isRegistering: true}))
        dispatch(checkSession())
      }
    } catch (error: unknown) {
      console.error('Error during registration:', error)
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response
          ? error.response.data
          : 'Unknown error'
        notifyLogin(errorMessage)
        navigate('/login')
      } else {
        notifyLogin('An unknown error occurred. Please try again.')
        navigate('/login')
      }
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({errors, touched}) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
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
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default LoginForm
