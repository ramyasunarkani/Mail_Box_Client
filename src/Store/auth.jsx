import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  token: localStorage.getItem('mtoken'),
  userLogged: !!localStorage.getItem('mtoken'),
  userName: localStorage.getItem('userName') || '', 
  userEmail: localStorage.getItem('userEmail') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      const { token, name, email } = action.payload;
      state.token = token;
      state.userLogged = !!token;
      state.userName = name || '';
      state.userEmail = email || '';

      localStorage.setItem('mtoken', token);
      localStorage.setItem('userName', name || '');
      localStorage.setItem('userEmail', email || '');
    },
    logout(state) {
      state.token = null;
      state.userLogged = false;
      state.userName = '';
      state.userEmail = '';
      
      localStorage.removeItem('utoken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
