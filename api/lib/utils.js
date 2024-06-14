// Utility function to format MongoDB date with time and AM/PM
exports.formatMongoDate = mongoDate => {
  const date = new Date(mongoDate); // Convert MongoDB date string to JavaScript Date object

  // Define months array for getting the month name
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  // Get day, month name, date, and year from the date object
  const day = date.toLocaleString("en-US", { weekday: "short" }); // Short weekday name (e.g., "Fri")
  const month = months[date.getMonth()]; // Month name from months array
  const dateOfMonth = date.getDate(); // Date of the month
  const year = date.getFullYear().toString().slice(-2); // Last two digits of the year

  // Get hours, minutes, and AM/PM
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Construct the formatted date string with time
  const formattedDate = `${day}, ${month} ${dateOfMonth}, ${year} ${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;

  return formattedDate;
};
