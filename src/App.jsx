import { Button, Form, ListGroup, Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import React from 'react';
import TodoItem from './components/TodoItem';

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
                    data-testid="task-input"
                  />
                </Col>
                <Col xs={3}>
                  <Button variant="primary" onClick={addTask} className="w-100" data-testid="add-button">
                    + Add
                  </Button>
                </Col>
              </Row>
            </Form>
            
            <ListGroup>
              {tasks.map((t, index) => (
                <TodoItem
                  key={index}
                  task={t}
                  index={index}
                  toggleTask={toggleTask}
                  startEditing={startEditing}
                  saveEdit={saveEdit}
                  removeTask={removeTask}
                  editIndex={editIndex}
                  editText={editText}
                  setEditText={setEditText}
                />
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;