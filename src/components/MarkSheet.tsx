import { classes } from "@/data/class";
import { useGetStudentById } from "@/hooks/student.query";
import { formatDate } from "@/lib/date";
import { useParams } from "react-router-dom";
import { tabs } from "@/constants";
import NepaliDate from "nepali-date-converter";

export const MarkSheet = ({
  term,
  grade,
  gpa,
  finalResult,
}: {
  term: number;
  grade: any;
  gpa: any;
  finalResult: any;
}) => {
  const nepaliDate = new NepaliDate();
  const dateObj = nepaliDate.getBS();
  const padWithZero = (number: number) => number?.toString().padStart(2, "0");
  const today = `${dateObj.year}-${padWithZero(
    dateObj.month + 1
  )}-${padWithZero(dateObj.date)}`;

  const param = useParams();
  const cls = classes.find((c) => c.slug === param.slug);
  const subs = cls?.subjects;

  const { data } = useGetStudentById(Number(param.id));

  let results = data?.result ? JSON.parse(data.result) : {}; // Ensure results is always defined
  let termResult = term === 4 ? finalResult : results[Number(term)] || {}; // Ensure termResult is always defined

  const getGPA = (idx: number) => {
    if (
      !subs ||
      !subs[idx] ||
      !subs[idx].marks ||
      !subs[idx].marks[Number(term)]
    ) {
      return null; // Return null or handle the case when subs or required properties are not defined
    }

    // console.log("subjects",subs);

    const gpa = (
      (termResult[subs[idx]?.name] / subs[idx]?.marks[Number(term)]?.full) *
      4
    ).toFixed(2);

    return gpa;
  };

  function getGrade(idx: number) {
    const gpa = getGPA(idx);

    if (!gpa) return;
    // const numberGpa = parseInt(gpa);
    const numberGpa = Number(gpa);

    if (typeof numberGpa !== "number" || isNaN(numberGpa)) {
      return; // Handle invalid GPA case
    }
    // console.log("k xa gpa and idx", numberGpa, idx);
    // console.log("----------------------");

    // if(numberGpa)

    if (numberGpa > 3.6 && numberGpa <= 4.0) {
      return "A+";
    } else if (numberGpa >= 3.2 && numberGpa <= 3.6) {
      return "A";
    } else if (numberGpa >= 2.8 && numberGpa < 3.2) {
      return "B+";
    } else if (numberGpa >= 2.4 && numberGpa < 2.8) {
      return "B";
    } else if (numberGpa >= 2.0 && numberGpa < 2.4) {
      return "C+";
    } else if (numberGpa >= 1.6 && numberGpa < 2.0) {
      return "C";
    } else if (numberGpa >= 1.2 && numberGpa < 1.6) {
      return "D+";
    } else if (numberGpa >= 0.8 && numberGpa < 1.2) {
      return "D";
    } else if (numberGpa >= 0 && numberGpa < 0.8) {
      return "E";
    } else {
      return; // Handle invalid GPA case
    }
  }

  function getMarks(idx: number) {
    if (!termResult || !subs || !subs[idx]) {
      return null; // Handle case where termResult or subs or subs[idx] is not defined
    }
    return termResult[subs[idx]?.name];
  }
  return (
    <div>
      <svg
        className="print:block hidden"
        viewBox="0 0 595 842"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_878_18629)">
          <rect width="595" height="842" fill="white" />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="500"
            letterSpacing="0em"
          >
            <tspan x="7" y="126.91">
              THE GRADE(S) SECURED BY :
            </tspan>
          </text>
          <line
            x1="153.131"
            y1="130.305"
            x2="591.131"
            y2="130.305"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="900"
            letterSpacing="0em"
          >
            <tspan x="173.247" y="126.91">
              {data?.name?.toUpperCase()}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="500"
            letterSpacing="0em"
          >
            <tspan x="7" y="150.119">
              ADDRESS :
            </tspan>
          </text>
          <path
            d="M63.105 154.027H361.573"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="800"
            letterSpacing="0em"
          >
            <tspan x="81.9138" y="150.119">
              {data?.address?.toUpperCase()}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="500"
            letterSpacing="0em"
          >
            <tspan x="372.022" y="150.119">
              DATE OF BIRTH :
            </tspan>
          </text>
          <line
            x1="451.022"
            y1="153.514"
            x2="590.022"
            y2="153.514"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12.2622"
            fontWeight="800"
            letterSpacing="0em"
          >
            <tspan x="472.573" y="150.092">
              {formatDate(data?.dob)} BS
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="800"
            letterSpacing="0em"
          >
            <tspan x="401.068" y="220.295">
              {data?.roll_no}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="500"
            letterSpacing="0em"
          >
            <tspan x="7" y="173.329">
              FATHER&#x2019;S NAME :
            </tspan>
          </text>
          <line
            x1="90"
            y1="176.724"
            x2="588"
            y2="176.724"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="800"
            letterSpacing="0em"
          >
            <tspan x="144.573" y="173.092">
              {data?.father_name ? data.father_name.toUpperCase() : "---"}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="500"
            letterSpacing="0em"
          >
            <tspan x="7" y="196.539">
              MOTHER&#x2019;S NAME :
            </tspan>
          </text>
          <line
            x1="95"
            y1="199.934"
            x2="588"
            y2="199.934"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="800"
            letterSpacing="0em"
          >
            <tspan x="142.573" y="196.092">
              {data?.mother_name ? data.mother_name.toUpperCase() : "---"}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="500"
            letterSpacing="0em"
          >
            <tspan x="7" y="219.748">
              CLASS :
            </tspan>
          </text>
          <line
            x1="45"
            y1="223.144"
            x2="327.21"
            y2="223.144"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="800"
            letterSpacing="0em"
          >
            <tspan x="67.5469" y="219.748">
              {cls?.code}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="500"
            letterSpacing="0em"
          >
            <tspan x="331.315" y="219.748">
              ROLL NO.
            </tspan>
          </text>
          <line
            x1="376.315"
            y1="223.144"
            x2="586.315"
            y2="223.144"
            stroke="black"
            strokeWidth="1.02622"
          />
          <mask id="path-22-inside-1_878_18629" fill="white">
            <path d="M2 243H593V502H2V243Z" />
          </mask>
          <path
            d="M2 243V241.974H0.973783V243H2ZM593 243H594.026V241.974H593V243ZM593 502V503.026H594.026V502H593ZM2 502H0.973783V503.026H2V502ZM2 244.026H593V241.974H2V244.026ZM591.974 243V502H594.026V243H591.974ZM593 500.974H2V503.026H593V500.974ZM3.02622 502V243H0.973783V502H3.02622Z"
            fill="black"
            mask="url(#path-22-inside-1_878_18629)"
          />
          <mask id="path-24-inside-2_878_18629" fill="white">
            <path d="M2 243H30.7341V275.976H2V243Z" />
          </mask>
          <path
            d="M29.7079 243V275.976H31.7603V243H29.7079Z"
            fill="black"
            mask="url(#path-24-inside-2_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="8.36694" y="262.846">
              S.N
            </tspan>
          </text>
          <mask id="path-27-inside-3_878_18629" fill="white">
            <path d="M30.7341 243H296.524V275.976H30.7341V243Z" />
          </mask>
          <path
            d="M295.474 243V275.976H297.575V243H295.474Z"
            fill="black"
            mask="url(#path-27-inside-3_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.45558"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="141.629" y="262.926">
              SUBJECT
            </tspan>
          </text>
          <mask id="path-30-inside-4_878_18629" fill="white">
            <path d="M296.524 243H342.704V275.976H296.524V243Z" />
          </mask>
          <path
            d="M341.678 243V275.976H343.73V243H341.678Z"
            fill="black"
            mask="url(#path-30-inside-4_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="308.304" y="256.846">
              FULL&#10;
            </tspan>
            <tspan x="302.721" y="268.846">
              MARKS
            </tspan>
          </text>
          <mask id="path-33-inside-5_878_18629" fill="white">
            <path d="M342.704 243H388.884V275.976H342.704V243Z" />
          </mask>
          <path
            d="M387.857 243V275.976H389.91V243H387.857Z"
            fill="black"
            mask="url(#path-33-inside-5_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="353.762" y="256.846">
              PASS&#10;
            </tspan>
            <tspan x="348.9" y="268.846">
              MARKS
            </tspan>
          </text>
          <mask id="path-36-inside-6_878_18629" fill="white">
            <path d="M388.884 243H442.247V275.976H388.884V243Z" />
          </mask>
          <path
            d="M441.221 243V275.976H443.273V243H441.221Z"
            fill="black"
            mask="url(#path-36-inside-6_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="391.894" y="256.846">
              OBTAINED&#10;
            </tspan>
            <tspan x="397.603" y="268.846">
              {" "}
              MARKS
            </tspan>
          </text>
          <mask id="path-39-inside-7_878_18629" fill="white">
            <path d="M442.247 243H488.427V275.976H442.247V243Z" />
          </mask>
          <path
            d="M487.401 243V275.976H489.453V243H487.401Z"
            fill="black"
            mask="url(#path-39-inside-7_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="450.802" y="256.846">
              FINAL &#10;
            </tspan>
            <tspan x="449.151" y="268.846">
              GRADE
            </tspan>
          </text>
          <mask id="path-42-inside-8_878_18629" fill="white">
            <path d="M488.427 243H534.607V275.976H488.427V243Z" />
          </mask>
          <path
            d="M533.58 243V275.976H535.633V243H533.58Z"
            fill="black"
            mask="url(#path-42-inside-8_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="494.262" y="256.846">
              GRADE &#10;
            </tspan>
            <tspan x="497.14" y="268.846">
              POINT
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="540.87" y="262.846">
              {/*Remarks*/}
              REMARKS
            </tspan>
          </text>
          <mask id="path-47-inside-9_878_18629" fill="white">
            <path d="M2 275.976H593.101V298.552H2V275.976Z" />
          </mask>
          <path
            d="M2 277.002H593.101V274.949H2V277.002Z"
            fill="black"
            mask="url(#path-47-inside-9_878_18629)"
          />
          <mask id="path-49-inside-10_878_18629" fill="white">
            <path d="M2 275.976H30.7341V298.552H2V275.976Z" />
          </mask>
          <path
            d="M29.7079 275.976V298.552H31.7603V275.976H29.7079Z"
            fill="black"
            mask="url(#path-49-inside-10_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="10.8669" y="290.623">
              01
            </tspan>
          </text>
          <mask id="path-52-inside-11_878_18629" fill="white">
            <path d="M30.7341 273.885H296.524V300.643H30.7341V273.885Z" />
          </mask>
          <path
            d="M295.308 273.885V300.643H297.741V273.885H295.308Z"
            fill="black"
            mask="url(#path-52-inside-11_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="10.9463"
            letterSpacing="0em"
          >
            <tspan x="40.4641" y="291.245">
              {subs![0].name}
            </tspan>
          </text>
          <mask id="path-55-inside-12_878_18629" fill="white">
            <path d="M296.524 275.976H342.704V298.552H296.524V275.976Z" />
          </mask>
          <path
            d="M341.678 275.976V298.552H343.73V275.976H341.678Z"
            fill="black"
            mask="url(#path-55-inside-12_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="311.695" y="290.623">
              {subs![0].marks[term].full}
            </tspan>
          </text>
          <mask id="path-58-inside-13_878_18629" fill="white">
            <path d="M342.704 275.976H388.884V298.552H342.704V275.976Z" />
          </mask>
          <path
            d="M387.858 275.976V298.552H389.91V275.976H387.858Z"
            fill="black"
            mask="url(#path-58-inside-13_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="359.945" y="290.623">
              {subs![0]?.marks[term].pass}
            </tspan>
          </text>
          <mask id="path-61-inside-14_878_18629" fill="white">
            <path d="M388.884 275.976H442.247V298.552H388.884V275.976Z" />
          </mask>
          <path
            d="M441.221 275.976V298.552H443.273V275.976H441.221Z"
            fill="black"
            mask="url(#path-61-inside-14_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="409.793" y="290.623">
              {getMarks(0)}
            </tspan>
          </text>
          <mask id="path-64-inside-15_878_18629" fill="white">
            <path d="M442.247 275.976H488.427V298.552H442.247V275.976Z" />
          </mask>
          <path
            d="M487.401 275.976V298.552H489.453V275.976H487.401Z"
            fill="black"
            mask="url(#path-64-inside-15_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="458.933" y="290.623">
              {getGrade(0)}
            </tspan>
          </text>
          <mask id="path-67-inside-16_878_18629" fill="white">
            <path d="M488.427 275.976H534.607V298.552H488.427V275.976Z" />
          </mask>
          <path
            d="M533.581 275.976V298.552H535.633V275.976H533.581Z"
            fill="black"
            mask="url(#path-67-inside-16_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="504.486" y="290.623">
              {getGPA(0)}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="542" y="290.623">
              {/*Remarks*/}
            </tspan>
          </text>
          <mask id="path-72-inside-17_878_18629" fill="white">
            <path d="M2 298.552H593.101V321.129H2V298.552Z" />
          </mask>
          <path
            d="M2 299.579H593.101V297.526H2V299.579Z"
            fill="black"
            mask="url(#path-72-inside-17_878_18629)"
          />
          <mask id="path-74-inside-18_878_18629" fill="white">
            <path d="M2 298.552H30.7341V321.129H2V298.552Z" />
          </mask>
          <path
            d="M29.7079 298.552V321.129H31.7603V298.552H29.7079Z"
            fill="black"
            mask="url(#path-74-inside-18_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="10.3669" y="313.199">
              02
            </tspan>
          </text>
          <mask id="path-77-inside-19_878_18629" fill="white">
            <path d="M30.7341 296.462H296.524V323.22H30.7341V296.462Z" />
          </mask>
          <path
            d="M295.308 296.462V323.22H297.741V296.462H295.308Z"
            fill="black"
            mask="url(#path-77-inside-19_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="10.9463"
            letterSpacing="0em"
          >
            <tspan x="40.4641" y="313.821">
              {subs![1].name}
            </tspan>
          </text>
          <mask id="path-80-inside-20_878_18629" fill="white">
            <path d="M296.524 298.552H342.704V321.129H296.524V298.552Z" />
          </mask>
          <path
            d="M341.678 298.552V321.129H343.73V298.552H341.678Z"
            fill="black"
            mask="url(#path-80-inside-20_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="311.695" y="313.199">
              {subs![1].marks[term].full}
            </tspan>
          </text>
          <mask id="path-83-inside-21_878_18629" fill="white">
            <path d="M342.704 298.552H388.884V321.129H342.704V298.552Z" />
          </mask>
          <path
            d="M387.858 298.552V321.129H389.91V298.552H387.858Z"
            fill="black"
            mask="url(#path-83-inside-21_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="359.945" y="313.199">
              {subs![1].marks[term].pass}
            </tspan>
          </text>
          <mask id="path-86-inside-22_878_18629" fill="white">
            <path d="M388.884 298.552H442.247V321.129H388.884V298.552Z" />
          </mask>
          <path
            d="M441.221 298.552V321.129H443.273V298.552H441.221Z"
            fill="black"
            mask="url(#path-86-inside-22_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="409.793" y="313.199">
              {getMarks(1)}
            </tspan>
          </text>
          <mask id="path-89-inside-23_878_18629" fill="white">
            <path d="M442.247 298.552H488.427V321.129H442.247V298.552Z" />
          </mask>
          <path
            d="M487.401 298.552V321.129H489.453V298.552H487.401Z"
            fill="black"
            mask="url(#path-89-inside-23_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="458.933" y="313.199">
              {getGrade(1)}
            </tspan>
          </text>
          <mask id="path-92-inside-24_878_18629" fill="white">
            <path d="M488.427 298.552H534.607V321.129H488.427V298.552Z" />
          </mask>
          <path
            d="M533.581 298.552V321.129H535.633V298.552H533.581Z"
            fill="black"
            mask="url(#path-92-inside-24_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="504.486" y="313.199">
              {/* {getGPA(0)} */}
              {getGPA(1)}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="542" y="313.199">
              {/*Remarks*/}
            </tspan>
          </text>
          <mask id="path-97-inside-25_878_18629" fill="white">
            <path d="M2 321.129H593.101V343.706H2V321.129Z" />
          </mask>
          <path
            d="M2 322.155H593.101V320.103H2V322.155Z"
            fill="black"
            mask="url(#path-97-inside-25_878_18629)"
          />
          <mask id="path-99-inside-26_878_18629" fill="white">
            <path d="M2 321.129H30.7341V343.706H2V321.129Z" />
          </mask>
          <path
            d="M29.7079 321.129V343.706H31.7603V321.129H29.7079Z"
            fill="black"
            mask="url(#path-99-inside-26_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="10.3669" y="335.776">
              03
            </tspan>
          </text>
          <mask id="path-102-inside-27_878_18629" fill="white">
            <path d="M30.7341 319.039H296.524V345.796H30.7341V319.039Z" />
          </mask>
          <path
            d="M295.308 319.039V345.796H297.741V319.039H295.308Z"
            fill="black"
            mask="url(#path-102-inside-27_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="10.9463"
            letterSpacing="0em"
          >
            <tspan x="40.4641" y="336.398">
              {subs![2].name}
            </tspan>
          </text>
          <mask id="path-105-inside-28_878_18629" fill="white">
            <path d="M296.524 321.129H342.704V343.706H296.524V321.129Z" />
          </mask>
          <path
            d="M341.678 321.129V343.706H343.73V321.129H341.678Z"
            fill="black"
            mask="url(#path-105-inside-28_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="311.695" y="335.776">
              {subs![2].marks[term].full}
            </tspan>
          </text>
          <mask id="path-108-inside-29_878_18629" fill="white">
            <path d="M342.704 321.129H388.884V343.706H342.704V321.129Z" />
          </mask>
          <path
            d="M387.858 321.129V343.706H389.91V321.129H387.858Z"
            fill="black"
            mask="url(#path-108-inside-29_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="359.945" y="335.776">
              {subs![2].marks[term].pass}
            </tspan>
          </text>
          <mask id="path-111-inside-30_878_18629" fill="white">
            <path d="M388.884 321.129H442.247V343.706H388.884V321.129Z" />
          </mask>
          <path
            d="M441.221 321.129V343.706H443.273V321.129H441.221Z"
            fill="black"
            mask="url(#path-111-inside-30_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="409.793" y="335.776">
              {getMarks(2)}
            </tspan>
          </text>
          <mask id="path-114-inside-31_878_18629" fill="white">
            <path d="M442.247 321.129H488.427V343.706H442.247V321.129Z" />
          </mask>
          <path
            d="M487.401 321.129V343.706H489.453V321.129H487.401Z"
            fill="black"
            mask="url(#path-114-inside-31_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="458.933" y="335.776">
              {getGrade(2)}
            </tspan>
          </text>
          <mask id="path-117-inside-32_878_18629" fill="white">
            <path d="M488.427 321.129H534.607V343.706H488.427V321.129Z" />
          </mask>
          <path
            d="M533.581 321.129V343.706H535.633V321.129H533.581Z"
            fill="black"
            mask="url(#path-117-inside-32_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="504.486" y="335.776">
              {getGPA(2)}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="542" y="335.776">
              {/*Remarks*/}
            </tspan>
          </text>
          <mask id="path-122-inside-33_878_18629" fill="white">
            <path d="M2 343.706H593.101V366.283H2V343.706Z" />
          </mask>
          <path
            d="M2 344.732H593.101V342.68H2V344.732Z"
            fill="black"
            mask="url(#path-122-inside-33_878_18629)"
          />
          <mask id="path-124-inside-34_878_18629" fill="white">
            <path d="M2 343.706H30.7341V366.283H2V343.706Z" />
          </mask>
          <path
            d="M29.7079 343.706V366.283H31.7603V343.706H29.7079Z"
            fill="black"
            mask="url(#path-124-inside-34_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="10.3669" y="358.353">
              04
            </tspan>
          </text>
          <mask id="path-127-inside-35_878_18629" fill="white">
            <path d="M30.7341 341.616H296.524V368.373H30.7341V341.616Z" />
          </mask>
          <path
            d="M295.308 341.616V368.373H297.741V341.616H295.308Z"
            fill="black"
            mask="url(#path-127-inside-35_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="10.9463"
            letterSpacing="0em"
          >
            <tspan x="40.4641" y="358.975">
              {subs![3].name}
            </tspan>
          </text>
          <mask id="path-130-inside-36_878_18629" fill="white">
            <path d="M296.524 343.706H342.704V366.283H296.524V343.706Z" />
          </mask>
          <path
            d="M341.678 343.706V366.283H343.73V343.706H341.678Z"
            fill="black"
            mask="url(#path-130-inside-36_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="311.695" y="358.353">
              {subs![3].marks[term].full}
            </tspan>
          </text>
          <mask id="path-133-inside-37_878_18629" fill="white">
            <path d="M342.704 343.706H388.884V366.283H342.704V343.706Z" />
          </mask>
          <path
            d="M387.858 343.706V366.283H389.91V343.706H387.858Z"
            fill="black"
            mask="url(#path-133-inside-37_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="359.945" y="358.353">
              {subs![3].marks[term].pass}
            </tspan>
          </text>
          <mask id="path-136-inside-38_878_18629" fill="white">
            <path d="M388.884 343.706H442.247V366.283H388.884V343.706Z" />
          </mask>
          <path
            d="M441.221 343.706V366.283H443.273V343.706H441.221Z"
            fill="black"
            mask="url(#path-136-inside-38_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="409.793" y="358.353">
              {getMarks(3)}
            </tspan>
          </text>
          <mask id="path-139-inside-39_878_18629" fill="white">
            <path d="M442.247 343.706H488.427V366.283H442.247V343.706Z" />
          </mask>
          <path
            d="M487.401 343.706V366.283H489.453V343.706H487.401Z"
            fill="black"
            mask="url(#path-139-inside-39_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="458.933" y="358.353">
              {getGrade(3)}
            </tspan>
          </text>
          <mask id="path-142-inside-40_878_18629" fill="white">
            <path d="M488.427 343.706H534.607V366.283H488.427V343.706Z" />
          </mask>
          <path
            d="M533.581 343.706V366.283H535.633V343.706H533.581Z"
            fill="black"
            mask="url(#path-142-inside-40_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="504.486" y="358.353">
              {getGPA(3)}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="542" y="358.353">
              {/*Remarks*/}
            </tspan>
          </text>
          <mask id="path-147-inside-41_878_18629" fill="white">
            <path d="M2 366.283H593.101V388.86H2V366.283Z" />
          </mask>
          <path
            d="M2 367.309H593.101V365.257H2V367.309Z"
            fill="black"
            mask="url(#path-147-inside-41_878_18629)"
          />
          <mask id="path-149-inside-42_878_18629" fill="white">
            <path d="M2 366.283H30.7341V388.86H2V366.283Z" />
          </mask>
          <path
            d="M29.7079 366.283V388.86H31.7603V366.283H29.7079Z"
            fill="black"
            mask="url(#path-149-inside-42_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="10.3669" y="380.93">
              05
            </tspan>
          </text>
          <mask id="path-152-inside-43_878_18629" fill="white">
            <path d="M30.7341 364.192H296.524V390.95H30.7341V364.192Z" />
          </mask>
          <path
            d="M295.308 364.192V390.95H297.741V364.192H295.308Z"
            fill="black"
            mask="url(#path-152-inside-43_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="10.9463"
            letterSpacing="0em"
          >
            <tspan x="40.4641" y="381.552">
              {subs![4].name}
            </tspan>
          </text>
          <mask id="path-155-inside-44_878_18629" fill="white">
            <path d="M296.524 366.283H342.704V388.86H296.524V366.283Z" />
          </mask>
          <path
            d="M341.678 366.283V388.86H343.73V366.283H341.678Z"
            fill="black"
            mask="url(#path-155-inside-44_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="311.695" y="380.93">
              {subs![4].marks[term].full}
            </tspan>
          </text>
          <mask id="path-158-inside-45_878_18629" fill="white">
            <path d="M342.704 366.283H388.884V388.86H342.704V366.283Z" />
          </mask>
          <path
            d="M387.858 366.283V388.86H389.91V366.283H387.858Z"
            fill="black"
            mask="url(#path-158-inside-45_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="359.945" y="380.93">
              {subs![4].marks[term].pass}
            </tspan>
          </text>
          <mask id="path-161-inside-46_878_18629" fill="white">
            <path d="M388.884 366.283H442.247V388.86H388.884V366.283Z" />
          </mask>
          <path
            d="M441.221 366.283V388.86H443.273V366.283H441.221Z"
            fill="black"
            mask="url(#path-161-inside-46_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="409.793" y="380.93">
              {getMarks(4)}
            </tspan>
          </text>
          <mask id="path-164-inside-47_878_18629" fill="white">
            <path d="M442.247 366.283H488.427V388.86H442.247V366.283Z" />
          </mask>
          <path
            d="M487.401 366.283V388.86H489.453V366.283H487.401Z"
            fill="black"
            mask="url(#path-164-inside-47_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="458.933" y="380.93">
              {getGrade(4)}
            </tspan>
          </text>
          <mask id="path-167-inside-48_878_18629" fill="white">
            <path d="M488.427 366.283H534.607V388.86H488.427V366.283Z" />
          </mask>
          <path
            d="M533.581 366.283V388.86H535.633V366.283H533.581Z"
            fill="black"
            mask="url(#path-167-inside-48_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="504.486" y="380.93">
              {getGPA(4)}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="542" y="380.93">
              {/*Remarks*/}
            </tspan>
          </text>
          <mask id="path-172-inside-49_878_18629" fill="white">
            <path d="M2 388.86H593.101V411.436H2V388.86Z" />
          </mask>
          <path
            d="M2 389.886H593.101V387.833H2V389.886Z"
            fill="black"
            mask="url(#path-172-inside-49_878_18629)"
          />
          <mask id="path-174-inside-50_878_18629" fill="white">
            <path d="M2 388.86H30.7341V411.436H2V388.86Z" />
          </mask>
          <path
            d="M29.7079 388.86V411.436H31.7603V388.86H29.7079Z"
            fill="black"
            mask="url(#path-174-inside-50_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="10.3669" y="403.506">
              06
            </tspan>
          </text>
          <mask id="path-177-inside-51_878_18629" fill="white">
            <path d="M30.7341 386.769H296.524V413.527H30.7341V386.769Z" />
          </mask>
          <path
            d="M295.308 386.769V413.527H297.741V386.769H295.308Z"
            fill="black"
            mask="url(#path-177-inside-51_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="10.9463"
            letterSpacing="0em"
          >
            <tspan x="40.4641" y="404.128">
              {subs![5]?.name}
            </tspan>
          </text>
          <mask id="path-180-inside-52_878_18629" fill="white">
            <path d="M296.524 388.86H342.704V411.436H296.524V388.86Z" />
          </mask>
          <path
            d="M341.678 388.86V411.436H343.73V388.86H341.678Z"
            fill="black"
            mask="url(#path-180-inside-52_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="311.695" y="403.506">
              {subs![5]?.marks[term].full}
            </tspan>
          </text>
          <mask id="path-183-inside-53_878_18629" fill="white">
            <path d="M342.704 388.86H388.884V411.436H342.704V388.86Z" />
          </mask>
          <path
            d="M387.858 388.86V411.436H389.91V388.86H387.858Z"
            fill="black"
            mask="url(#path-183-inside-53_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="359.945" y="403.506">
              {subs![5]?.marks[term].pass}
            </tspan>
          </text>
          <mask id="path-186-inside-54_878_18629" fill="white">
            <path d="M388.884 388.86H442.247V411.436H388.884V388.86Z" />
          </mask>
          <path
            d="M441.221 388.86V411.436H443.273V388.86H441.221Z"
            fill="black"
            mask="url(#path-186-inside-54_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="409.793" y="403.506">
              {getMarks(5)}
            </tspan>
          </text>
          <mask id="path-189-inside-55_878_18629" fill="white">
            <path d="M442.247 388.86H488.427V411.436H442.247V388.86Z" />
          </mask>
          <path
            d="M487.401 388.86V411.436H489.453V388.86H487.401Z"
            fill="black"
            mask="url(#path-189-inside-55_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="458.933" y="403.506">
              {getGrade(5)}
            </tspan>
          </text>
          <mask id="path-192-inside-56_878_18629" fill="white">
            <path d="M488.427 388.86H534.607V411.436H488.427V388.86Z" />
          </mask>
          <path
            d="M533.581 388.86V411.436H535.633V388.86H533.581Z"
            fill="black"
            mask="url(#path-192-inside-56_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="504.486" y="403.506">
              {getGPA(5)}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="542" y="403.506">
              {/*Remarks*/}
            </tspan>
          </text>
          <mask id="path-197-inside-57_878_18629" fill="white">
            <path d="M2 411.436H593.101V434.013H2V411.436Z" />
          </mask>
          <path
            d="M2 412.463H593.101V410.41H2V412.463Z"
            fill="black"
            mask="url(#path-197-inside-57_878_18629)"
          />
          <mask id="path-199-inside-58_878_18629" fill="white">
            <path d="M2 411.436H30.7341V434.013H2V411.436Z" />
          </mask>
          <path
            d="M29.7079 411.436V434.013H31.7603V411.436H29.7079Z"
            fill="black"
            mask="url(#path-199-inside-58_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="10.8669" y="426.083">
              07
            </tspan>
          </text>
          <mask id="path-202-inside-59_878_18629" fill="white">
            <path d="M30.7341 409.346H296.524V436.104H30.7341V409.346Z" />
          </mask>
          <path
            d="M295.308 409.346V436.104H297.741V409.346H295.308Z"
            fill="black"
            mask="url(#path-202-inside-59_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="10.9463"
            letterSpacing="0em"
          >
            <tspan x="40.4641" y="426.705">
              {subs![6]?.name}
            </tspan>
          </text>
          <mask id="path-205-inside-60_878_18629" fill="white">
            <path d="M296.524 411.436H342.704V434.013H296.524V411.436Z" />
          </mask>
          <path
            d="M341.678 411.436V434.013H343.73V411.436H341.678Z"
            fill="black"
            mask="url(#path-205-inside-60_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="311.695" y="426.083">
              {subs![6]?.marks[term].full}
            </tspan>
          </text>
          <mask id="path-208-inside-61_878_18629" fill="white">
            <path d="M342.704 411.436H388.884V434.013H342.704V411.436Z" />
          </mask>
          <path
            d="M387.858 411.436V434.013H389.91V411.436H387.858Z"
            fill="black"
            mask="url(#path-208-inside-61_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="359.945" y="426.083">
              {subs![6]?.marks[term].pass}
            </tspan>
          </text>
          <mask id="path-211-inside-62_878_18629" fill="white">
            <path d="M388.884 411.436H442.247V434.013H388.884V411.436Z" />
          </mask>
          <path
            d="M441.221 411.436V434.013H443.273V411.436H441.221Z"
            fill="black"
            mask="url(#path-211-inside-62_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="409.793" y="426.083">
              {getMarks(6)}
            </tspan>
          </text>
          <mask id="path-214-inside-63_878_18629" fill="white">
            <path d="M442.247 411.436H488.427V434.013H442.247V411.436Z" />
          </mask>
          <path
            d="M487.401 411.436V434.013H489.453V411.436H487.401Z"
            fill="black"
            mask="url(#path-214-inside-63_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="458.933" y="426.083">
              {getGrade(6)}
            </tspan>
          </text>
          <mask id="path-217-inside-64_878_18629" fill="white">
            <path d="M488.427 411.436H534.607V434.013H488.427V411.436Z" />
          </mask>
          <path
            d="M533.581 411.436V434.013H535.633V411.436H533.581Z"
            fill="black"
            mask="url(#path-217-inside-64_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="504.486" y="426.083">
              {getGPA(6)}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="542" y="426.083">
              {/*Remarks*/}
            </tspan>
          </text>
          <mask id="path-222-inside-65_878_18629" fill="white">
            <path d="M2 434.013H593.101V456.59H2V434.013Z" />
          </mask>
          <path
            d="M2 435.039H593.101V432.987H2V435.039Z"
            fill="black"
            mask="url(#path-222-inside-65_878_18629)"
          />
          <mask id="path-224-inside-66_878_18629" fill="white">
            <path d="M2 434.013H30.7341V456.59H2V434.013Z" />
          </mask>
          <path
            d="M29.7079 434.013V456.59H31.7603V434.013H29.7079Z"
            fill="black"
            mask="url(#path-224-inside-66_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="10.3669" y="448.66">
              08
            </tspan>
          </text>
          <mask id="path-227-inside-67_878_18629" fill="white">
            <path d="M30.7341 431.923H296.524V458.68H30.7341V431.923Z" />
          </mask>
          <path
            d="M295.308 431.923V458.68H297.741V431.923H295.308Z"
            fill="black"
            mask="url(#path-227-inside-67_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="10.9463"
            letterSpacing="0em"
          >
            <tspan x="40.4641" y="449.282">
              {subs![7]?.name}
            </tspan>
          </text>
          <mask id="path-230-inside-68_878_18629" fill="white">
            <path d="M296.524 434.013H342.704V456.59H296.524V434.013Z" />
          </mask>
          <path
            d="M341.678 434.013V456.59H343.73V434.013H341.678Z"
            fill="black"
            mask="url(#path-230-inside-68_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="311.695" y="448.66">
              {subs![7]?.marks[term].full}
            </tspan>
          </text>
          <mask id="path-233-inside-69_878_18629" fill="white">
            <path d="M342.704 434.013H388.884V456.59H342.704V434.013Z" />
          </mask>
          <path
            d="M387.858 434.013V456.59H389.91V434.013H387.858Z"
            fill="black"
            mask="url(#path-233-inside-69_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="359.945" y="448.66">
              {subs![7]?.marks[term].pass}
            </tspan>
          </text>
          <mask id="path-236-inside-70_878_18629" fill="white">
            <path d="M388.884 434.013H442.247V456.59H388.884V434.013Z" />
          </mask>
          <path
            d="M441.221 434.013V456.59H443.273V434.013H441.221Z"
            fill="black"
            mask="url(#path-236-inside-70_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="409.793" y="448.66">
              {getMarks(7)}
            </tspan>
          </text>
          <mask id="path-239-inside-71_878_18629" fill="white">
            <path d="M442.247 434.013H488.427V456.59H442.247V434.013Z" />
          </mask>
          <path
            d="M487.401 434.013V456.59H489.453V434.013H487.401Z"
            fill="black"
            mask="url(#path-239-inside-71_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="458.933" y="448.66">
              {getGrade(7)}
            </tspan>
          </text>
          <mask id="path-242-inside-72_878_18629" fill="white">
            <path d="M488.427 434.013H534.607V456.59H488.427V434.013Z" />
          </mask>
          <path
            d="M533.581 434.013V456.59H535.633V434.013H533.581Z"
            fill="black"
            mask="url(#path-242-inside-72_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="504.486" y="448.66">
              {getGPA(7)}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="542" y="448.66">
              {/*Remarks*/}
            </tspan>
          </text>
          <mask id="path-247-inside-73_878_18629" fill="white">
            <path d="M2 456.59H593.101V479.167H2V456.59Z" />
          </mask>
          <path
            d="M2 457.616H593.101V455.564H2V457.616Z"
            fill="black"
            mask="url(#path-247-inside-73_878_18629)"
          />
          <mask id="path-249-inside-74_878_18629" fill="white">
            <path d="M2 456.59H30.7341V479.167H2V456.59Z" />
          </mask>
          <path
            d="M29.7079 456.59V479.167H31.7603V456.59H29.7079Z"
            fill="black"
            mask="url(#path-249-inside-74_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="10.3669" y="471.237">
              09
            </tspan>
          </text>
          <mask id="path-252-inside-75_878_18629" fill="white">
            <path d="M30.7341 454.499H296.524V481.257H30.7341V454.499Z" />
          </mask>
          <path
            d="M295.308 454.499V481.257H297.741V454.499H295.308Z"
            fill="black"
            mask="url(#path-252-inside-75_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="10.9463"
            letterSpacing="0em"
          >
            <tspan x="40.4641" y="471.859">
              {subs![8]?.name}
            </tspan>
          </text>
          <mask id="path-255-inside-76_878_18629" fill="white">
            <path d="M296.524 456.59H342.704V479.167H296.524V456.59Z" />
          </mask>
          <path
            d="M341.678 456.59V479.167H343.73V456.59H341.678Z"
            fill="black"
            mask="url(#path-255-inside-76_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="311.695" y="471.237">
              {subs![8]?.marks[term].full}
            </tspan>
          </text>
          <mask id="path-258-inside-77_878_18629" fill="white">
            <path d="M342.704 456.59H388.884V479.167H342.704V456.59Z" />
          </mask>
          <path
            d="M387.858 456.59V479.167H389.91V456.59H387.858Z"
            fill="black"
            mask="url(#path-258-inside-77_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="359.945" y="471.237">
              {subs![8]?.marks[term].pass}
            </tspan>
          </text>
          <mask id="path-261-inside-78_878_18629" fill="white">
            <path d="M388.884 456.59H442.247V479.167H388.884V456.59Z" />
          </mask>
          <path
            d="M441.221 456.59V479.167H443.273V456.59H441.221Z"
            fill="black"
            mask="url(#path-261-inside-78_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="409.793" y="471.237">
              {getMarks(8)}
            </tspan>
          </text>
          <mask id="path-264-inside-79_878_18629" fill="white">
            <path d="M442.247 456.59H488.427V479.167H442.247V456.59Z" />
          </mask>
          <path
            d="M487.401 456.59V479.167H489.453V456.59H487.401Z"
            fill="black"
            mask="url(#path-264-inside-79_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="458.933" y="471.237">
              {getGrade(8)}
            </tspan>
          </text>
          <mask id="path-267-inside-80_878_18629" fill="white">
            <path d="M488.427 456.59H534.607V479.167H488.427V456.59Z" />
          </mask>
          <path
            d="M533.581 456.59V479.167H535.633V456.59H533.581Z"
            fill="black"
            mask="url(#path-267-inside-80_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="504.486" y="471.237">
              {getGPA(8)}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="542" y="471.237">
              {/*Remarks*/}
            </tspan>
          </text>
          <mask id="path-272-inside-81_878_18629" fill="white">
            <path d="M2 479.167H593.101V501.743H2V479.167Z" />
          </mask>
          <path
            d="M2 480.193H593.101V478.14H2V480.193Z"
            fill="black"
            mask="url(#path-272-inside-81_878_18629)"
          />
          <mask id="path-274-inside-82_878_18629" fill="white">
            <path d="M2 479.167H30.7341V501.743H2V479.167Z" />
          </mask>
          <path
            d="M29.7079 479.167V501.743H31.7603V479.167H29.7079Z"
            fill="black"
            mask="url(#path-274-inside-82_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="10.8669" y="493.814">
              10
            </tspan>
          </text>
          <mask id="path-277-inside-83_878_18629" fill="white">
            <path d="M30.7341 477.076H296.524V503.834H30.7341V477.076Z" />
          </mask>
          <path
            d="M295.308 477.076V503.834H297.741V477.076H295.308Z"
            fill="black"
            mask="url(#path-277-inside-83_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="10.9463"
            letterSpacing="0em"
          >
            <tspan x="40.4641" y="494.436">
              {subs![9]?.name}
            </tspan>
          </text>
          <mask id="path-280-inside-84_878_18629" fill="white">
            <path d="M296.524 479.167H342.704V501.743H296.524V479.167Z" />
          </mask>
          <path
            d="M341.678 479.167V501.743H343.73V479.167H341.678Z"
            fill="black"
            mask="url(#path-280-inside-84_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="311.695" y="493.814">
              {subs![9]?.marks[term].full}
            </tspan>
          </text>
          <mask id="path-283-inside-85_878_18629" fill="white">
            <path d="M342.704 479.167H388.884V501.743H342.704V479.167Z" />
          </mask>
          <path
            d="M387.858 479.167V501.743H389.91V479.167H387.858Z"
            fill="black"
            mask="url(#path-283-inside-85_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="359.945" y="493.814">
              {subs![9]?.marks[term].pass}
            </tspan>
          </text>
          <mask id="path-286-inside-86_878_18629" fill="white">
            <path d="M388.884 479.167H442.247V501.743H388.884V479.167Z" />
          </mask>
          <path
            d="M441.221 479.167V501.743H443.273V479.167H441.221Z"
            fill="black"
            mask="url(#path-286-inside-86_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="409.793" y="493.814">
              {getMarks(9)}
            </tspan>
          </text>
          <mask id="path-289-inside-87_878_18629" fill="white">
            <path d="M442.247 479.167H488.427V501.743H442.247V479.167Z" />
          </mask>
          <path
            d="M487.401 479.167V501.743H489.453V479.167H487.401Z"
            fill="black"
            mask="url(#path-289-inside-87_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="458.933" y="493.814">
              {getGrade(9)}
            </tspan>
          </text>
          <mask id="path-292-inside-88_878_18629" fill="white">
            <path d="M488.427 479.167H534.607V501.743H488.427V479.167Z" />
          </mask>
          <path
            d="M533.581 479.167V501.743H535.633V479.167H533.581Z"
            fill="black"
            mask="url(#path-292-inside-88_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="504.486" y="493.814">
              {getGPA(9)}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            letterSpacing="0em"
          >
            <tspan x="542" y="493.814">
              {/*Remarks*/}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="121.55" y="518.359">
              Details of Grade Sheet
            </tspan>
          </text>
          <rect
            x="4.21355"
            y="521.513"
            width="335.573"
            height="205.243"
            stroke="black"
            strokeWidth="1.02622"
          />
          <mask id="path-299-inside-89_878_18629" fill="white">
            <path d="M3.70044 521H32.4345V551.787H3.70044V521Z" />
          </mask>
          <path
            d="M31.4083 521V551.787H33.4607V521H31.4083Z"
            fill="black"
            mask="url(#path-299-inside-89_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="10.0674" y="539.752">
              S.N
            </tspan>
          </text>
          <mask id="path-302-inside-90_878_18629" fill="white">
            <path d="M32.4346 521H135.056V551.786H32.4346V521Z" />
          </mask>
          <path
            d="M134.03 521V551.786H136.083V521H134.03Z"
            fill="black"
            mask="url(#path-302-inside-90_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="60.0512" y="533.752">
              INTERVAL &#10;
            </tspan>
            <tspan x="56.3577" y="545.752">
              IN PERCENT
            </tspan>
          </text>
          <mask id="path-305-inside-91_878_18629" fill="white">
            <path d="M135.056 521H186.367V551.786H135.056V521Z" />
          </mask>
          <path
            d="M185.341 521V551.786H187.393V521H185.341Z"
            fill="black"
            mask="url(#path-305-inside-91_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="144.526" y="539.752">
              GRADE
            </tspan>
          </text>
          <mask id="path-308-inside-92_878_18629" fill="white">
            <path d="M186.367 521H288.989V551.786H186.367V521Z" />
          </mask>
          <path
            d="M287.962 521V551.786H290.015V521H287.962Z"
            fill="black"
            mask="url(#path-308-inside-92_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="213.984" y="533.752">
              INTERVAL &#10;
            </tspan>
            <tspan x="210.29" y="545.752">
              IN PERCENT
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="298.459" y="539.752">
              GRADE
            </tspan>
          </text>
          <mask id="path-312-inside-93_878_18629" fill="white">
            <path d="M3.70044 551.786H340.3V571.285H3.70044V551.786Z" />
          </mask>
          <path
            d="M3.70044 552.813H340.3V550.76H3.70044V552.813Z"
            fill="black"
            mask="url(#path-312-inside-93_878_18629)"
          />
          <mask id="path-314-inside-94_878_18629" fill="white">
            <path d="M3.70044 551.786H32.4345V571.285H3.70044V551.786Z" />
          </mask>
          <path
            d="M31.4083 551.786V571.285H33.4607V551.786H31.4083Z"
            fill="black"
            mask="url(#path-314-inside-94_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="15.5674" y="564.894">
              1
            </tspan>
          </text>
          <mask id="path-317-inside-95_878_18629" fill="white">
            <path d="M32.4346 551.786H135.056V571.285H32.4346V551.786Z" />
          </mask>
          <path
            d="M134.03 551.786V571.285H136.083V551.786H134.03Z"
            fill="black"
            mask="url(#path-317-inside-95_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="62.4639" y="564.894">
              90 to 100
            </tspan>
          </text>
          <mask id="path-320-inside-96_878_18629" fill="white">
            <path d="M135.056 551.786H186.367V571.285H135.056V551.786Z" />
          </mask>
          <path
            d="M185.341 551.786V571.285H187.393V551.786H185.341Z"
            fill="black"
            mask="url(#path-320-inside-96_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="154.263" y="564.894">
              A+
            </tspan>
          </text>
          <mask id="path-323-inside-97_878_18629" fill="white">
            <path d="M186.367 551.786H288.989V571.285H186.367V551.786Z" />
          </mask>
          <path
            d="M287.963 551.786V571.285H290.015V551.786H287.963Z"
            fill="black"
            mask="url(#path-323-inside-97_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="210.006" y="564.894">
              Outstanding
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="307.375" y="564.894">
              4.0
            </tspan>
          </text>
          <mask id="path-327-inside-98_878_18629" fill="white">
            <path d="M3.70044 571.285H340.3V590.783H3.70044V571.285Z" />
          </mask>
          <path
            d="M3.70044 572.311H340.3V570.258H3.70044V572.311Z"
            fill="black"
            mask="url(#path-327-inside-98_878_18629)"
          />
          <mask id="path-329-inside-99_878_18629" fill="white">
            <path d="M3.70044 571.285H32.4345V590.783H3.70044V571.285Z" />
          </mask>
          <path
            d="M31.4083 571.285V590.783H33.4607V571.285H31.4083Z"
            fill="black"
            mask="url(#path-329-inside-99_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="15.0674" y="584.392">
              2
            </tspan>
          </text>
          <mask id="path-332-inside-100_878_18629" fill="white">
            <path d="M32.4346 571.285H135.056V590.783H32.4346V571.285Z" />
          </mask>
          <path
            d="M134.03 571.285V590.783H136.083V571.285H134.03Z"
            fill="black"
            mask="url(#path-332-inside-100_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="50.1838" y="584.392">
              80 to below 90
            </tspan>
          </text>
          <mask id="path-335-inside-101_878_18629" fill="white">
            <path d="M135.056 571.285H186.367V590.783H135.056V571.285Z" />
          </mask>
          <path
            d="M185.341 571.285V590.783H187.393V571.285H185.341Z"
            fill="black"
            mask="url(#path-335-inside-101_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="157.37" y="584.392">
              A
            </tspan>
          </text>
          <mask id="path-338-inside-102_878_18629" fill="white">
            <path d="M186.367 571.285H288.989V590.783H186.367V571.285Z" />
          </mask>
          <path
            d="M287.963 571.285V590.783H290.015V571.285H287.963Z"
            fill="black"
            mask="url(#path-338-inside-102_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="214.516" y="584.392">
              Execellent
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="307.532" y="584.392">
              3.6
            </tspan>
          </text>
          <mask id="path-342-inside-103_878_18629" fill="white">
            <path d="M3.70044 590.783H340.3V610.281H3.70044V590.783Z" />
          </mask>
          <path
            d="M3.70044 591.809H340.3V589.757H3.70044V591.809Z"
            fill="black"
            mask="url(#path-342-inside-103_878_18629)"
          />
          <mask id="path-344-inside-104_878_18629" fill="white">
            <path d="M3.70044 590.783H32.4345V610.281H3.70044V590.783Z" />
          </mask>
          <path
            d="M31.4083 590.783V610.281H33.4607V590.783H31.4083Z"
            fill="black"
            mask="url(#path-344-inside-104_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="14.5674" y="603.89">
              3
            </tspan>
          </text>
          <mask id="path-347-inside-105_878_18629" fill="white">
            <path d="M32.4346 590.783H135.056V610.281H32.4346V590.783Z" />
          </mask>
          <path
            d="M134.03 590.783V610.281H136.083V590.783H134.03Z"
            fill="black"
            mask="url(#path-347-inside-105_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="50.5401" y="603.89">
              70 to below 80
            </tspan>
          </text>
          <mask id="path-350-inside-106_878_18629" fill="white">
            <path d="M135.056 590.783H186.367V610.281H135.056V590.783Z" />
          </mask>
          <path
            d="M185.341 590.783V610.281H187.393V590.783H185.341Z"
            fill="black"
            mask="url(#path-350-inside-106_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="154.569" y="603.89">
              B+
            </tspan>
          </text>
          <mask id="path-353-inside-107_878_18629" fill="white">
            <path d="M186.367 590.783H288.989V610.281H186.367V590.783Z" />
          </mask>
          <path
            d="M287.963 590.783V610.281H290.015V590.783H287.963Z"
            fill="black"
            mask="url(#path-353-inside-107_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="214.142" y="603.89">
              Very Good
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="307.528" y="603.89">
              3.2
            </tspan>
          </text>
          <mask id="path-357-inside-108_878_18629" fill="white">
            <path d="M3.70044 610.281H340.3V629.779H3.70044V610.281Z" />
          </mask>
          <path
            d="M3.70044 611.307H340.3V609.255H3.70044V611.307Z"
            fill="black"
            mask="url(#path-357-inside-108_878_18629)"
          />
          <mask id="path-359-inside-109_878_18629" fill="white">
            <path d="M3.70044 610.281H32.4345V629.779H3.70044V610.281Z" />
          </mask>
          <path
            d="M31.4083 610.281V629.779H33.4607V610.281H31.4083Z"
            fill="black"
            mask="url(#path-359-inside-109_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="14.5674" y="623.388">
              4
            </tspan>
          </text>
          <mask id="path-362-inside-110_878_18629" fill="white">
            <path d="M32.4346 610.281H135.056V629.779H32.4346V610.281Z" />
          </mask>
          <path
            d="M134.03 610.281V629.779H136.083V610.281H134.03Z"
            fill="black"
            mask="url(#path-362-inside-110_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="50.5266" y="623.388">
              60 to below 70
            </tspan>
          </text>
          <mask id="path-365-inside-111_878_18629" fill="white">
            <path d="M135.056 610.281H186.367V629.779H135.056V610.281Z" />
          </mask>
          <path
            d="M185.341 610.281V629.779H187.393V610.281H185.341Z"
            fill="black"
            mask="url(#path-365-inside-111_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="157.677" y="623.388">
              B
            </tspan>
          </text>
          <mask id="path-368-inside-112_878_18629" fill="white">
            <path d="M186.367 610.281H288.989V629.779H186.367V610.281Z" />
          </mask>
          <path
            d="M287.963 610.281V629.779H290.015V610.281H287.963Z"
            fill="black"
            mask="url(#path-368-inside-112_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="225.664" y="623.388">
              Good
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="307.582" y="623.388">
              2.8
            </tspan>
          </text>
          <mask id="path-372-inside-113_878_18629" fill="white">
            <path d="M3.70044 629.779H340.3V649.277H3.70044V629.779Z" />
          </mask>
          <path
            d="M3.70044 630.805H340.3V628.753H3.70044V630.805Z"
            fill="black"
            mask="url(#path-372-inside-113_878_18629)"
          />
          <mask id="path-374-inside-114_878_18629" fill="white">
            <path d="M3.70044 629.779H32.4345V649.277H3.70044V629.779Z" />
          </mask>
          <path
            d="M31.4083 629.779V649.277H33.4607V629.779H31.4083Z"
            fill="black"
            mask="url(#path-374-inside-114_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="15.0674" y="642.887">
              5
            </tspan>
          </text>
          <mask id="path-377-inside-115_878_18629" fill="white">
            <path d="M32.4346 629.779H135.056V649.277H32.4346V629.779Z" />
          </mask>
          <path
            d="M134.03 629.779V649.277H136.083V629.779H134.03Z"
            fill="black"
            mask="url(#path-377-inside-115_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="50.2425" y="642.887">
              50 to below 60
            </tspan>
          </text>
          <mask id="path-380-inside-116_878_18629" fill="white">
            <path d="M135.056 629.779H186.367V649.277H135.056V629.779Z" />
          </mask>
          <path
            d="M185.341 629.779V649.277H187.393V629.779H185.341Z"
            fill="black"
            mask="url(#path-380-inside-116_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="154.173" y="642.887">
              C+
            </tspan>
          </text>
          <mask id="path-383-inside-117_878_18629" fill="white">
            <path d="M186.367 629.779H288.989V649.277H186.367V629.779Z" />
          </mask>
          <path
            d="M287.963 629.779V649.277H290.015V629.779H287.963Z"
            fill="black"
            mask="url(#path-383-inside-117_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="210.457" y="642.887">
              Satisfactory
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="307.361" y="642.887">
              2.4
            </tspan>
          </text>
          <mask id="path-387-inside-118_878_18629" fill="white">
            <path d="M3.70044 649.277H340.3V668.775H3.70044V649.277Z" />
          </mask>
          <path
            d="M3.70044 650.303H340.3V648.251H3.70044V650.303Z"
            fill="black"
            mask="url(#path-387-inside-118_878_18629)"
          />
          <mask id="path-389-inside-119_878_18629" fill="white">
            <path d="M3.70044 649.277H32.4345V668.775H3.70044V649.277Z" />
          </mask>
          <path
            d="M31.4083 649.277V668.775H33.4607V649.277H31.4083Z"
            fill="black"
            mask="url(#path-389-inside-119_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="15.0674" y="662.385">
              6
            </tspan>
          </text>
          <mask id="path-392-inside-120_878_18629" fill="white">
            <path d="M32.4346 649.277H135.056V668.775H32.4346V649.277Z" />
          </mask>
          <path
            d="M134.03 649.277V668.775H136.083V649.277H134.03Z"
            fill="black"
            mask="url(#path-392-inside-120_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="50.1613" y="662.385">
              40 to below 50
            </tspan>
          </text>
          <mask id="path-395-inside-121_878_18629" fill="white">
            <path d="M135.056 649.277H186.367V668.775H135.056V649.277Z" />
          </mask>
          <path
            d="M185.341 649.277V668.775H187.393V649.277H185.341Z"
            fill="black"
            mask="url(#path-395-inside-121_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="157.28" y="662.385">
              C
            </tspan>
          </text>
          <mask id="path-398-inside-122_878_18629" fill="white">
            <path d="M186.367 649.277H288.989V668.775H186.367V649.277Z" />
          </mask>
          <path
            d="M287.963 649.277V668.775H290.015V649.277H287.963Z"
            fill="black"
            mask="url(#path-398-inside-122_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="212.202" y="662.385">
              Acceptable
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="307.487" y="662.385">
              2.0
            </tspan>
          </text>
          <mask id="path-402-inside-123_878_18629" fill="white">
            <path d="M3.70044 668.775H340.3V688.273H3.70044V668.775Z" />
          </mask>
          <path
            d="M3.70044 669.801H340.3V667.749H3.70044V669.801Z"
            fill="black"
            mask="url(#path-402-inside-123_878_18629)"
          />
          <mask id="path-404-inside-124_878_18629" fill="white">
            <path d="M3.70044 668.775H32.4345V688.273H3.70044V668.775Z" />
          </mask>
          <path
            d="M31.4083 668.775V688.273H33.4607V668.775H31.4083Z"
            fill="black"
            mask="url(#path-404-inside-124_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="15.0674" y="681.883">
              7
            </tspan>
          </text>
          <mask id="path-407-inside-125_878_18629" fill="white">
            <path d="M32.4346 668.775H135.056V688.273H32.4346V668.775Z" />
          </mask>
          <path
            d="M134.03 668.775V688.273H136.083V668.775H134.03Z"
            fill="black"
            mask="url(#path-407-inside-125_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="50.0756" y="681.883">
              30 to below 40
            </tspan>
          </text>
          <mask id="path-410-inside-126_878_18629" fill="white">
            <path d="M135.056 668.775H186.367V688.273H135.056V668.775Z" />
          </mask>
          <path
            d="M185.341 668.775V688.273H187.393V668.775H185.341Z"
            fill="black"
            mask="url(#path-410-inside-126_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="154.258" y="681.883">
              D+
            </tspan>
          </text>
          <mask id="path-413-inside-127_878_18629" fill="white">
            <path d="M186.367 668.775H288.989V688.273H186.367V668.775Z" />
          </mask>
          <path
            d="M287.963 668.775V688.273H290.015V668.775H287.963Z"
            fill="black"
            mask="url(#path-413-inside-127_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="192.833" y="681.883">
              Partially Acceptable
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="308.407" y="681.883">
              1.6
            </tspan>
          </text>
          <mask id="path-417-inside-128_878_18629" fill="white">
            <path d="M3.70044 688.273H340.3V707.772H3.70044V688.273Z" />
          </mask>
          <path
            d="M3.70044 689.3H340.3V687.247H3.70044V689.3Z"
            fill="black"
            mask="url(#path-417-inside-128_878_18629)"
          />
          <mask id="path-419-inside-129_878_18629" fill="white">
            <path d="M3.70044 688.273H32.4345V707.772H3.70044V688.273Z" />
          </mask>
          <path
            d="M31.4083 688.273V707.772H33.4607V688.273H31.4083Z"
            fill="black"
            mask="url(#path-419-inside-129_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="15.0674" y="701.381">
              8
            </tspan>
          </text>
          <mask id="path-422-inside-130_878_18629" fill="white">
            <path d="M32.4346 688.273H135.056V707.772H32.4346V688.273Z" />
          </mask>
          <path
            d="M134.03 688.273V707.772H136.083V688.273H134.03Z"
            fill="black"
            mask="url(#path-422-inside-130_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="50.2831" y="701.381">
              20 to below 30
            </tspan>
          </text>
          <mask id="path-425-inside-131_878_18629" fill="white">
            <path d="M135.056 688.273H186.367V707.772H135.056V688.273Z" />
          </mask>
          <path
            d="M185.341 688.273V707.772H187.393V688.273H185.341Z"
            fill="black"
            mask="url(#path-425-inside-131_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="157.365" y="701.381">
              D
            </tspan>
          </text>
          <mask id="path-428-inside-132_878_18629" fill="white">
            <path d="M186.367 688.273H288.989V707.772H186.367V688.273Z" />
          </mask>
          <path
            d="M287.963 688.273V707.772H290.015V688.273H287.963Z"
            fill="black"
            mask="url(#path-428-inside-132_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="212.392" y="701.381">
              Insufficient
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="308.403" y="701.381">
              1.2
            </tspan>
          </text>
          <mask id="path-432-inside-133_878_18629" fill="white">
            <path d="M3.70044 707.772H340.3V727.27H3.70044V707.772Z" />
          </mask>
          <path
            d="M3.70044 708.798H340.3V706.745H3.70044V708.798Z"
            fill="black"
            mask="url(#path-432-inside-133_878_18629)"
          />
          <mask id="path-434-inside-134_878_18629" fill="white">
            <path d="M3.70044 707.772H32.4345V727.27H3.70044V707.772Z" />
          </mask>
          <path
            d="M31.4083 707.772V727.27H33.4607V707.772H31.4083Z"
            fill="black"
            mask="url(#path-434-inside-134_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="15.0674" y="720.879">
              9
            </tspan>
          </text>
          <mask id="path-437-inside-135_878_18629" fill="white">
            <path d="M32.4346 707.772H135.056V727.27H32.4346V707.772Z" />
          </mask>
          <path
            d="M134.03 707.772V727.27H136.083V707.772H134.03Z"
            fill="black"
            mask="url(#path-437-inside-135_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="53.5616" y="720.879">
              o to below 20
            </tspan>
          </text>
          <mask id="path-440-inside-136_878_18629" fill="white">
            <path d="M135.056 707.772H186.367V727.27H135.056V707.772Z" />
          </mask>
          <path
            d="M185.341 707.772V727.27H187.393V707.772H185.341Z"
            fill="black"
            mask="url(#path-440-inside-136_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="157.907" y="720.879">
              E
            </tspan>
          </text>
          <mask id="path-443-inside-137_878_18629" fill="white">
            <path d="M186.367 707.772H288.989V727.27H186.367V707.772Z" />
          </mask>
          <path
            d="M287.963 707.772V727.27H290.015V707.772H287.963Z"
            fill="black"
            mask="url(#path-443-inside-137_878_18629)"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="200.869" y="720.879">
              Very Insufficient
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23596"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="307.501" y="720.879">
              0.8
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="389.203" y="527.373">
              GRADE POINT AVEREGE (GPA) :{" "}
            </tspan>
          </text>
          <line
            x1="530.159"
            y1="529.501"
            x2="589.68"
            y2="529.501"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="447.462" y="543.478">
              AVERAGE GRADE :{" "}
            </tspan>
          </text>
          <line
            x1="530.159"
            y1="545.606"
            x2="589.68"
            y2="545.606"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="800"
            letterSpacing="0em"
          >
            <tspan x="555.406" y="542.447">
              {grade}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="500"
            letterSpacing="0em"
          >
            <tspan x="487.695" y="585.255">
              {/* 
              Passed */}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="431.489" y="586.264">
              Result :
            </tspan>
          </text>
          <line
            x1="464.481"
            y1="588.393"
            x2="589.68"
            y2="588.393"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="397.681" y="602.369">
              Working Days :{" "}
            </tspan>
          </text>
          <line
            x1="464.481"
            y1="604.497"
            x2="589.68"
            y2="604.497"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="408.561" y="629.762">
              Suggestion :{" "}
            </tspan>
          </text>
          <line
            x1="464.481"
            y1="631.891"
            x2="589.68"
            y2="631.891"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="500"
            letterSpacing="0em"
          >
            <tspan x="517.036" y="601.338">
              {/* 
              235 */}
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            fontWeight="800"
            letterSpacing="0em"
          >
            <tspan x="540.848" y="525.735">
              {gpa}
            </tspan>
          </text>
          <line
            x1="483.978"
            y1="710.612"
            x2="582.494"
            y2="710.612"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="507.179" y="725.615">
              School Seal{" "}
            </tspan>
          </text>
          <g clip-path="url(#clip1_878_18629)">
            <svg
              width="90"
              height="90"
              viewBox="0 0 149 144"
              fill="none"
              // transform="tra"
              y={10}
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "translateY(80px)" }}
            >
              <path
                d="M69.1685 0.206643C50.3657 1.42569 32.7025 9.64715 19.6635 23.2491C12.8041 30.3066 7.52171 38.7403 4.16579 47.9922C0.80987 57.2441 -0.543045 67.1031 0.196557 76.917C1.08207 88.0349 4.55457 98.7919 10.3369 108.329C16.1191 117.866 24.051 125.919 33.4993 131.846C38.7888 135.018 44.3777 137.662 50.1852 139.74C61.9698 143.614 74.5131 144.597 86.7574 142.607C99.0017 140.617 110.588 135.711 120.539 128.305C135.054 117.577 144.877 101.668 147.965 83.8847C151.053 66.1015 147.17 47.8122 137.121 32.8185C130.731 23.5092 122.332 15.7536 112.544 10.1242C102.756 4.49469 91.8289 1.135 80.5688 0.293014L75.266 0.0166364C73.2315 -0.033565 71.1959 0.0298699 69.1685 0.206643ZM88.0136 2.93581C97.3836 4.77895 106.347 8.28927 114.476 13.2997C127.921 21.8022 138.117 34.5778 143.426 49.5735C146.397 58.2101 146.881 61.3366 146.881 71.8041C146.881 79.8189 146.76 81.4944 146 85.2427C143.345 97.4214 137.556 108.696 129.207 117.951C120.858 127.206 110.237 134.121 98.3948 138.012C87.1606 141.697 75.2215 142.71 63.527 140.971C51.8325 139.232 40.705 134.789 31.0292 127.994C17.5976 118.615 7.9761 104.729 3.91266 88.8585C-0.150779 72.9882 1.61351 56.1869 8.88498 41.5069C19.7153 19.9327 40.8404 5.23315 65.7657 2.17579C73.1877 1.64283 80.6453 1.8976 88.0136 2.93581Z"
                fill="#010101"
              />
              <path
                d="M87.1718 6.97728C84.6326 11.1574 83.4926 13.5584 83.7171 13.8866C83.9417 14.2148 84.6499 13.4893 85.7899 11.8483C86.1181 11.3647 86.5672 11.3301 87.9491 11.6065C89.6764 11.9865 89.6764 12.0211 89.6764 13.6102C89.6764 14.7502 89.8491 15.1993 90.281 15.1993C91.0237 15.1993 91.0237 14.7848 90.4537 9.49918C90.091 6.28636 89.7973 5.30178 89.2273 5.00813C88.6573 4.71449 88.3464 4.97358 87.1718 6.97728ZM89.3309 9.17098C89.3309 10.7601 88.83 11.0365 87.2063 10.3974C86.6018 10.1383 86.6363 9.89646 87.5691 8.35914C88.7609 6.35545 89.3309 6.64909 89.3309 9.17098Z"
                fill="#010101"
              />
              <path
                d="M69.2969 6.6823C67.5695 7.70142 68.8132 9.86058 71.5251 10.4651C72.8033 10.7588 72.9933 11.7261 71.8533 12.2961C71.2833 12.6243 70.8342 12.5552 70.126 11.9333C68.865 10.9142 68.1741 11.6052 69.2623 12.797C69.535 13.0701 69.8625 13.2822 70.2233 13.4193C70.584 13.5565 70.9697 13.6156 71.3549 13.5928C71.7401 13.5699 72.1162 13.4656 72.4582 13.2868C72.8001 13.1079 73.1003 12.8586 73.3388 12.5552C74.3061 11.0351 73.5806 9.61876 71.7151 9.25602C69.8496 8.89328 69.1759 8.15051 70.0742 7.42503C70.6442 6.97593 70.9378 6.97594 71.9051 7.54596C73.2179 8.30598 73.857 7.85687 72.8551 6.88957C72.3459 6.51388 71.7385 6.29428 71.1068 6.25748C70.4751 6.22068 69.8462 6.36827 69.2969 6.6823Z"
                fill="#010101"
              />
              <path
                d="M75.4765 7.11571C75.1643 7.47864 74.9308 7.90251 74.7911 8.36044C74.6513 8.81836 74.6083 9.30033 74.6647 9.77577C74.6647 13.0231 77.6011 14.7677 79.5876 12.7813C80.2439 12.1249 80.3303 11.7968 79.9503 11.434C79.5703 11.0713 79.3803 11.1576 79.1039 11.6758C78.3266 13.1095 75.8911 12.3322 75.8911 10.7085C75.8911 10.0522 76.1329 10.0176 78.1193 10.2076C80.4857 10.5012 80.5721 10.4149 80.3648 8.48028C80.2447 7.9766 79.9919 7.51426 79.6328 7.14122C79.2736 6.76818 78.8212 6.49805 78.3225 6.35882C77.8237 6.21959 77.2968 6.21634 76.7963 6.34944C76.2959 6.48253 75.8402 6.74711 75.4765 7.11571ZM78.5684 7.4439C78.8695 7.71624 79.1057 8.05269 79.2594 8.42846C79.4666 9.06757 79.2594 9.15394 77.722 9.15394C75.7702 9.15394 75.4765 8.79122 76.5302 7.7721C76.6347 7.60845 76.7714 7.46772 76.9319 7.35848C77.0925 7.24924 77.2736 7.17376 77.4642 7.13661C77.6548 7.09946 77.8509 7.10141 78.0407 7.14236C78.2306 7.1833 78.4101 7.26238 78.5684 7.3748V7.4439Z"
                fill="#010101"
              />
              <path
                d="M65.876 9.13669C66.2733 12.7468 66.5669 13.9732 66.9815 13.9732C67.8279 13.9732 66.9815 7.06392 66.1524 6.71845C65.7205 6.56299 65.7205 7.01209 65.876 9.13669Z"
                fill="#010101"
              />
              <path
                d="M63.1072 7.428C62.9863 7.61801 62.4508 7.70439 61.9671 7.54893C61.4835 7.39347 61.138 7.54894 61.3108 7.91168C61.4835 8.27442 61.7599 9.82901 62.0362 11.3663C62.4162 13.4391 62.779 14.3373 63.1763 14.3373C63.5735 14.3373 63.6772 14.0437 63.5563 13.3873C63.3304 12.466 63.1631 11.5314 63.0554 10.589C62.779 8.75805 62.8135 8.63714 63.8327 8.22258C64.4027 8.01531 64.8863 7.65257 64.8863 7.41074C64.8863 7.16892 63.3836 6.92708 63.1072 7.428Z"
                fill="#010101"
              />
              <path
                d="M56.1853 8.84266C56.0256 9.024 55.8145 9.15251 55.58 9.21112C55.3456 9.26974 55.0988 9.25569 54.8725 9.17085C54.3025 8.96357 54.2334 9.17084 54.4753 10.1036C54.9369 12.1696 55.7178 14.1511 56.7899 15.9765C57.3253 15.9765 57.239 15.2338 56.548 12.9537C55.7707 10.3973 56.0644 9.37813 57.4808 9.49905C58.379 9.58541 58.6726 9.94815 59.2081 11.4682C60.0545 14.4392 60.5036 15.2856 60.9354 14.9228C61.3673 14.5601 60.4 10.3973 59.6745 8.96358C59.2208 8.49723 58.6044 8.22424 57.9542 8.20171C57.304 8.17918 56.6702 8.40883 56.1853 8.84266Z"
                fill="#010101"
              />
              <path
                d="M94.3753 9.49707C93.7293 9.9978 93.199 10.632 92.8204 11.3563C92.4418 12.0807 92.2239 12.8782 92.1816 13.6944C92.1944 14.392 92.461 15.0611 92.9316 15.5762C93.4022 16.0913 94.0444 16.4172 94.738 16.4927C95.9644 16.4927 97.0527 15.7672 97.0527 14.9554C97.0527 14.1435 96.69 14.2126 95.7572 15.0763C94.0299 16.6136 92.7517 13.9708 94.0299 11.6217C94.8417 9.99798 96.4999 9.89434 97.0699 11.3798C97.519 12.5544 98.2963 12.7272 98.2963 11.6562C98.2963 10.5853 97.899 10.1534 96.7936 9.58341C95.6881 9.01339 95.5499 8.99614 94.3753 9.49707Z"
                fill="#010101"
              />
              <path
                d="M51.4487 10.1911C51.6904 11.1584 51.9903 12.1101 52.3468 13.0412C53.2105 15.4076 53.245 15.6494 52.5887 16.254C51.5868 17.3077 50.6886 16.6686 49.4968 13.9739C48.8922 12.6266 48.2013 11.5384 47.9076 11.5384C47.1476 11.5384 47.2685 12.1084 48.5986 14.7858C50.1186 17.7568 51.0859 18.4132 52.5887 17.394C53.0695 17.0367 53.635 16.8105 54.2296 16.7377C54.9206 16.9104 54.8687 16.7376 53.6078 13.0757C53.2981 11.9131 52.7447 10.8297 51.9841 9.89746C51.7077 9.89746 51.4487 10.0184 51.4487 10.1911Z"
                fill="#010101"
              />
              <path
                d="M40.3063 12.1427C40.0103 12.363 39.7659 12.6452 39.59 12.9696C39.4142 13.294 39.3112 13.6529 39.2881 14.0212C39.2651 14.3895 39.3226 14.7584 39.4567 15.1022C39.5908 15.446 39.7982 15.7564 40.0645 16.0118C40.9454 16.91 41.4464 16.9446 43.9683 16.461C45.9201 16.0982 46.9738 16.4609 46.9738 17.6355C46.9738 18.4992 45.5056 19.6738 44.4519 19.6738C43.9026 19.6387 43.3696 19.4729 42.8973 19.1901C41.7227 18.4474 41.3254 19.1901 42.4655 20.1229C43.0604 20.6158 43.8088 20.8856 44.5814 20.8856C45.3541 20.8856 46.1025 20.6158 46.6974 20.1229C47.2789 19.7879 47.7167 19.2505 47.927 18.6132C48.1373 17.9759 48.1054 17.2835 47.8374 16.6682C47.2156 15.0445 46.1101 14.63 43.7264 15.1136C42.8608 15.3502 41.9582 15.4206 41.0663 15.3209C40.22 14.9582 40.3063 13.2481 41.2391 12.7127C42.1718 12.1772 44.0028 12.1945 44.3655 12.7127C44.5383 12.989 44.7455 13.0409 45.0564 12.7127C45.7992 11.9699 44.5728 10.9854 42.8973 10.9854C42.4093 10.9912 41.9277 11.0969 41.4821 11.2959C41.0365 11.495 40.6363 11.7831 40.3063 12.1427Z"
                fill="#010101"
              />
              <path
                d="M99.539 12.1077C98.8826 12.8677 99.7463 13.4032 100.558 12.7123C101.37 12.0214 103.287 12.8677 103.08 13.8869C102.959 14.4569 102.596 14.5432 100.886 14.4569C98.6408 14.3014 97.4316 14.9923 97.4316 16.3742C97.5402 16.9552 97.8481 17.4801 98.3021 17.8585C98.7562 18.2369 99.328 18.445 99.919 18.447C100.444 18.4369 100.958 18.5942 101.387 18.8961C101.75 19.2588 102.147 18.7406 103.115 16.9097C103.687 15.8744 104.112 14.7638 104.376 13.6105C104.393 11.9004 100.644 10.7604 99.539 12.1077ZM102.303 15.8387C102.683 16.1669 100.973 17.5661 100.316 17.5661C99.2108 17.5661 98.4853 16.4778 99.0899 15.7351C99.5974 15.5043 100.151 15.3936 100.708 15.4116C101.266 15.4296 101.811 15.5757 102.303 15.8387Z"
                fill="#010101"
              />
              <path
                d="M111.716 13.8534C111.537 14.3284 111.273 14.7672 110.939 15.1489L110.213 16.1335L109.315 15.2353C108.261 14.1816 107.242 14.1298 105.86 15.2353C103.528 16.9626 103.459 21.2982 105.774 21.2982C106.344 21.2982 106.793 21.4709 106.793 21.7128C106.793 21.9546 107.035 22.11 107.329 22.11C109.391 19.6833 111.133 17.0012 112.511 14.1298C112.562 13.698 111.716 13.4043 111.716 13.8534ZM109.021 16.4962C109.971 18.0508 107.121 21.2291 105.653 20.2791C104.91 19.83 105.152 17.809 106.05 16.669C106.949 15.5289 108.296 15.3562 109.021 16.4962Z"
                fill="#010101"
              />
              <path
                d="M67.7404 17.635C58.5411 18.67 49.7355 21.9427 42.0932 27.167C34.451 32.3913 28.2049 39.4082 23.9009 47.6041C21.5169 52.1271 19.8282 56.9836 18.8917 62.0099C17.675 69.4185 17.8684 76.9901 19.4617 84.3269C22.091 94.5641 27.5809 103.841 35.2894 111.072C42.9979 118.303 52.6061 123.19 62.9902 125.161C72.5559 127.112 82.4598 126.608 91.778 123.696C101.096 120.784 109.525 115.56 116.278 108.509C123.284 101.247 128.077 92.1405 130.097 82.2541C131.358 75.3327 131.358 68.2404 130.097 61.319C128.049 51.5608 123.345 42.5583 116.503 35.3055C108.096 26.3872 97.0441 20.4098 84.979 18.2569C79.2746 17.4009 73.4917 17.1923 67.7404 17.635ZM86.2745 19.8287C91.1731 20.9343 95.9059 22.6764 100.352 25.0107C105.978 27.8487 111.063 31.6484 115.38 36.2383C120.18 41.2044 123.91 47.1021 126.34 53.567C128.771 60.0319 129.849 66.9266 129.509 73.8248C129.425 79.6224 128.253 85.3527 126.055 90.718C119.664 107.248 103.79 120.272 85.67 123.9C80.4384 124.775 75.1225 125.035 69.8304 124.677C56.5791 123.708 44.1336 117.948 34.8176 108.475C28.7988 102.542 24.3319 95.2188 21.8107 87.152C19.2894 79.0851 18.7912 70.522 20.3599 62.2172C24.0218 41.1784 42.1933 23.6634 64.7521 19.466C71.9153 18.7341 79.14 18.8559 86.2745 19.8287Z"
                fill="#010101"
              />
              <path
                d="M69.1729 31.4868L63.87 39.6225H51.7788C44.1785 39.6225 39.6875 39.7779 39.6875 40.037C39.6875 40.2961 42.3303 44.4589 45.595 49.3991C48.8596 54.3392 51.4851 58.4675 51.4851 58.5539C51.4851 58.6403 48.8423 62.7513 45.595 67.7087C42.3476 72.6661 39.6875 76.9153 39.6875 77.1226C43.7066 77.4924 47.7447 77.6135 51.7788 77.4854H63.87L69.052 85.621C71.9539 90.1121 74.4758 93.774 74.5967 93.774C74.7176 93.774 77.2395 90.1121 80.1414 85.621L85.3234 77.5199H97.4146C101.449 77.6587 105.487 77.5375 109.506 77.1572C109.506 76.9499 106.898 72.7525 103.719 67.8642C100.541 62.9758 97.9846 58.7957 97.9846 58.5885C97.9846 58.3812 100.593 54.1838 103.719 49.3127C106.846 44.4417 109.506 40.2616 109.506 40.0716C109.506 39.8816 104.79 39.657 97.4146 39.657H85.3234L84.097 37.7051C81.2123 33.0932 74.8558 23.5756 74.614 23.4893C72.6295 26.0348 70.812 28.7063 69.1729 31.4868ZM78.9323 33.5077L82.7669 39.4152L78.7423 39.5361C76.4967 39.5361 72.8348 39.5361 70.6411 39.5361L66.5647 39.4152L70.4684 33.3868C71.7044 31.2908 73.1389 29.3184 74.7521 27.4967C76.2501 29.4256 77.6454 31.432 78.9323 33.5077ZM62.0391 42.058C62.0391 42.2652 60.0008 45.5126 57.4789 49.3991C53.817 55.0474 52.8842 56.3084 52.4351 55.8247C49.255 51.3392 46.3089 46.6922 43.6085 41.9025C44.0404 41.488 62.0391 41.6607 62.0391 42.058ZM89.6762 49.9173C92.6472 54.4774 95.0654 58.3984 95.0654 58.6403C95.0654 58.8821 93.0618 62.0085 90.6608 65.7223C88.2598 69.436 85.8588 73.0807 85.3234 73.9098L84.3906 75.4471H65.0619L60.4154 68.2787C57.8589 64.3404 55.3716 60.5058 54.9225 59.7803L54.1452 58.433L56.0107 55.6693L61.0199 47.9654C62.7473 45.2881 64.4746 42.7834 64.82 42.3516C65.1655 41.9198 66.4092 41.6607 74.8213 41.6607H84.2697L89.6762 49.9173ZM105.965 41.9889C105.637 42.8007 96.8446 56.2738 96.6373 56.3084C96.43 56.3429 87.8971 43.4053 87.4825 42.3516C87.2407 41.6952 87.8971 41.6607 96.6891 41.6607C99.7734 41.5534 102.861 41.6631 105.93 41.9889H105.965ZM57.7207 68.0887C60.0872 71.7506 62.0391 74.998 62.0391 74.998C58.9325 75.3623 55.8023 75.4836 52.677 75.3607C43.4358 75.3607 43.2803 75.3607 43.7295 74.5489C45.3531 71.5434 52.7979 60.7303 53.0397 60.9549C53.2815 61.1794 55.3543 64.4095 57.7207 68.0887ZM101.336 67.7951C103.823 71.6297 105.896 74.9289 105.93 75.0844C102.853 75.456 99.7512 75.5773 96.6546 75.4471C88.7089 75.4471 87.2407 75.3607 87.4134 74.8771C87.7762 73.9098 96.361 60.7994 96.6028 60.7994C96.8446 60.7994 98.8828 63.9604 101.336 67.7951ZM82.5596 77.9345C80.9705 80.6636 74.9076 89.663 74.6658 89.663C71.8358 85.9246 69.2509 82.0069 66.9274 77.9345C69.5696 77.5569 72.2421 77.4354 74.9076 77.5717C81.1433 77.4853 82.8015 77.6063 82.5596 77.9345Z"
                fill="#010101"
              />
              <path
                d="M74.5036 46.4301C74.3134 46.7346 74.2229 47.0908 74.2445 47.4492C74.2641 47.6208 74.2152 47.7932 74.1085 47.929C74.0018 48.0648 73.8459 48.153 73.6745 48.1747C73.3118 48.1747 73.1908 48.451 73.3118 49.0729C73.4327 49.6947 73.3118 49.591 72.6208 48.5892C71.4808 46.741 71.5153 46.8619 70.9972 47.1555C70.479 47.4492 70.8244 47.881 71.3944 48.8828C71.9644 49.8847 72.0854 50.2647 71.8954 50.2647C71.7054 50.2647 71.3944 49.9711 71.239 49.6429C70.8762 48.6756 70.0644 48.9174 70.3062 49.902C70.5481 50.8866 70.4271 50.662 69.3735 49.6429C68.3198 48.6238 68.1816 48.641 67.8534 49.211C67.5252 49.7811 67.4043 49.8156 66.5234 49.0383C65.1761 47.8637 64.6406 48.0192 63.4142 49.902C62.5623 51.1507 61.5841 52.3083 60.495 53.3566C59.4759 54.3239 58.7677 55.2221 58.9059 55.3949C59.0441 55.5676 59.4241 55.3949 59.8387 54.9803C60.2532 54.5658 60.6505 54.4103 61.0132 54.7385C61.376 55.0667 61.5142 55.0321 61.3414 54.3757C61.1687 53.7194 61.3414 53.5121 61.5833 53.5121C61.7024 53.5121 61.8166 53.5594 61.9008 53.6436C61.985 53.7279 62.0323 53.8421 62.0323 53.9612C62.0323 54.4966 63.0515 54.203 63.0515 53.6848C63.3082 53.0814 63.6205 52.5031 63.9842 51.9575C64.5197 51.1111 64.6924 50.4547 64.4333 50.3338C64.1742 50.2129 64.4333 48.7101 65.0552 48.7101C65.677 48.7101 67.698 50.9038 67.9743 52.2511C68.0462 52.5954 68.0405 52.9513 67.9575 53.293C67.8746 53.6347 67.7165 53.9536 67.4948 54.2266C67.2731 54.4996 66.9934 54.7197 66.676 54.871C66.3585 55.0223 66.0114 55.1009 65.6597 55.1012C64.6406 55.2221 59.3032 60.2832 59.7523 60.8359C60.2014 61.3887 61.6696 59.6613 61.4796 59.2813C61.2896 58.9013 61.756 58.7977 62.3778 58.5213C63.3106 58.0722 63.3969 58.1068 63.1896 58.8841C63.0687 59.4022 63.1897 59.6959 63.5524 59.6959C63.6222 59.7027 63.6927 59.693 63.7581 59.6676C63.8235 59.6423 63.882 59.602 63.929 59.5499C63.9761 59.4979 64.0102 59.4355 64.0288 59.3679C64.0474 59.3002 64.0499 59.2292 64.036 59.1604C64.036 58.8841 64.2951 58.7113 64.8133 58.7977C65.677 58.9186 68.6826 56.6731 68.4753 56.0685C68.268 55.4639 70.2026 53.5466 70.7208 53.823C72.759 54.963 73.9336 57.174 72.3099 56.7249C72.1478 56.6915 71.98 56.6967 71.8202 56.7402C71.6605 56.7837 71.5133 56.8642 71.3904 56.9753C71.2676 57.0863 71.1727 57.2247 71.1134 57.3793C71.0541 57.5339 71.032 57.7002 71.049 57.8649C71.049 58.2277 72.9663 57.4158 73.4154 56.8804C73.8645 56.3449 73.8127 56.4831 73.6572 56.8804C73.5018 57.2776 73.6572 57.3122 74.2618 57.1222C74.8664 56.9322 75.1254 57.0358 75.1254 57.2776C75.1254 57.8476 77.0255 57.8476 77.3537 57.2776C77.4771 56.8664 77.4771 56.4279 77.3537 56.0167C77.1119 55.3258 76.991 55.2912 76.4209 55.7403C75.8509 56.1894 75.7646 56.1894 76.3 55.533C76.8355 54.8767 76.9909 54.9285 77.4401 55.2912C77.8892 55.654 78.0964 55.6539 78.2519 55.4985C78.4074 55.343 78.2519 55.2567 78.0446 55.2567C77.8995 55.2352 77.7682 55.1586 77.6781 55.0428C77.588 54.9269 77.5461 54.7808 77.561 54.6348C77.561 53.9094 78.2519 53.823 78.4937 54.5139C78.6146 54.9285 78.7874 54.9285 79.271 54.5139C79.7547 54.0994 79.9965 54.0994 80.1174 54.2548C80.2383 54.4103 80.532 54.1339 80.6529 53.7366C80.8828 53.208 81.1851 52.7138 81.5511 52.2684C82.0347 51.6984 82.0348 51.4048 81.672 50.9557C81.3093 50.5065 81.3956 49.5047 82.0347 49.5047C82.513 49.6954 82.935 50.0045 83.2611 50.4029C83.7103 50.8865 84.1939 51.1629 84.3148 51.0075C84.4357 50.852 82.9675 49.2801 81.9138 48.8483C81.5887 48.8208 81.2618 48.8725 80.961 48.9988C80.6602 49.1251 80.3945 49.3224 80.1865 49.5738C79.582 50.0747 79.2538 50.3165 79.4265 50.0229C79.8756 49.211 78.8046 48.9692 78.2346 49.7465C77.4228 50.8002 77.4746 49.902 78.2346 48.7274C78.6837 48.1228 78.7528 47.6737 78.4765 47.3801C78.2001 47.0864 77.9064 47.2246 77.6128 47.7946C77.5114 48.0135 77.34 48.1925 77.1258 48.3034C76.9116 48.4144 76.6665 48.451 76.4292 48.4074C76.1919 48.3639 75.9758 48.2428 75.8148 48.0631C75.6539 47.8834 75.5572 47.6553 75.54 47.4146C75.4709 46.551 74.9354 46.0155 74.5036 46.4301ZM77.3537 51.8366L78.4419 52.2511L76.4555 54.0821L74.4518 55.8094L73.2254 54.6003C72.7527 54.0712 72.1605 53.6626 71.4981 53.4084C70.7208 53.4084 70.9281 52.683 71.9126 52.0266C73.6399 51.2903 75.5793 51.2225 77.3537 51.8366Z"
                fill="#010101"
              />
              <path
                d="M84.8061 51.2305C84.8061 51.4205 84.8061 52.0769 84.8061 52.6469C84.7614 53.3469 84.4631 54.0066 83.9671 54.5025C83.4711 54.9985 82.8115 55.2967 82.1115 55.3415C81.2077 55.6109 80.3835 56.0972 79.7105 56.7579C78.2423 58.1916 77.9832 59.0034 78.985 58.5889C79.5032 58.3989 79.5896 58.5889 79.4342 59.1589C79.2787 59.7289 79.4341 59.9707 79.7969 59.9707C80.1596 59.9707 80.3324 59.7289 80.246 59.4525C80.1596 59.1762 80.5224 59.0034 81.0578 59.0898C81.9561 59.2107 85.0825 56.8443 84.6334 56.3952C84.5125 56.2743 84.7198 55.8597 85.048 55.497C85.2143 55.3384 85.3473 55.1483 85.4393 54.9377C85.5312 54.7271 85.5802 54.5003 85.5834 54.2706C85.3416 53.2169 86.3434 53.5105 88.019 54.9269C89.6945 56.3433 89.9363 57.1207 88.6753 57.1207C88.3126 57.1207 88.1917 56.9306 88.3471 56.637C88.5026 56.3434 88.468 56.3088 88.1917 56.4816C88.0548 56.5518 87.9375 56.6548 87.8501 56.7814C87.7627 56.9079 87.708 57.0542 87.6908 57.207C87.4699 57.8143 87.1226 58.3678 86.6716 58.8307C85.9116 59.7807 85.7389 60.178 86.0671 60.558C86.1918 60.7147 86.3644 60.8261 86.5585 60.8753C86.7526 60.9244 86.9575 60.9086 87.1417 60.8302C87.326 60.7518 87.4794 60.6151 87.5786 60.4412C87.6777 60.2672 87.7172 60.0656 87.6908 59.8671C87.6908 59.4698 87.898 59.0898 88.1398 59.0898C88.1845 59.0962 88.23 59.0891 88.2705 59.0693C88.311 59.0496 88.3446 59.0181 88.3669 58.979C88.3893 58.9398 88.3994 58.8949 88.3958 58.85C88.3923 58.8051 88.3753 58.7622 88.3471 58.7271C88.2262 58.5198 88.468 58.278 88.9171 58.1571C89.3662 58.0361 89.6945 57.708 89.6426 57.3798C89.5908 57.0516 89.8154 56.8961 90.3336 56.9825C91.4736 57.1897 91.56 57.3452 90.9036 58.0016C90.4995 58.4538 90.119 58.9266 89.7635 59.418C89.4526 59.8671 89.0035 60.1608 88.7617 60.0744C88.2608 59.8671 86.6371 62.2681 87.0344 62.5963C87.4316 62.9245 87.6044 62.3199 88.088 61.6981C88.5717 61.0762 88.9517 60.7653 88.9517 60.9726C88.9517 61.1799 89.2281 60.8862 89.6081 60.4026C89.9881 59.9189 90.4199 59.5907 90.6272 59.7116C91.1454 60.0744 91.0763 61.5426 90.5063 61.439C90.2127 61.439 90.0054 61.7153 90.0054 62.1644C90.0054 62.6135 90.2126 62.9417 90.7826 62.8554C92.51 62.6135 92.7345 62.4063 92.2163 61.7672C91.6981 61.128 91.8018 61.0244 92.2163 60.5407C92.8554 59.7634 92.4063 58.3471 91.7154 59.038C91.4932 59.2867 91.1961 59.4565 90.869 59.5216C90.6272 59.5216 90.869 59.0725 91.5081 58.5371C92.7345 57.397 92.6136 56.257 91.3181 56.257C90.5962 56.0558 89.9557 55.6328 89.4872 55.0479C89.1209 54.4905 88.5894 54.0616 87.9671 53.8215C87.7253 53.8215 87.328 53.4069 87.1207 52.8887C86.9135 52.3705 86.4644 51.9905 86.188 51.9905C86.002 51.9585 85.8253 51.8863 85.6701 51.7789C85.515 51.6715 85.3852 51.5315 85.2898 51.3687C85.048 51.1096 84.8407 50.9887 84.8061 51.2305Z"
                fill="#010101"
              />
              <path
                d="M59.2392 56.0669C58.4619 56.8442 57.6846 57.4488 57.5118 57.4142C57.3391 57.3797 56.7864 58.6752 57.27 59.0034C57.4773 59.1243 57.7537 59.0034 57.8746 58.5888C58.1164 57.9843 59.2564 57.6561 59.2564 58.1916C58.9843 58.7246 58.6415 59.2184 58.2373 59.6598C57.1491 60.9553 56.9418 61.6116 57.6673 61.6116C57.8746 61.6116 57.9955 61.4389 57.8746 61.2834C57.7537 61.128 58.0473 60.5062 58.4964 59.9707C60.3965 57.5697 61.2947 55.8597 60.9665 55.2896C60.6383 54.7196 60.3274 54.9269 59.2392 56.0669Z"
                fill="#010101"
              />
              <path
                d="M56.752 55.6194C56.752 56.6385 57.6502 57.1222 58.2893 56.4313C58.9284 55.7403 58.8247 55.7921 58.2893 55.464C57.5292 54.9285 56.752 55.0148 56.752 55.6194Z"
                fill="#010101"
              />
              <path
                d="M85.0441 61.6123C85.165 61.8196 85.3723 62.0096 85.4932 62.0096C85.6141 62.0096 85.6486 61.8196 85.6486 61.6123C85.6488 61.5548 85.6371 61.4979 85.6141 61.4452C85.5912 61.3926 85.5575 61.3452 85.5153 61.3062C85.473 61.2673 85.4232 61.2375 85.3688 61.2188C85.3144 61.2001 85.2568 61.1929 85.1995 61.1977C85.0095 61.1977 84.9232 61.3705 85.0441 61.6123Z"
                fill="#010101"
              />
              <path
                d="M42.419 100.391C42.2917 102.058 42.2514 103.73 42.2981 105.401V109.46H45.7528C48.9311 109.46 49.2074 109.46 49.2074 108.648C49.2074 107.836 48.8792 107.836 46.6855 107.715C44.1636 107.594 44.1118 107.594 44.1118 106.42C44.1118 105.245 44.1118 105.193 46.3573 105.193C48.6028 105.193 48.5856 105.193 48.5856 104.174C48.5856 103.155 48.4647 103.155 46.3573 103.155C44.25 103.155 44.1118 103.155 44.1118 102.136C44.1118 101.117 44.2327 101.117 46.5646 101.117C48.8965 101.117 49.0002 101.117 49.0002 100.305C49.0002 99.4932 48.7238 99.4932 45.7873 99.4932C42.8509 99.4932 42.5918 99.5104 42.419 100.391Z"
                fill="#010101"
              />
              <path
                d="M66.8062 99.7525C66.5603 100.293 66.4648 100.89 66.5298 101.48C66.5298 102.689 66.4435 102.81 65.7525 102.413C64.5607 101.791 64.1634 101.877 63.0579 103.017C62.3995 103.807 62.026 104.795 61.9978 105.823C61.9696 106.851 62.2883 107.858 62.9024 108.683C63.0563 108.942 63.2639 109.165 63.5112 109.336C63.7585 109.508 64.0397 109.625 64.336 109.679C64.6322 109.733 64.9366 109.723 65.2287 109.65C65.5207 109.576 65.7936 109.441 66.0289 109.253C66.4434 108.838 66.6507 108.838 66.8925 109.253C67.0047 109.41 67.1644 109.526 67.3479 109.585C67.5314 109.644 67.7291 109.643 67.9117 109.581C68.4299 109.374 68.5508 108.527 68.5508 104.399C68.5508 99.908 68.5508 99.5107 67.8253 99.5107C67.4688 99.4839 67.1127 99.5684 66.8062 99.7525ZM66.2707 104.192C67.0135 106.144 66.0807 108.389 64.6989 107.906C63.8698 107.577 63.4725 105.695 64.0425 104.451C64.6125 103.207 65.908 103.224 66.2707 104.192Z"
                fill="#010101"
              />
              <path
                d="M78.6226 100.2C78.2393 100.587 77.9962 101.092 77.9317 101.633C77.9317 102.48 79.3826 102.566 79.659 101.633C79.758 101.449 79.9051 101.295 80.0845 101.188C80.264 101.081 80.4691 101.024 80.6781 101.024C80.8871 101.024 81.0922 101.081 81.2717 101.188C81.4511 101.295 81.5982 101.449 81.6972 101.633C81.9909 102.411 81.87 102.652 79.659 105.261C78.8256 106.197 78.1542 107.265 77.6725 108.422L77.3789 109.562L80.3499 109.441C83.1309 109.32 83.3727 109.251 83.4936 108.387C83.6145 107.524 83.4936 107.489 81.9909 107.489C80.4881 107.489 79.7453 107.005 80.6435 106.591C81.2408 106.07 81.7847 105.492 82.2672 104.863C83.77 103.136 83.9946 101.409 82.7509 100.096C82.1562 99.6349 81.4205 99.3933 80.6683 99.4122C79.916 99.431 79.1933 99.7092 78.6226 100.2Z"
                fill="#010101"
              />
              <path
                d="M85.8572 100.286C84.8946 102.387 84.5992 104.732 85.0108 107.006C85.6154 109.407 88.1027 110.46 89.5191 108.837C91.2465 107.006 91.0392 100.822 89.3291 99.8717C88.7849 99.5512 88.1504 99.4181 87.5232 99.493C86.896 99.5679 86.3107 99.8466 85.8572 100.286ZM88.6728 101.755C89.1909 103.102 88.9146 107.092 88.31 107.61C87.7055 108.128 87.5327 108.025 87.2045 107.61C86.6295 105.619 86.576 103.513 87.0491 101.495C87.1384 101.341 87.2723 101.218 87.4331 101.142C87.5939 101.065 87.7741 101.04 87.9499 101.068C88.1257 101.096 88.2888 101.176 88.4179 101.299C88.5469 101.422 88.6358 101.58 88.6728 101.755Z"
                fill="#010101"
              />
              <path
                d="M93.028 100.528C92.3371 101.426 92.1816 102.256 92.1816 104.639C92.1816 107.023 92.3025 107.783 93.1835 108.629C93.5008 109.037 93.9307 109.343 94.42 109.509C94.9093 109.675 95.4365 109.694 95.9364 109.563C96.4364 109.433 96.8871 109.159 97.2328 108.775C97.5786 108.391 97.8042 107.914 97.8818 107.403C98.0582 107.003 98.142 106.569 98.1271 106.132C98.1121 105.695 97.9988 105.268 97.7954 104.881C97.1045 103.465 95.5499 102.653 94.5308 103.154C93.5117 103.655 93.5117 102.826 94.3753 101.651C94.8935 100.995 95.1008 100.96 95.7917 101.375C97.6227 102.515 98.6418 101.53 97.139 100.148C96.8461 99.8988 96.5063 99.7106 96.1395 99.5945C95.7728 99.4784 95.3865 99.4368 95.0035 99.4722C94.6204 99.5076 94.2483 99.6193 93.9091 99.8006C93.5698 99.982 93.2702 100.229 93.028 100.528ZM96.0335 106.194C96.0335 107.541 95.9126 107.818 95.2217 107.818C94.5308 107.818 94.3753 107.489 94.289 106.678C94.0817 105.088 94.4962 104.277 95.3081 104.432C96.1199 104.587 96.0335 104.967 96.0335 106.194Z"
                fill="#010101"
              />
              <path
                d="M100.977 102.325C100.154 103.548 99.443 104.843 98.852 106.194C98.6102 107.127 98.7311 107.213 99.9575 107.282C100.718 107.282 101.581 107.282 101.858 107.282C102.134 107.282 102.514 107.766 102.635 108.457C102.928 109.96 104.138 109.839 104.362 108.249C104.449 107.645 104.725 107.161 105.088 107.161C105.865 107.161 105.83 105.969 105.088 105.693C104.639 105.486 104.483 104.708 104.483 102.428C104.483 99.6992 104.397 99.4229 103.654 99.4229C102.911 99.4229 102.186 100.39 100.977 102.325ZM102.704 104.242C102.704 105.054 102.324 105.417 101.685 105.503C100.579 105.658 100.545 105.503 101.391 104.156C102.238 102.808 102.842 102.843 102.687 104.242H102.704Z"
                fill="#010101"
              />
              <path
                d="M58.703 100.392C58.4938 100.516 58.3182 100.689 58.1917 100.897C58.0652 101.105 57.9917 101.341 57.9776 101.584C57.9776 102.033 57.8048 102.396 57.563 102.396C57.3212 102.396 57.1484 102.672 57.1484 103C57.1484 103.328 57.3212 103.622 57.5285 103.622C57.9279 104.455 58.1063 105.377 58.0467 106.299C58.2194 109.063 58.703 109.754 60.2058 109.633C61.1904 109.478 61.5877 108.096 60.6549 108.096C60.1367 108.096 59.9985 107.612 59.9985 105.85C59.9985 104.088 60.1367 103.622 60.6204 103.622C60.6975 103.624 60.7743 103.611 60.8465 103.584C60.9186 103.557 60.9846 103.515 61.0408 103.462C61.0969 103.409 61.1421 103.346 61.1737 103.275C61.2053 103.205 61.2227 103.129 61.2249 103.052C61.2032 102.874 61.1362 102.704 61.0304 102.559C60.9246 102.414 60.7834 102.298 60.6204 102.223C60.4147 102.086 60.2488 101.898 60.1396 101.676C60.0304 101.455 59.9817 101.208 59.9985 100.962C59.9985 99.8046 59.7567 99.6836 58.703 100.392Z"
                fill="#010101"
              />
              <path
                d="M51.5347 102.565C51.0954 102.879 50.792 103.348 50.6861 103.878C50.5802 104.407 50.6798 104.957 50.9647 105.416C51.5321 105.856 52.1682 106.201 52.8475 106.435C54.8685 107.16 55.2485 108.024 53.5384 108.024C52.8475 108.024 52.2775 107.817 52.2775 107.609C52.2775 107.091 50.7574 107.091 50.4465 107.609C50.1356 108.127 52.2775 109.682 53.452 109.682C53.7994 109.715 54.1498 109.679 54.4832 109.577C54.8166 109.474 55.1264 109.306 55.3946 109.083C55.6627 108.859 55.8841 108.585 56.0458 108.276C56.2075 107.967 56.3063 107.629 56.3367 107.281C56.3367 105.934 55.8876 105.554 53.8148 104.846C52.9684 104.552 52.2775 104.155 52.2775 103.947C52.2775 103.446 54.0048 103.446 54.5575 103.947C55.1103 104.448 56.0085 103.792 55.7321 103.049C55.3521 101.875 52.9166 101.581 51.5347 102.565Z"
                fill="#010101"
              />
              <path
                d="M70.5918 103.139C70.5884 103.304 70.6345 103.467 70.7243 103.606C70.8141 103.745 70.9434 103.854 71.0956 103.919C71.2478 103.984 71.4159 104.002 71.5783 103.97C71.7407 103.939 71.89 103.859 72.007 103.742C72.124 103.625 72.2033 103.476 72.2348 103.314C72.2662 103.151 72.2483 102.983 72.1834 102.831C72.1186 102.679 72.0096 102.549 71.8707 102.46C71.7317 102.37 71.5691 102.324 71.4036 102.327C71.2937 102.313 71.182 102.324 71.077 102.36C70.9721 102.396 70.8768 102.455 70.7984 102.534C70.72 102.612 70.6606 102.707 70.6248 102.812C70.589 102.917 70.5777 103.029 70.5918 103.139Z"
                fill="#010101"
              />
              <path
                d="M70.6748 108.51C70.6748 109.045 71.0894 109.442 71.4003 109.442C71.7112 109.442 72.0567 109.045 72.1431 108.51C72.2294 107.974 72.0567 107.611 71.4003 107.611C70.7439 107.611 70.5539 107.819 70.6748 108.51Z"
                fill="#010101"
              />
              <path
                d="M34.5211 19.0691C34.4517 19.2329 34.3399 19.3752 34.1972 19.4815C34.0545 19.5877 33.8861 19.6541 33.7093 19.6737C32.7247 19.6737 33.0529 20.451 35.2466 23.1283C36.6458 24.8557 37.4921 25.6502 37.7858 25.3739C38.0794 25.0975 37.6131 24.3202 36.6803 23.0938C35.0912 21.0555 34.763 19.7946 35.7821 19.4319C36.8012 19.0691 36.5076 18.4473 35.5748 18.4473C35.3594 18.446 35.1476 18.5032 34.9621 18.6127C34.7766 18.7222 34.6242 18.8799 34.5211 19.0691Z"
                fill="#010101"
              />
              <path
                d="M111.146 19.5863C109.557 21.3137 109.315 23.3001 110.611 24.4747C110.883 24.7686 111.22 24.9951 111.594 25.136C111.969 25.2769 112.372 25.3285 112.77 25.2865C114.325 25.131 114.601 24.1119 113.064 24.2328C111.526 24.3538 110.905 23.9046 110.905 22.5055C110.905 21.1064 111.475 20.9855 113.513 22.5055C115.551 24.0256 115.983 23.6455 116.432 21.4C117.002 18.619 113.34 17.3581 111.146 19.5863ZM114.895 19.7591C115.465 20.3291 115.534 21.4864 115.05 21.8664C114.463 21.7958 113.904 21.5758 113.426 21.2273C112.373 20.5709 112.2 20.2773 112.563 19.8282C112.707 19.663 112.883 19.5294 113.081 19.4358C113.279 19.3421 113.495 19.2904 113.714 19.2839C113.933 19.2774 114.151 19.3163 114.354 19.3981C114.557 19.4798 114.741 19.6028 114.895 19.7591Z"
                fill="#010101"
              />
              <path
                d="M30.5009 22.1094C29.8939 22.3245 29.3644 22.7152 28.9799 23.2319C28.5955 23.7487 28.3733 24.368 28.3418 25.0113C28.5318 26.4796 29.4818 26.4796 29.4818 25.0113C29.4818 23.5431 30.6218 22.6795 31.6755 23.4568C32.2801 23.9059 32.2801 24.0786 31.3128 25.3741C30.0864 26.9978 30.0519 27.8614 31.0192 28.8287C31.2353 29.0814 31.513 29.274 31.8253 29.3881C32.1376 29.5022 32.4741 29.5339 32.8022 29.48C33.1303 29.4262 33.439 29.2887 33.6986 29.0809C33.9581 28.873 34.1596 28.6017 34.2838 28.2932C34.6465 27.6369 35.2165 27.0669 35.5102 27.0669C36.2702 27.0669 36.1148 26.7041 34.3183 24.5795C32.5219 22.4549 31.5892 21.7121 30.5009 22.1094ZM33.8001 25.5641C33.9399 26.0963 33.9399 26.6556 33.8001 27.1878C33.7654 27.4923 33.6114 27.7706 33.3717 27.9616C33.1321 28.1527 32.8265 28.2409 32.5219 28.2069C31.3473 28.2069 31.1919 27.2223 32.1592 25.8404C32.9019 24.8041 33.4719 24.7177 33.8001 25.5814V25.5641Z"
                fill="#010101"
              />
              <path
                d="M116.43 24.3877C113.667 27.6178 113.822 28.8269 116.638 25.8213C118.589 23.6967 118.883 23.5413 120.092 23.9904C121.301 24.4395 120.818 25.4586 118.831 27.445C117.76 28.4987 117.104 29.466 117.104 29.6387C118.062 29.2761 118.938 28.7239 119.678 28.0151C121.578 26.4605 122.113 26.2877 122.77 26.5468C123.979 27.2378 123.702 27.9632 121.457 29.9151C120.248 30.986 119.505 31.9533 119.729 32.1952C120.127 32.9379 124.808 28.7405 124.808 27.6005C124.829 27.3502 124.795 27.0984 124.709 26.8625C124.622 26.6266 124.485 26.4125 124.308 26.2349C124.13 26.0573 123.916 25.9205 123.68 25.8342C123.444 25.7479 123.193 25.714 122.942 25.735C122.286 25.735 122.009 25.4068 121.837 24.5086C121.795 24.1615 121.648 23.8353 121.417 23.5732C121.186 23.311 120.88 23.1252 120.541 23.0404C119.971 22.9194 119.522 22.5567 119.522 22.2285C119.453 21.2267 118.71 21.7103 116.43 24.3877Z"
                fill="#010101"
              />
              <path
                d="M25.3217 26.8765C24.9165 27.3233 24.4838 27.7445 24.0262 28.1374C22.8861 29.0702 23.2143 30.8666 24.8035 32.2485C26.7035 33.9758 28.6727 33.9758 29.8127 32.4212C30.5727 31.3502 30.5727 31.3502 31.0736 32.1794C31.305 32.6444 31.372 33.1741 31.2637 33.6821C31.0218 34.2867 30.8145 34.4076 29.5363 34.494C28.6036 34.5804 28.5518 35.4267 29.5363 35.6686C30.2446 35.7079 30.9409 35.4734 31.4811 35.0136C32.0212 34.5538 32.3639 33.904 32.4382 33.1985C32.4382 32.3694 31.6609 31.3157 29.5018 29.1565C28.5073 28.099 27.4457 27.1066 26.3235 26.1855C25.9437 26.341 25.602 26.5767 25.3217 26.8765ZM28.0508 29.2429C29.2772 30.4175 29.3981 32.1276 28.2581 32.4903C27.5484 32.5424 26.8385 32.3914 26.2114 32.0549C25.5844 31.7184 25.0661 31.2104 24.7171 30.5902C23.698 28.3447 26.2199 27.3601 28.0508 29.2429Z"
                fill="#010101"
              />
              <path
                d="M124.133 32.0915C122.129 35.1835 121.075 35.9953 120.056 35.1489C119.693 34.8552 119.451 34.8207 119.244 35.1489C118.83 35.7535 119.4 36.358 120.384 36.358C123.638 35.5824 126.804 34.477 129.833 33.0588C130.472 32.4197 128.52 32.6615 126.292 33.5079C125.575 33.8308 124.82 34.0629 124.046 34.1989C124.412 33.454 124.851 32.748 125.359 32.0915C126.741 30.1742 127.086 29.0342 126.413 29.0342C125.519 29.9467 124.752 30.975 124.133 32.0915Z"
                fill="#010101"
              />
              <path
                d="M19.905 33.0253C18.8858 34.1308 18.5231 36.2036 19.2831 36.6527C20.0431 37.1018 20.5441 36.4454 20.1468 35.6854C20.001 35.4348 19.9423 35.143 19.9798 34.8556C20.0173 34.5681 20.1489 34.3011 20.3541 34.0963C20.9932 33.1117 21.2523 33.0253 22.0814 33.5263C22.4787 33.8026 22.4441 34.2517 21.8741 35.7545C21.2177 37.4818 21.2177 37.6718 21.8741 38.4837C22.1753 38.8258 22.5748 39.0665 23.018 39.1728C23.4612 39.2791 23.9265 39.2458 24.35 39.0775C24.7736 38.9092 25.1348 38.6141 25.3843 38.2326C25.6337 37.8511 25.7591 37.4019 25.7433 36.9464C25.7433 36.4455 25.9333 36.0827 26.1751 36.1345C26.2967 36.163 26.4244 36.1495 26.5373 36.0962C26.6502 36.0429 26.7417 35.9529 26.797 35.8409C25.2131 34.2086 23.3308 32.8951 21.2523 31.9717C20.7219 32.2044 20.2586 32.5667 19.905 33.0253ZM24.586 35.4263C25.3115 36.3245 24.7415 38.0864 23.7224 38.0864C22.7032 38.0864 22.3923 37.3091 22.9105 35.9272C23.4287 34.5454 23.8433 34.459 24.586 35.34V35.4263Z"
                fill="#010101"
              />
              <path
                d="M131.096 38.207C127.14 40.6598 126.501 41.1435 126.899 41.6617C127.618 41.6223 128.312 41.3831 128.902 40.9708L130.63 40.0207L131.234 41.0053C132.409 42.7326 133.67 43.8208 134.689 43.8208C135.453 43.7792 136.18 43.4771 136.749 42.9649C137.318 42.4526 137.694 41.7611 137.815 41.0053C137.815 39.8998 135.656 36.0824 135.086 36.0824C134.81 35.9961 133.082 36.9806 131.096 38.207ZM135.863 39.0707C136.744 40.9362 136.71 41.5926 135.777 42.1108C134.43 42.8017 133.739 42.5599 132.892 41.178C131.822 39.4507 131.873 39.1916 133.203 38.3798C134.81 37.3434 135.086 37.4297 135.863 39.0189V39.0707Z"
                fill="#010101"
              />
              <path
                d="M16.1609 38.4837C15.1072 39.831 14.4336 41.6102 14.9345 41.9384C16.3682 43.0784 20.6347 44.9093 20.9974 44.5466C21.3602 44.1839 20.7556 43.7693 19.4083 43.1129C17.0937 41.9383 16.3164 41.1265 16.5237 40.1074C16.7309 39.0883 18.251 39.0365 20.4792 40.3492C22.7075 41.662 22.9666 41.8174 22.9666 41.0747C22.9666 40.3319 18.7692 37.9482 17.5428 37.9482C17.0334 37.9581 16.5439 38.1478 16.1609 38.4837Z"
                fill="#010101"
              />
              <path
                d="M10.9425 42.4733C10.8802 42.595 10.8484 42.73 10.8496 42.8667C10.8509 43.0034 10.8852 43.1378 10.9497 43.2583C11.0143 43.3788 11.107 43.4819 11.2201 43.5588C11.3331 43.6357 11.4631 43.684 11.5989 43.6997C12.0826 43.6997 12.0826 42.5942 11.5989 42.266C11.4837 42.2102 11.3516 42.2005 11.2295 42.2391C11.1074 42.2776 11.0047 42.3614 10.9425 42.4733Z"
                fill="#010101"
              />
              <path
                d="M13.3433 43.7325C13.0151 44.3026 13.0152 44.268 16.1934 45.6844C19.009 46.9454 20.1145 47.239 20.1145 46.6172C20.1145 45.9953 13.637 43.3871 13.3433 43.7325Z"
                fill="#010101"
              />
              <path
                d="M133.533 46.6704C131.615 48.3978 130.855 49.3478 131.183 49.5551C131.874 49.9696 139.025 49.3996 138.749 48.9505C137.754 48.6185 136.702 48.495 135.657 48.5878H132.755L134.88 46.8604C136.711 45.3922 137.574 44.0449 136.607 44.0449C135.505 44.8254 134.476 45.7042 133.533 46.6704Z"
                fill="#010101"
              />
              <path
                d="M9.92578 45.8092C9.92578 46.5001 11.9295 48.1756 12.4995 47.9338C13.3706 47.94 14.2261 48.1658 14.9868 48.5902C17.3015 49.5575 18.8042 49.6438 19.167 48.7802C19.5297 47.9165 18.977 47.5192 18.1997 48.0201C17.4224 48.5211 13.1904 47.0356 13.1904 46.0165C13.1904 44.9974 12.5341 45.0837 12.2922 45.8092C12.1368 46.2237 11.8777 46.2237 11.0313 45.8092C10.1849 45.3946 9.92578 45.481 9.92578 45.8092Z"
                fill="#010101"
              />
              <path
                d="M10.4418 50.4888C10.152 51.2338 9.98858 52.0219 9.95819 52.8207L9.80273 54.4443L12.6355 55.1698C15.9347 55.9817 16.5047 56.068 16.5047 55.498C16.5047 55.2907 15.7793 54.928 14.7774 54.6861C11.4437 53.7879 10.4591 52.9588 10.9946 51.6288C11.1208 51.4345 11.2955 51.2764 11.5015 51.1704C11.7075 51.0643 11.9377 51.014 12.1692 51.0242C13.0717 51.1157 13.9594 51.3188 14.812 51.6288C16.7638 52.3197 17.662 52.4061 17.662 51.8706C17.662 51.3352 13.1365 49.7979 11.841 49.7979C11.5721 49.8074 11.3084 49.8739 11.0672 49.9931C10.826 50.1122 10.6128 50.2811 10.4418 50.4888Z"
                fill="#010101"
              />
              <path
                d="M138.261 50.2969C137.626 50.9394 136.825 51.3937 135.947 51.6096C133.39 52.4215 132.82 52.8706 132.82 53.8379C132.82 54.8052 133.459 54.857 133.995 53.8379C134.53 52.8188 138.313 51.8687 139.177 52.5251C140.041 53.1815 139.954 52.8188 139.833 52.0069C139.833 51.8342 140.231 51.4714 140.801 51.2296C142.148 50.6078 142.113 50.0032 140.68 50.1241C140.13 50.2251 139.563 50.1527 139.056 49.9169C138.78 49.8823 138.503 50.0032 138.261 50.2969Z"
                fill="#010101"
              />
              <path
                d="M133.707 56.5515C133.707 56.9315 133.897 57.1215 134.191 57.0524C134.916 56.8106 135.037 55.9124 134.346 55.9124C134.262 55.91 134.178 55.9249 134.099 55.9562C134.02 55.9874 133.949 56.0344 133.889 56.0942C133.829 56.1541 133.782 56.2255 133.751 56.3041C133.72 56.3827 133.705 56.4669 133.707 56.5515Z"
                fill="#010101"
              />
              <path
                d="M8.54343 57.2068C8.11354 57.7434 7.88949 58.416 7.91166 59.1033C7.93383 59.7905 8.20077 60.4472 8.66436 60.9551C9.56256 61.7669 10.3053 61.1105 9.52802 60.1778C8.75072 59.245 9.19982 57.7423 10.2535 57.6214C11.3072 57.5004 11.1517 57.6214 11.1517 59.3487C11.1517 61.6806 12.2572 62.8033 13.9154 62.2506C14.8136 61.9224 15.0554 61.5942 15.1418 60.2469C15.1729 59.5108 15.3676 58.7909 15.7118 58.1395C16.1955 57.5695 16.1264 57.5177 12.8617 56.8268C9.5971 56.1358 9.23436 56.1877 8.54343 57.2068ZM13.6391 58.3468C14.5718 58.8823 14.6927 60.7133 13.7945 61.0414C12.8963 61.3696 11.9635 60.4196 11.9635 59.1241C11.9635 57.8286 12.3781 57.6904 13.6391 58.3468Z"
                fill="#010101"
              />
              <path
                d="M138.866 57.7419C137.431 58.0381 136.017 58.4305 134.634 58.9165C134.469 60.5388 134.839 62.1704 135.688 63.563C136.137 63.7185 136.223 63.3557 135.981 61.6802L135.739 59.6593L138.054 59.1583C143.91 57.9838 144.29 57.8629 144.29 57.2928C144.29 56.7228 143.72 56.6019 138.866 57.7419Z"
                fill="#010101"
              />
              <path
                d="M7.31959 64.1186C6.97333 64.6234 6.83136 65.2407 6.92232 65.846C7.12959 66.6578 6.92229 66.7787 5.57498 66.8996C4.72859 66.986 4.07223 67.176 4.10677 67.4351C7.31675 68.1295 10.6019 68.4139 13.8834 68.2815C15.1098 67.7978 13.8834 67.2278 11.5688 67.2278C9.25418 67.2278 7.88961 66.606 7.88961 65.3969C7.88961 64.7059 9.23692 63.8768 10.0142 64.1359C10.3079 64.1359 11.3961 64.4123 12.5016 64.5332C13.918 64.7059 14.4189 64.6196 14.4189 64.205C14.4189 63.7905 13.7107 63.5659 12.5361 63.3932C9.11601 63.0304 7.97597 63.1513 7.31959 64.1186Z"
                fill="#010101"
              />
              <path
                d="M141.717 64.1178C140.813 64.589 139.816 64.8545 138.798 64.8951C135.775 65.3442 135.05 65.7415 135.343 66.726C135.637 67.7106 136.449 67.5897 136.449 66.8124C136.449 66.0351 141.493 65.3442 141.907 66.2424C142.028 66.6397 142.27 66.5706 142.667 66.0351C143.056 65.6339 143.578 65.3882 144.135 65.3442C144.584 65.3442 144.999 65.1369 144.999 64.9296C144.999 64.7224 144.464 64.3596 143.272 64.4805C142.857 64.4805 142.529 64.3596 142.529 64.1696C142.65 63.5305 141.959 63.5305 141.717 64.1178Z"
                fill="#010101"
              />
              <path
                d="M138.056 67.7107C136.138 68.2807 135.741 68.8507 135.81 71.0099V73.0136H140.819C145.051 73.0136 145.863 72.9272 145.863 72.3917C145.863 71.8563 145.414 71.7872 144.274 71.7872C143.134 71.7872 142.719 71.6663 142.892 70.9753C143.006 70.6626 143.056 70.3302 143.039 69.9978C143.022 69.6654 142.939 69.3398 142.794 69.0402C142.649 68.7406 142.446 68.4732 142.195 68.2537C141.945 68.0342 141.653 67.8672 141.337 67.7625C140.826 67.5184 140.269 67.3874 139.702 67.3784C139.136 67.3695 138.574 67.4828 138.056 67.7107ZM141.51 68.9371C141.719 69.0523 141.896 69.217 142.025 69.4167C142.155 69.6164 142.234 69.845 142.254 70.0823C142.275 70.3196 142.236 70.5583 142.143 70.7773C142.049 70.9963 141.903 71.1889 141.717 71.3381C140.819 72.1154 137.347 71.7526 136.829 70.8544C135.862 69.2998 139.403 67.8316 141.476 68.9371H141.51Z"
                fill="#010101"
              />
              <path
                d="M4.84357 70.7688C4.49841 71.092 4.22326 71.4825 4.03515 71.9163C3.84705 72.3501 3.75 72.8179 3.75 73.2907C3.75 73.7635 3.84705 74.2313 4.03515 74.6651C4.22326 75.0989 4.49841 75.4895 4.84357 75.8126C6.67453 77.2808 8.29823 76.3826 9.36917 73.1698C9.97374 71.5461 10.3019 71.1316 11.0965 71.0625C13.1693 70.8034 13.532 74.2235 11.5801 75.1217C10.3192 75.6917 10.3192 76.2617 11.5801 76.2617C13.5666 76.2617 14.793 73.5325 13.7393 71.4598C12.1502 68.3679 8.85098 69.4733 7.78004 73.498C7.64021 74.2078 7.26979 74.8515 6.72637 75.329C4.99905 75.9335 4.11809 72.237 5.75905 71.3734C6.60544 70.9416 6.8991 69.7497 6.15635 69.7497C5.63737 69.9691 5.18478 70.3204 4.84357 70.7688Z"
                fill="#010101"
              />
              <path
                d="M135.742 75.2393C135.742 75.3589 135.778 75.4758 135.844 75.5752C135.911 75.6746 136.005 75.7521 136.115 75.7979C136.226 75.8436 136.347 75.8556 136.465 75.8323C136.582 75.809 136.69 75.7514 136.774 75.6668C136.859 75.5823 136.916 75.4746 136.94 75.3573C136.963 75.24 136.951 75.1184 136.905 75.008C136.86 74.8975 136.782 74.8031 136.683 74.7367C136.583 74.6702 136.466 74.6348 136.347 74.6348C136.188 74.6391 136.036 74.7042 135.924 74.8167C135.812 74.9291 135.747 75.0804 135.742 75.2393Z"
                fill="#010101"
              />
              <path
                d="M9.73693 81.2695C9.54874 81.6498 9.24559 81.9613 8.87045 82.1598C8.49531 82.3582 8.06722 82.4335 7.64689 82.375H6.26502L6.92141 83.4286C7.5778 84.4132 7.5778 84.5341 6.92141 85.6741L6.23047 86.8487H7.64689C8.04297 86.8075 8.44301 86.8684 8.80888 87.0257C9.17475 87.1829 9.49423 87.4312 9.73693 87.7469L10.3761 88.6797L11.1533 87.7469C11.4041 87.4541 11.7175 87.2214 12.0702 87.0659C12.423 86.9104 12.8063 86.8362 13.1916 86.8487C14.2798 86.8487 14.4525 86.7278 14.2107 86.1233C13.5889 84.7414 13.5198 83.6704 13.9689 83.4286C14.7807 82.8931 14.418 82.375 13.2261 82.375C12.8276 82.3789 12.4349 82.279 12.0866 82.0852C11.7383 81.8913 11.4465 81.6102 11.2397 81.2695L10.4624 80.2158L9.73693 81.2695ZM11.7579 83.9986C11.8352 84.2206 11.8606 84.4573 11.8321 84.6907C11.8037 84.924 11.7221 85.1477 11.5936 85.3445C11.4652 85.5414 11.2933 85.7061 11.0912 85.8262C10.8891 85.9462 10.6622 86.0183 10.4279 86.0369C10.1905 86.009 9.96273 85.9268 9.76229 85.7966C9.56184 85.6665 9.39413 85.4919 9.27215 85.2863C9.15017 85.0808 9.07723 84.8499 9.05898 84.6116C9.04073 84.3733 9.07765 84.134 9.16691 83.9123C9.30352 83.6863 9.49792 83.5007 9.73008 83.3748C9.96224 83.2489 10.2238 83.1872 10.4877 83.196C10.7517 83.2048 11.0085 83.2838 11.2318 83.4249C11.455 83.566 11.6366 83.764 11.7579 83.9986Z"
                fill="#010101"
              />
              <path
                d="M137.967 81.3887C137.767 81.7514 137.462 82.0457 137.093 82.2335C136.723 82.4214 136.306 82.4941 135.895 82.4424H134.513L135.169 83.496C135.808 84.4806 135.808 84.6015 135.169 85.7415L134.461 86.9161H135.895C136.288 86.8763 136.685 86.9379 137.048 87.0952C137.411 87.2524 137.727 87.5 137.967 87.8143L138.624 88.7471L139.401 87.8143C139.652 87.5215 139.965 87.2888 140.318 87.1333C140.671 86.9779 141.054 86.9036 141.439 86.9161C142.528 86.9161 142.7 86.7952 142.407 86.1906C142.027 85.1652 142.027 84.0378 142.407 83.0124C142.666 82.2351 142.579 82.1487 141.56 82.356C140.541 82.5633 140.265 82.356 139.522 81.4232L138.624 80.2832L137.967 81.3887ZM140.161 84.0315C140.662 84.8779 139.643 86.1043 138.434 86.1043C138.202 86.0724 137.982 85.9844 137.792 85.8479C137.602 85.7114 137.448 85.5304 137.344 85.3209C137.241 85.1114 137.19 84.8796 137.196 84.6459C137.202 84.4121 137.265 84.1834 137.38 83.9797C137.539 83.7608 137.748 83.5824 137.988 83.4589C138.229 83.3354 138.496 83.2701 138.766 83.2685C139.037 83.2668 139.304 83.3287 139.546 83.4492C139.789 83.5698 139.999 83.7456 140.161 83.9624V84.0315Z"
                fill="#010101"
              />
              <path
                d="M12.1663 94.1724C10.8399 94.6485 9.58018 95.2929 8.41797 96.0898C8.95152 97.8872 9.98129 99.4977 11.389 100.736C12.0249 100.866 12.6861 100.781 13.268 100.493C13.8499 100.205 14.3192 99.7315 14.6018 99.1471C14.8436 98.5771 15.2582 98.3353 15.6727 98.4562C16.4327 98.698 18.471 97.1952 18.471 96.3834C18.471 95.5716 16.8818 92.5488 16.3118 92.5833C14.9014 93.0353 13.5174 93.5659 12.1663 94.1724ZM16.8473 95.0016C17.5037 96.5389 17.1237 97.4371 15.9145 97.4371C15.5994 97.4368 15.2922 97.3386 15.0353 97.156C14.7785 96.9734 14.5847 96.7155 14.4809 96.418C13.7899 94.9497 13.8763 94.6906 14.93 94.1724C16.2773 93.6542 16.2773 93.6543 16.8473 95.0016ZM13.3927 96.9016C14.0836 98.3353 14.049 98.4217 13.3927 99.1471C13.224 99.3649 12.9941 99.5273 12.7325 99.6135C12.4709 99.6996 12.1895 99.7057 11.9244 99.6308C10.9548 98.9039 10.285 97.847 10.0417 96.6598C10.0417 96.3316 11.6308 95.5716 12.529 95.4334C12.529 95.3989 12.9435 96.0552 13.3408 96.9362L13.3927 96.9016Z"
                fill="#010101"
              />
              <path
                d="M131.252 92.9121C131.252 93.5339 139.405 96.7813 139.889 96.3667C140.372 95.9521 138.869 95.3994 136.175 94.2939C131.874 92.463 131.252 92.3075 131.252 92.9121Z"
                fill="#010101"
              />
              <path
                d="M131.908 97.109C131.569 97.5348 131.343 98.0401 131.252 98.5772C131.252 99.4754 132.064 100.736 132.513 100.495C132.962 100.253 132.72 99.9591 132.513 99.4754C131.977 98.4908 133.411 96.5735 134.137 97.3163C134.499 97.6445 134.499 98.0936 134.137 99.2336C133.359 101.669 134.948 103.379 136.831 102.118C137.129 101.94 137.376 101.687 137.545 101.384C137.715 101.081 137.802 100.738 137.799 100.391C137.773 100.121 137.817 99.8498 137.925 99.6019C138.034 99.354 138.205 99.1381 138.42 98.9745C139.232 98.6808 139.198 97.9208 138.42 97.9208C137.634 97.7615 136.876 97.4819 136.175 97.0917C134.067 95.9689 132.686 96.0035 131.908 97.109ZM136.883 99.7172C136.883 100.615 136.797 101.065 136.313 101.272C135.294 101.669 134.793 100.944 135.121 99.5445C135.449 98.1454 136.71 97.9727 136.883 99.7172Z"
                fill="#010101"
              />
              <path
                d="M15.4148 101.064C14.473 101.555 13.6015 102.171 12.8238 102.895C12.6789 103.119 12.5846 103.371 12.5473 103.635C12.51 103.899 12.5308 104.167 12.6081 104.422C12.6854 104.677 12.8174 104.912 12.9949 105.111C13.1723 105.309 13.391 105.467 13.6357 105.572C14.033 105.831 14.413 106.263 14.413 106.592C14.413 106.92 14.5339 107.213 14.6893 107.213C16.6589 106.23 18.4839 104.98 20.1131 103.5C20.1131 102.895 19.3358 103.102 17.6603 104.156C15.9848 105.21 14.7239 105.451 13.9638 104.519C13.5147 103.949 13.5493 103.741 14.4475 102.981C15.1944 102.402 15.9857 101.882 16.8139 101.427C17.5049 101.064 18.0749 100.529 18.0749 100.287C18.0749 99.6822 17.6603 99.8031 15.4148 101.064Z"
                fill="#010101"
              />
              <path
                d="M129.174 102.204C128.12 103.552 127.447 104.882 127.879 105.124C130.094 106.822 132.446 108.335 134.909 109.649C135.652 109.649 135.358 108.958 134.27 108.233L133.199 107.542L134.062 106.644C134.337 106.447 134.561 106.188 134.715 105.887C134.869 105.587 134.95 105.254 134.95 104.916C134.95 104.579 134.869 104.246 134.715 103.945C134.561 103.645 134.337 103.386 134.062 103.189C131.99 101.427 130.159 101.013 129.174 102.204ZM132.801 103.465C134.097 104.484 133.89 106.143 132.439 106.315C130.608 106.523 128.397 104.07 129.502 103.016C129.986 102.481 131.869 102.774 132.801 103.465Z"
                fill="#010101"
              />
              <path
                d="M18.5967 106.4C18.0171 106.685 17.5169 107.108 17.1402 107.632C16.7635 108.157 16.5222 108.766 16.4375 109.406C16.4375 110.339 18.8039 112.584 19.4085 112.256C21.7103 110.628 23.8557 108.789 25.8168 106.763C25.8168 106.193 25.4368 106.314 24.0895 107.247C23.1913 107.851 22.915 107.938 22.915 107.489C22.915 106.711 21.5676 105.571 20.6349 105.571C19.9073 105.71 19.2145 105.992 18.5967 106.4ZM22.1377 107.972C22.1377 108.801 19.9785 110.874 19.1321 110.874C18.7347 110.814 18.3706 110.617 18.1026 110.318C17.8346 110.018 17.6795 109.635 17.6639 109.233C17.6639 108.508 19.0976 107.04 20.1167 106.711C20.3326 106.644 20.5604 106.624 20.7847 106.653C21.009 106.682 21.2244 106.759 21.4163 106.878C21.6081 106.998 21.7719 107.158 21.8964 107.347C22.0209 107.535 22.1032 107.749 22.1377 107.972Z"
                fill="#010101"
              />
              <path
                d="M125.032 107.542C124.782 107.845 124.596 108.195 124.485 108.572C124.374 108.949 124.339 109.345 124.385 109.735C124.43 110.125 124.553 110.502 124.748 110.844C124.942 111.185 125.203 111.484 125.516 111.722C125.78 112.057 126.11 112.334 126.485 112.536C126.861 112.737 127.275 112.859 127.7 112.893C128.125 112.927 128.552 112.873 128.955 112.734C129.358 112.595 129.728 112.374 130.042 112.085C131.009 111.117 131.13 108.837 130.232 108.837C129.783 108.837 129.662 109.114 129.869 109.805C129.973 110.148 129.968 110.516 129.853 110.857C129.739 111.197 129.521 111.494 129.23 111.705C128.94 111.916 128.59 112.031 128.231 112.034C127.872 112.037 127.521 111.928 127.226 111.722C126.777 111.446 126.932 111.031 128.038 109.649C129.143 108.267 129.385 107.922 128.608 107.369C128.086 106.976 127.442 106.777 126.789 106.809C126.136 106.84 125.514 107.1 125.032 107.542ZM127.71 107.853C128.038 108.181 126.501 110.461 125.982 110.461C125.464 110.461 125.084 108.837 125.568 108.233C125.827 107.933 126.182 107.732 126.572 107.663C126.961 107.594 127.363 107.661 127.71 107.853Z"
                fill="#010101"
              />
              <path
                d="M119.852 109.615C120.496 110.529 121.264 111.348 122.133 112.051C122.945 112.707 123.66 113.475 124.257 114.331C123.079 114.286 121.915 114.064 120.803 113.675C116.812 112.621 116.363 112.586 116.363 113.191C118.045 115.652 120.043 117.882 122.305 119.824C123.169 119.824 122.547 118.649 120.578 116.784C119.827 116.096 119.15 115.331 118.557 114.504C119.63 114.494 120.697 114.657 121.718 114.987C125.173 115.834 126.537 115.92 126.9 115.436C124.939 113.074 122.667 110.988 120.146 109.235C120.061 109.255 119.985 109.304 119.932 109.373C119.878 109.442 119.85 109.528 119.852 109.615Z"
                fill="#010101"
              />
              <path
                d="M22.3426 111.721C20.5116 113.362 20.4253 114.744 22.1871 116.281C22.6337 116.733 23.1534 117.107 23.7244 117.387C26.0041 115.541 28.0309 113.404 29.7528 111.03C29.5973 110.875 29.0619 111.116 28.5264 111.6C27.4382 112.654 27.0236 112.74 27.0236 111.894C27.0236 111.047 25.8145 110.46 24.6227 110.46C23.7676 110.679 22.9828 111.113 22.3426 111.721ZM25.5554 111.514C26.8682 112.015 26.2463 114.295 24.5363 115.141C21.6862 116.644 20.8053 113.414 23.6899 111.928C25.0372 111.203 24.7954 111.237 25.5554 111.514Z"
                fill="#010101"
              />
              <path
                d="M27.9562 115.642C24.8643 119.01 24.3461 120.634 27.2307 117.784C28.4571 116.575 29.2344 116.057 29.9254 116.247C31.4281 116.454 31.3072 117.628 29.6663 119.701C28.7853 120.755 28.2844 121.688 28.4917 121.895C28.699 122.102 29.5972 121.377 30.6163 120.168C32.5681 117.801 32.7754 116.264 31.2208 115.573C30.0808 115.089 30.0808 114.882 31.0999 113.949C32.1191 113.017 32.1536 112.516 31.3763 112.516C30.0852 113.379 28.9321 114.433 27.9562 115.642Z"
                fill="#010101"
              />
              <path
                d="M33.6563 118.89C32.7236 119.252 33.1381 119.822 34.3127 119.822C35.4873 119.822 36.5928 120.721 36.2646 121.55C36.0746 122.033 35.7464 122.033 34.1918 121.463C32.0845 120.703 30.979 121.066 30.7372 122.569C30.5299 123.743 31.2208 124.521 32.7409 124.849C33.38 125.004 33.9154 125.298 33.9154 125.505C33.9154 126.403 34.7273 125.695 36.1091 123.588C37.8364 121.066 37.8365 120.133 35.9537 119.149C34.7618 118.561 34.4854 118.527 33.6563 118.89ZM34.4854 122.551C35.3318 122.793 35.3664 123.242 34.4854 123.899C33.6045 124.555 31.8426 124.054 31.8426 123.122C31.8426 122.189 32.2918 121.774 33.0172 122.102C33.4966 122.283 33.987 122.433 34.4854 122.551Z"
                fill="#010101"
              />
              <path
                d="M108.895 121.463C107.944 122.309 107.668 123.898 108.394 123.898C108.635 123.898 109.015 123.449 109.171 122.913C109.585 121.946 110.639 121.29 111.296 121.704C111.952 122.119 111.658 122.879 110.432 123.984C109.205 125.09 108.929 125.971 109.862 126.904C110.795 127.836 111.935 127.733 113.04 126.593C113.517 126.114 114.064 125.712 114.664 125.401C115.199 125.194 115.044 124.762 113.645 122.879C111.796 120.357 110.622 119.994 108.895 121.463ZM113.04 124.105C113.489 125.366 112.142 126.869 110.967 126.472C110.19 126.178 110.311 125.487 111.33 124.434C112.349 123.38 112.764 123.242 113.092 124.105H113.04Z"
                fill="#010101"
              />
              <path
                d="M38.515 122.847C37.7377 123.624 37.945 124.574 39.0505 125.61C40.156 126.647 40.346 127.441 39.6551 127.856C38.9641 128.27 37.6168 127.286 37.6168 126.422C37.6168 125.99 37.3404 125.61 37.0123 125.61C36.0277 125.61 36.3213 127.13 37.4614 128.011C40.2251 130.17 42.7815 127.562 40.2596 125.213C39.0505 124.073 38.9641 123.175 40.0696 123.175C40.3581 123.21 40.6314 123.324 40.8598 123.503C41.0882 123.683 41.263 123.922 41.3651 124.194C41.9006 125.369 42.5051 125.541 42.5051 124.47C42.4193 124.053 42.2319 123.663 41.9596 123.336C41.6873 123.008 41.3384 122.753 40.9439 122.592C40.5493 122.432 40.1213 122.371 39.6976 122.415C39.274 122.46 38.8678 122.608 38.515 122.847Z"
                fill="#010101"
              />
              <path
                d="M43.5569 125.901C42.8347 127.206 42.2111 128.563 41.6914 129.96C41.6914 131.031 42.5378 130.254 43.6087 128.233C44.4897 126.506 44.9388 126.126 45.7506 126.126C47.0979 126.126 47.2707 127.387 46.1997 129.58C45.267 131.411 45.1461 132.05 45.8024 132.05C46.4608 131.434 46.9639 130.67 47.2707 129.822C48.5316 127.007 48.3243 125.625 46.5279 125.262C45.5952 125.089 45.3879 124.847 45.5952 124.364C46.1652 122.982 46.2516 122.291 45.837 122.291C44.8967 123.371 44.1278 124.588 43.5569 125.901Z"
                fill="#010101"
              />
              <path
                d="M116.481 122.968C116.308 123.088 116.671 123.658 117.241 124.194C118.554 125.368 118.968 125.127 118.07 123.693C117.379 122.674 116.964 122.484 116.481 122.968Z"
                fill="#010101"
              />
              <path
                d="M103.565 124.574C103.302 124.902 102.927 125.124 102.511 125.195C102.183 125.195 101.941 125.195 101.941 125.403C101.941 125.61 105.603 133.003 105.811 133.297C105.912 133.309 106.016 133.3 106.114 133.27C106.212 133.24 106.303 133.19 106.381 133.124C106.709 132.968 106.622 132.519 106.225 131.707C105.655 130.602 105.69 130.567 106.622 130.326C107.275 130.137 107.839 129.723 108.212 129.156C108.586 128.589 108.745 127.907 108.661 127.234C108.352 126.483 107.913 125.793 107.365 125.195C106.225 123.779 104.429 123.485 103.565 124.574ZM106.83 126.094C107.849 127.821 107.849 128.685 106.916 129.22C105.327 130.084 103.081 127.234 103.98 125.558C104.636 124.314 105.931 124.574 106.83 126.025V126.094Z"
                fill="#010101"
              />
              <path
                d="M97.2563 127.319C96.1163 128.459 95.9608 129.184 96.859 129.184C97.018 129.18 97.1692 129.115 97.2817 129.003C97.3941 128.89 97.4592 128.739 97.4636 128.58C97.5192 128.345 97.6293 128.127 97.7848 127.943C97.9404 127.759 98.1371 127.614 98.359 127.52C98.5809 127.425 98.8219 127.385 99.0624 127.401C99.3029 127.417 99.5363 127.49 99.7437 127.613C100.556 128.252 100.469 128.494 99.0873 129.34C97.7054 130.186 96.8936 131.413 97.4636 132.466C97.687 132.716 97.9593 132.918 98.2635 133.058C98.5678 133.199 98.8976 133.275 99.2327 133.283C99.5677 133.292 99.9009 133.231 100.212 133.105C100.522 132.98 100.804 132.791 101.039 132.553C101.226 132.364 101.449 132.215 101.696 132.117C101.943 132.019 102.207 131.973 102.473 131.983C103.406 132.19 103.371 131.81 101.816 129.012C100.262 126.213 98.9664 125.609 97.2563 127.319ZM101.126 130.584C101.127 130.827 101.077 131.069 100.978 131.292C100.88 131.515 100.735 131.714 100.554 131.877C100.373 132.041 100.16 132.164 99.9277 132.238C99.6957 132.313 99.4505 132.338 99.2082 132.311C98.0336 132.121 98.1199 130.895 99.3809 130.204C100.918 129.392 101.126 129.444 101.126 130.584Z"
                fill="#010101"
              />
              <path
                d="M89.3262 127.043C89.9208 129.891 90.7233 132.691 91.7271 135.421C92.4526 136.164 92.539 134.937 91.9172 132.864C91.4335 131.137 91.399 130.619 91.7963 130.17C92.7463 129.03 93.9554 129.686 94.6118 131.638L95.4582 134.039C95.5964 134.367 95.8727 134.488 96.1146 134.367C96.65 134.039 95.4582 130.014 94.5772 128.943C94.1872 128.578 93.6685 128.382 93.1343 128.398C92.6002 128.415 92.0943 128.642 91.7271 129.03C91.0362 129.634 90.9844 129.6 90.6562 128.339C90.328 127.078 89.3262 126.145 89.3262 127.043Z"
                fill="#010101"
              />
              <path
                d="M50.0332 127.683C49.4978 128.098 49.4287 128.34 49.7914 128.547C49.9641 128.627 50.1569 128.653 50.3448 128.623C50.5327 128.592 50.707 128.505 50.8451 128.374C51.6224 127.77 53.1597 128.581 53.0042 129.514C52.8833 130.05 52.5206 130.171 51.5015 130.084C49.5496 129.894 48.2886 130.292 48.0468 131.276C47.805 132.261 48.9105 133.677 50.5687 133.677C51.3114 133.677 51.916 133.833 51.916 134.074C51.9372 134.198 52.0039 134.309 52.1031 134.386C52.2022 134.463 52.3266 134.499 52.4515 134.489C53.0215 134.489 54.4379 129.514 54.1788 128.616C53.838 128.202 53.4179 127.861 52.9433 127.612C52.4688 127.363 51.9492 127.211 51.4151 127.165C50.9225 127.236 50.4511 127.413 50.0332 127.683ZM52.1924 131.224C52.5897 131.224 52.5897 131.432 52.2788 132.036C51.7433 133.055 49.4978 133.176 49.135 132.209C48.7723 131.242 49.7396 130.741 50.8623 131.034C51.3021 131.12 51.7461 131.184 52.1924 131.224Z"
                fill="#010101"
              />
              <path
                d="M87.1218 127.474C87.0873 128.603 87.2094 129.73 87.4846 130.825C87.7619 132.045 87.9696 133.279 88.1064 134.522C88.1064 135.748 86.9664 135.904 85.8264 134.884L84.8418 133.952V134.936C84.8418 137.061 88.4692 137.337 89.1255 135.264C89.1931 133.921 89.0533 132.575 88.711 131.274C87.9337 127.802 87.5364 126.835 87.1218 127.474Z"
                fill="#010101"
              />
              <path
                d="M65.8725 128.425C65.8187 128.579 65.8097 128.745 65.8463 128.904C65.883 129.063 65.964 129.209 66.0798 129.323C66.408 129.634 66.5289 129.513 66.5289 128.874C66.5289 127.89 66.3216 127.734 65.8725 128.425Z"
                fill="#010101"
              />
              <path
                d="M62.8493 129.152C62.8505 129.365 62.7909 129.574 62.6778 129.755C62.5646 129.935 62.4025 130.08 62.2102 130.171C61.7093 130.327 61.6748 130.586 61.9684 130.949C62.2621 131.311 62.2448 132.123 61.9684 133.557C61.4675 136.027 61.7093 136.925 62.8493 136.925C63.713 136.925 63.9894 136.286 63.2294 136.027C62.4693 135.768 63.143 131.225 63.9203 131.225C64.2485 131.225 64.4903 131.035 64.4903 130.828C64.4927 130.773 64.4837 130.718 64.4637 130.666C64.4438 130.615 64.4133 130.568 64.3743 130.529C64.3353 130.49 64.2886 130.46 64.2372 130.44C64.1858 130.42 64.1308 130.411 64.0757 130.413C63.8685 130.413 63.6785 129.964 63.6785 129.394C63.6785 128.824 63.5057 128.375 63.2639 128.375C63.0221 128.375 62.8493 128.755 62.8493 129.152Z"
                fill="#010101"
              />
              <path
                d="M55.9756 129.757C55.2407 131.453 54.7745 133.254 54.5938 135.094C55.1638 135.664 55.492 135.215 55.9756 133.367C56.5456 131.087 57.5993 129.912 58.6184 130.275C59.1884 130.482 59.2748 130.879 59.033 132.71C58.9469 133.672 58.7852 134.625 58.5493 135.56C58.3766 135.975 58.5493 136.217 58.8602 136.217C59.1712 136.217 60.4148 133.09 60.4148 131.138C60.3843 130.865 60.2972 130.6 60.1589 130.362C60.0207 130.123 59.8343 129.916 59.6118 129.754C59.3892 129.592 59.1353 129.477 58.8661 129.418C58.597 129.359 58.3185 129.357 58.0484 129.411C57.6338 129.459 57.2141 129.387 56.8393 129.204C56.5111 128.824 56.2174 129.066 55.9756 129.757Z"
                fill="#010101"
              />
              <path
                d="M72.8699 131.845C72.0457 132.855 71.4557 134.035 71.1426 135.3C71.7055 135.631 72.3582 135.776 73.0081 135.715C74.4418 135.715 74.5972 135.836 74.5972 136.734C74.5972 137.373 74.8391 137.736 75.2018 137.736C75.5645 137.736 75.8236 137.373 75.8236 136.768C75.8192 136.512 75.8844 136.26 76.0121 136.038C76.1399 135.816 76.3255 135.632 76.5491 135.507C77.2055 135.266 77.2055 135.214 76.5491 134.73C75.8927 134.246 75.7718 133.348 75.5818 131.517C75.5617 130.58 75.3685 129.655 75.0118 128.788C74.1941 129.73 73.4763 130.755 72.8699 131.845ZM74.5972 134.367C74.1827 134.466 73.7508 134.466 73.3363 134.367L72.2826 134.246L73.3708 132.623L74.5109 130.999L74.6318 132.571C74.7112 133.17 74.682 133.779 74.5454 134.367H74.5972Z"
                fill="#010101"
              />
              <path
                d="M65.0595 133.556C64.6104 137.011 64.6104 136.924 65.0595 137.011C65.5086 137.097 65.7159 135.992 66.2341 132.537C66.4414 131.19 66.3722 130.81 65.9231 130.81C65.474 130.81 65.2668 131.604 65.0595 133.556Z"
                fill="#010101"
              />
              <path
                d="M67.3379 134.246C67.3379 134.729 67.787 134.885 69.0652 134.885C71.1898 134.885 71.0171 133.917 68.9098 133.745C67.7006 133.676 67.3379 133.796 67.3379 134.246Z"
                fill="#010101"
              />
              <path
                d="M79.0183 136.404C78.6902 136.888 79.1911 138.961 79.5884 138.961C79.9857 138.961 80.072 136.646 79.5884 136.318C79.5007 136.256 79.3923 136.23 79.2859 136.246C79.1795 136.262 79.0836 136.319 79.0183 136.404Z"
                fill="#010101"
              />
            </svg>
          </g>

          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="18.4719"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="142.408" y="30.4652">
              SHANTINAGAR SUNRISE ACADEMY
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="10.2622"
            letterSpacing="0em"
          >
            <tspan x="251.908" y="48.0655">
              Buddhashanti-4, Aitabare, Jhapa
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="16.4195"
            fontWeight="500"
            letterSpacing="0em"
          >
            <tspan x="160.921" y="73.2992">
              {tabs[term].title} Examination Of {nepaliDate.getYear()}
            </tspan>
          </text>
          <rect
            width="112.21"
            height="22"
            transform="translate(243.303 79.6816)"
            fill="black"
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="14.367"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="247.408" y="95.71">
              GRADE-SHEET
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="515.159" y="25.1364">
              SR. NO. {data.roll_no}
            </tspan>
          </text>
          <line
            x1="8.64087"
            y1="784.971"
            x2="107.158"
            y2="784.971"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="30.7102" y="799.974">
              Prepared By
            </tspan>
          </text>
          <line
            x1="245.158"
            y1="784.971"
            x2="343.675"
            y2="784.971"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="262.776" y="799.974">
              Class Teacher
            </tspan>
          </text>
          <line
            x1="481.675"
            y1="784.971"
            x2="580.191"
            y2="784.971"
            stroke="black"
            strokeWidth="1.02622"
          />
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="511.415" y="799.974">
              Principle
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="6.5421" y="822.149">
              Issued Date :
            </tspan>
          </text>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="9.23595"
            fontWeight="600"
            letterSpacing="0em"
          >
            <tspan x="69.7742" y="822.149">
              {today}
            </tspan>
          </text>
        </g>
        <defs>
          <clipPath id="clip0_878_18629">
            <rect width="595" height="842" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};