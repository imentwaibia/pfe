import { useState, useCallback, useEffect } from "react";
export const IsAuth= () => {
  const [AdminToken, setAdminToken] = useState(false);
  const [AdminId, setAdminId] = useState(false);
  const [admin, setAdmin] = useState(false);


  const AdminLogin = useCallback((uid, token,admin) => {
    setAdminToken(token);
    setAdminId(uid);
    setAdmin(admin)

    localStorage.setItem(
      "AdminData",
      JSON.stringify({
        AdminId: uid,
        AdminToken: token,
        admin:admin

      })
    );
  }, []);

  const AdminLogout = useCallback(() => {
    setAdminId(null);
    setAdminToken(null);
    setAdmin(null);
    localStorage.removeItem("AdminData");
  }, []);



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("AdminData"));
    if (
      storedData &&
      storedData.AdminToken 
    ) {
        AdminLogin(
        storedData.AdminId,
        storedData.AdminToken,
        storedData.Admin

      );
    }
  }, [AdminLogin]);

  return { AdminToken, AdminLogin, AdminLogout, AdminId, admin};
};