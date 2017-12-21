import history from '../history';

const defaultState = {
  history,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
