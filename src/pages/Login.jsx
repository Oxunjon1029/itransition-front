import * as yup from 'yup';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from 'formik';
import TextFormField from '../components/TextFormField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router';
import { useLoginUserMutation } from '../features/user/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import { setCookie } from '../config/functions/useCookie';
import { TOKEN } from '../config/constants/host';
const Login = () => {
  const [loginUser, { isError, isSuccess, error, data }] =
    useLoginUserMutation();

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(1),
  });

  const handleSubmit = (values) => {
    loginUser(values);
  };
  
  const user = useSelector(selectUser);
  useEffect(() => {
    if (isSuccess) {
      setCookie(TOKEN, data?.token);
      toast.success('User successfully logged in!');
      navigator('/users');
    }
    if (isError) {
      toast.error(error.data?.message);
    }
  }, [isError, isSuccess, error, data, user, navigator, dispatch]);
  return (
    <Box>
      <Box
        sx={{
          width: 300,
          height: 350,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {() => (
            <Form>
              <Field
                label='Email'
                name='email'
                style={{ border: '0' }}
                component={TextFormField}
                placeholder='Enter your email'
              />

              <Field
                label='Password'
                name='password'
                type='password'
                component={TextFormField}
                placeholder='Enter your password'
              />

              <LoadingButton
                loading={isSuccess}
                fullWidth
                variant='contained'
                type='submit'>
                Sign in
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
