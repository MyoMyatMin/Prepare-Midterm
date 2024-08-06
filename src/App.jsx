import { useState, useRef } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import productList from "./accessory-products.json";
import DataTable from "./components/DataTable";

function App() {
  const pRef = useRef();
  const qRef = useRef();
  const [price, setPrice] = useState(productList[0].price);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterSelectedItems, setFilterSelectedItems] = useState([]);

  const handleAdd = () => {
    const pid = pRef.current.value;
    const product = productList.find((p) => p.id == pid);
    const q = parseInt(qRef.current.value);

    const existingItemIndex = selectedItems.findIndex((item) => item.id == pid);

    if (existingItemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].qty += q;
      updatedItems[existingItemIndex].price = (
        parseFloat(updatedItems[existingItemIndex].price) +
        parseFloat(product.price) * q
      ).toFixed(2);
      setSelectedItems(updatedItems);
      setFilterSelectedItems(updatedItems);
    } else {
      const newItem = {
        ...product,
        qty: q,
        price: (parseFloat(product.price) * q).toFixed(2),
      };
      setSelectedItems([...selectedItems, newItem]);
      setFilterSelectedItems([...selectedItems, newItem]);
    }
  };
  const filter = (keyword) => {
    console.log(keyword);
    const seletctedItems = selectedItems.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilterSelectedItems(seletctedItems);
  };

  const handleProductChanged = (e) => {
    const pid = e.target.value;
    const product = productList.find((p) => p.id == pid);
    setPrice(product.price);
  };

  const deleteItemByIndex = (index) => {
    const updatedItems = [...selectedItems];
    const item = updatedItems[index];

    if (item.qty > 1) {
      item.qty -= 1;
      item.price = (
        parseFloat(item.price) -
        parseFloat(productList.find((p) => p.id === item.id).price)
      ).toFixed(2);
    } else {
      updatedItems.splice(index, 1);
    }

    setSelectedItems(updatedItems);
    setFilterSelectedItems(updatedItems);
  };
  const sort = (way) => {
    if (way === "asc") {
      const sortedItems = filterSelectedItems.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilterSelectedItems([...sortedItems]);
    } else {
      const sortedItems = filterSelectedItems.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setFilterSelectedItems([...sortedItems]);
    }
  };
  return (
    <>
      <Container className="mt-4">
        <Row className="mb-3 align-items-center">
          <Col xs={2}>
            <span>Product:</span>
          </Col>
          <Col>
            <Form.Select
              ref={pRef}
              onChange={handleProductChanged}
              className="mb-2"
            >
              {productList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col xs={2}>Price:</Col>
          <Col>
            <span className="form-control">{price}</span>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col xs={2}>
            <span>Quantity:</span>
          </Col>
          <Col>
            <Form.Control type="number" ref={qRef} defaultValue={1} />
          </Col>
        </Row>

        <Row className="justify-content-center my-4">
          <Col>
            <Button variant="secondary" onClick={handleAdd}>
              Add
            </Button>
          </Col>
        </Row>

        <DataTable
          data={filterSelectedItems}
          onDelete={deleteItemByIndex}
          onFilter={filter}
          onSort={sort}
        />
      </Container>
    </>
  );
}

export default App;
