import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = data.length / todosPerPage;
  const endIndex = currentPage * todosPerPage;
  const startIndex = endIndex - todosPerPage;
  const filteredData = data.slice(startIndex, endIndex);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos/").then((res) => {
      setData(res.data);
    });
  }, [currentPage]);

  console.log(currentPage, startIndex, endIndex);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleTodosPerPage = (e) => {
    setTodosPerPage(e.target.value);
    setCurrentPage(1);
    console.log(todosPerPage);
  };

  const prevHandle = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const nextHandle = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="App">
      <h1>To do List</h1>
      <div>
        <strong>No of todos visible per page</strong>
        <select onChange={handleTodosPerPage}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
      {filteredData.map((item, index) => {
        return <div>{`- ${item.title}`}</div>;
      })}
      <button onClick={prevHandle}>Prev</button>
      {pages.map((btn) => {
        return (
          <button
            key={btn}
            className={currentPage === btn ? "active" : ""}
            onClick={() => setCurrentPage(btn)}
          >{`${btn}`}</button>
        );
      })}
      <button onClick={nextHandle}>Next</button>
    </div>
  );
}
