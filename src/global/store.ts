import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer, PersistState } from "redux-persist";
import { aboutReducer, characterReducer, comboReducer } from "./reducers";
import electronStore from "./storageHelpers/electronStore";
import { composeWithDevTools } from "redux-devtools-extension";
import { IState } from "./reducers/mainReducerTypes";
import characters from "../data/characters";

interface MigrationState extends IState {
  _persist: PersistState;
}

const persistConfig = {
  storage: electronStore,
  key: "root",
  version: 2,
  migrate: (state: MigrationState) => {
    return Promise.resolve({
      ...state,
      characters: characters,
      combos: [...state.combos],
    });
  },
};

const combinedReducers = combineReducers({
  combos: comboReducer,
  characters: characterReducer,
  about: aboutReducer,
});

const persistedReducer = persistReducer<any, any>(
  persistConfig as any,
  combinedReducers as any
);

const makeStore = () => {
  const store = createStore(persistedReducer, composeWithDevTools());
  const persistor = persistStore(store);
  return { store, persistor };
};

export default makeStore;
