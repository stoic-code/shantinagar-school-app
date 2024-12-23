const primaryMarks = [
  { full: 10, pass: 4 },
  { full: 20, pass: 8 },
  { full: 20, pass: 8 },
  { full: 50, pass: 20 },
  { full: 100, pass: 40 },
];

const secondaryMarks = [
  { full: 5, pass: 2 },
  { full: 10, pass: 4 },
  { full: 10, pass: 4 },
  { full: 25, pass: 10 },
  { full: 50, pass: 20 },
];

const prePrimarySubs = [
  { name: "GENERAL ENGLISH", marks: primaryMarks },
  { name: "MATH", marks: primaryMarks },
  { name: "NEPALI", marks: primaryMarks },
  { name: "SCIENCE", marks: primaryMarks },
  { name: "SOCIAL", marks: primaryMarks },
  { name: "ORAL", marks: secondaryMarks },
  { name: "HEALTH CHECK", marks: secondaryMarks },
];

const primarySubs = [
  { name: "GENERAL ENGLISH", marks: primaryMarks },
  { name: "MATH", marks: primaryMarks },
  { name: "NEPALI", marks: primaryMarks },
  { name: "SCIENCE", marks: primaryMarks },
  { name: "SERO FERO", marks: primaryMarks },
  { name: "GRAMMAR", marks: primaryMarks },
  { name: "GK", marks: secondaryMarks },
  { name: "EXTRA CURRICULAR ACTIVITIES", marks: secondaryMarks },
];

const fourToFive = [
  { name: "GENERAL ENGLISH", marks: primaryMarks },
  { name: "NEPALI", marks: primaryMarks },
  { name: "MATH", marks: primaryMarks },
  { name: "SCIENCE", marks: primaryMarks },
  { name: "SOCIAL", marks: primaryMarks },
  { name: "GRAMMAR", marks: primaryMarks },
  { name: "GK", marks: secondaryMarks },
  { name: "HEALTH", marks: secondaryMarks },
];

const sixToSeven = [
  { name: "GENERAL ENGLISH", marks: primaryMarks },
  { name: "NEPALI", marks: primaryMarks },
  { name: "MATH", marks: primaryMarks },
  { name: "SCIENCE", marks: primaryMarks },
  { name: "SOCIAL", marks: primaryMarks },
  { name: "OUR ENGLISH", marks: primaryMarks },
  { name: "HEALTH", marks: secondaryMarks },
  { name: "EXTRA CURRICULAR ACTIVITIES", marks: secondaryMarks },
];

const eight = [
  { name: "GENERAL ENGLISH", marks: primaryMarks },
  { name: "NEPALI", marks: primaryMarks },
  { name: "MATH", marks: primaryMarks },
  { name: "SCIENCE", marks: primaryMarks },
  { name: "SOCIAL", marks: primaryMarks },
  { name: "ACCOUNT", marks: primaryMarks },
  { name: "HEALTH", marks: secondaryMarks },
  { name: "EXTRA CURRICULAR ACTIVITIES", marks: secondaryMarks },
];

export const classes = [
  {
    name: "Nursury",
    slug: "nursury",
    code: "NURSURY",
    subjects: prePrimarySubs,
  },
  { name: "LKG", slug: "lkg", code: "LKG", subjects: prePrimarySubs },
  { name: "UKG", slug: "ukg", code: "UKG", subjects: prePrimarySubs },
  { name: "Class 1", slug: "one", code: "ONE (1)", subjects: primarySubs },
  { name: "Class 2", slug: "two", code: "TWO (2)", subjects: primarySubs },
  { name: "Class 3", slug: "three", code: "THREE (3)", subjects: primarySubs },
  { name: "Class 4", slug: "four", code: "FOUR (4)", subjects: fourToFive },
  { name: "Class 5", slug: "five", code: "FIVE (5)", subjects: fourToFive },
  { name: "Class 6", slug: "six", code: "SIX (6)", subjects: sixToSeven },
  { name: "Class 7", slug: "seven", code: "SEVEN (7)", subjects: sixToSeven },
  { name: "Class 8", slug: "eight", code: "EIGHT (8)", subjects: eight },
  { name: "Class 9", slug: "nine", code: "NINE (9)", subjects: eight },
  { name: "Class 10", slug: "ten", code: "TEN (10)", subjects: eight },
  { name: "Old Students", slug: "old", code: "OLD STUDENTS" },
];
