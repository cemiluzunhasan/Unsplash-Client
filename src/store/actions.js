import axios from 'axios';
import constants from '../helpers/constants';

export default {
  searchData: ({ query, collectionId, page = 1 }) => {
    return dispatch => {
      axios.get(`${constants.BASE_ADDRESS}/search/photos/?client_id=${constants.API_ACCESS_KEY}&query=${query}&collections=${collectionId}&page=${page}`)
        .then(response => {
          dispatch({ type: 'SEARCH_DATA', payload: {...response.data, query: query }});
        })
        .catch((err) => {
          dispatch({ type: 'SEARCH_DATA', payload: err.response });
        });
    }
  }
}
