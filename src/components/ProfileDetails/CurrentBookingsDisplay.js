import { useEffect, useState } from "react";
import { Descriptions } from "antd";
import { checkIfUserExists, getUserData } from "../../api";
import Constants from "../../Constants";

const CurrentBookingDisplay = (props) => {
  const [monday, setMonday] = useState("None");
  const [tuesday, setTuesday] = useState("None");
  const [wednesday, setWednesday] = useState("None");
  const [thursday, setThursday] = useState("None");
  const [friday, setFriday] = useState("None");
  const [saturday, setSaturday] = useState("None");
  const [sunday, setSunday] = useState("None");
  const [club, setClub] = useState("None");
  const { userId } = props;

  useEffect(async () => {
    const userExists = await checkIfUserExists(userId);

    if (!userExists) {
      return;
    }
    const userData = await getUserData(userId);
    if (userData.goodlife) {
      const { goodlife } = userData;
      const {
        clubId,
        province,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      } = goodlife;

      const club = Constants.locations.find(
        (location) => location.clubId === Number(clubId)
      );

      setMonday(getTimes(monday, province));
      setTuesday(getTimes(tuesday, province));
      setWednesday(getTimes(wednesday, province));
      setThursday(getTimes(thursday, province));
      setFriday(getTimes(friday, province));
      setSaturday(getTimes(saturday, province));
      setSunday(getTimes(sunday, province));
      setClub(club.name);
    }
  }, []);

  const getTimes = (times, province) => {
    if (!Array.isArray(times)) {
      return Constants.valueToHourConvert[province][times];
    }

    return times.map((time) => Constants.valueToHourConvert[province][time]);
  };

  return (
    <div className="schedule-container">
      <div className="schedule-item" label="Club">{`Club: ${club}`}</div>
      <div className="schedule-item" label="Monday">{`Monday: ${monday}`}</div>
      <div
        className="schedule-item"
        label="Tuesday"
      >{`Tuesday: ${tuesday}`}</div>
      <div
        className="schedule-item"
        label="Wednesday"
      >{`Wednesday: ${wednesday}`}</div>
      <div
        className="schedule-item"
        label="Thursday"
      >{`Thursday: ${thursday}`}</div>
      <div className="schedule-item" label="Friday">{`Friday: ${friday}`}</div>
      <div
        className="schedule-item"
        label="Saturday"
      >{`Saturday: ${saturday}`}</div>
      <div className="schedule-item" label="Sunday">{`Sunday: ${sunday}`}</div>
    </div>
  );
};

export default CurrentBookingDisplay;
