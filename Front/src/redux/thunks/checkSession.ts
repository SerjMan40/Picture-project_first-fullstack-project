import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { User } from '../../types/interfaces'

 const checkSession = createAsyncThunk<
  { isAuthenticated: boolean; user?: User },
  void,
  { rejectValue: string }
>('items/checkSession', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/check-session', {
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log('Session check successful:', response.data);
      return response.data;
    } else {
      console.log('No active session');
      return rejectWithValue('No active session');
    }
  } catch (error) {
    console.log('Session check error');
    return rejectWithValue('No active session');
  }
});

export default checkSession