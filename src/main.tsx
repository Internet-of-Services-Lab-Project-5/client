import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SessionProvider } from "./contexts/SessionContext.tsx";
import { AirlineProvider } from "./contexts/AirlineContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SessionProvider>
    <AirlineProvider>
      <App />
    </AirlineProvider>
  </SessionProvider>
);
