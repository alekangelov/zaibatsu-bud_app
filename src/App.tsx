import * as React from "react";
import TopBar from "./components/TopBar";
import { Provider } from "react-redux";
import makeStore from "./global/store";
import { PersistGate } from "redux-persist/integration/react";
import { HashRouter } from "react-router-dom";
import { ToastContainer, cssTransition } from "react-toastify";
import AutoHideScrollbar from "./components/AutoHiddenScrollbar";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";
import { AnimatedSwitch } from "./routes";
import { RouterRoot } from "./components/RouterRoot";
const { store, persistor } = makeStore();

function App() {
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
        <RouterRoot>
          <PersistGate loading={null} persistor={persistor}>
            <AutoHideScrollbar>
              <AnimatedSwitch />
            </AutoHideScrollbar>
          </PersistGate>
        </RouterRoot>
      </Provider>
    </HashRouter>
  );
}

export default App;
