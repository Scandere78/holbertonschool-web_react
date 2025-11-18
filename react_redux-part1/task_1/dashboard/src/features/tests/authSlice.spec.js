import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
  };

  test('should return the initial state by default', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle login action', () => {
    const payload = { email: 'test@example.com', password: 'password123' };
    const actual = authReducer(initialState, login(payload));
    
    expect(actual.user.email).toBe('test@example.com');
    expect(actual.user.password).toBe('password123');
    expect(actual.isLoggedIn).toBe(true);
  });

  test('should handle logout action', () => {
    const loggedInState = {
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    };
    
    const actual = authReducer(loggedInState, logout());
    
    expect(actual.user.email).toBe('');
    expect(actual.user.password).toBe('');
    expect(actual.isLoggedIn).toBe(false);
  });
});
