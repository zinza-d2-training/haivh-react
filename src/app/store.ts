import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../features/user/userSlice';
import registerReducer from '../features/user/registerSlice';
import forgotPasswordReducer from '../features/user/forgotPasswordSlice';
import updateVaccinationReducer from '../features/vaccine/sitesSlice';
import vaccineRegistrationReducer from '../features/user/vaccineRegistrationSlice';
import updateInfoReducer from '../features/user/updateInfoSlice';
import updatePasswordReducer from '../features/user/updatePasswordSlice';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer,
  updateSite: updateVaccinationReducer,
  vaccineRegistration: vaccineRegistrationReducer,
  updateInfo: updateInfoReducer,
  updatePassword: updatePasswordReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export let persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
