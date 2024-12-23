import { Link } from "react-router-dom";
import { classes } from "@/data/class";

export default function Home() {
  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="px-10 font-semibold pb-10 text-3xl">
          Pre-Primary Class
        </h1>
        <div className="flex justify-center gap-10 flex-wrap">
          {classes.map(
            (c, idx) =>
              idx < 3 && (
                <Link
                  to={`/class/${c.slug}`}
                  className="bg-primary cursor-pointer text-primary-foreground text-xl rounded-lg h-24 w-52 flex items-center justify-center"
                  key={idx}
                >
                  {c.name}
                </Link>
              ),
          )}
        </div>
      </div>

      <hr />
      <div>
        <h1 className="px-10 font-semibold pb-10 text-3xl">Primary Class</h1>
        <div className="flex justify-center gap-10 flex-wrap">
          {classes.map(
            (c, idx) =>
              idx > 2 && (
                <Link
                  to={`/class/${c.slug}`}
                  className="bg-primary cursor-pointer text-primary-foreground text-xl rounded-lg h-24 w-52 flex items-center justify-center"
                  key={idx}
                >
                  {c.name}
                </Link>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
