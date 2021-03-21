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
  { clubId: 85, name: "Markham Markville Mall", province: "ON" },
  { clubId: 27, name: "London King And Wellington", province: "ON" },
  {
    clubId: 333,
    name: "Hamilton Stone Church And Upper Ottawa",
    province: "ON",
  },
  {
    clubId: 128,
    name: "Whitby Taunton and Brock",
    province: "ON",
  },
  {
    clubId: 69,
    name: "Burlington Centre",
    province: "ON",
  },
  {
    clubId: 178,
    name: "Aurora Centre",
    province: "ON",
  },
  {
    clubId: 78,
    name: "Oshawa Centre Mall",
    province: "ON",
  },
  {
    clubId: 271,
    name: "Whitby Centrum",
    province: "ON",
  },
  {
    clubId: 7,
    name: "Waterloo Weber and University",
    province: "ON",
  },
  {
    clubId: 269,
    name: "Markham Yonge and Kirk",
    province: "ON",
  },
  {
    clubId: 267,
    name: "Pickering Ridge",
    province: "ON",
  },
  {
    clubId: 256,
    name: "Vaughan Keele and Highway 7",
    province: "ON",
  },
  {
    clubId: 179,
    name: "Vaughan Weston and Northview",
    province: "ON",
  },
  {
    clubId: 265,
    name: "Vaughan Metropolitian Centre",
    province: "ON",
  },
  {
    clubId: 337,
    name: "Burlington Appleby Crossing",
    province: "ON",
  },
  {
    clubId: 291,
    name: "Markham Birchmount and Enterprise",
    province: "ON",
  },
  {
    clubId: 177,
    name: "Barrhaven Strandherd Crossing",
    province: "ON",
  },
  {
    clubId: 105,
    name: "Kanata Hazeldean and Castlefrank",
    province: "ON",
  },
  {
    clubId: 223,
    name: "Orleans Tenth Line and Charlemagne",
    province: "ON",
  },
  {
    clubId: 154,
    name: "Kanata Eagleson Place",
    province: "ON",
  },

  // { clubId: 268, name: "Toronto Richmond And John", province: "ON" },
  // { clubId: 30, name: "Toronto Union Station", province: "ON" },
  // { clubId: 169, name: "Toronto King Liberty", province: "ON" },
  // { clubId: 32, name: "Toronto 137 Yonge Street", province: "ON" },
  // { clubId: 78, name: "Oshawa Centre Mall", province: "ON" },
];

const valueToHourConvert = {
  BC: {
    0: "None",
    1: "5:00 pm - 6:00 pm",
    2: "6:15 pm - 7:15 pm",
    3: "7:30 pm - 8:30 pm",
  },

  ON: {
    0: "None",
    1: "6:00 AM - 7:00 AM",
    2: "7:15 AM - 8:15 AM",
    3: "8:30 AM - 9:30 AM",
    4: "9:45 AM - 10:45 AM",
    5: "11:00 AM - 12:00 PM",
    6: "12:15 PM - 1:15 PM",
    7: "1:30 PM - 2:30 PM",
    8: "2:45 PM - 3:45 PM",
    9: "4:00 PM - 5:00 PM",
    10: "5:15 PM - 6:15 PM",
    11: "6:30 PM - 7:30 PM",
    12: "7:45 PM - 8:45 PM",
    13: "9:00 PM - 10:00 PM",
    16: "7:00 AM - 8:00 AM",
    17: "8:15 AM - 9:15 AM",
    18: "9:30 AM - 10:30 AM",
    19: "10:45 AM - 11:45 AM",
    20: "12:00 PM - 1:00 PM",
    21: "1:15 PM - 2:15 PM",
    22: "2:30 PM - 3:30 PM",
    23: "3:45 PM - 4:45 PM",
    24: "5:00 PM - 6:00 PM",
  },
  // {  14: "10:15 pm - 11:15 pm" },
  // {  15: "11:15 pm - 11:15 pm" },
};

module.exports = {
  weekday,
  weekend,
  listOfDays,
  locations,
  valueToHourConvert,
};
