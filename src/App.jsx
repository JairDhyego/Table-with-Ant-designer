import "antd/dist/antd.css";
import "./App.css";
import { Table } from "antd";
import { useState, useEffect } from "react";

function App() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setDataSource(data))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    { key: "1", title: "ID", dataIndex: "id" },
    { key: "1", title: "To Do", dataIndex: "title" },

    {
      key: "2",
      title: "User ID",
      dataIndex: "userId",
      sorter: (record1, record2) => {
        return record1.userId > record2.userId;
      },
    },

    {
      key: "3",
      title: "Status",
      dataIndex: "completed",
      render: (completed) => {
        return <p> {completed ? "complete" : "In progress"}</p>;
      },
      filters: [
        { text: "Complete", value: true },
        { text: "In Progress", value: false },
      ],
      onFilter: (value, record) => {
        return record.completed === value;
      },
    },
  ];

  return (
    <div className="app">
      <header className="app-Header"></header>

      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination
      ></Table>
    </div>
  );
}

export default App;
