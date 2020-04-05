import  {createContext} from 'react';

const PostContext = createContext({
  posts: [],
  post: {},
  postOwner: '',
  posterId: '',
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
  handleRemSolution: () => {},
  handleToggleSolution: () => {},
  handleEditIdea: () => {},
  handleDeleteIdea: () => {}
});

export default PostContext;
