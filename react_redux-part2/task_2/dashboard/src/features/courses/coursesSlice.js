import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk pour charger les cours
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    // Simuler un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
          { id: 3, name: 'React', credit: 40 },
        ]);
      }, 500);
    });
  }
);

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    selectCourse: (state, action) => {
      const course = state.courses.find((c) => c.id === action.payload);
      if (course) {
        course.isSelected = true;
      }
    },
    unSelectCourse: (state, action) => {
      const course = state.courses.find((c) => c.id === action.payload);
      if (course) {
        course.isSelected = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.map((course) => ({
          ...course,
          isSelected: false,
        }));
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCourses, selectCourse, unSelectCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
