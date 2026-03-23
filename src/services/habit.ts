import { clientAuth } from "../config/clientAxios";
import { HabitJson } from "../interfaces/Habit";

const BASE_PATH_HABIT = 'habit';
const BASE_PATH_HABIT_COMPLETE = 'habit-complete';

export const habitsListRequest = async () => {
    return  await clientAuth.get(`${BASE_PATH_HABIT}/list`);
}

export const habitRegisterRequest = async (habitData: HabitJson) => {
    return await clientAuth.post(`${BASE_PATH_HABIT}/register`, habitData);
}

export const habitsCompleteListRequest = async () => {
    return  await clientAuth.get(`${BASE_PATH_HABIT_COMPLETE}/list`);
}

export const habitsCompleteDoneSkippedRequest = async (habitId: number, date: string) => {
    return await clientAuth.get(`${BASE_PATH_HABIT_COMPLETE}/done_skipped/${habitId}?date=${date}`);
}

export const habitDeleteRequest = async (habitId: number) => {
    return await clientAuth.delete(`${BASE_PATH_HABIT}/delete/${habitId}`);
}
