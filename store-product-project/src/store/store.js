import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../pages/counter/counterSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cartReducer,
    },
});

export default store;