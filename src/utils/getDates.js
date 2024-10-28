const getToday = (date = new Date()) => {
  const shortDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const [month, day, year] = shortDate.replace(",", "").split(" ");

  return `${day}th ${month}, ${year}`;
};

const formatDueDate = (duedate) => {
  const fDueDate = new Date(duedate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return fDueDate;
};

const isPastDue = (due) => {
  const duedate = new Date(due);
  const diff = new Date().setHours(0, 0, 0, 0) - duedate.setHours(0, 0, 0, 0);
  if (diff <= 0) {
    return false;
  }
  return true;
};

const getTodayISO = (date = new Date()) => {
  return date.toISOString().slice(0, 10);
};

const getDueModal = (due) => {
  const shortDate = new Date(due).toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return shortDate;
};

export { getToday, formatDueDate, isPastDue, getTodayISO, getDueModal };
