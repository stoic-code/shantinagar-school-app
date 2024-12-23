// export function formatDate(datetimeString: string) {
//   if (!datetimeString) return;
//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//
//   const date = new Date(datetimeString);
//   const month = months[date.getMonth()];
//   const day = date.getDate();
//   const year = date.getFullYear();
//
//   console.log("FORMATED DATE", month, day, year);
//
//   return `${month} ${day}, ${year}`;
// }

export function formatDate(datetimeString: string) {
  if (!datetimeString) return;

  const date = new Date(datetimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Adding leading zero

  return `${year}-${month}-${day}`;
}
