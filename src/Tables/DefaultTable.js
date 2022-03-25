import React from "react";
import uniqid from "uniqid"; //package to generate unique Keys
import Moment from "react-moment";

export default function StandardTable(props) {
  const table = props.data.map((activity) => (
    <tr className="table-active" key={uniqid()}>
      <th scope="row">{activity.project.name}</th>
      <td className="w-25">{activity.employee.name}</td>
      <td className="w-25">
        <Moment format="DD MMM YYYY">{activity.date.slice(0, 10)}</Moment>
      </td>
      <td className="w-25">{activity.hours}</td>
    </tr>
  ));

  return (
    <div>
      <table className="table table-hover table-striped table-bordered table-fixed">
        <thead className="">
          <tr className="table-secondary ">
            <th scope="col ">
              Project<i className="fa-solid fa-sheet-plastic ms-1"></i>
            </th>
            <th scope="col ">
              Employee<i className="fa-solid fa-users ms-1"></i>
            </th>
            <th scope="col ">
              Date<i className="fa-solid fa-calendar-check ms-1"></i>
            </th>
            <th scope="col ">
              Hours<i className="fa-solid fa-hourglass ms-1"></i>
            </th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
    </div>
  );
}
