import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

let inputElement, addButton;

beforeEach(() => {
  render(<App />);
  inputElement = screen.getByTestId('task-input');
  addButton = screen.getByTestId('add-button');
});

const addTask = (taskName) => {
  fireEvent.change(inputElement, { target: { value: taskName } });
  fireEvent.click(addButton);
};

describe('Todo List Rendering', () => {
  test('renders the todo list title', () => {
    const titleElement = screen.getByText(/Todo List/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders input field and add button', () => {
    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
});

describe('Todo List Functionality', () => {
  test('adds a new task', () => {
    addTask('New Task');
    expect(screen.queryByText('New Task')).toBeInTheDocument();
  });

  test('marks a task as complete', () => {
    addTask('New Task');
    const checkbox = screen.getByTestId('checkbox-0');
    fireEvent.click(checkbox);
    const task = screen.getByTestId('task-text-0');
    expect(task).toHaveClass('text-decoration-line-through');
  });

  test('edits a task', () => {
    addTask('New Task');
    const editButton = screen.getByTestId('edit-button-0');
    fireEvent.click(editButton);
    const editInput = screen.getByTestId('edit-input-0');
    fireEvent.change(editInput, { target: { value: 'Edited Task' } });
    fireEvent.blur(editInput);
    expect(screen.queryByText('Edited Task')).toBeInTheDocument();
    expect(screen.queryByText('New Task')).not.toBeInTheDocument();
  });

  test('deletes a task', () => {
    addTask('New Task');
    const deleteButton = screen.getByTestId('delete-button-0');
    fireEvent.click(deleteButton);
    expect(screen.queryByText('New Task')).not.toBeInTheDocument();
  });
});

describe('Todo List Updates', () => {
  test('updates the todo list when a task is added', () => {
    addTask('Task 1');
    expect(screen.queryByText('Task 1')).toBeInTheDocument();
    addTask('Task 2');
    expect(screen.queryByText('Task 2')).toBeInTheDocument();
  });
});

describe('Edit Mode State', () => {
  test('enters and exits edit mode correctly', () => {
    addTask('Task 1');
    const editButton = screen.getByTestId('edit-button-0');
    fireEvent.click(editButton);
    const editInput = screen.getByTestId('edit-input-0');
    expect(editInput).toBeInTheDocument();
    fireEvent.change(editInput, { target: { value: 'Edited Task' } });
    fireEvent.blur(editInput);
    expect(screen.queryByText('Edited Task')).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  });
});

describe('Alert State', () => {
  test('shows alert when trying to add an empty task', async () => {
    fireEvent.click(addButton);
    const alertMessage = await screen.findByTestId('alert-message');
    expect(alertMessage).toBeInTheDocument();
    expect(alertMessage).toHaveTextContent('Task cannot be empty');
  });

  test('shows alert when trying to save an edited task with empty input', () => {
    addTask('Task 1');
    const editButton = screen.getByTestId('edit-button-0');
    fireEvent.click(editButton);
    const editInput = screen.getByTestId('edit-input-0');
    fireEvent.change(editInput, { target: { value: '' } });
    fireEvent.blur(editInput);
    const alertMessage = screen.queryByTestId('alert-message');
    expect(alertMessage).toBeInTheDocument();
    expect(alertMessage).toHaveTextContent('Task cannot be empty');
  });
});

describe('User Interactions and Edge Cases', () => {
  test('does not add a task when input is empty', () => {
    fireEvent.click(addButton);
    expect(screen.queryByTestId('todo-item-0')).not.toBeInTheDocument();
  });

  test('shows alert when trying to add an empty task', async () => {
    // Simulate clicking the "Add" button with an empty input
    fireEvent.click(addButton);
    
    // Ensure that the alert with the error message appears
    const alertMessage = await screen.findByTestId('alert-message');
    expect(alertMessage).toBeInTheDocument();
    expect(alertMessage).toHaveTextContent('Task cannot be empty');
  });
  

  test('does not add a task when input is only whitespace', () => {
    fireEvent.change(inputElement, { target: { value: '   ' } });
    fireEvent.click(addButton);
    expect(screen.queryByTestId('todo-item-0')).not.toBeInTheDocument();
  });

  test('does not save an edited task if input is empty', () => {
    addTask('Task 1'); // First, add a task
  
    // Trigger editing of the task
    const editButton = screen.getByTestId('edit-button-0');
    fireEvent.click(editButton);
  
    // Simulate an empty input value and trigger blur
    const editInput = screen.getByTestId('edit-input-0');
    fireEvent.change(editInput, { target: { value: '' } });
    fireEvent.blur(editInput);
  
    // Ensure the error message is displayed
    const alertMessage = screen.queryByTestId('alert-message');
    expect(alertMessage).toBeInTheDocument();
    expect(alertMessage).toHaveTextContent('Task cannot be empty');
  
    // Ensure the task text is not updated
    expect(screen.queryByText('Task 1')).toBeInTheDocument(); // The task text should remain "Task 1"
  });
  

  test('manages multiple todos correctly', () => {
    addTask('Task 1');
    addTask('Task 2');
    expect(screen.queryByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).toBeInTheDocument();
  });
});