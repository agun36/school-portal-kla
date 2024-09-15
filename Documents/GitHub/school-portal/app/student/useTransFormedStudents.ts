import { useMemo } from "react";
import { StudentList } from "./type/StudentListType";
// import { TeacherList } from "./type/TeacherListType";


export function useTransformedStudents(students: any[] | undefined): StudentList[] {
    return useMemo(() => {
        if (!students) return [];
        return students.map((student) => ({
            ...student,
            id: student.id?.toString() ?? "", // Convert id to string
        }));
    }, [students]);
}