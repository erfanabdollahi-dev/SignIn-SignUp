import React from 'react';
import FieldError from './FieldError';
import { ErrorMessage, FastField } from 'formik';

const Input = ({formik,mode,type,name,icon,label}) => {
    return (
        <div className="con">
            <div
                className={`input-con ${
                    formik.errors[name] && formik.touched[name]
                        ? 'incorrect'
                        : null
                }`}
            >
                <label htmlFor="" className='label'>
                    <i className={icon}></i>
                </label>
                <FastField
                    name={name}
                    type={type}
                    dir="ltr"
                    placeholder={label}
                    className={mode}
                />
            </div>
            <ErrorMessage name={name} component={FieldError} />
        </div>
    );
};


export default Input