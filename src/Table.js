import React from "react";
import StandardTable from "./Tables/DefaultTable";
import ProjectsTable from "./Tables/ProjectsTable";
import EmployeesTable from "./Tables/EmployeesTable.js";
import DateTable from "./Tables/DateTable";
import ProjectsEmployeeTable from "./Tables/ProjectsEmployeesTable";
import EmployeesProjectsTable from "./Tables/EmployeesProjectsTable";
import Toogle from "./Component/Toogle";

function Table(props) {
  const [tableProject, setTableProject] = React.useState(false);
  const [tableEmployee, setTableEmployee] = React.useState(false);
  const [tableDate, setTableDate] = React.useState(false);
  const [projectFirst, setProjectFirst] = React.useState(true);

  const toogleEmployee = (ownState, setOwnState) => {
    setOwnState(!ownState);
    setTableDate(tableDate && false);
  };
  const toogleProject = (ownState, setOwnState) => {
    toogleEmployee(ownState, setOwnState);
    tableEmployee ? setProjectFirst(false) : setProjectFirst(true);
  };
  const toogleDate = (ownState, setOwnState) => {
    setOwnState(!ownState);
    setTableProject(tableProject && false);
    setTableEmployee(tableEmployee && false);
  };

  return (
    <div>
      <fieldset className="mb-2">
        <legend className="mb-1">Aggregate by</legend>
        <div
          className="d-flex justify-content-between"
          style={{ width: "30%" }}
        >
          <div>
            <Toogle
              name={"Projects"}
              ownState={tableProject}
              onClick={() => {
                toogleProject(tableProject, setTableProject);
              }}
            />
            <Toogle
              name={"Employees"}
              ownState={tableEmployee}
              onClick={() => {
                toogleEmployee(tableEmployee, setTableEmployee);
              }}
            />
          </div>
          <Toogle
            name={"Date"}
            ownState={tableDate}
            onClick={() => {
              toogleDate(tableDate, setTableDate);
            }}
          />
        </div>
      </fieldset>

      {tableProject && tableEmployee && projectFirst ? (
        <ProjectsEmployeeTable data={props.data} />
      ) : tableProject && tableEmployee && !projectFirst ? (
        <EmployeesProjectsTable data={props.data} />
      ) : tableProject ? (
        <ProjectsTable data={props.data} />
      ) : tableEmployee ? (
        <EmployeesTable data={props.data} />
      ) : tableDate ? (
        <DateTable data={props.data} />
      ) : (
        <StandardTable data={props.data} />
      )}
    </div>
  );
}

export default Table;
