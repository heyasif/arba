import axios from "axios";

export const getApi = async (limit,filter) => {

  let url = "https://smoggy-blazer-bass.cyclic.app/products";
  if (filter) {
    url = `https://smoggy-blazer-bass.cyclic.app/products?categoryId=${filter}`;
  }else if (limit) {
    url = `https://smoggy-blazer-bass.cyclic.app/products?limit=8`;
  }
  try {
    console.log(url);
    const response = await axios.get(url);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
