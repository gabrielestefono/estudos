import { UdemyApiResponseCourse } from "./udemy-api-response-course.interface";

export interface UdemyApiResponseSearch{
  count: number;
  next: string | null;
  previous: string | null;
  results: UdemyApiResponseCourse[]
}