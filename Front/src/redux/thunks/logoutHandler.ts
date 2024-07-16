import axios from 'axios'
import {createAsyncThunk} from '@reduxjs/toolkit'

const logoutHandler = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/logout',
        {},
        {withCredentials: true}
      )
      if (response.status === 200) {
        console.log('успешно разлогинен')
        return true
      } else {
        throw new Error('Failed to log out')
      }
    } catch (error) {
      return rejectWithValue('Logout failed')
    }
  }
)

export default logoutHandler
