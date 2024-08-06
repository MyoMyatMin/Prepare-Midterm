import React from "react";
import { useRef } from "react";
import { Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const DataTable = ({ data, onDelete, onFilter, onSort }) => {
  const sRef = useRef();
  const handleDelete = (index) => () => {
    onDelete(index);
  };

  const handleSearch = () => {
    const search = sRef.current.value;
    onFilter(search);
    console.log("Search for:", search);
  };

  const sortAsc = () => {
    onSort("asc");
  };

  const sortDes = () => {
    onSort("des");
  };

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <div>
          <input type="text" placeholder="Search..." ref={sRef} />
          <Button onClick={handleSearch} variant="outline-dark">
            <i className="bi bi-search"></i>
          </Button>
        </div>

        <div>
          <span>Sort</span>
          <Button onClick={sortAsc} variant="outline-dark">
            <i className="bi bi-arrow-up-short"></i>
          </Button>
          <Button onClick={sortDes} variant="outline-dark">
            <i className="bi bi-arrow-down-short"></i>
          </Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <i className="bi bi-trash" onClick={handleDelete(index)}></i>
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DataTable;
