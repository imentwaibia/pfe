import { Route, BrowserRouter } from "react-router-dom";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import React from "react";
import SignupPage from "views/signupPage/signupPage";
import ListEnfant from "views/listEnfants.js/listEnfant";
import AjoutEnfant from "views/listEnfants.js/ajoutEnfant";
import ListParent from "views/parents/list-parent";
import UpdateEnfant from "views/listEnfants.js/update-enfant";
import ListEnfantJardin from "views/listEnfants.js/listEnfantJardin";
import ListeActivity from "views/activity/liste-activity";
import AjoutActivity from "views/activity/ajoutActivity";
import UpdateActivity from "views/activity/update-activite";
import ListeEvenement from "views/evenement/liste-evenement";
import AjoutEvenement from "views/evenement/ajoutEvenement";
import UpdateEvenement from "views/evenement/update-evenement";
import Chat from "views/chat/chat";

function App() {
  const { userId, token, login, logout,user } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/liste-enfants/:id" component={ListEnfant} />
        <Route path="/ajout-enfants/:id" component={AjoutEnfant} />
        <Route path="/liste-parents" component={ListParent} />
        <Route path="/liste-enfant-jardin" component={ListEnfantJardin} />
        <Route path="/update-enfant/:id" component={UpdateEnfant} />
        <Route path="/liste-activity" component={ListeActivity} />
        <Route path="/ajout-activity" component={AjoutActivity} />
        <Route path="/update-activity/:id" component={UpdateActivity} />
        <Route path="/liste-evenement" component={ListeEvenement} />
        <Route path="/ajout-evenement" component={AjoutEvenement} />
        <Route path="/update-evenement/:id" component={UpdateEvenement} />
        <Route path="/message/:id" component={Chat} />
        <Route path="/" exact component={Components} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/signup-page" component={SignupPage} />
        <Route path="/" exact component={Components} />
      </React.Fragment>
    );
  }
  return (
    <Authcontext.Provider
      value={{ userId: userId, token: token, login: login, logout: logout,user:user }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </Authcontext.Provider>
  );
}

export default App;
