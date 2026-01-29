import { clientAuth, clientAxios } from "../config/clientAxios";

export const habitsListRequest = async () => {
    return  await clientAuth.get("/habit/list");
}