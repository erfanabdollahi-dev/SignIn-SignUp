import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikControl from './Formik/FormikControl';

const initialValues = {
    username: '',
    email: '',
    mobile: '',
    password: '',
    cPassword: '',
    auth_mode: 'mobile',
};

const onSubmit = (values) => {
    console.log(values);
};

const authModes = [
    { id: 'mobile', value: 'موبایل', icon: 'bx bxs-phone' },
    { id: 'email', value: 'ایمیل', icon: 'bx bxl-gmail' },
];

const LoginSchema = Yup.object({
    email: Yup.string().when('auth_mode', {
        is: 'email',
        then: (schema)=> schema
            .required('این فیلد اجباری است')
            .matches(/^\S+@\S+\.\S+$/, 'فرمت ایمیل صحیح نیست'),
    }),

    mobile: Yup.string().when('auth_mode', {
        is: 'mobile',
        then: (schema)=> schema.required('این فیلد اجباری است').matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
    }),

    password: Yup.string()
        .required('این فیلد اجباری است')
        .min(8, 'حداقل 8 کاراکتر وارد کنید')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/,
            'فرمت رمز عبور [A-Z] [a-z] [0-9] [#?!@$%^&*-.] '
        ),
    cPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'با رمز عبور مطابقت ندارد'
    ),
    username: Yup.string()
        .required('این فیلد اجباری است')
        .matches(/^[0-9A-Za-z]{6,16}$/, 'فرمت نام کاربری 0-9 A-Z a-z '),
});

const Signin = () => {
    return (
        <>
            <h1>ثبت نام</h1>
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
                                control="radio"
                                name="auth_mode"
                                type="radio"
                                icon="bx bxs-user"
                                label="نوع اعتبار سنجی"
                                options={authModes}
                                mode="radio"
                            />
                            {Formik.values.auth_mode == 'mobile' ? (
                                <FormikControl
                                    formik={Formik}
                                    control="input"
                                    name="mobile"
                                    type="text"
                                    icon="bx bxs-phone"
                                    label="شماره تلفن همراه"
                                    mode="input"
                                />
                            ) : (
                                <FormikControl
                                    formik={Formik}
                                    control="input"
                                    name="email"
                                    type="text"
                                    icon="bx bxl-gmail"
                                    label="ایمیل"
                                    mode="input"
                                />
                            )}

                            <FormikControl
                                formik={Formik}
                                control="input"
                                name="password"
                                type="password"
                                icon="bx bxs-lock-alt"
                                label="رمز عبور"
                                mode="input"
                            />
                            <FormikControl
                                formik={Formik}
                                control="input"
                                name="password"
                                type="password"
                                icon="bx bxs-lock-alt"
                                label="تکرار رمز عبور"
                                mode="input"
                            />

                            <button type='submit' className="btn btn-signin">ثبت نام</button>
                        </Form>
                    );
                }}
            </Formik>
            <p>
                حساب دارید ؟ <a href="singup.html">ورود</a>
            </p>
        </>
    );
};

export default Signin;
