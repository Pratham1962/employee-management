import axios from "axios";

export const loginUser = async (formData) => {
  try {
    const response = await axios.post("https://reqres.in/api/login", formData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};



