import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer, PersistState } from "redux-persist";
import { characterReducer, comboReducer } from "./reducers";
import electronStore from "./storageHelpers/electronStore";
import { composeWithDevTools } from "redux-devtools-extension";
import { IState } from "./reducers/mainReducerTypes";

interface MigrationState extends IState {
  _persist: PersistState;
}

const persistConfig = {
  storage: electronStore,
  key: "root",
  version: 2,
  migrate: (state: MigrationState) => {
    console.log(state);
    return Promise.resolve({
      ...state,
      combos: [...state.combos],
    });
  },
};

const combinedReducers = combineReducers({
  combos: comboReducer,
  characters: characterReducer,
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
