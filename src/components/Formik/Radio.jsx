import React, { Fragment } from 'react';
import { ErrorMessage, FastField } from 'formik';
import FieldError from './FieldError';

const Radio = ({ label, name, options }) => {
    return (
        <div className="con overflow h-full mb-5">
            <h3 className="text-text-color pr-2 mb-1">نوع اعتبار سنجی :</h3>
            <div className="w-full ">
                <ul className="items-center flex w-full gap-4 h-[50px] ">
                    <FastField id={name} name={name}>
                        {({ field }) => {
                            console.log(field);

                            return options.map((o) => {
                                const isSelected =
                                    String(field.value) === String(o.id);
                                return (
                                    <li
                                        key={o.id}
                                        className={`w-full duration-200 ease-in h-[50px] flex items-center justify-center box-border ${
                                            isSelected
                                                ? 'bg-base-color border-accent-color'
                                                : 'bg-input-color border-input-color'
                                        } rounded-lg border-2`}
                                    >
                                        <div className="flex h-full box-border items-center   w-full">
                                            <label
                                                htmlFor={`radio${o.id}`}
                                                className="h-[30px] w-[30px] flex items-center rounded-lg justify-center text-center bg-accent-color p-2 mr-2"
                                            >
                                                <i className={`${o.icon} text-base-color`}></i>
                                            </label>
                                            <div className="flex h-full w-full  items-center justify-center  ">
                                                <input
                                                    type="radio"
                                                    id={`radio${o.id}`}
                                                    {...field}
                                                    value={o.id}
                                                    checked={
                                                        field.value == o.id
                                                    }
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor={`radio${o.id}`}
                                                    className="p-2 w-full h-full text-center flex items-center justify-center"
                                                >
                                                    {o.value}
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                );
                            });
                        }}
                    </FastField>
                </ul>
            </div>
        </div>
    );
};

export default Radio;
