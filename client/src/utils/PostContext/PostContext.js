import  {createContext} from 'react';

const PostContext = createContext({
  posts: [],
  post: {},
  title: '',
  description: '',
  difficulty: '',
  totalTime: '',
  imageLinks: '',
  handleViewAll: () => {},
  handleCreateNewPost: () => {},
  handleInputChange: () => {},
  handleUpdatePost: () => {},
  handleAddToPost: () => {},
  handleRemoveFromPost: () => {}
});

export default PostContext;
