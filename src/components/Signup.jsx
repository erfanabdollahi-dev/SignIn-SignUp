import React, { useEffect, useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikControl from './Formik/FormikControl';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import FieldError from './Formik/FieldError';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
    username: '',
    email: '',
    mobile: '',
    password: '',
    cPassword: '',
    auth_mode: 'mobile',
    birthDate: '',
    image: null,
};

const authModes = [
    { id: 'mobile', value: 'موبایل', icon: 'bx bxs-phone' },
    { id: 'email', value: 'ایمیل', icon: 'bx bxl-gmail' },
];

const LoginSchema = Yup.object({
    email: Yup.string().when('auth_mode', {
        is: 'email',
        then: (schema) =>
            schema
                .required('این فیلد اجباری است')
                .matches(/^\S+@\S+\.\S+$/, 'فرمت ایمیل صحیح نیست'),
    }),

    mobile: Yup.string().when('auth_mode', {
        is: 'mobile',
        then: (schema) =>
            schema
                .required('این فیلد اجباری است')
                .matches(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
    }),

    password: Yup.string()
        .required('این فیلد اجباری است')
        .min(8, 'حداقل 8 کاراکتر وارد کنید')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/,
            'فرمت رمز عبور [A-Z] [a-z] [0-9] [#?!@$%^&*-.] '
        ),
    cPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'با رمز عبور مطابقت ندارد')
        .required('این فیلد اجباری است'),
    username: Yup.string()
        .required('این فیلد اجباری است')
        .matches(
            /^[0-9A-Za-z]{6,16}$/,
            'فرمت نام کاربری 0-9 A-Z a-z و 6 الا 16 کاراکتر'
        ),
    birthDate: Yup.string()
        .required('تاریخ تولد الزامی است')
        .matches(/^\d{4}\/\d{2}\/\d{2}$/, 'فرمت تاریخ باید YYYY/MM/DD باشد'),
    image: Yup.mixed()
        .required('این فیلد اجباری است')
        .test(
            'filesize',
            'سایز فایل نمیتواند بیش از 1 مگابایت باشد',
            (value) => value && value.size <= 1000 * 1024
        )
        .test(
            'fileType',
            'فایل باید از نوع تصویر باشد (jpg, jpeg, png, gif)',
            (value) => {
                return (
                    value &&
                    [
                        'image/jpeg',
                        'image/png',
                        'image/gif',
                        'image/jpg',
                    ].includes(value.type)
                );
            }
        ),
});

const Signin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [nonFieldErrors,setNonFieldErrors] = useState(null)
    useEffect(() => {
        if (
            localStorage.getItem('accessToken') &&
            localStorage.getItem('username')
        ) {
            navigate('/profile');
        }
    });
    const onSubmit = (values) => {
        setLoading(true)
        console.log(values);
        let formData = new FormData();
        formData.append('username', values.username);
        if (values.email != '') {
            formData.append('email', values.email);
        }
        if (values.mobile != '') {
            formData.append('phone', values.mobile);
        }
        formData.append('password', values.password);
        formData.append('birthDate', values.birthDate);
        formData.append('image', values.image);

        axios
            .post('http://127.0.0.1:8000/api/register/', formData)
            .then((res) => {
                console.log(res);
                setLoading(false)
                localStorage.setItem('accessToken', res.data.access);
                localStorage.setItem('refreshToken', res.data.refresh);
                localStorage.setItem('username', res.data.user.username);
                navigate('/profile')
            })
            .catch((err) => {
                console.log(err);
                setNonFieldErrors(err.response.data.message);
            });
    };
    return (
        <div className="wrapper">
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
                            <div className="w-full flex justify-center items-center text-center">
                                {nonFieldErrors ? (
                                    <small className="text-incorrect-color w-full flex justify-center items-center text-center">
                                        {nonFieldErrors}
                                    </small>
                                ) : null}
                            </div>
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
                                name="cPassword"
                                type="password"
                                icon="bx bxs-lock-alt"
                                label="تکرار رمز عبور"
                                mode="input"
                            />
                            <div className="con w-full">
                                <div
                                    className={`input-con ${
                                        Formik.errors.birthDate &&
                                        Formik.touched.birthDate
                                            ? 'incorrect'
                                            : null
                                    }`}
                                >
                                    <label
                                        htmlFor="date"
                                        className="label flex justify-between w-fit"
                                    >
                                        <i className="bx bxs-calendar"></i>
                                    </label>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        calendarPosition="top"
                                        placeholder="تاریخ تولد"
                                        id="date"
                                        value={Formik.values.birthDate || null}
                                        onChange={(date, e) => {
                                            if (date) {
                                                Formik.setFieldValue(
                                                    'birthDate',
                                                    `${date.year}/${String(
                                                        date.month.number
                                                    ).padStart(
                                                        2,
                                                        '0'
                                                    )}/${String(
                                                        date.day
                                                    ).padStart(2, '0')}`
                                                );
                                            } else {
                                                Formik.setFieldValue(
                                                    'birthDate',
                                                    ''
                                                );
                                            }
                                        }}
                                        inputClass="bg-input-color  h-[50px] rounded-l-lg px-6  outline-0 w-full placeholder:opacity-[.8] w-full placeholder:text-text-color"
                                    />
                                </div>
                                <ErrorMessage
                                    name="birthDate"
                                    component={FieldError}
                                />
                            </div>
                            <FormikControl
                                formik={Formik}
                                control="file"
                                name="image"
                                icon="bx bxs-file-image"
                                label="تصویر کاربر"
                            />
                            <button type="submit" className="btn btn-signin">
                                {loading ? (
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : (
                                    'ثبت نام'
                                )}
                            </button>
                        </Form>
                    );
                }}
            </Formik>
            <p>
                حساب دارید ؟ <Link to="/signin">ورود</Link>
            </p>
        </div>
    );
};

export default Signin;
