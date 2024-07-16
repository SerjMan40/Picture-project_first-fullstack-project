import {useState} from 'react'
import {Formik, Form, Field} from 'formik'
import {TextField, Button, Grid} from '@mui/material'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './PaymentForm.css'

import {PaymentFormState} from '../../types/interfaces'
import {Focused} from '../../types/typs'
import {
  cancelAllAdditionItem,
  isBuyItem,
  resetCountChangedItem,
} from '../../redux/slices/itemsSlices'

const PaymentForm = () => {
  const [state, setState] = useState<PaymentFormState>({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: undefined,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    let formattedValue = value
    switch (name) {
      case 'number':
        formattedValue = value.replace(/\D/g, '').substring(0, 16)
        formattedValue = formattedValue.replace(/(.{4})/g, '$1 ').trim()
        break
      case 'expiry':
        formattedValue = value.replace(/\D/g, '').substring(0, 4)
        if (formattedValue.length >= 3) {
          formattedValue = `${formattedValue.slice(
            0,
            2
          )}/${formattedValue.slice(2, 4)}`
        }
        break
      case 'cvc':
        formattedValue = value.replace(/\D/g, '')
        formattedValue = formattedValue.substring(0, 4)
        break
    }
    setState((prev) => ({...prev, [name]: formattedValue}))
  }

  const handleInputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const focus: Focused = e.target.name as Focused
    setState((prev) => ({...prev, focus}))
  }

  return (
    <div className="card-container">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Formik
            initialValues={{
              number: '',
              expiry: '',
              cvc: '',
              name: '',
            }}
            onSubmit={(values, {setSubmitting}) => {
              setTimeout(() => {
                setSubmitting(false)
                dispatch(isBuyItem(false))
                dispatch(resetCountChangedItem())
                dispatch(cancelAllAdditionItem())
                navigate('/')
              }, 400)
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} className="form-grid-item">
                  <Field
                    as={TextField}
                    fullWidth
                    type="text"
                    label="Card Number"
                    name="number"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="form-grid-item">
                  <Field
                    as={TextField}
                    fullWidth
                    type="text"
                    label="Name"
                    name="name"
                    placeholder="Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="form-grid-item">
                  <Field
                    as={TextField}
                    fullWidth
                    type="text"
                    label="MM/YY"
                    name="expiry"
                    placeholder="MM/YY"
                    value={state.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="form-grid-item">
                  <Field
                    as={TextField}
                    fullWidth
                    type="text"
                    label="CVC"
                    name="cvc"
                    placeholder="CVC"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={() => dispatch(isBuyItem(false))}
                        fullWidth
                        variant="contained"
                        color="secondary"
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </div>
  )
}

export default PaymentForm
