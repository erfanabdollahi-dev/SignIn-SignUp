import React from 'react';

const Signup = () => {
    return (
        <>
            <h1>ثبت نام</h1>
            <form action="">
                <div className="con">
                    <div className="input-con incorrect">
                        <label htmlFor="">
                            <i className="bx bx-user"></i>
                        </label>
                        <input type="text" dir="ltr" placeholder="نام کاربری" />
                    </div>
                    <small className="error">نام کاربری اشتباه است</small>
                </div>
                <div className="con">
                    <div className="input-con">
                        <label htmlFor="">
                            <i className="bx bx-lock"></i>
                        </label>
                        <input type="text" dir="ltr" placeholder="رمز عبور" />
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


export default Signup