import React from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const TodoItem = ({ task, index, toggleTask, startEditing, saveEdit, removeTask, editIndex, editText, setEditText }) => {
  return (
    <ListGroup.Item
      key={index}
      className="d-flex justify-content-between align-items-center"
      data-testid={`todo-item-${index}`}
    >
      <div className="d-flex align-items-center w-100 pe-3">
        <Form.Check
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(index)}
          className="me-2"
          data-testid={`checkbox-${index}`}
        />
        {editIndex === index ? (
          <Form.Control
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={() => saveEdit(index)}
            autoFocus
            data-testid={`edit-input-${index}`}
          />
        ) : (
          <span
            className={task.completed ? "text-decoration-line-through" : ""}
            onDoubleClick={() => startEditing(index)}
            style={{ cursor: "pointer" }}
            data-testid={`task-text-${index}`}
          >
            {task.text}
          </span>
        )}
      </div>
      <div className="d-flex align-items-center">
        <Button variant="outline-secondary" size="sm" onClick={() => startEditing(index)} className="me-2" aria-label="Edit" data-testid={`edit-button-${index}`}>
          <PencilSquare />
        </Button>
        <Button variant="danger" size="sm" onClick={() => removeTask(index)} aria-label="Delete" data-testid={`delete-button-${index}`}>
          <Trash />
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default TodoItem;
