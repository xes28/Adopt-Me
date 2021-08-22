import { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParans";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  //Es un hook que al estar definido en la clase padre se puede utilizar en cualquiera de sus hijos
  //Ademas es global, por lo que una vez seleccionado el tema no va a modificarse ni renderizarse de nuevo
  const themeHook = useState("darkBlue");

  return (
    <ThemeContext.Provider value={themeHook}>
      <div>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
