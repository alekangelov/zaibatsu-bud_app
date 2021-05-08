import * as React from "react";
import TopBar from "./components/TopBar";
import { Provider } from "react-redux";
import makeStore from "./global/store";
import { PersistGate } from "redux-persist/integration/react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ToastContainer, cssTransition } from "react-toastify";
import CharacterSelect from "./components/CharacterSelect";
import AutoHideScrollbar from "./components/AutoHiddenScrollbar";
import CharacterOverview from "./components/Character";
import NewEditCombo from "./components/Combo";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";
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
  console.log(store);
  return (
    <HashRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={cssTransition({
          enter: "fade-in-bottom",
          exit: "fade-out",
        })}
      />
      <div className="App">
        <TopBar />
      </div>
      <Provider store={store}>
        <div className="router-root">
          {/* <PersistGate loading={null} persistor={persistor}> */}
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
          {/* </PersistGate> */}
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
