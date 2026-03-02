import { clientAuth } from "../config/clientAxios";

const BASE_PATH_HABIT = 'habit';
const BASE_PATH_HABIT_COMPLETE = 'habit-complete';

export const habitsListRequest = async () => {
    return  await clientAuth.get(`${BASE_PATH_HABIT}/list`);
}

export const habitsCompleteListRequest = async () => {
    return  await clientAuth.get(`${BASE_PATH_HABIT_COMPLETE}/list`);
}

export const habitsCompleteDoneSkippedRequest = async (habitId: number, date: string) => {
    return await clientAuth.get(`${BASE_PATH_HABIT_COMPLETE}/done_skipped/${habitId}?date=${date}`);
}

