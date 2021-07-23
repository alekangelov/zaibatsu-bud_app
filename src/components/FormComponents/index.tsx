import * as React from "react";
import { useField, useFormikContext } from "formik";
import clsx from "clsx";
import mergeProps from "merge-props";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import tags from "../../data/tags";
interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  parentClassName?: string;
  label?: string;
  long?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  parentClassName,
  label,
  long = false,
  ...rest
}) => {
  const [field, meta] = useField(name || "");
  const mergedProps = {
    ...mergeProps(rest, field, {
      className: "form-control_input",
      id: field.name,
    }),
  };
  return (
    <div
      className={clsx(
        "form-control",
        parentClassName,
        meta.touched && meta.error && "error"
      )}
    >
      {label && <label htmlFor={field.name}>{label}</label>}
      {long ? <textarea {...mergedProps} /> : <input {...mergedProps} />}
      {meta.touched && meta.error && (
        <span className="form-control__error">{meta.error}</span>
      )}
    </div>
  );
};

interface SelectInputProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  parentClassName?: string;
  label?: string;
  items: Array<{ label: string; value: any; disabled?: boolean }>;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  parentClassName,
  label,
  items,
  ...rest
}) => {
  const [field, meta] = useField(name || "");
  const formik = useFormikContext();

  return (
    <div
      className={clsx(
        "form-control--select",
        parentClassName,
        meta.touched && meta.error && "error"
      )}
    >
      {label && <label htmlFor={field.name}>{label}</label>}

      <div className="form-control_input--wrapper">
        <Select
          onChange={(e) => formik.setFieldValue(field.name, e?.value)}
          classNamePrefix="select"
          options={items}
          placeholder={rest.placeholder}
        />
      </div>
      {meta.touched && meta.error && (
        <span className="form-control__error">{meta.error}</span>
      )}
    </div>
  );
};

export const TagInput: React.FC<TextInputProps> = ({
  name,
  parentClassName,
  label,
  ...rest
}) => {
  const [field, meta] = useField<string[]>(name || "");
  const formik = useFormikContext();
  return (
    <div
      style={rest.style}
      className={clsx(
        "form-control",
        parentClassName,
        meta.touched && meta.error && "error"
      )}
    >
      {label && <label htmlFor={field.name}>{label}</label>}
      <div className="form-control_fake tags">
        <Select
          classNamePrefix="select"
          isMulti
          options={tags}
          placeholder={rest.placeholder}
          onChange={(e) => formik.setFieldValue(field.name, e)}
        />
      </div>
      {/* {meta.touched && meta.error && (
        <span className="form-control__error">{meta.error}</span>
      )} */}
    </div>
  );
};

// const CheckboxUncontrolled: React.FC<Props>  = ({ value, label, name, onChange }) => {
//   return (
//     <div className={clsx("checkbox-wrapper")}>
//       <label htmlFor={name} className="checkbox">
//         <input
//           type="checkbox"
//           onChange={onChange}
//           value={true}
//           name={name}
//           id={name}
//         />
//         <span className="checkbox-custom"></span>
//       </label>
//       <label htmlFor={name}>{label}</label>
//     </div>
//   );
// };

interface RadioUncontrolledProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  value: string;
  valueChecked: string;
  label: string;
}

export const RadioUncontrolled: React.FC<RadioUncontrolledProps> = ({
  value,
  valueChecked,
  label,
  name,
  onChange,
  ...rest
}) => {
  return (
    <div className={clsx("checkbox-wrapper")}>
      <label htmlFor={name + value} className="checkbox">
        <input
          type="radio"
          onChange={onChange}
          value={value}
          name={name}
          defaultChecked={valueChecked === value}
          id={name + value}
          {...rest}
        />
        <span className="checkbox-custom"></span>
      </label>
      <label htmlFor={name + value}>{label}</label>
    </div>
  );
};
