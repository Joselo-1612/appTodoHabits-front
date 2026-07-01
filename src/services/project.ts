import { clientAuth } from "../config/clientAxios";
import { ProjectRegisterJson } from "../interfaces/Project";

const BASE_PATH_PROJECT = 'project';
const BASE_PATH_PROJECT_GROUP = 'project-group';

export const projectsCreateRequest = async (dataProject: ProjectRegisterJson) => {
    return  await clientAuth.post(`${BASE_PATH_PROJECT}/create`, dataProject);
}

export const projectsGroupListRequest = async () => {
    return  await clientAuth.get(`${BASE_PATH_PROJECT_GROUP}/list`);
}
