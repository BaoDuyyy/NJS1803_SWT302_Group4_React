import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

test('adds a new task when addTask is called', () => {
  const { getByPlaceholderText, getByText, queryByText } = render(<App />);
  
  const input = getByPlaceholderText('Add new todo...');
  const addButton = getByText('+ Add');

  // Initially, the task should not be present
  expect(queryByText('New Task')).not.toBeInTheDocument();

  // Simulate user input and button click
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  // Now, the task should be present in the document
  expect(queryByText('New Task')).toBeInTheDocument();
});

test('marks a task as complete', () => {
  const { getByPlaceholderText, getByText, queryByText, getByRole } = render(<App />);
  
  const input = getByPlaceholderText('Add new todo...');
  const addButton = getByText('+ Add');

  // Add a new task
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  // Mark the task as complete
  const checkbox = getByRole('checkbox');
  fireEvent.click(checkbox);

  // The task should now be marked as complete
  const task = getByText('New Task');
  expect(task).toHaveClass('text-decoration-line-through');
});