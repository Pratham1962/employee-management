import axios from 'axios';

export const fetchUserDetails = async (token, page = 1, perPage = 5) => {
  try {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const updateUserDetails = async (id, userData) => {
  try {
    const response = await axios.put(`https://reqres.in/api/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`https://reqres.in/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
