import { apiUrl } from '../helpers/apiKeys.json';

const addNewUser = async (firebase_id) => {
  return await fetch(`${apiUrl}/api/users/add`,
    {
      method: 'POST',
      body: JSON.stringify({firebase_id})
    });
}

const getUserByFirebaseId = async (firebase_id) => {
  return await fetch(`${apiUrl}/api/users/me?firebase_id=${firebase_id}`).then(res => res.json());
}

export default { addNewUser, getUserByFirebaseId };
