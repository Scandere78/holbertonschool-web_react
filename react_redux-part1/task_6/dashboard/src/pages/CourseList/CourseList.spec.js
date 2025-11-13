import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CourseList from './CourseList';
import coursesReducer from '../../features/courses/coursesSlice';

const mockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      courses: coursesReducer,
    },
    preloadedState: initialState,
  });
};

const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('CourseList - Redux integration', () => {
  test('renders 5 rows total when there are courses (2 headers + 3 body)', () => {
    const store = mockStore({
      courses: { courses },
    });

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
  });

  test('renders 1 row in tbody when courses array is empty', () => {
    const store = mockStore({
      courses: { courses: [] },
    });

    const { container } = render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    const tbody = container.querySelector('tbody');
    expect(tbody.querySelectorAll('tr')).toHaveLength(1);
    expect(tbody).toHaveTextContent(/no course available yet/i);
  });

  test('renders course names correctly', () => {
    const store = mockStore({
      courses: { courses },
    });

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    const store = mockStore({
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
