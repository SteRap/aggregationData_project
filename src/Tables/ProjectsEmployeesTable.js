import React from "react";
import uniqid from "uniqid"; //package to generate unique Keys

export default function ProjectsEmployeeTable(props) {
  const [data, setData] = React.useState([]);
  const [aggregatedData, setAggregatedData] = React.useState([]);

  React.useEffect(() => {
    if (data.length > 0) {
      setAggregatedData(
        aggregateArray(data).sort((a, b) =>
          a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        )
      );
    } else {
      getData();
    }
  }, [data]);

    // Save only the needed data in "data" State
  function getData() {
    let dataArr = [];
    props.data.map((activity) => {
      dataArr.push({
        projects: activity.project.name,
        employee: activity.employee.name,
        hours: activity.hours,
        id: activity.project.id,
      });
    });
    setData(dataArr);
  }

  // Aggregate the "data" save in State
  const aggregateArray = (arr) => {
    return arr.reduce((acc, val) => {
      const index = acc.findIndex(
        (obj) => obj.projects === val.projects && obj.employee === val.employee
      );
      if (index !== -1) {
        acc[index].hours += val.hours;
      } else {
        acc.push({
          projects: val.projects,
          employee: val.employee,
          hours: val.hours,
          id: val.id,
        });
      }
      return acc;
    }, []);
  };

  const getTable = aggregatedData.map((project) => (
    <tr className="table-active" key={uniqid()}>
      <th scope="row">{project.projects}</th>
      <td style={{ width: "33%" }}>{project.employee}</td>
      <td style={{ width: "33%" }}>{project.hours}</td>
    </tr>
  ));

  return (
    <div>
      <div>
        <table className="table table-hover table-striped table-bordered table-fixed">
          <thead className="">
            <tr className="table-primary ">
              <th scope="col">
                Project
                <i className="fa-solid fa-sheet-plastic ms-1" />
              </th>
              <th scope="col">
                Employee<i className="fa-solid fa-users ms-1"></i>
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
