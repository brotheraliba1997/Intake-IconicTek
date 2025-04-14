import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./services/api";



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
   

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(apiSlice.middleware),
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["modal.view"],
        ignoredActions: ["modal/openModal"],
      },
    }).concat(apiSlice.middleware),
});
setupListeners(store.dispatch);
