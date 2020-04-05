import axios from 'axios';

const User = {
  login: user => axios.post('/api/users/login', user),
  register: userInfo => axios.post('/api/users/register', userInfo),
  profile: () => axios.get('/api/users', { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  update: updates => axios.put('/api/users', updates, { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  pin: id => axios.put(`/api/users/${id}`, {}, { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  unpin: id => axios.delete(`/api/users/${id}`, { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  delete: () => axios.delete('/api/users', { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}})
}

export default User;