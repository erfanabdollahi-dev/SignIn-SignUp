import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup'



const Signin = () => {
    return (
        <>
            <h1>ورود</h1>
            
                
                <form action="">
                    <div className="con">
                        <div className="input-con incorrect">
                            <label htmlFor="">
                                <i className="bx bx-user"></i>
                            </label>
                            <input
                                name="username"
                                type="text"
                                dir="ltr"
                                placeholder="نام کاربری"
                            />
                        </div>
                        <small className="error">نام کاربری اشتباه است</small>
                    </div>
                    <div className="con">
                        <div className="input-con">
                            <label htmlFor="">
                                <i className="bx bx-lock"></i>
                            </label>
                            <input
                                name="password"
                                type="text"
                                dir="ltr"
                                placeholder="رمز عبور"
                            />
                        </div>
                        <small className="error">error</small>
                    </div>
                    <button className="btn btn-signin">ورود</button>
                </form>
           
            <p>
                حساب ندارید ؟ <a href="singup.html">ثبت نام</a>
            </p>
        </>
    );
};

export default Signin;
