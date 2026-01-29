import { useEffect, useState } from "react";

export const useSession = () => {
  const sessionToken = localStorage.getItem("token") ?? "";
//   const [user, setUser] = useState<PersonUser>();
  const [token, setToken] = useState<string>("");

  console.log("valor de sessionToken", sessionToken);
  

  useEffect(() => {
    // if (sessionUser) {
    //   setUser(JSON.parse(sessionUser));
    // }
    setToken(sessionToken);
  }, []);

  return {
    // user,
    token,
  };
};