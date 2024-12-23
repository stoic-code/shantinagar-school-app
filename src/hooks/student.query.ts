import {
  getAllStudent,
  getStudentById,
  getStudentByRollAndClasss,
  getStudentsByClass,
} from "@/db/student.sql";
import { useQuery } from "@tanstack/react-query";

export const useGetAllStudents = () => {
  return useQuery({
    queryKey: ["students"],
    staleTime: 0,
    queryFn: async () => await getAllStudent(),
  });
};

export const useGetStudentsByClass = ({ cls }: { cls: string }) => {
  return useQuery({
    queryKey: ["students", cls],
    staleTime: 0,
    queryFn: async () => await getStudentsByClass({ cls }),
  });
};

export const useGetStudentById = (id: number) => {
  return useQuery({
    queryKey: ["students", id],
    staleTime: 0,
    queryFn: async () => await getStudentById(id),
  });
};

export const useGetStudentByRoll = (roll: number, cls: string) => {
  return useQuery({
    queryKey: ["students", "roll", roll],
    queryFn: async () => await getStudentByRollAndClasss(roll, cls),
    retry: 0,
    staleTime: 0,
  });
};
