import { Asset } from "./assets.interface";
import { Chapter } from "./chapter.interface";

export interface Lecture extends Chapter{
	asset: Asset
}