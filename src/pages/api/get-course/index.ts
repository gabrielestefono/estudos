import { Course } from "@/interfaces/course.interface";
import { UdemyApiResponseCourse } from "@/interfaces/udemy-api-response-course.interface";
import { UdemyApiResponseSearch } from "@/interfaces/udemy-api-response-search.interface";
import type { NextApiRequest, NextApiResponse } from "next";


async function getCourseListId(nomeCurso: string){
  const backend: string = process.env.API_LINK!;
  const credentials = `${process.env.CLIENT_ID!}:${process.env.CLIENT_PASSWORD!}`;
  const base64Credentials = `Basic ${Buffer.from(credentials).toString('base64')}`;
  let response: Course[] = [];
  await fetch(`${backend}api-2.0/courses/?fields[course]=id,title,url,visible_instructors&fields[user]=display_name&search=${nomeCurso}`, {
    method: "GET",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Authorization": base64Credentials,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then((data: UdemyApiResponseSearch) => response = data.results.map((dado: UdemyApiResponseCourse) =>{return {id: dado.id, title: dado.title, url: dado.url, instructor: dado.visible_instructors[0].display_name}}))
  return response;
}

export default async function getCourseId(req: NextApiRequest, res: NextApiResponse<any>){
  if(req.method === "GET"){
    const nomeRecebido: string = req.query.course! as string;
    const dadosApi: Course[] = await getCourseListId(nomeRecebido);
    res.status(200).json(dadosApi);
  }else{
    res.status(405).end(`Método ${req.method} não permitido`)
  }
}