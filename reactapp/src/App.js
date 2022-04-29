import React from "react";
import "./App.css";
import ScreenHome from "./ScreenHome";
import ScreenMyArticles from "./ScreenMyArticles";
import ScreenSource from "./ScreenSource";
import ScreenArticlesBySource from "./ScreenArticlesBySource";
import ScreenUser from "./ScreenUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import myArticles from "./reducers/articles.reducer";
import token from "./reducers/token.reducer";
import language from "./reducers/language.reducer";
import username from "./reducers/user.reducer";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

const store = createStore(
  combineReducers({ myArticles, token, language, username })
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ScreenHome} />
          <Route path="/screensource" component={ScreenSource} />
          <Route
            path="/screenarticlesbysource/:id"
            component={ScreenArticlesBySource}
          />
          <Route path="/screenmyarticles" component={ScreenMyArticles} />
          <Route path="/screenuser" component={ScreenUser} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
