import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { classes } from "@/data/class";
import { useUpdateResultById } from "@/hooks/student.mutation";
import { tabs } from "@/constants";
import { cn } from "@/lib/utils";
import { Printer, SquarePen } from "lucide-react";
import { MarkSheet } from "./MarkSheet";

import { dialog } from "@tauri-apps/api";

type Result = {
  [key: string]: string;
};

type TotalMarks = {
  [key: string]: number;
};

export function sumSubjectMarks(results: {
  [key: string]: Result | undefined;
}): TotalMarks {
  const totalMarks: TotalMarks = {};

  for (let key in results) {
    const result = results[key];
    if (result) {
      for (let subject in result) {
        if (!totalMarks[subject]) {
          totalMarks[subject] = 0;
        }
        totalMarks[subject] += parseInt(result[subject], 10);
      }
    }
  }

  return totalMarks;
}

const Result = ({ student }: { student: any }) => {
  const [open, setOpen] = useState(false);
  const { slug } = useParams();
  const [tab, setTab] = useState(tabs[0].id);
  const cls = classes.find((c) => c.slug === slug);
  const result = student.result ? JSON.parse(student.result) : {};
  const terminalResult = result[tab] || {};

  const totalSubjectMarks = sumSubjectMarks(result);

  const { handleSubmit, register, reset } = useForm({
    values: terminalResult,
    reValidateMode: "onSubmit",
  });

  const { mutateAsync, isPending } = useUpdateResultById(student.id);

  const onSubmit = async (payload: any) => {
    try {
      const newResult = { ...result };
      newResult[tab] = payload;
      await mutateAsync(newResult).then(() => setOpen(false));
      dialog.message(
        `${student.name}'s ${tabs[tab].title} marks has been updated successfully !!`,
        { type: "info", title: "Success !!" }
      );
    } catch (err: any) {
      dialog.message(
        err.message || "Something went wrong while updating the marks !!",
        { type: "error", title: "Failed !!" }
      );
    }
  };

  useEffect(() => reset(terminalResult), [tab]);

  const calculateTotalMarks = () => {
    return cls?.subjects?.reduce((total, subject) => {
      return total + (Number(terminalResult[subject.name]) || 0);
    }, 0);
  };

  const calculateTotalFinalMarks = () => {
    return cls?.subjects?.reduce((total, subject) => {
      return total + (Number(totalSubjectMarks[subject.name]) || 0);
    }, 0);
  };

  const calculateTotalGPA = () => {
    const totalMarks =
      tab === 4 ? calculateTotalFinalMarks() : calculateTotalMarks();
    const totalFullMarks = cls?.subjects?.reduce((total, subject) => {
      return total + subject.marks[tab].full;
    }, 0);

    if (!totalMarks || !totalFullMarks) return;

    const gpa = (totalMarks / totalFullMarks) * 4;
    return gpa.toFixed(2);
  };
  const getGradeFromGPA = (gpa: number): string | undefined => {
    if (gpa > 3.6 && gpa <= 4.0) {
      return "A+";
    } else if (gpa >= 3.2 && gpa <= 3.6) {
      return "A";
    } else if (gpa >= 2.8 && gpa < 3.2) {
      return "B+";
    } else if (gpa >= 2.4 && gpa < 2.8) {
      return "B";
    } else if (gpa >= 2.0 && gpa < 2.4) {
      return "C+";
    } else if (gpa >= 1.6 && gpa < 2.0) {
      return "C";
    } else if (gpa >= 1.2 && gpa < 1.6) {
      return "D+";
    } else if (gpa >= 0.8 && gpa < 1.2) {
      return "D";
    } else if (gpa >= 0 && gpa < 0.8) {
      return "E";
    } else {
      return; // Handle invalid GPA case
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {student.name} {cls?.name} {tabs[tab].title}
        </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="print:hidden">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Results
          {tab !== 4 && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="text-blue-500">
                  <SquarePen size={20} />
                </button>
              </DialogTrigger>
              <DialogContent className=" max-w-xl">
                <DialogHeader>
                  <DialogTitle>
                    {student.name} || {cls?.name} || {tabs[tab].title}
                  </DialogTitle>

                  <form onSubmit={handleSubmit(onSubmit)} className=" ">
                    <table className=" min-w-full bg-white rounded-sm border my-4 print:hidden">
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
                        {cls?.subjects?.map((s, idx) => (
                          <tr
                            key={idx}
                            className="even:bg-gray-100 odd:bg-gray-50"
                          >
                            <td className="py-2 px-4 border-t">{s.name}</td>
                            <td className="py-2 px-4 border-t">
                              {s.marks[tab].full}
                            </td>
                            <td className="py-2 px-4 border-t">
                              {s.marks[tab].pass}
                            </td>
                            <td className="py-2 px-4 border-t text-center">
                              <input
                                {...register(s.name)}
                                type="number"
                                step="0.01"
                                required
                                min={0}
                                max={s.marks[tab].full}
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
          )}
        </h2>
        <ul className="flex text-nowrap gap-2">
          {tabs.map((t, idx) => (
            <li
              onClick={() => {
                tab !== t.id && setTab(t.id);
              }}
              key={idx}
              className={cn(
                "border-b-2 border-transparent px-1 cursor-pointer",
                tab === t.id ? "border-blue-500 text-blue-500" : ""
              )}
            >
              {t.title}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <MarkSheet
          finalResult={totalSubjectMarks}
          term={tab}
          gpa={calculateTotalGPA()}
          //@ts-ignore
          grade={getGradeFromGPA(calculateTotalGPA()!)}
        />
        <table className="min-w-full bg-white rounded-sm border my-4 print:hidden">
          <thead className="bg-gray-200 whitespace-nowrap">
            <tr>
              <th className="py-1 px-4 text-left font-medium">Subjects</th>
              <th className="py-1 px-4 text-left font-medium">Full Marks</th>
              <th className="py-1 px-4 text-left font-medium">Pass Marks</th>
              <th className="py-1 px-4 text-left font-medium">
                Obtained Marks
              </th>
            </tr>
          </thead>
          <tbody className="text-primary/70">
            {cls?.subjects?.map((s, idx) => (
              <tr key={idx} className="even:bg-gray-100 odd:bg-gray-50">
                <td className="py-2 px-4 border-t whitespace-nowrap">
                  {s.name}
                </td>
                <td className="py-2 px-4 border-t">{s.marks[tab].full}</td>
                <td className="py-2 px-4 border-t">{s.marks[tab].pass}</td>
                <td className="py-2 px-4 border-t text-center">
                  {tab === 4
                    ? totalSubjectMarks[s.name]
                    : terminalResult && terminalResult[s.name]}
                </td>
              </tr>
            ))}
            <tr className="font-semibold bg-blue-100">
              <td className="py-1 px-4 border-t" colSpan={2}>
                Total
              </td>
              <td className="py-1 px-4 border-t" colSpan={1}>
                {tab === 4
                  ? calculateTotalFinalMarks()?.toFixed(2)
                  : calculateTotalMarks()?.toFixed(2)}
              </td>
              <td className="py-1 px-4 border-t text-center" colSpan={1}>
                {calculateTotalGPA()} GPA
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between gap-2">
        <Button
          className="gap-2 print:hidden mb-10"
          onClick={() => window.print()}
        >
          <Printer size={20} />
          Print
        </Button>
      </div>
    </div>
  );
};

export default Result;
