import { initializeDatabase } from "@/database/database";
import { Chapter as ChapterEntity } from "@/entities/chapter";
import { Lecture as LectureEntity } from "@/entities/lecture";
import { Asset as AssetEntity} from "@/entities/asset";
import { Course } from "@/entities/course";
import { Chapter } from "@/interfaces/chapter.interface";
import { Lecture } from "@/interfaces/lecture.interface";
import { LecturesReponse } from "@/interfaces/lectures-response.interface";
import type { NextApiRequest, NextApiResponse } from "next";
import { DataSource } from "typeorm";

async function getCourseById(id: number, page: number = 1, accumulatedResults: any[] = []): Promise<any[]> {
  const backend: string = process.env.API_LINK!;
  const credentials = `${process.env.CLIENT_ID!}:${process.env.CLIENT_PASSWORD!}`;
  const base64Credentials = `Basic ${Buffer.from(credentials).toString('base64')}`;

  const response = await fetch(`${backend}api-2.0/courses/${id}/public-curriculum-items/?fields[lecture]=id,title,asset&fields[chapter]=id,title&fields[asset]=id,content_summary,asset_type&page=${page}`, {
    method: "GET",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Authorization": base64Credentials,
      "Content-Type": "application/json"
    }
  });

  const data: LecturesReponse = await response.json();
  accumulatedResults.push(...data.results);

  if (data.next != null) {
    return getCourseById(id, page + 1, accumulatedResults);
  } else {
    return accumulatedResults;
  }
}

export default async function getCourse(req: NextApiRequest, res: NextApiResponse<any>) {
  const AppDataSource: DataSource = await initializeDatabase();

  if (req.method === "GET") {
    if (!req.query.id || !req.query.title || !req.query.url) {
      return res.status(403).end(`Faltam Parâmetros na consulta!`);
    }
    const course: Course = {
      id: 0,
      title: decodeURI(req.query.title as string).replace(/\s+\s/g, ' + '),
      url: req.query.url as string,
      id_udemy: +req.query.id,
      instructor: req.query.instructor as string,
    };
    const courseExists = await AppDataSource.manager.findOne(Course, {
      where: {
        id_udemy: course.id_udemy
      }
    });
    if(courseExists){
      const courseExists = await AppDataSource.manager.findOne(Course, {
        where: {
          id_udemy: course.id_udemy
        },
        relations: ["chapters", "chapters.lectures", "chapters.lectures.asset"]
      });
      return res.status(200).json(courseExists);
    }
    const courseSaved: Course = await AppDataSource.manager.save(Course, course);
    const lecturesOrChapters: Array<Lecture | Chapter> = await getCourseById(+req.query.id);
    let lastChapter: ChapterEntity;
    lecturesOrChapters.forEach(async element => {
      if(element._class == "chapter"){
        const chapter: ChapterEntity = new ChapterEntity();
        chapter.title = element.title;
        chapter.course = courseSaved;
        const chapterSaved = await AppDataSource.manager.save(ChapterEntity, chapter);
        lastChapter = chapterSaved;
      }
      if(element._class == "lecture") {
        const lectureCertain: Lecture = element as Lecture;
        const asset: AssetEntity = new AssetEntity();
        asset.asset_type = lectureCertain.asset.asset_type;
        asset.duration = lectureCertain.asset.content_summary;
        const savedAsset = await AppDataSource.manager.save(asset);
        const lecture: LectureEntity = new LectureEntity();
        lecture.title = element.title;
        lecture.chapter = lastChapter;
        lecture.asset = savedAsset;
        await AppDataSource.manager.save(lecture);
      }
    });
    const courseSave = await AppDataSource.manager.findOne(Course, {
      where: {
        id_udemy: course.id_udemy
      },
      relations: ["chapters", "chapters.lectures", "chapters.lectures.asset"]
    })
    return res.status(201).json(courseSave);
  } else {
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}

