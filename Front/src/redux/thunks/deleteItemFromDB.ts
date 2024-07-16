import axios from 'axios'
import {createAsyncThunk} from '@reduxjs/toolkit'

export const deleteItemFromServer = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('items/deleteItemFromServer', async (itemId, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:4000/items/${itemId}`)
    return itemId
  } catch (error) {
    return rejectWithValue('Error deleting item')
  }
})
