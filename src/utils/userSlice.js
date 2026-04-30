import { createSlice } from "@reduxjs/toolkit";
import ConnectionRequest from "../Components/ConnectionRequest";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    connections: [],
    connectionRequestList: [],
  },
  reducers: {
    addUser: (state, action) => {
      return { ...state, user: { ...state.user, ...action.payload } };
    },
    removeUser: (state, action) => {
      return { user: null, connections: null };
    },
    editUser: (state, action) => {
      return { ...state, user: { ...state.user, ...action.payload } };
    },
    addConnection: (state, action) => {
      return {
        ...state,
        connections: [...action.payload],
      };
    },
    addConnectionRequest: (state, action) => {
      return {
        ...state,
        connectionRequestList: [...action.payload],
      };
    },
    updateConnectionRequest: (state, action) => {
      const data = state.connectionRequestList.filter(
        (i) => i._id !== action.payload,
      );
      return {
        ...state,
        connectionRequestList: data,
      };
    },
  },
});

export const {
  addUser,
  removeUser,
  editUser,
  addConnection,
  addConnectionRequest,
  updateConnectionRequest,
} = userSlice.actions;
export default userSlice.reducer;
