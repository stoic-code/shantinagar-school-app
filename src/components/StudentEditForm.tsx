import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { PenBox } from "lucide-react";
import { useUpdateStudentById } from "@/hooks/student.mutation";
import { classes } from "@/data/class";
import { TStudentEditSchema, studentEditSchema } from "@/schema/student.schema";
import { message } from "@tauri-apps/api/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CompulsoryLabel from "./form/CompulsoryLabel";
import FormErr from "./form/FormErr";
import { formatDate } from "@/lib/date";
import { useState } from "react";

const StudentEditForm = ({ data }: { data: any }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useUpdateStudentById(data.id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TStudentEditSchema>({
    resolver: zodResolver(studentEditSchema),
    defaultValues: { ...data, dob: formatDate(data.dob) },
  });

  const onSubmit = async (payload: TStudentEditSchema) => {
    try {
      await mutateAsync(payload);
      message("Successfully edited student information !!", {
        title: "success",
        type: "info",
        okLabel: "okay",
      });
      setOpen(false);
    } catch (err: any) {
      message(err.message || "An error occured while adding student !!", {
        title: "error",
        type: "error",
        okLabel: "okay",
      });
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <PenBox size={18} className="text-blue-500" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student Details</DialogTitle>
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="w-full">
                  <CompulsoryLabel>Student Name</CompulsoryLabel>
                  <Input
                    {...register("name")}
                    placeholder="Enter student name"
                  />
                  <FormErr>{errors.name?.message}</FormErr>
                </div>

                <div className="w-full">
                  <CompulsoryLabel>Class</CompulsoryLabel>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors outline-none"
                    {...register("class")}
                  >
                    {classes.map((item, idx) => (
                      <option key={idx} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <FormErr>{errors.class?.message}</FormErr>
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
                    <Input
                      {...register("section")}
                      placeholder="Enter section"
                    />
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
            </form>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" form="form">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentEditForm;
