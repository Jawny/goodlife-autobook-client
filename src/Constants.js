const weekday = [
  { value: null, text: "None" },
  { value: 6, text: "6:00AM - 7:00AM" },
  { value: 7.5, text: "7:30AM - 8:00AM" },
  { value: 9, text: "9:00AM - 10:00AM" },
  { value: 10.5, text: "10:30AM - 11:30AM" },
  { value: 12, text: "12:00PM - 1:00PM" },
  { value: 13.5, text: "1:30PM - 2:30PM" },
  { value: 15, text: "3:00PM - 4:00PM" },
  { value: 16.5, text: "4:30PM - 5:30PM" },
  { value: 18, text: "6:00PM - 7:00PM" },
  { value: 19.5, text: "7:30PM - 8:30PM" },
  { value: 21, text: "9:00PM - 10:00PM" },
  { value: 22.5, text: "10:30PM - 11:30PM" },
];

const weekend = [
  { value: null, text: "None" },
  { value: 6, text: "7:00AM - 8:00AM" },
  { value: 7.5, text: "8:30AM - 9:00AM" },
  { value: 9, text: "10:00AM - 11:00AM" },
  { value: 10.5, text: "11:30AM - 12:30PM" },
  { value: 12, text: "1:00PM - 2:00PM" },
  { value: 13.5, text: "2:30PM - 3:30PM" },
  { value: 15, text: "4:00PM - 5:00PM" },
  { value: 16.5, text: "5:30PM - 6:30PM" },
  { value: 18, text: "7:00PM - 8:00PM" },
];

const listOfDays = [
  { dayIndex: 0, day: "Monday", isWeekDay: true },
  { dayIndex: 1, day: "Tuesday", isWeekDay: true },
  { dayIndex: 2, day: "Wednesday", isWeekDay: true },
  { dayIndex: 3, day: "Thursday", isWeekDay: true },
  { dayIndex: 4, day: "Friday", isWeekDay: true },
  { dayIndex: 5, day: "Saturday", isWeekDay: false },
  { dayIndex: 6, day: "Sunday", isWeekDay: false },
];

module.exports = {
  weekday,
  weekend,
  listOfDays,
};
