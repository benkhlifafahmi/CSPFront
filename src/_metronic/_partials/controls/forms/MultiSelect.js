import React from "react";
import {useField} from "formik";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import MS from "react-multi-select-component";

const getFieldCSSClasses = (touched, errors) => {
  const classes = [];
  if (touched && errors) {
    classes.push("is-invalid-select");
  }

  if (touched && !errors) {
    classes.push("is-valid-select");
  }

  return classes.join(" ");
};

export function MultiSelect({
  label,
  withFeedbackLabel = true,
  type = "text",
  customFeedbackLabel,
  children,
  ...props
}) {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  return (
    <>
      {label && <label>{label}</label>}
      <MS
        className={getFieldCSSClasses(touched, error)}
          {...field}
          {...props}
      />
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          erros={error}
          touched={touched}
          label={label}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
