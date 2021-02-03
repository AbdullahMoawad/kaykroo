import React from 'react';
import {useFormik} from 'formik';
import {axiosInstance} from '../util/axios';
import {useRouter} from 'next/router';
import * as Yup from "yup";
import Link from "next/link";
import SocialMedia from '../components/login-3/social-media'

export default function Login(props) {
    const router = useRouter();

    const formSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            axiosInstance.post(`/user/login/`, values).then(response => {
                router.push(`/`);
            }).catch(e => {
                const errors = e.response.data.errors ?? [];
                errors.forEach(field => {
                    formik.setFieldError(field.param, field.msg);

                });
            });
        }
    });

    return <form onSubmit={formik.handleSubmit}>

        {/*<div className='form-group row'>*/}
        {/*    <label className={'col-3'}>Username</label>*/}
        {/*    <div className={'col-9'}>*/}
        {/*        <input type='username'*/}
        {/*               className='form-control' placeholder='Username'*/}
        {/*               name='username'*/}
        {/*               onChange={formik.handleChange}*/}
        {/*               onBlur={formik.handleBlur}*/}
        {/*               value={formik.values.username}*/}
        {/*        />*/}
        {/*        {formik.errors.username && formik.touched.username &&*/}
        {/*        <div className={'error'}>{formik.errors.username}</div>}*/}
        {/*    </div>*/}
        {/*</div>*/}

        {/*<div className='form-group row'>*/}
        {/*    <label className={'col-3'}>Password</label>*/}
        {/*    <div className={'col-9'}>*/}
        {/*        <input type='password'*/}
        {/*               className='form-control'*/}
        {/*               placeholder='password'*/}
        {/*               name='password'*/}
        {/*               onChange={formik.handleChange}*/}
        {/*               onBlur={formik.handleBlur}*/}
        {/*               value={formik.values.password}*/}
        {/*        />*/}
        {/*        {formik.errors.password && formik.touched.password &&*/}
        {/*        <div className={'error'}>{formik.errors.password}</div>}*/}
        {/*    </div>*/}
        {/*</div>*/}

        {/*<div className='form-group row'>*/}
        {/*    <label className={'col-3'}>&nbsp;</label>*/}
        {/*    <div className={'col-9'}>*/}
        {/*        <div className='custom-control custom-checkbox'>*/}
        {/*            <input type='checkbox' className='custom-control-input' id='customCheck1'/>*/}
        {/*            <label className='custom-control-label' htmlFor='customCheck1'>Remember me</label>*/}
        {/*        </div>*/}
        {/*        <button type='submit' className='btn btn-primary btn-block'>*/}
        {/*            Sign in*/}
        {/*        </button>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className="w-full flex flex-row h-screen overflow-hidden">
            <div className="hidden lg:flex lg:flex-col w-1/2 items-center justify-center bg-gray-50 border-r border-gray-100">
                <img
                    className="object-contain w-auto h-64 mb-8"
                    src="/images/illustration.svg"
                    alt="svg"
                />
            </div>
            <div className="w-full lg:w-1/2 bg-white flex flex-col items-start justify-center p-4 lg:px-24">
                <div className="flex flex-col w-full mb-4">
                    <div className="text-sm uppercase font-light text-gray-500">
                        Login
                    </div>
                    <div className="text-sm font-bold">
                        Please enter your username and password to login
                    </div>
                </div>
                <Login />
                <div className="mt-4 mb-2">
                    <SocialMedia />
                </div>
                <div className="flex flex-row w-full">
                    <span className="text-secondary mr-1">New user?</span>
                    <span>
              <Link href="/create-account">
                <a className="link">Create account here</a>
              </Link>
            </span>
                </div>
                <div className="w-full">
            <span>
              <Link href="/forgot-password">
                <a className="link">Forgot password?</a>
              </Link>
            </span>
                </div>
                <div className="flex flex-col w-full text-xs mt-4">
                    <div className="flex flex-row space-x-2">
                        <Link href="/privacy-policy">
                            <a>Privacy policy</a>
                        </Link>
                        <Link href="/terms-of-service">
                            <a>Terms of service</a>
                        </Link>
                        <Link href="/contact-us">
                            <a>Contact us</a>
                        </Link>
                    </div>
                    <div className="text-gray-500">&copy; {name} 2020</div>
                </div>
            </div>
        </div>

    </form>;
}
