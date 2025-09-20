import React from 'react';
import FieldError from './FieldError';
import { ErrorMessage, FastField } from 'formik';

const File = ({ formik,  name, icon, label }) => {
    return (
        <div className="con">
            <div
                className={`input-con relative ${
                    formik.errors[name] && formik.touched[name]
                        ? 'incorrect'
                        : null
                }`}
            >
                <label htmlFor={name} className="label">
                    <i className={icon}></i>
                </label>

                <input
                    type=""
                    value={formik.values[name] ? formik.values[name].name : ''}
                    onChange={() => null}
                    className="input  select-none   "
                    placeholder={label}
                    dir="ltr"
                />
                <input
                    name={name}
                    type="file"
                    id={name}
                    className="absolute h-full opacity-0  w-[306px] flex justify-end text-2xl text-start items-center left-0 top-0 "
                    onChange={(e) => {
                        console.log(e.target.files[0]);

                        formik.setFieldValue(name, e.target.files[0]);
                    }}
                />
            </div>
            <ErrorMessage name={name} component={FieldError} />
        </div>
    );
};

export default File;
