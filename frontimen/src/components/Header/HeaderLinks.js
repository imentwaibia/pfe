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
            to="/"
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

      <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
