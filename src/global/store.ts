import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
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

const persistedReducer = persistReducer(persistConfig as any, mainReducer);

const makeStore = () => {
  const enhancer = composeWithDevTools(
    applyMiddleware(...[])
    // other store enhancers if any
  );
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
};

export default makeStore;
