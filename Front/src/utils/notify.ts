import {toast} from 'react-toastify'

export const notifyDelete = () => {
  toast.error('You deleted item !!!', {
    position: 'top-left',
    autoClose: 1500,
  })
}
export const notifyAllDelete = () => {
  toast.error('You Deleted All Item !!!', {
    position: 'top-left',
    autoClose: 2300,
  })
}
export const notifyUserExists = (errorMessages: string) => {
  toast.error(errorMessages, {
    position: 'top-center',
    autoClose: 4000,
  })
}

export const notifySuccess = () => {
  toast.success('Thank you for your choice !!!', {
    position: 'top-right',
    autoClose: 1500,
  })
}
export const notifyLogin = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: 'top-center',
    autoClose: 4000,
  })
}
