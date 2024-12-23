import { classes } from "@/data/class";
import { Eye, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useParams } from "react-router-dom";
import { useGetStudentsByClass } from "@/hooks/student.query";
import { ask } from "@tauri-apps/api/dialog";
import { useDeleteStudentById } from "@/hooks/student.mutation";
import { StudentPageLoading } from "@/components/StudentPageLoading";
import { useState } from "react";

const result = ["First Term", "Second Term", "Third Term", "Final Exam"];

export const ClassRoom = () => {
  const [query, setQuery] = useState("");
  const params = useParams();
  const c = classes.find((c) => c.slug === params.slug);
  const { data, isLoading } = useGetStudentsByClass({ cls: c?.slug! });
  const { mutateAsync } = useDeleteStudentById(c?.slug!);

  const handleDelete = async (name: string, id: number) => {
    const a = await ask(
      `Do you want to delete ${name}. This action cannot be undone.`,
      {
        type: "warning",
        title: "Delete Student ?",
      },
    );
    if (a) {
      await mutateAsync(id);
    } else {
      console.log("NO Not delete");
    }
  };

  if (isLoading || !data) return <StudentPageLoading />;

  const filteredData = data.filter((item) => {
    const loweredName = item.name.toLowerCase();
    const loweredQuery = query.toLowerCase();
    return loweredName.includes(loweredQuery);
  });

  return (
    <div>
      <div className="flex justify-between py-5">
        <h1 className="text-3xl font-bold">{c?.name}</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center h-9 rounded-md border border-primary/40 bg-transparent px-1 py-1 text-sm shadow-sm transition-colors">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="flex-1 outline-none w-[200px] bg-transparent"
            placeholder="Search Student..."
          />
          <Search className="text-muted-foreground/50" size={18} />
        </div>
        {c?.slug !== "old" && (
          <div className="space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus size={16} />
                  Add Results
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {result.map((item, idx) => (
                  <DropdownMenuItem key={idx} asChild>
                    <Link
                      to={`/class/${c?.slug}/result/${idx}/${data[0] ? data[0].roll_no : 1}`}
                    >
                      {item}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild>
              <Link to={`/class/${params.slug}/student/new`}>
                <Plus size={16} />
                Add Student
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="py-10">
        <Table>
          {/* 
          <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Roll No</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData &&
              filteredData.map((d, idx) => (
                <TableRow key={idx}>
                  <TableCell>{d.roll_no}</TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.section}</TableCell>
                  <TableCell>{d.address}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <Link
                      to={`/class/${params.slug}/student/${d.id}`}
                      className="rounded-md border text-blue-600 dark:text-blue-400 p-2 hover:bg-blue-500/10"
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      className="rounded-md border text-destructive dark:text-red-400 p-2 hover:bg-red-500/10"
                      onClick={() => handleDelete(d.name, d.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
