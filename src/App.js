import React from "react";
import "bootswatch/dist/minty/bootstrap.min.css";
import Navbar from "./Component/Navbar";
import Table from "./Table";

function App() {
  const [isMounted, setIsMounted] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3004/activities").then((res) => {
      res.json().then((result) => setData(result));
    });
  }, []);

  React.useEffect(() => {
    if (data.length > 0) {
      setIsMounted(false);
    }
  }, [data]);

  return (
    <div className="App">
      <Navbar />
      {isMounted ? (
        <div>
          <h1 className="m-3">LOADING...</h1>
        </div>
      ) : (
        <div className="mx-auto mt-5" style={{ width: "80%" }}>
          <Table data={data} />
        </div>
      )}
    </div>
  );
}

export default App;
