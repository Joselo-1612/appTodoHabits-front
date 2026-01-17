import { clientAxios } from "../config/clientAxios";
import { LoginPageProps } from "../interfaces/Auth";

export const loginRequest = (user:LoginPageProps) => {
    return clientAxios.post("/login", user);
}