import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

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