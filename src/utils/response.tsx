import { AxiosError } from "axios";

export const responseError = (error:Error) => {
  if (error instanceof AxiosError) {

    if (error.response?.data) {
      return error.response?.data;
    }

    if (error.response?.data.message == 'Unauthenticated.') {
      window.location.href = '/login';
    }
  }
};