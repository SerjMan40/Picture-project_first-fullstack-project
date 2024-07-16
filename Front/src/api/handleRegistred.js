import axios from 'axios';
import { isLogIn, setRegistrationData } from '../redux/slices/itemsSlices';
import { notifyUserExists } from '../utils/notify';

export const handleRegistred = async (values, dispatch, navigate) => {
  try {
    const response = await axios.post(
      'http://localhost:4000/register',
      values
    );

    if (response.status === 200) {
      dispatch(setRegistrationData({ ...values, isRegistering: true }));
      dispatch(isLogIn());
      navigate('/');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response
        ? error.response.data
        : 'Unknown error';
      notifyUserExists(errorMessage);
      navigate('/registration');
    } else {
      notifyUserExists('An unknown error occurred. Please try again.');
      navigate('/registration');
    }
  }
};
