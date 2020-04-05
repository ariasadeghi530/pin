import axios from 'axios';

const Post = {
  home: () => axios.get('/api/posts', { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  search: search => axios.get(`/api/posts/search/${search}`, { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  idea: id => axios.get(`/api/posts/${id}`, { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  create: post => axios.post('/api/posts', post, { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  update: (id, updates) => axios.put(`/api/posts/${id}`, updates, { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  addSolution: (id, solution) => axios.put(`/api/posts/${id}/solutions`, solution, { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  addComment: (id, comment) => axios.put(`/api/posts/${id}/comments`, comment, { headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  remSolution: (id, solution) => axios.delete(`/api/posts/${id}/solutions`,{ data: {solution}, headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}}),
  remComment: (id, comment) => axios.delete(`/api/posts/${id}/comments`,{ comment, headers: {"Authorization": "Bearer " + (localStorage.getItem('jwt'))}})
}

export default Post;