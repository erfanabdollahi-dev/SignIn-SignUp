import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikControl from './Formik/FormikControl';

const initialValues = {
    email: '',
    password: '',
};

const onSubmit = (values) => {
    console.log(values);
};

const LoginSchema = Yup.object({
    email: Yup.string()
        .required('این فیلد اجباری است')
        .matches(/^\S+@\S+\.\S+$/, 'فرمت ایمیل صحیح نیست'),
    password: Yup.string()
        .required('این فیلد اجباری است')
        .min(8, 'حداقل 8 کاراکتر وارد کنید')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/,
            'فرمت رمز عبور [A-Z] [a-z] [0-9] [#?!@$%^&*-.] '
        ),
});

const Signin = () => {
    return (
        <>
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
                                name="email"
                                type="text"
                                icon="bx bxs-user"
                                label="ایمیل"
                                mode="input"
                            />
                            <FormikControl
                                formik={Formik}
                                control="input"
                                name="password"
                                type="password"
                                icon="bx bxs-lock-alt"
                                label="رمز عبور"
                            />

                            <button type="submit" className="btn btn-signin">
                                ورود
                            </button>
                        </Form>
                    );
                }}
            </Formik>
            <p>
                حساب ندارید ؟ <a href="singup.html">ثبت نام</a>
            </p>
        </>
    );
};

export default Signin;
