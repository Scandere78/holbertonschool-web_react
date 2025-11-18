import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

jest.mock('axios');

describe('coursesSlice', () => {
  const initialState = {
    courses: [],
  };

  test('should return the initial state by default', () => {
    expect(coursesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle fetchCourses.fulfilled', async () => {
    const mockCourses = {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ],
    };

    axios.get.mockResolvedValue({ data: mockCourses });

    const store = configureStore({
      reducer: { courses: coursesReducer },
    });

    await store.dispatch(fetchCourses());
    const state = store.getState().courses;

    expect(state.courses).toHaveLength(3);
    expect(state.courses[0].name).toBe('ES6');
  });

  test('should reset courses on logout', () => {
    const state = {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
      ],
    };

    const actual = coursesReducer(state, logout());
    
    expect(actual.courses).toEqual([]);
  });
});
