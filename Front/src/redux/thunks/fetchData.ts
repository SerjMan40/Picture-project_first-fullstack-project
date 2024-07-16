import axios from 'axios'
import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk('items/fetchData', async () => {
  const response = await axios.get('http://localhost:4000/items')
  return response.data
})