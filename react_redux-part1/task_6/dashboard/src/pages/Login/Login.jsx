import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useLogin } from '../../hooks/useLogin';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    padding: '10px',
  },
  form: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  input: {
    border: '1px solid #ccc',
    padding: '5px',
    borderRadius: '3px',
  },
  button: {
    padding: '5px 15px',
    cursor: 'pointer',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export default function Login() {
  const dispatch = useDispatch();

  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  } = useLogin(({ email, password }) => {
    dispatch(login({ email, password }));
  });

  return (
    <div className={css(styles.login)}>
      <p>Login to access the full dashboard</p>
      <form className={css(styles.form)} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          className={css(styles.input)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          className={css(styles.input)}
        />

        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
          className={css(styles.button)}
        />
      </form>
    </div>
  );
}
