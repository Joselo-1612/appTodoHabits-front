import { clientAxios } from "../config/clientAxios";
import { LoginPageProps } from "../interfaces/Auth";

export const loginRequest = async (user:LoginPageProps) => {
    const responseAuth = await clientAxios.post("/login", user);
    localStorage.setItem("token", responseAuth.data.data.token);
    return responseAuth;
}

/*
    const responseAuth = await loginRequest(sesion);
    console.log("valor de responseAuth", responseAuth.data.data.token);
    
    localStorage.setItem("token", responseAuth.data.data.token);
    navigate("/habits");
*/