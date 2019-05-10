const initialState = { };

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SEARCH_DATA':
      return {
        ...state,
        searchResults: action.payload,
        query: action.payload.query
      }
    default:
      return { ...state }
  }
}
