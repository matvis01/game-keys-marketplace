import React from "react"
import { useField } from "formik"

const CustomInput = ({ label, customFunction = () => {}, ...props }: any) => {
  const [field, meta, helpers] = useField(props)

  const customOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    customFunction()
    helpers.setValue(value)
  }
  return (
    <>
      <label className="label label-text text-lg">{label}</label>
      <input
        {...field}
        {...props}
        onChange={customOnChange}
        className={`input input-bordered ${
          meta.touched && meta.error && "input-error"
        } input-sm w-full`}
      />
      {meta.touched && meta.error ? (
        <div className="text-xs text-error">{meta.error}</div>
      ) : null}
    </>
  )
}

export default CustomInput
