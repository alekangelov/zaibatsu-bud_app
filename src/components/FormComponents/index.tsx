import * as React from "react";
import { useField, useFormikContext } from "formik";
import clsx from "clsx";
import mergeProps from "merge-props";
import { removeLast } from "../../utils/common";
import { useDeepCallback } from "../../utils/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  parentClassName?: string;
  label: string;
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
      <label htmlFor={field.name}>{label}</label>
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
  const mergedProps = {
    ...mergeProps(rest, field, {
      className: "form-control_input",
      id: field.name,
    }),
  };
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
        <div className="form-control_input--icon">
          <FontAwesomeIcon icon={faChevronDown} color="white" />
        </div>
        <select {...mergedProps}>
          {rest.placeholder && <option disabled>{rest.placeholder}</option>}
          {items.map((singleItem) => {
            return (
              <option
                disabled={singleItem.disabled}
                value={singleItem.value}
                key={singleItem.value}
              >
                {singleItem.label}
              </option>
            );
          })}
        </select>
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
  const [value, setValue] = React.useState("");
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const lcKey = e.key.toLowerCase();
      if (lcKey === "enter" || lcKey === "tab") {
        if (lcKey === "enter") e.preventDefault();
        if (value) {
          formik.setFieldValue(field.name, [...field.value, value]);
          setValue("");
        }
      }
      if (lcKey === "backspace" && !value) {
        e.preventDefault();
        formik.setFieldValue(field.name, removeLast(field.value));
      }
    },
    [field.value, value, field.name, formik]
  );
  const handleDelete = useDeepCallback(
    (index: number) => {
      const newArray =
        field.value.length === 1
          ? []
          : field.value.filter((e, i) => i !== index);
      formik.setFieldValue(field.name, newArray);
    },
    [field]
  );
  return (
    <div
      className={clsx(
        "form-control",
        parentClassName,
        meta.touched && meta.error && "error"
      )}
    >
      <label htmlFor={field.name}>{label}</label>
      <div className="form-control_fake tags">
        <div className="form-control_fake--bg"></div>
        {Boolean(field.value.length) && (
          <div className="tags-inner">
            {field.value.map((e, i) => (
              <span
                onClick={() => handleDelete(i)}
                className="tags-single"
                key={e + i}
              >
                {e}
              </span>
            ))}
          </div>
        )}

        <input
          value={value}
          type="text"
          className="base_input"
          name="tag"
          id={field.name}
          onBlur={() => formik.setTouched(field, true)}
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {meta.touched && meta.error && (
        <span className="form-control__error">{meta.error}</span>
      )}
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
