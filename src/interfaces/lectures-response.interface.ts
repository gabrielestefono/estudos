import { Chapter } from "./chapter.interface";
import { Lecture } from "./lecture.interface";

export interface LecturesReponse{
	count: number;
	next: string | null;
	previous: string | null;
	results: Array<Chapter | Lecture>
}