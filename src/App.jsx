import { useState, useRef } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import productList from "./accessory-products.json";
import DataTable from "./components/DataTable";

function App() {
  const pRef = useRef();
  const qRef = useRef();
  const [price, setPrice] = useState(productList[0].price);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAdd = () => {
    const pid = pRef.current.value;
    const product = productList.find((p) => p.id == pid);
    const qty = parseInt(qRef.current.value);
    console.log(qty);

    const existingItem = selectedItems.findIndex((item) => item.id == pid);

    if (existingItem !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems[existingItem].qty += qty;
      updatedItems[existingItem].price = (
        parseFloat(updatedItems[existingItem].price) + parseFloat(product.price)
      ).toFixed(2);
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          ...product,
          qty: qty,
          price: (parseFloat(product.price) * parseInt(qty)).toFixed(2),
        },
      ]);
    }
  };

  const handleProductChanged = (e) => {
    const pid = e.target.value;

    const product = productList.find((p) => p.id == pid);

    setPrice(product.price);
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

        <DataTable data={selectedItems} />
      </Container>
    </>
  );
}

export default App;
