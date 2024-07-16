import axios from 'axios'
import { setLoginData, setRegistrationData} from '../redux/slices/itemsSlices';
import checkSession from '../redux/thunks/checkSession';

 const handleLogin = async (values, dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:4000/login',
      values,
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log('успех по логину');
      dispatch(setLoginData(true));
      dispatch(setRegistrationData({ isRegistering: true }));
      dispatch(checkSession());
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
  }
};

export default handleLogin