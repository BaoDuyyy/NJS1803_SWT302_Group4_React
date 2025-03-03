import { Button, Form, ListGroup, Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { PencilSquare, Trash } from "react-bootstrap-icons";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = (index) => {
    const newTasks = [...tasks];
    newTasks[index].text = editText;
    setTasks(newTasks);
    setEditIndex(null);
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={4}>
            <h2 className="text-center">Todo List</h2>
            <Form>
              <Row className="mb-3">
                <Col xs={9} className="pe-0">
                  <Form.Control
                    type="text"
                    placeholder="Add new todo..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                </Col>
                <Col xs={3}>
                  <Button variant="primary" onClick={addTask} className="w-100">
                    + Add
                  </Button>
                </Col>
              </Row>
            </Form>
            
            <ListGroup>
              {tasks.map((t, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center w-100 pe-3">
                    <Form.Check
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleTask(index)}
                      className="me-2"
                    />
                    {editIndex === index ? (
                      <Form.Control
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={() => saveEdit(index)}
                        autoFocus
                      />
                    ) : (
                      <span
                        className={t.completed ? "text-decoration-line-through" : ""}
                        onDoubleClick={() => startEditing(index)}
                        style={{ cursor: "pointer" }}
                      >
                        {t.text}
                      </span>
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    <Button variant="outline-secondary" size="sm" onClick={() => startEditing(index)} className="me-2">
                      <PencilSquare />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => removeTask(index)}>
                      <Trash />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;