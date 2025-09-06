import { createSlice } from "@reduxjs/toolkit";

// Safe JSON parse helper
const safeParse = (item) => {
  try {
    if (!item || item === "undefined") return null;
    return JSON.parse(item);
  } catch {
    return null;
  }
};

const initialState = {
  token: safeParse(sessionStorage.getItem("token")),
  user: safeParse(localStorage.getItem("user")),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // save consistently
      sessionStorage.setItem("token", JSON.stringify(action.payload));
    },
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setToken, setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;

