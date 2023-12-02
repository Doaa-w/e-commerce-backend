import { Error } from "../types/error";

export const createHttpError = (status: number, message: string) => {
  const error: Error = new Error();
  error.message = message;
  error.status = status;
  return error;
};
