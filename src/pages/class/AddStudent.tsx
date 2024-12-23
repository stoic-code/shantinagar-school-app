import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TStudentSchema, studentSchema } from "@/schema/student.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormErr from "@/components/form/FormErr";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";
import { classes } from "@/data/class";
import { useAddStudent } from "@/hooks/student.mutation";
import { message } from "@tauri-apps/api/dialog";
import { useNavigate, useParams } from "react-router-dom";

export const AddStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const cls = classes.find((c) => c.slug === params.slug);
  const { mutateAsync, isPending } = useAddStudent();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TStudentSchema>({ resolver: zodResolver(studentSchema) });

  const onSubmit = async (payload: TStudentSchema) => {
    try {
      await mutateAsync({ payload, cls: cls?.slug! });
      message("Added student successfully !!", {
        title: "success",
        type: "info",
        okLabel: "okay",
      });
      reset();
    } catch (err: any) {
      message(err.message || "An error occured while adding student !!", {
        title: "error",
        type: "error",
        okLabel: "okay",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
      <h1 className="text-2xl pb-2 font-semibold">
        {cls?.name} <span className="font-normal text-base">(Add Student)</span>
      </h1>
      <div className="space-y-4">
        <div className="w-full">
          <CompulsoryLabel>Student Name</CompulsoryLabel>
          <Input {...register("name")} placeholder="Enter student name" />
          <FormErr>{errors.name?.message}</FormErr>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="w-full">
            <CompulsoryLabel>Roll No.</CompulsoryLabel>
            <Input
              type="number"
              {...register("roll_no")}
              placeholder="Enter roll number"
            />
            <FormErr>{errors.roll_no?.message}</FormErr>
          </div>

          <div className="w-full">
            <CompulsoryLabel>Section</CompulsoryLabel>
            <Input {...register("section")} placeholder="Enter section" />
            <FormErr>{errors.section?.message}</FormErr>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="w-full">
            <Label>Father's Name</Label>
            <Input
              {...register("father_name")}
              placeholder="Enter father name"
            />
            <FormErr>{errors.father_name?.message}</FormErr>
          </div>

          <div className="w-full">
            <Label>Mother's Name</Label>
            <Input
              {...register("mother_name")}
              placeholder="Enter mother name"
            />
            <FormErr>{errors.mother_name?.message}</FormErr>
          </div>
        </div>

        <div className="w-full">
          <CompulsoryLabel>Date of Birth</CompulsoryLabel>
          <input
            type="date"
            {...register("dob")}
            className="w-full px-2 py-1 border rounded-md outline-none"
          />
          <FormErr>{errors.dob?.message}</FormErr>
        </div>

        <div className="w-full">
          <CompulsoryLabel>Address</CompulsoryLabel>
          <Input {...register("address")} placeholder="Enter address" />
          <FormErr>{errors.address?.message}</FormErr>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-10">
        <Button
          color="red"
          type="reset"
          className="bg-red-500 hover:bg-red-700"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          Add Student
        </Button>
      </div>
    </form>
  );
};
