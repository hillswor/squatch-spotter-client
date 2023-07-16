import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import MyAccount from "./MyAccount";
import Sighting from "./Sighting";
import ReportSighting from "./ReportSighting";
import EditSighting from "./EditSighting";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = () => {
    fetch("https://squatch-spotter-server.onrender.com/check-session")
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setUser(data);
          setLoggedIn(true);
        } else {
          setUser(null);
          setLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error checking user session: ", error);
      });
  };

  const handleLogin = (user) => {
    setUser(user);
    setLoggedIn(true);
    history.push(`/users/${user.id}`);
  };

  const handleLogout = () => {
    fetch("https://squatch-spotter-server.onrender.com/logout", {
      method: "DELETE",
    })
      .then(() => {
        setUser(null);
        setLoggedIn(false);
        history.push("/");
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <div>
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
      <Switch>
        <Route
          exact
          path="/signup"
          render={(props) => <Signup {...props} onLogin={handleLogin} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} onLogin={handleLogin} />}
        />
        <Route
          path="/users/:id"
          render={(props) => <MyAccount {...props} user={user} />}
        />
        <Route
          path="/sightings/:id/edit"
          render={(props) => (
            <EditSighting {...props} loggedIn={loggedIn} user={user} />
          )}
        />
        <Route
          path="/sightings/:id"
          render={(props) => (
            <Sighting {...props} loggedIn={loggedIn} user={user} />
          )}
        />
        <Route
          path="/report-sighting"
          render={(props) => (
            <ReportSighting {...props} loggedIn={loggedIn} user={user} />
          )}
        />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
