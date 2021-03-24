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

      setMonday(Constants.valueToHourConvert[province][monday]);
      setTuesday(Constants.valueToHourConvert[province][tuesday]);
      setWednesday(Constants.valueToHourConvert[province][wednesday]);
      setThursday(Constants.valueToHourConvert[province][thursday]);
      setFriday(Constants.valueToHourConvert[province][friday]);
      setSaturday(Constants.valueToHourConvert[province][saturday]);
      setSunday(Constants.valueToHourConvert[province][sunday]);
      setClub(club.name);
    }
  }, []);

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
