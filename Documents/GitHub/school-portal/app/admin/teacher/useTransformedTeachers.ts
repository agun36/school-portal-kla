import { useMemo } from "react";
import { TeacherList } from "./type/TeacherListType";


export function useTransformedTeachers(teachers: any[] | undefined): TeacherList[] {
    return useMemo(() => {
        if (!teachers) return [];
        return teachers.map((teacher) => ({
            ...teacher,
            id: teacher.id?.toString() ?? "", // Convert id to string
        }));
    }, [teachers]);
}