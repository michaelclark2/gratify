import { apiUrl } from '../helpers/apiKeys.json';

const addNewUser = async (firebase_id) => {
  return await fetch(`${apiUrl}/api/users/add`,
    {
      method: 'POST',
      body: JSON.stringify({firebase_id})
    });
}

export default { addNewUser };
