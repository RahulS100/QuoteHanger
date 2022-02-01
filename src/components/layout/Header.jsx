import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import classes from "./MainNavigation.module.css";

//Metrial UI
import PostAddIcon from "@mui/icons-material/PostAdd";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

//Auth Context
import AuthContext from "../../context/auth-context";

export default function Header() {
  //Auth Context Status
  const authCTX = useContext(AuthContext);

  //History Manipulation
  const history = useHistory();

  //Logout Handler
  function logout() {
    authCTX.logout();
    history.replace('/');
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <FormatQuoteIcon />
        Quotes
        <FormatQuoteIcon />
      </div>
      <nav className={classes.nav}>
        <ul>
          {authCTX.LoginState && (
            <li>
              <NavLink to="/allquote" activeClassName={classes.active}>
                All Quotes
              </NavLink>
            </li>
          )}
          {authCTX.LoginState && (
            <li>
              <NavLink to="/newquote" activeClassName={classes.active}>
                <PostAddIcon />
              </NavLink>
            </li>
          )}

         {!authCTX.LoginState &&  <li>
            <NavLink to="/login" activeClassName={classes.active}>
              SignIn
            </NavLink>
          </li>}

         {authCTX.LoginState &&  <li>
            <button className={classes.btn} onClick={logout}>
              Logout
            </button>
          </li>}
        </ul>
      </nav>
    </header>
  );
}
