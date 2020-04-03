import  {createContext} from 'react';

const PostContext = createContext({
  posts: [],
  post: {},
  postOwner: '',
  title: '',
  description: '',
  difficulty: '',
  totalTime: '',
  imageLinks: '',
  search: '',
  solutions: [],
  comments: [],
  handleViewAll: () => {},
  handleCreateNewPost: () => {},
  handleInputChange: () => {},
  handleUpdatePost: () => {},
  handleAddToPost: () => {},
  handleRemoveFromPost: () => {},
  handleSearch: () => {},
  handleViewPost: () => {},
  handleGoToPost: () => {},
  handleAddSolution: () => {}
});

export default PostContext;
