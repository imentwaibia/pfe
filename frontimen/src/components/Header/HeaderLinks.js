/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { Authcontext } from "../../context/auth-context";
import { useContext } from "react";
import "./Header.css"

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const auth = useContext(Authcontext);
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button color="transparent" target="_blank">
          <Link
            to="/"
            className={classes.navLink}
            style={{ marginTop: "-17px" }}
          >
            Acceuil
            
          </Link>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button color="transparent" target="_blank">
          <Link
            to="/ListJardin"
            className={classes.navLink}
            style={{ marginTop: "-17px" }}
          >
           Liste jardins 
          </Link>
        </Button>
      </ListItem>
      {!auth.token && (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Connexion"
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={Apps}
            dropdownList={[
              <Link to="/login-page" className={classes.dropdownLink}>
               Accées jardin
              </Link>,
              
              <Link to="/login" className={classes.dropdownLink}>
              Accées admin
             </Link>,
            ]}
          />
        </ListItem>
        
      )}

      {auth.token && (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Menu"
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={Apps}
            dropdownList={[
              <Link to="/liste-parents" className={classes.dropdownLink}>
                Liste Parents
              </Link>,
              <Link to="/liste-enfant-jardin" className={classes.dropdownLink}>
                Liste Enfants
              </Link>,
              <Link to="/liste-activity" className={classes.dropdownLink}>
                Mes Activités
              </Link>,
              <Link to="/liste-evenement" className={classes.dropdownLink}>
                Mes Evenement
              </Link>,
              <Link to="/profile-page" className={classes.dropdownLink}>
                Mon profile
              </Link>,
              <Link
                className={classes.dropdownLink}
                onClick={() => {
                  auth.logout();
                }}
              >
                Déconnexion
              </Link>,
            ]}
          />

      
          </ListItem>
      )}
{auth.token && (
      <ListItem className={classes.listItem}>
        <Tooltip
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            className={classes.navLink}
          >
            <span class="material-icons">
                notifications
            </span>
            <span class="icon-button__badge"> 2</span>
          </Button>
        </Tooltip>
      </ListItem>
       )}
    </List>
  );
}
