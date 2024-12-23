import MarksForm from "@/components/MarksForm";
import { PageLoadingUI } from "@/components/PageLoadingUI";
import StudentNotFoundPage from "@/components/StudentNotFoundPage";
import { classes } from "@/data/class";
import { useGetStudentByRoll } from "@/hooks/student.query";
import { useParams } from "react-router-dom";

const terminals = [
  "First Terminal",
  "Second Terminal",
  "Third Terminal",
  "Final Exam",
];

export const AddResult = () => {
  const { slug, term, roll } = useParams();
  const c = classes.find((d) => d.slug == slug);
  const { data, isLoading, error } = useGetStudentByRoll(
    Number(roll),
    c?.slug!
  );

  if (isLoading) return <PageLoadingUI />;
  if (error) return <StudentNotFoundPage />;

  return (
    <div className="w-fit mx-auto">
      <h1 className="text-2xl font-semibold">Class {c?.name}</h1>

      <div className="py-3">
        <p>Name : {data.name}</p>
        <p>Roll : {data.roll_no}</p>
      </div>

      <h1 className="text-2xl font-semibold">
        {terminals[Number(term)]} Results
      </h1>
      <MarksForm key={data} student={data} c={c!} term={term!} />
    </div>
  );
};
