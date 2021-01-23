import React from 'react';
import { Formik } from 'formik';
import { axiosInstance } from '../util/axios';
import { useRouter } from 'next/router';

export default function Login(props) {
  const router = useRouter();
  return <Formik
    initialValues={{ username: '', password: '' }}
    validate={values => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Required';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      try {
        axiosInstance.post('/user/login', values).then(response => {
          router.push('/');
        }).catch(e => {
          console.log('error');
        });
      } catch (e) {
        //error.username = 'Wrong username or password';
      }
    }}
  >
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (

      <form onSubmit={handleSubmit}>

        <div className='form-group'>
          <label>Username</label>
          <input type='text'
                 className='form-control' placeholder='Username'
                 name='username'
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.username}
          />
          {errors.username && touched.username && errors.username}

        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control' placeholder='Password'
            name='password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}                        </div>

        <div className='form-group'>
          <div className='custom-control custom-checkbox'>
            <input type='checkbox' className='custom-control-input' id='customCheck1' />
            <label className='custom-control-label' htmlFor='customCheck1'>Remember me</label>
          </div>
        </div>

        <button type='submit' className='btn btn-dark btn-lg btn-block'>Sign in</button>

      </form>)}
  </Formik>;

}
