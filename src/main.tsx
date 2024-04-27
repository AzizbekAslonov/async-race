import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import GarageProvider from "./app/features/garage/context/GarageProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GarageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GarageProvider>
  </Provider>
);
