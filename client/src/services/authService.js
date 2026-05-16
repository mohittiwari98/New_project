import { STORAGE_KEYS } from "../utils/constants";
import mockStore from "./mockStore";

export const authService = {
  /* LOGIN (mock) */
  login: async (email, password) => {
    const { token, user } = await mockStore.auth.login({ email, password });
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { user, token };
  },

  /* REGISTER (mock) */
  register: async (userData) => {
    // userData from Register page should include: email, password, name, phone, role, address
    const { token, user } = await mockStore.auth.register(userData);
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { user, token };
  },

  /* LOGOUT */
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  /* GET CURRENT USER */
  getCurrentUser: () => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  /* CHECK AUTH */
  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  },
};

export default authService;

