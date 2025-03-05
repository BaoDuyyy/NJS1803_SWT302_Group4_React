import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

test('renders the todo list title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Todo List/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders input field and add button', () => {
  render(<App />);
  const inputElement = screen.getByTestId('task-input');
  const addButton = screen.getByTestId('add-button');
  expect(inputElement).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});

test('renders todo items', () => {
  render(<App />);
  
  const input = screen.getByTestId('task-input');
  const addButton = screen.getByTestId('add-button');

  // Add a new task
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  // Verify that the new task is rendered
  const todoItem = screen.getByTestId('todo-item-0');
  expect(todoItem).toBeInTheDocument();
});

test('adds a new task when addTask is called', () => {
  render(<App />);
  
  const input = screen.getByTestId('task-input');
  const addButton = screen.getByTestId('add-button');

  // Initially, the task should not be present
  expect(screen.queryByText('New Task')).not.toBeInTheDocument();

  // Simulate user input and button click
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  // Now, the task should be present in the document
  expect(screen.queryByText('New Task')).toBeInTheDocument();
});

test('marks a task as complete', () => {
  render(<App />);
  
  const input = screen.getByTestId('task-input');
  const addButton = screen.getByTestId('add-button');

  // Add a new task
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  // Mark the task as complete
  const checkbox = screen.getByTestId('checkbox-0');
  fireEvent.click(checkbox);

  // The task should now be marked as complete
  const task = screen.getByTestId('task-text-0');
  expect(task).toHaveClass('text-decoration-line-through');
});

test('edits a task', () => {
  render(<App />);
  
  const input = screen.getByTestId('task-input');
  const addButton = screen.getByTestId('add-button');

  // Add a new task
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  // Edit the task
  const editButton = screen.getByTestId('edit-button-0');
  fireEvent.click(editButton);

  const editInput = screen.getByTestId('edit-input-0');
  fireEvent.change(editInput, { target: { value: 'Edited Task' } });
  fireEvent.blur(editInput);

  // The task should now be edited
  expect(screen.queryByText('Edited Task')).toBeInTheDocument();
  expect(screen.queryByText('New Task')).not.toBeInTheDocument();
});

test('deletes a task', () => {
  render(<App />);
  
  const input = screen.getByTestId('task-input');
  const addButton = screen.getByTestId('add-button');

  // Add a new task
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  // Delete the task
  const deleteButton = screen.getByTestId('delete-button-0');
  fireEvent.click(deleteButton);

  // The task should now be deleted
  expect(screen.queryByText('New Task')).not.toBeInTheDocument();
});