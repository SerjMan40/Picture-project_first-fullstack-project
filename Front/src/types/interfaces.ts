import {Focused} from './typs'

export interface User {
  _id: string
  username: string
  firstName: string
  lastName: string
  email: string
}

export interface GeneralState {
  data: ArrOfObj[]
  registrationData: RegisterFormValues
  isLogin: boolean
  countChanged: number
  isBuy: boolean
  user: User | null
}

export interface ProtectedRouteProps {
  children: React.ReactNode
  redirectPath?: string
}
export interface ItemProps {
  price: number
  img: string
  author: string
  itemId: string
  isChanged?: boolean
  deleteItem?: any
}

export interface LoginFormValues {
  email: string
  password: string
}

export interface NavLinkItem {
  path: string
  label: string
}

export interface SearchByAuthorProps {
  searchAuthor: (value: string) => void
  deleteSearchAuthor: () => void
  value: string
}

export interface ArrOfObj {
  itemId: string
  url: string
  author: string
  uuId: string
  isChanged: boolean
}

export interface RegisterFormValues {
  isRegistering: boolean
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

export interface ExistingObject {
  id: string
  url: string
  author: string
}

export interface PaymentFormState {
  number: string
  expiry: string
  cvc: string
  name: string
  focus: Focused | undefined
}
