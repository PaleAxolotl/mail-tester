const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const get_current_month = () => {
  return MONTH[new Date().getMonth()];
};

export const get_current_day = () => {
  return new Date().getDate();
};
