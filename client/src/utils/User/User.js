import axios from 'axios';

const User = {
  login: user => axios.post('/api/users/login', user),
  register: userInfo => axios.post('/api/users/register', userInfo),
  profile: () => axios.get('/api/users'),
  update: updates => axios.put('/api/users', updates),
  pin: id => axios.put(`api/users/${id}`),
  unpin: id => axios.delete(`api/users/${id}`),
  delete: () => axios.delete('api/users')
}

export default User;