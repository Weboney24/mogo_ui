import { configureStore } from "@reduxjs/toolkit";
import roleSlice from "./roleSlice";
import UserReducer from "./userSlice";
import cardReducer from "./cartSlice";
import ListReducer from "./favSlice";
import NotificationReducer from "./notificationslice";
import LoginMarra from "./logintriger";

export const store = configureStore({
  reducer: {
    role: roleSlice,
    product: UserReducer,
    card_slice: cardReducer,
    list_slice: ListReducer,
    notification_slice: NotificationReducer,
    login_slice: LoginMarra,
  },
});
