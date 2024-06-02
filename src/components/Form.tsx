import React, { useEffect, useRef, useState } from 'react';
import styles from './Form.module.scss';
import { Course } from '@/interfaces/course.interface';
import Loading from './loading';

export default function Form() {
  const [course, setCourse] = useState("");
  const [typing, setTyping] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  async function buscarCurso() {
    setTyping(false);
    const res = await fetch(`http://localhost:3000/api/get-course?course=${course}`);
    const response: Course[] = await res.json();
    console.log(response);
    setCourses(response);
  }

  async function baixarInfoCurso(course: Course) {
    setLoading(true);
    const res = await fetch(`http://localhost:3000/api/get-course/${course.id}?title=${course.title}&url=${course.url}&instructor=${course.instructor}`);
    const response: Course[] = await res.json();
    console.log(response);
    setLoading(false);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [course]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted"); // Adiciona log para depuração
    buscarCurso();
  };
  return loading ? 
  (<Loading/>) : (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar um novo curso"
          name="course"
          value={course}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCourse(e.target.value); setTyping(true); }}
          required
        />
        <button type="submit">Buscar <img src="/icons/plus.svg" alt="Buscar novo Curso" width="16px" height="16px" />
        </button>
      </form>
      {courses && <div className={styles.showCourses}>
        <table>
          <tbody>
            {!typing && courses.map(item => (
              <tr key={item.id}>
                <td>
                  <a href={`https://www.udemy.com${item.url}`} target="_blank">
                    {item.title}
                  </a>
                </td>
                <td>{item.instructor}</td>
                <td>
                  <button onClick={()=>{baixarInfoCurso(item)}}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </>
  );
}
