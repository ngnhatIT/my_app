import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/AuthSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [], // Add any transforms if needed
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['auth._persist'],
      },
    }),
});

export const persistor = persistStore(store);
console.log('Store configured with persisted state:', store.getState());
persistor.subscribe(() => {
  console.log('Persistor state updated:', localStorage.getItem('persist:root'));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;