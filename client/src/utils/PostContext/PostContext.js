import  {createContext} from 'react';

const PostContext = createContext({
  posts: [],
  post: {},
  title: '',
  description: '',
  difficulty: '',
  totalTime: '',
  imageLinks: '',
  handleCreateNewPost: () => {},
  handleInputChange: () => {},
  handleUpdatePost: () => {},
  handleAddToPost: () => {},
  handleRemoveFromPost: () => {}
});

export default PostContext;
