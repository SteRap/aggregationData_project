import React from "react";
import uniqid from "uniqid"; //package to generate unique Keys

export default function EmployeesTable(props) {
  const [data, setData] = React.useState([]);
  const [aggregatedData, setAggregatedData] = React.useState([]);

  React.useEffect(() => {
    if (data.length > 0) {
      setAggregatedData(aggregateArray(data));
    } else {
      getData();
    }
  }, [data]);

  function getData() {
    let dataArr = [];
    props.data.map((activity) => {
      dataArr.push({
        employee: activity.employee.name,
        hours: activity.hours,
      });
    });
    setData(dataArr);
  }

  const aggregateArray = (arr) => {
    return arr.reduce((acc, val) => {
      const index = acc.findIndex((obj) => obj.employee === val.employee);
      if (index !== -1) {
        acc[index].hours += val.hours;
      } else {
        acc.push({
          employee: val.employee,
          hours: val.hours,
        });
      }
      return acc;
    }, []);
  };

  const getTable = aggregatedData.map((employee) => (
    <tr className="table-active" key={uniqid()}>
      <th scope="row">{employee.employee}</th>
      <td className="w-50">{employee.hours}</td>
    </tr>
  ));

  return (
    <div>
      <div>
        <table className="table table-hover table-striped table-bordered table-fixed">
          <thead className="">
            <tr className="table-primary  ">
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
