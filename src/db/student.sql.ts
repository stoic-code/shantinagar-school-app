import { TStudentEditSchema, TStudentSchema } from "@/schema/student.schema";
import { connectdb } from "./db";

const rollNoErr =
  "error returned from database: (code: 2067) UNIQUE constraint failed: student.class, student.roll_no";

export const addStudent = async ({
  student,
  cls,
  result,
}: {
  student: TStudentSchema;
  cls: string;
  result?: string;
}) => {
  const { name, father_name, mother_name, roll_no, section, dob, address } =
    student;
  const db = await connectdb();
  try {
    const res = await db.execute(
      `INSERT INTO Student 
      (name, class, roll_no, section, dob, father_name, mother_name, address, result)
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        name,
        cls,
        roll_no,
        section,
        dob,
        father_name,
        mother_name,
        address,
        result,
      ],
    );
    console.log("Student added successfully.", res);
    await db.close();
    return res;
  } catch (err: any) {
    if (err == rollNoErr) {
      throw new Error("Roll No must be unique for a class room.");
    } else {
      console.log(err);
      throw new Error("Error adding student");
    }
  }
};

export const getAllStudent = async () => {
  const db = await connectdb();
  try {
    const result = await db.select("SELECT * from student ORDER BY roll_no");
    console.log("Students", result);
    await db.close();
    return result as any[];
  } catch (error) {
    console.error("Error", error);
    throw new Error("Error getting all student");
  }
};

export const getStudentsByClass = async ({ cls }: { cls: string }) => {
  const db = await connectdb();
  try {
    const result = await db.select(
      "SELECT * FROM student WHERE class=$1 ORDER BY roll_no",
      [cls],
    );
    await db.close();
    return result as any[];
  } catch (error) {
    console.error("Error", error);
    throw new Error("Error getting student");
  }
};

export const getStudentById = async (id: number) => {
  try {
    const db = await connectdb();
    const result: any[] = await db.select(
      "SELECT * FROM student WHERE id=$1 LIMIT 1",
      [id],
    );
    db.select;

    await db.close();

    if (result.length > 0) {
      return result[0];
    } else {
      throw new Error("Student not found");
    }
  } catch (error) {
    console.error("Error", error);
    throw new Error("Error getting student");
  }
};

export const getStudentByRollAndClasss = async (roll: number, cls: string) => {
  try {
    const db = await connectdb();
    const result: any[] = await db.select(
      "SELECT * FROM student WHERE roll_no = $1 AND class = $2 LIMIT 1",
      [roll, cls],
    );
    db.select;

    await db.close();

    if (result.length > 0) {
      return result[0];
    } else {
      throw new Error("Student not found");
    }
  } catch (error) {
    console.error("Error", error);
    throw new Error("Error getting student");
  }
};

export const deleteStudentById = async (id: number) => {
  const db = await connectdb();
  try {
    await db.execute("DELETE FROM student WHERE id=$1", [id]);
    await db.close();
  } catch (error) {
    console.error("Error", error);
    throw new Error("Error getting student");
  }
};

export const updateStudentById = async (
  id: number,
  payload: TStudentEditSchema,
) => {
  const {
    name,
    father_name,
    mother_name,
    roll_no,
    section,
    dob,
    address,
    result,
    class: cls, // Ensure 'class' is included in the payload and destructured here
  } = payload;

  const db = await connectdb();
  const oldStudent: any = await db.select(
    `SELECT class FROM student where id=$1`,
    [id],
  );

  try {
    // Start building the SQL query
    let query = "UPDATE Student SET ";
    const fields: string[] = [];
    const values: any[] = [];

    // Check each field and construct the query dynamically
    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }
    if (cls !== undefined) {
      fields.push("class = ?");
      values.push(cls);
    }
    if (roll_no !== undefined) {
      fields.push("roll_no = ?");
      values.push(roll_no);
    }
    if (section !== undefined) {
      fields.push("section = ?");
      values.push(section);
    }
    if (dob !== undefined) {
      fields.push("dob = ?");
      values.push(dob);
    }
    if (father_name !== undefined) {
      fields.push("father_name = ?");
      values.push(father_name);
    }
    if (mother_name !== undefined) {
      fields.push("mother_name = ?");
      values.push(mother_name);
    }
    if (address !== undefined) {
      fields.push("address = ?");
      values.push(address);
    }
    if (result !== undefined) {
      fields.push("result = ?");
      values.push(result);
      if (oldStudent[0].class !== cls) {
        fields.push("result = null");
      }
    }

    // Combine fields and values into the final query
    query += fields.join(", ");
    query += " WHERE id = ?";
    values.push(id);

    // Execute the query
    const res = await db.execute(query, values);

    console.log("Student updated successfully.", res);
    await db.close();
    return res;
  } catch (err) {
    if (err == rollNoErr) {
      throw new Error("Roll no must be unique for a classroom.");
    } else {
      console.log(err);
      throw new Error("Error updating student");
    }
  }
};

export const updateStudentResultById = async (id: number, result: string) => {
  try {
    const db = await connectdb();
    db.execute(`UPDATE student SET result=$2 WHERE id=$1`, [id, result]);
  } catch (err) {
    console.log(err);
  }
};
