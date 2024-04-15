import axios from "axios";

export const getApi = async (limit,filter) => {

  let url = "https://arba-s1ny.onrender.com/products";
  if (filter) {
    url = `https://arba-s1ny.onrender.com/products?categoryId=${filter}`;
  }else if (limit) {
    url = `https://arba-s1ny.onrender.com/products?limit=8`;
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
