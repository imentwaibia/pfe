import { createContext } from "react";

export const Authcontext = createContext({
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
  AdminId: null,
  AdminToken: null,
  AdminLogin: () => {},
  AdminLogout: () => {}

});
