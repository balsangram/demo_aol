import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
<<<<<<< HEAD

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
=======
import authReducer from "./authSlice"

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    auth: authReducer,
>>>>>>> 6a0b4c9e69ef0c92143a74e5066c1bbee222661c
});

export default configureStore({
    reducer: rootReducer,
<<<<<<< HEAD
=======
    
>>>>>>> 6a0b4c9e69ef0c92143a74e5066c1bbee222661c
});

export type IRootState = ReturnType<typeof rootReducer>;
