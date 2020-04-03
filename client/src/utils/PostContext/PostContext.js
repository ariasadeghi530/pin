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
  newSolution: {},
  newComment: {},
  edit: false,
  addSol: false,
  desc: '',
  gh: '',
  deployed: '',
  handleViewAll: () => {},
  handleCreateNewPost: () => {},
  handleInputChange: () => {},
  handleUpdatePost: () => {},
  handleAddToPost: () => {},
  handleRemoveFromPost: () => {},
  handleSearch: () => {},
  handleViewPost: () => {},
  handleGoToPost: () => {},
  handleAddSolution: () => {},
  handleToggleSolution: () => {}
});

export default PostContext;
