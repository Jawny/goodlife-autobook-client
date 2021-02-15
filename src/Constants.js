const weekday = {
  None: [{ value: 0, text: "None" }],
  BC: [
    { value: 0, text: "None" },
    { value: 1, text: "5:00 pm - 6:00 pm" },
    { value: 2, text: "6:15 pm - 7:15 pm" },
    { value: 3, text: "7:30 pm - 8:30 pm" },
  ],
  ON: [
    { value: 0, text: "None" },
    { value: 1, text: "6:00 am - 7:00 am" },
    { value: 2, text: "7:15 am - 8:15 am" },
    { value: 3, text: "8:30 am - 9:30 am" },
    { value: 4, text: "9:45 am - 10:45 am" },
    { value: 5, text: "11:00 am - 12:00 pm" },
    { value: 6, text: "12:15 pm - 1:15 pm" },
    { value: 7, text: "1:30 pm - 2:30 pm" },
    { value: 8, text: "2:45 pm - 3:45 pm" },
    { value: 9, text: "4:00 pm - 5:00 pm" },
    { value: 10, text: "5:15 pm - 6:15 pm" },
    { value: 11, text: "6:30 pm - 7:30 pm" },
    { value: 12, text: "7:45 pm - 8:45 pm" },
    { value: 13, text: "9:00 pm - 10:00 pm" },
    // { value: 14, text: "10:15 pm - 11:15 pm" },
    // { value: 15, text: "11:15 pm - 11:15 pm" },
  ],
};

const weekend = {
  None: [{ value: 0, text: "None" }],
  BC: [{ value: 0, text: "None" }],
  ON: [
    { value: null, text: "None" },
    { value: 16, text: "7:00AM - 8:00AM" },
    { value: 17, text: "8:15AM - 9:15AM" },
    { value: 18, text: "9:30AM - 10:30AM" },
    { value: 19, text: "10:45AM - 11:45AM" },
    { value: 20, text: "12:00PM - 1:00PM" },
    { value: 21, text: "1:15PM - 2:15PM" },
    { value: 22, text: "2:30PM - 3:30PM" },
    { value: 23, text: "3:45PM - 4:45PM" },
    { value: 24, text: "5:00PM - 6:00PM" },
    // { value: 25, text: "6:15PM - 7:15PM" },
  ],
};

const listOfDays = [
  { dayIndex: 0, day: "Monday", isWeekDay: true },
  { dayIndex: 1, day: "Tuesday", isWeekDay: true },
  { dayIndex: 2, day: "Wednesday", isWeekDay: true },
  { dayIndex: 3, day: "Thursday", isWeekDay: true },
  { dayIndex: 4, day: "Friday", isWeekDay: true },
  { dayIndex: 5, day: "Saturday", isWeekDay: false },
  { dayIndex: 6, day: "Sunday", isWeekDay: false },
];

const locations = [
  { clubId: 243, name: "Burnaby Metrotown", province: "BC" },
  { clubId: 213, name: "Burnaby Northgate", province: "BC" },
  { clubId: 278, name: "Surrey Newton Commerce Centre", province: "BC" },
  { clubId: 160, name: "Ajax Taunton and Westney", province: "ON" },
];

module.exports = {
  weekday,
  weekend,
  listOfDays,
  locations,
};
