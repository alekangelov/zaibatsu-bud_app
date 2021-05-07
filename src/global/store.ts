import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer, PersistState } from "redux-persist";
import { mainReducer } from "./reducers";
import electronStore from "./storageHelpers/electronStore";
import { makeID, omitCharactersFromObject } from "../utils/common";
import { composeWithDevTools } from "redux-devtools-extension";
import { IState } from "./reducers/mainReducerTypes";

// import { IState } from "./reducers/mainReducer";

interface MigrationState extends IState {
  _persist: PersistState;
}

const persistConfig = {
  storage: electronStore,
  key: "root",
  version: 2,
  migrate: (state: MigrationState) => {
    const newState = {
      combos: state.combos.map((e) => ({ ...e })),
    };

    return Promise.resolve(newState);
  },
};

const persistedReducer = persistReducer<any, any>(
  persistConfig as any,
  mainReducer as any
);

const makeStore = () => {
  const store = createStore(persistedReducer, composeWithDevTools());
  const persistor = persistStore(store);
  return { store, persistor };
};

export default makeStore;
