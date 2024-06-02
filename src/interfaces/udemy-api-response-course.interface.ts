import { UdemyUser } from "./udemy-user.interface";

export interface UdemyApiResponseCourse{
  _class: string;
  id: number;
  title: string;
  url: string;
  visible_instructors: UdemyUser[];
}