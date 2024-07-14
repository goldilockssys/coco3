import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import request from '../utils/request'; // Import the configured axios instance
import '../styles/Login.css';

const formSchema = z.object({
  USER_ID: z.string().min(1, { message: 'UserId is required' }),
  USER_PW: z.string().min(1, { message: 'Password is required' }),
});

const Login = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      USER_ID: '',
      USER_PW: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await request.post('/auth/getToken', data);
      const token = response.data;
      localStorage.setItem('token', token);

      const userResponse = await request.post(
        '/webCommon/getLoginInfo',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = userResponse.data[0];
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/joblist');
    } catch (error) {
      alert('Invalid UserId or Password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="login-field">
            <label htmlFor="USER_ID">UserId</label>
            <input
              id="USER_ID"
              {...form.register('USER_ID')}
              disabled={form.formState.isSubmitting}
            />
            {form.formState.errors.USER_ID && (
              <p>{form.formState.errors.USER_ID.message}</p>
            )}
          </div>
          <div className="login-field">
            <label htmlFor="USER_PW">Password</label>
            <input
              id="USER_PW"
              type="password"
              autoComplete="off"
              {...form.register('USER_PW')}
              disabled={form.formState.isSubmitting}
            />
            {form.formState.errors.USER_PW && (
              <p>{form.formState.errors.USER_PW.message}</p>
            )}
          </div>
          <button type="submit" className="login-button" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
