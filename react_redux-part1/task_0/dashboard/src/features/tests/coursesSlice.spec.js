import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import mockAxios from 'jest-mock-axios';

describe('coursesSlice', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  const initialState = {
    courses: [],
  };

  it('should return the correct initial state by default', () => {
    const state = coursesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should fetch courses data correctly', async () => {
    const mockCourses = [
      { id: '1', name: 'ES6', credit: 60 },
      { id: '2', name: 'Webpack', credit: 20 },
      { id: '3', name: 'React', credit: 40 },
    ];

    // Start the async thunk
    const dispatch = jest.fn();
    const thunk = fetchCourses();
    await thunk(dispatch, () => ({}), undefined);

    // Simulate axios response
    mockAxios.mockResponse({ data: mockCourses });

    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check that the fulfilled action would update state correctly
    const action = {
      type: fetchCourses.fulfilled.type,
      payload: mockCourses,
    };

    const state = coursesReducer(initialState, action);
    expect(state.courses).toEqual(mockCourses);
    expect(state.courses).toHaveLength(3);
  });

  it('should reset courses array to empty when logout action is dispatched', () => {
    const stateWithCourses = {
      courses: [
        { id: '1', name: 'ES6', credit: 60 },
        { id: '2', name: 'Webpack', credit: 20 },
        { id: '3', name: 'React', credit: 40 },
      ],
    };

    const state = coursesReducer(stateWithCourses, logout());
    expect(state.courses).toEqual([]);
    expect(state.courses).toHaveLength(0);
  });
});
