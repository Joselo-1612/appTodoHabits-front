import { clientAuth } from "../config/clientAxios";

export const habitsListRequest = async () => {
    return  await clientAuth.get("/habit/list");
}

export const habitsCompleteListRequest = async () => {
    return  await clientAuth.get("/habit-complete/list");
}
