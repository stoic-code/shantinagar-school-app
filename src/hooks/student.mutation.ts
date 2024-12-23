import {
  addStudent,
  deleteStudentById,
  updateStudentById,
  updateStudentResultById,
} from "@/db/student.sql";
import { TStudentEditSchema, TStudentSchema } from "@/schema/student.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TAddStudent = {
  payload: TStudentSchema;
  cls: string;
  result?: string;
};

// Add student mutation
export const useAddStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload, cls, result }: TAddStudent) =>
      await addStudent({ student: payload, cls, result }),
    onSuccess: () => queryClient.resetQueries(),
  });
};

// Delete student mutation
export const useDeleteStudentById = (cls: string) => {
  console.log(cls);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => await deleteStudentById(id),
    onSuccess: () => queryClient.resetQueries(),
  });
};

// Update student mutation
export const useUpdateStudentById = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TStudentEditSchema) =>
      await updateStudentById(id, payload),
    onSuccess: () => queryClient.resetQueries(),
  });
};

export const useUpdateResultById = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: string) =>
      await updateStudentResultById(id, payload),
    onSuccess: () => queryClient.resetQueries(),
  });
};
