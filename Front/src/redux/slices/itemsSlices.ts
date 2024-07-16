import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ArrOfObj, GeneralState} from '../../types/interfaces'
import { deleteItemFromServer } from '../thunks/deleteItemFromDB'
import { fetchData } from '../thunks/fetchData'
import checkSession from '../thunks/checkSession'

export const registrationData = {
  isRegistering: false,
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
}

export const initialState: GeneralState = {
  data: [],
  registrationData,
  isLogin: false,
  countChanged: 0,
  isBuy: false,
  user: null
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.isLogin = action.payload
    },
    isLogOut: (state) => {
      state.isLogin = false
    },
    isLogIn: (state) => {
      state.isLogin = true
    },
    setRegistrationData: (state, action) => {
      state.registrationData = action.payload
      console.log('registretion', state.registrationData.isRegistering)
    },
    updeteItemList: (state, action: PayloadAction<ArrOfObj[]>) => {
      state.data = action.payload
    },
    additionItem: (state, action: PayloadAction<string>) => {
      state.data = state.data.map((item) =>
        item.itemId === action.payload
          ? {...item, isChanged: !item.isChanged}
          : item
      )
    },
    isBuyItem: (state, action: PayloadAction<boolean>) => {
      state.isBuy = action.payload
    },
    cancelAllAdditionItem: (state) => {
      state.data = state.data.map((item) =>
        item.isChanged ? {...item, isChanged: false} : item
      )
    },
    countChangedItem: (state) => {
      state.countChanged = state.data.filter((item) => item.isChanged).length
    },
    resetCountChangedItem: (state) => {
      state.countChanged = 0
    },
    cancelSelection: (state, action: PayloadAction<string>) => {
      state.data = state.data.map((item) =>
        item.itemId === action.payload
          ? {...item, isChanged: !item.isChanged}
          : item
      )
    },
    deleteItem: (state, action) => {
      state.data = state.data.filter((item) => item.itemId !== action.payload)
    },
    deleteIAlltem: (state) => {
      state.data = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(deleteItemFromServer.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter((item) => item.itemId !== action.payload)
      })
      .addCase(checkSession.pending, (state) => {
        state.registrationData.isRegistering = true
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.isLogin = action.payload.isAuthenticated;
        if (action.payload.isAuthenticated && action.payload.user) {
          state.user = action.payload.user;
          console.log('User data updated:', state.user);
        }
      })
      .addCase(checkSession.rejected, (state) => {
        state.registrationData.isRegistering = false
        state.isLogin = false
      })
  },
})

export const {
  deleteItem,
  additionItem,
  setRegistrationData,
  setLoginData,
  deleteIAlltem,
  cancelSelection,
  countChangedItem,
  cancelAllAdditionItem,
  isBuyItem,
  resetCountChangedItem,
  isLogOut,
  isLogIn,
} = itemsSlice.actions

export default itemsSlice.reducer
