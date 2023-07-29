import axios from "axios";

const base = process.env.REACT_APP_BASE_URL;
const blogURL = base + process.env.REACT_APP_BLOG_URL;

export const getBlog = async (blogId) => {
  try {
    const url = `${blogURL}/${blogId}`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogs = async () => {
  try {
    const response = await axios.get();
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
