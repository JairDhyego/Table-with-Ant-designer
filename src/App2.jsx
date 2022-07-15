import "antd/dist/antd.css";
import "./App.css";
import { Table, Tag, Input, Button } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

function App() {
  const [alreadySelectedRows, setAlreadySelectedRows] = useState(["1", "3"]);

  const columns = [
    {
      title: "Student ID",
      dataIndex: "id",
    },
    {
      title: "Student Name",
      dataIndex: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Digite"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              type="primary"
              onClick={() => {
                confirm();
              }}
            >
              Clique
            </Button>
            <Button
              type="primary"
              onClick={() => {
                clearFilters();
              }}
              danger
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Student Grade",
      dataIndex: "grade",
      render: (tag) => {
        const color = tag.includes("A")
          ? "Green"
          : tag.includes("B")
          ? "blue"
          : "red";
        return (
          <Tag color={color} key={tag}>
            {tag}
          </Tag>
        );
      },
    },
  ];

  const dataSource = [
    {
      key: "1",
      id: "1",
      name: "Rafael",
      grade: "A+",
    },
    {
      key: "2",
      id: "2",
      name: "Fernando  ",
      grade: "C",
    },
    {
      key: "3",
      id: "3",
      name: "Jair",
      grade: "A",
    },
    {
      key: "4",
      id: "4",
      name: "Adriadno ",
      grade: "B+",
    },
    {
      key: "5",
      id: "5",
      name: "Alysson ",
      grade: "C",
    },
  ];

  return (
    <div className="app">
      <header className="app-Header"></header>

      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          selectedRowKeys: alreadySelectedRows,
          onChange: (key) => setAlreadySelectedRows(key),
          onSelect: (record) => {
            console.log({ record });
          },
          getCheckboxProps: (record) => ({
            disabled: record.grade === "C",
          }),
          hideSelectAll: false,
          selections: [
            Table.SELECTION_NONE,
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
          ],
        }}
      ></Table>
    </div>
  );
}

export default App;
