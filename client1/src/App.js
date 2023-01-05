import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";

// helper functions and components
import Auth from "./components/auth/index";
import isLogged from "./components/helper/isLogged";

// dashboard components
// lazy loading components
// const Dashboard = React.lazy(() => import("./components/dashboard/index"));
// const Profile = React.lazy(() => import("./components/dashboard/profile"));
// const Segments = React.lazy(() => import("./components/dashboard/segments"));
// const SmtpConfig = React.lazy(() => import("./components/dashboard/smtp"));
import Dashboard from "./components/dashboard/index";
import Profile from "./components/dashboard/profile";
import Segments from "./components/dashboard/segments";
import SmtpConfig from "./components/dashboard/smtp";

// compose inbox components
import Inbox from "./components/dashboard/inboxComp/inbox";
import UpdateProfile from "./components/dashboard/updateProfile";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />

          <Route
            path="/dashboard"
            element={isLogged() ? <Dashboard /> : <Auth />}
          />

          <Route
            path="/dashboard/profile"
            element={isLogged() ? <Profile /> : <Auth />}
          />
          <Route
            path="/updateProfile"
            element={isLogged() ? <UpdateProfile /> : <Auth />}
          />

          <Route
            path="/dashboard/segments"
            element={isLogged() ? <Segments /> : <Auth />}
          />

          <Route
            path="/dashboard/smtpconfig"
            element={isLogged() ? <SmtpConfig /> : <Auth />}
          />

          <Route
            path="/dashboard/inbox"
            element={isLogged() ? <Inbox /> : <Auth />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
