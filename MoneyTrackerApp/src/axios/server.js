import axios from 'axios';

export default axios.create({
  baseURL: 'https://fierce-fjord-04763.herokuapp.com/graphql',
});
