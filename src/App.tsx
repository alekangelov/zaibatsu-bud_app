import * as React from "react";
import TopBar from "./components/TopBar";
import "./styles/index.scss";
import { Provider } from "react-redux";
import makeStore from "./global/store";
import { PersistGate } from "redux-persist/integration/react";
import { HashRouter, Route, Switch } from "react-router-dom";
import CharacterSelect from "./components/CharacterSelect";
import AutoHideScrollbar from "./components/AutoHiddenScrollbar";
// import { useTransition, a } from "@react-spring/web";
import CharacterOverview from "./components/Character";
import NewEditCombo from "./components/Combo";

const { store, persistor } = makeStore();

const AnimatedSwitch: React.FC = ({ children }) => {
  // const location = useLocation();
  // const transitions = useTransition(location, {
  //   key: (location: Location) => location.pathname,
  //   initial: null,
  //   from: {
  //     opacity: 0,
  //     position: false,
  //   },
  //   enter: {
  //     opacity: 1,
  //     position: true,
  //   },
  //   leave: {
  //     opacity: 0,
  //     position: false,
  //   },
  // });
  return <Switch>{children}</Switch>;
};

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <TopBar />
          </div>
          <div className="router-root">
            <AutoHideScrollbar>
              <AnimatedSwitch>
                <Route path="/" exact>
                  <CharacterSelect />
                </Route>
                <Route path="/character/:id" exact>
                  <CharacterOverview />
                </Route>
                <Route path="/combo/new/:character/:combo?" exact>
                  <NewEditCombo />
                </Route>
              </AnimatedSwitch>
            </AutoHideScrollbar>
          </div>
        </PersistGate>
      </HashRouter>
    </Provider>
  );
}

export default App;
