import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { mainReducer } from "./reducers";
import electronStore from "./storageHelpers/electronStore";
import { omitCharactersFromObject } from "../utils/common";

// import { IState } from "./reducers/mainReducer";
const persistConfig = {
  storage: electronStore,
  key: "root",
  version: 2,
  migrate: (state: any) => {
    return Promise.resolve(omitCharactersFromObject(state));
  },
};

const persistedReducer = persistReducer<any, any>(
  persistConfig as any,
  mainReducer as any
);

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const makeStore = () => {
  const enhancer = composeEnhancers(
    applyMiddleware(...[])
    // other store enhancers if any
  );
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
};

export default makeStore;
