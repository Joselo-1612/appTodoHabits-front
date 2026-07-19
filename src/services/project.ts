import { clientAuth } from "../config/clientAxios";
import { Activity, ProjectRegisterJson, Section } from "../interfaces/Project";

const BASE_PATH_PROJECT = 'project';
const BASE_PATH_PROJECT_GROUP = 'project-group';
const BASE_PATH_ACTIVITY = 'activity';

export const projectsCreateRequest = async (dataProject: ProjectRegisterJson) => {
    return  await clientAuth.post(`${BASE_PATH_PROJECT}/create`, dataProject);
}

export const projectsGroupListRequest = async () => {
    return  await clientAuth.get(`${BASE_PATH_PROJECT_GROUP}/list`);
}

export const projectListRequest = async () => {
    return await clientAuth.get(`${BASE_PATH_PROJECT}/list`);
}

export const projectDetailRequest = async (projectId: string) => {
    return await clientAuth.get(`${BASE_PATH_PROJECT}/detail/${projectId}`);
}

export const sectionActivityRequest = async (section: Section) => {
    return await clientAuth.post(`${BASE_PATH_ACTIVITY}/section-activity`, section);
}

export const activityRequest = async (activity: Activity) => {
    return await clientAuth.post(`${BASE_PATH_ACTIVITY}/create`, activity);
}

export const updateActivitySectionRequest = async (sectionId: number, activityId: number) => {
    return await clientAuth.put(`${BASE_PATH_ACTIVITY}/activity-by-section/${sectionId}/${activityId}`);
}
