import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Create from "./components/Create";
import Layout from "./components/Layout";
import Notes from "./components/Notes";

export default function MaterialApp() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/create" component={Create} />
            <Route path="/" component={Notes} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}
