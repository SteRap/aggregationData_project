import React from "react";
import uniqid from "uniqid"; //package to generate unique Keys
import Moment from "react-moment";

export default function DateTable(props) {
  const [data, setData] = React.useState([]);
  const [aggregatedData, setAggregatedData] = React.useState([]);

  React.useEffect(() => {
    if (data.length > 0) {
      setAggregatedData(aggregateArray(data));
    } else {
      getData();
    }
  }, [data]);

  // Save only the needed data in "data" State
  function getData() {
    let dataArr = [];
    props.data.map((activity) => {
      dataArr.push({
        date: activity.date,
        hours: activity.hours,
      });
    });
    setData(dataArr);
  }

  // Aggregate the "data" save in State
  const aggregateArray = (arr) => {
    return arr.reduce((acc, val) => {
      const index = acc.findIndex((obj) => obj.date === val.date);
      if (index !== -1) {
        acc[index].hours += val.hours;
      } else {
        acc.push({
          date: val.date,
          hours: val.hours,
        });
      }
      return acc;
    }, []);
  };

  const getTable = aggregatedData.map((day) => (
    <tr className="table-active" key={uniqid()}>
      <th scope="row">
        <Moment format="DD MMM YYYY">{day.date.slice(0, 10)}</Moment>
      </th>
      <td className="w-50">{day.hours}</td>
    </tr>
  ));

  return (
    <div>
      <div>
        <table className="table table-hover table-striped table-bordered table-fixed">
          <thead className="">
            <tr className="table-primary ">
              <th scope="col">
                Date<i className="fa-solid fa-calendar-check ms-1"></i>
              </th>
              <th scope="col">
                Hours<i className="fa-solid fa-hourglass ms-1"></i>
              </th>
            </tr>
          </thead>
          <tbody>{getTable}</tbody>
        </table>
      </div>
    </div>
  );
}
