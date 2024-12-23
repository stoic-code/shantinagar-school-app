import { classes } from "@/data/class";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useUpdateResultById } from "@/hooks/student.mutation";
import { useNavigate } from "react-router-dom";
import { MoveLeft, MoveRight, PenSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { tabs } from "@/constants";
import { useEffect, useRef, useState } from "react";

const MarksForm = ({
  c,
  term,
  student,
}: {
  c: (typeof classes)[0];
  term: string;
  student: any;
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let results = student.result ? JSON.parse(student.result) : {}; // Ensure results is always defined
  let terminalResult = results[Number(term)] || {}; // Ensure terminalResult is always defined

  const { handleSubmit, register, reset } = useForm({
    defaultValues: terminalResult,
    reValidateMode: "onBlur",
  });
  const { mutateAsync, isPending } = useUpdateResultById(student.id);

  const onSubmit = async (payload: any) => {
    const newResult = { ...results };
    newResult[term] = payload;
    mutateAsync(newResult).then(() => setOpen(false));
  };

  const handleNext = () => {
    reset({});
    navigate(`/class/${c?.slug}/result/${term}/${student.roll_no + 1}`);
  };

  const previousTerminalResult = useRef(terminalResult);

  useEffect(() => {
    if (
      JSON.stringify(previousTerminalResult.current) !==
      JSON.stringify(terminalResult)
    ) {
      reset(terminalResult);
      previousTerminalResult.current = terminalResult;
    }
  }, [terminalResult, reset]);

  const calculateTotalMarks = () => {
    return c?.subjects?.reduce((total, subject) => {
      return total + (Number(terminalResult[subject.name]) || 0);
    }, 0);
  };

  const calculateTotalGPA = () => {
    const totalMarks = calculateTotalMarks();
    const totalFullMarks = c?.subjects?.reduce((total, subject) => {
      return total + subject.marks[Number(term)].full;
    }, 0);
    if (totalMarks && totalFullMarks) {
      return (totalMarks / totalFullMarks) * 4;
    } else {
      return;
    }
  };

  return (
    <div className="py-4 print:hidden">
      <table className="min-w-full bg-white rounded-sm border">
        <thead className="bg-gray-200 whitespace-nowrap">
          <tr>
            <th className="py-1 px-4 text-left font-medium">Subjects</th>
            <th className="py-1 px-4 text-left font-medium">Full Marks</th>
            <th className="py-1 px-4 text-left font-medium">Pass Marks</th>
            <th className="py-1 px-4 text-right font-medium">Obtained</th>
            <th className="py-1 px-4 text-right font-medium">GPA</th>
          </tr>
        </thead>
        <tbody className="text-primary/70">
          {c?.subjects?.map((s, idx) => (
            <tr key={idx} className="even:bg-gray-100 odd:bg-gray-50 ">
              <td className="py-2 px-4 border-t">{s.name}</td>
              <td className="py-2 px-4 border-t">
                {s.marks[Number(term)].full}
              </td>
              <td className="py-2 px-4 border-t">
                {s.marks[Number(term)].pass}
              </td>
              <td className="border-t text-center">
                {terminalResult && terminalResult[s.name]}
              </td>
              <td className="border-t text-center">
                {terminalResult &&
                  (
                    (terminalResult[s.name] / s.marks[Number(term)].full) *
                    4
                  ).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr className="font-semibold bg-blue-100">
            <td className="py-1 px-4 border-t" colSpan={3}>
              Total
            </td>
            <td className="py-1 px-4 border-t text-center" colSpan={1}>
              {calculateTotalMarks()?.toFixed(2)}
            </td>
            <td className="py-1 px-4 border-t" colSpan={1}>
              {calculateTotalGPA()?.toFixed(2)} GPA
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex pt-10 justify-between">
        <Button
          type="button"
          className="flex gap-2"
          onClick={() => navigate(-1)}
        >
          <MoveLeft size={20} />
          Previous
        </Button>
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                Edit <PenSquare size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {student.name} || {c?.name} || {tabs[Number(term)].title}
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <table className="min-w-full bg-white rounded-sm border my-4 print:hidden">
                    <thead className="bg-gray-200 whitespace-nowrap">
                      <tr>
                        <th className="py-1 px-4 text-left font-medium">
                          Subjects
                        </th>
                        <th className="py-1 px-4 text-left font-medium">
                          Full Marks
                        </th>
                        <th className="py-1 px-4 text-left font-medium">
                          Pass Marks
                        </th>
                        <th className="py-1 px-4 text-left font-medium">
                          Obtained Marks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-primary/70">
                      {c?.subjects?.map((s, idx) => (
                        <tr
                          key={idx}
                          className="even:bg-gray-100 odd:bg-gray-50 "
                        >
                          <td className="py-2 px-4 border-t">{s.name}</td>
                          <td className="py-2 px-4 border-t">
                            {s.marks[Number(term)].full}
                          </td>
                          <td className="py-2 px-4 border-t">
                            {s.marks[Number(term)].pass}
                          </td>
                          <td className="py-2 px-4 border-t text-center">
                            <input
                              {...register(s.name)}
                              type="number"
                              required
                              step={"0.01"}
                              min={0}
                              max={s.marks[Number(term)].full}
                              className="w-full py-1 px-4 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button className="block ml-auto" disabled={isPending}>
                    Save
                  </Button>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button className="flex gap-2" onClick={() => handleNext()}>
            Next <MoveRight size={20} />{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarksForm;
