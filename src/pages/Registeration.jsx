import * as yup from 'yup';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from 'formik';
import TextFormField from '../components/TextFormField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router';
import { useRegisterUserMutation } from '../features/user/authApi';
import { toast } from 'react-toastify';
const Registeration = () => {
  const navigator = useNavigate();
  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(1),
  });
  const [registerUser, { isSuccess, isError, error, data }] =
    useRegisterUserMutation();
  const handleSubmit = (values) => {
    registerUser(values);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      navigator('/signin');
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, isSuccess, navigator, error, data]);
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
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {() => (
            <Form>
              <Field
                label='Name'
                name='name'
                component={TextFormField}
                placeholder='Enter your name'
              />
              <Field
                label='Email'
                name='email'
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
                Sign up
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Registeration;
