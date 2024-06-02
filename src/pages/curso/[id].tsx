import { CourseResponse } from '@/interfaces/course-response.interface';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
 
export const getServerSideProps = (async () => {
  const res = await fetch('http://localhost:3000/api/get-course/1701388');
  const repo: CourseResponse[] = await res.json();
  return { props: { repo } }
})
 
export default function Page({repo}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <form style={{width: "100%", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      Teste
    </form>
  )
}