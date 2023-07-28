export interface Message<T> {
  code: string;
  message: string;
  errors: [];
  data: T;
}