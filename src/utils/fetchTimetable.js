import axios from "axios";

const fetchTimetable = async (id) => {
  let timeTableData;
  let timeTableOk = false;
  let err;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/proxy/getTimetable/${id}.html`
    );
    timeTableOk = res.status = 200 ? true : false;
    timeTableData = res.data;
  } catch (e) {
    timeTableData = {};
    err = e;
  }
  return { data: timeTableData, ok: timeTableOk, err };
};

export default fetchTimetable;