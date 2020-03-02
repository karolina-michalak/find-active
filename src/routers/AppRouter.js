import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Showcase from "../components/Showcase";
import List from "../components/list/List";
import Faq from "../components/Faq";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsAndConditions from "../components/TermsAndConditions";
import ListElementPage from '../components/list/ListElementPage'

const AppRouter = () => (
    <BrowserRouter>
    <Switch>
      <Route path="/" component={Showcase} exact />
      <Route path="/list" component={List} />
      <Route path="/product/:id" component={ListElementPage} />
      <Route path="/faq" component={Faq} exact />
      <Route path="/privacy" component={PrivacyPolicy} exact />
      <Route path="/terms" component={TermsAndConditions} exact />
    </Switch>
    </BrowserRouter>
);

export default AppRouter;
