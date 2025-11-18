# React Redux Project - Part 1

This project demonstrates the implementation of Redux Toolkit in a React application, converting from Context API to Redux for state management.

## Project Structure

```
react_redux-part1/
├── task_0/   # Initial Redux setup with all slices
├── task_1/   # Redux slices implementation
├── task_2/   # Root reducer
├── task_3/   # Redux store configuration
├── task_4/   # Header component with Redux
├── task_5/   # Footer component with Redux
├── task_6/   # CourseList component with Redux
├── task_7/   # Login component with Redux
├── task_8/   # Notifications component with Redux
├── task_9/   # App component with Provider
└── task_10/  # Complete Redux integration with tests
```

## Technologies Used

- React 18.3.1
- Redux Toolkit 2.0.1
- react-redux 9.0.4
- Vite 5.4.8+
- Tailwind CSS v4
- Jest & React Testing Library

## Features Implemented

### Task 0-1: Redux Slices
- **authSlice**: User authentication (login/logout)
- **notificationsSlice**: Notifications management with async thunk
- **coursesSlice**: Courses fetching with async thunk

### Task 2: Root Reducer
- Combined all slices into a single root reducer

### Task 3: Redux Store
- Configured store with middleware
- Serializable check for complex data

### Task 4-8: Component Migration
- Migrated all components from Context API to Redux
- Used `useSelector` and `useDispatch` hooks
- Implemented async data fetching

### Task 9: Provider Integration
- Wrapped app with Redux Provider
- Updated main.jsx entry point

### Task 10: Testing
- Created test utilities for Redux
- Updated component tests

## Installation

For each task:

```bash
cd task_X/dashboard
npm install
```

## Running the Application

```bash
npm run dev      # Development server
npm run build    # Production build
npm test         # Run tests
```

## Redux State Structure

```javascript
{
  auth: {
    user: {
      email: string,
      password: string,
      isLoggedIn: boolean
    }
  },
  notifications: {
    notifications: Array,
    displayDrawer: boolean,
    loading: boolean,
    error: string | null
  },
  courses: {
    courses: Array,
    loading: boolean,
    error: string | null
  }
}
```

## Key Files

- `src/app/store.js` - Redux store configuration
- `src/app/rootReducer.js` - Combined reducers
- `src/features/*/` - Redux slices
- `src/utils/test-utils.jsx` - Testing utilities

## Author

Holberton School - React Redux Project
