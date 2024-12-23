import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().trim().min(3, { message: "Name is too short." }),
  roll_no: z.coerce
    .number()
    .min(1, { message: "Roll number must be greater than 0." })
    .max(1000, { message: "Roll number shouldn't be greater than 1000." }),
  section: z.string().trim().min(1, { message: "Section is required." }),
  father_name: z.string().trim().optional(),
  mother_name: z.string().trim().optional(),
  dob: z.coerce.date(),
  address: z.string().trim().min(3, { message: "Address is too short." }),
});

export const studentEditSchema = studentSchema.extend({
  class: z.string().trim().min(1, { message: "Class is required." }),
  result: z.string().optional().nullable(),
});

export type TStudentEditSchema = z.infer<typeof studentEditSchema>;
export type TStudentSchema = z.infer<typeof studentSchema>;
