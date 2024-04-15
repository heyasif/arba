export const initState = {
  loading: false,
  err: false,
  res: {},
};

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "LOADING": {
      return { ...state, loading: true };
    }
    case "SUCCESS": {
      return { ...state, loading: false, res: action?.payload };
    }
    case "ERROR": {
      return { ...state, loading: false, err: true };
    }
    default:
      throw new Error("invalid action type");
  }
};