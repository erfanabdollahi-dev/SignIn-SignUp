import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikControl from './Formik/FormikControl';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
    username: '',
    password: '',
};
const LoginSchema = Yup.object({
    username: Yup.string().required('این فیلد اجباری است'),

    password: Yup.string().required('این فیلد اجباری است'),
});
const Signin = () => {
    const navigate = useNavigate();

    const onSubmit = (values) => {
        console.log(values);
        axios
            .post('https://dots.liara.run/api/login/', values)
            .then((res) => {
                console.log(res);
                localStorage.setItem('accessToken', res.data.access);
                localStorage.setItem('username', values['username']);
                localStorage.setItem('refreshToken', res.data.refresh);
                navigate('/profile');
            })
            .catch((err) => console.error(err.message));
    };
 
    return (
        <div className="wrapper">
            <h1>ورود</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={LoginSchema}
            >
                {(Formik) => {
                    console.log(Formik);

                    return (
                        <Form>
                            <FormikControl
                                formik={Formik}
                                control="input"
                                name="username"
                                type="text"
                                icon="bx bxs-user"
                                label="نام کاربری"
                                mode="input"
                            />
                            <FormikControl
                                formik={Formik}
                                control="input"
                                name="password"
                                type="password"
                                icon="bx bxs-lock-alt"
                                label="رمز عبور"
                                mode="input"
                            />

                            <button type="submit" className="btn btn-signin">
                                ورود
                            </button>
                        </Form>
                    );
                }}
            </Formik>
            <p>
                حساب ندارید ؟ <Link to="/signup">ثبت نام</Link>
            </p>
        </div>
    );
};

export default Signin;
