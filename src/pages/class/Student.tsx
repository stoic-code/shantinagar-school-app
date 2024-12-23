import { PageLoadingUI } from "@/components/PageLoadingUI";
import Result from "@/components/Result";
import { classes } from "@/data/class";
import { useGetStudentById } from "@/hooks/student.query";
import { formatDate } from "@/lib/date";
import { useParams } from "react-router-dom";
import StudentEditForm from "@/components/StudentEditForm";

export const Student = () => {
  const { slug, id } = useParams();
  const cls = classes.find((c) => c.slug === slug);
  const { data, isLoading } = useGetStudentById(Number(id));

  if (isLoading) return <PageLoadingUI />;

  return (
    <div>
      <h1 className="text-3xl py-4 font-bold print:hidden">{cls?.name}</h1>

      <div className="grid md:grid-cols-6 print:grid-cols-1">
        <div className="col-span-2">
          <h1 className="text-xl font-semibold print:hidden flex items-center gap-4">
            Student Information
            <StudentEditForm data={data} />
          </h1>
          <hr className="w-[70%] print:hidden" />
          <div className="flex py-4 gap-4 print:hidden">
            <ul className="space-y-2">
              <li>
                <strong>Name :</strong>
              </li>
              <li>
                <strong>Section :</strong>
              </li>
              <li>
                <strong>Roll No. :</strong>
              </li>
              <li>
                <strong>Date of Birth :</strong>
              </li>
              <li>
                <strong>Address :</strong>
              </li>
              <li>
                <strong>Father's Name :</strong>
              </li>
              <li>
                <strong>Mother's Name :</strong>
              </li>
            </ul>
            <ul className="space-y-2">
              <li>{data.name}</li>
              <li>{data.section}</li>
              <li>{data.roll_no}</li>
              <li>{formatDate(data.dob)}</li>
              <li>{data.address}</li>
              <li>{data.father_name}</li>
              <li>{data.mother_name}</li>
            </ul>
          </div>
        </div>

        {slug !== "old" && <Result key={data} student={data} />}
      </div>
    </div>
  );
};
