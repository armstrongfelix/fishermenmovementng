import { useState } from "react";

export default function useForm({ initialValues, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setServerError("");
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
    if (status === "success") setStatus("idle");
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const nextErrors = validate(values);
    setErrors((current) => ({ ...current, [name]: nextErrors[name] || "" }));
  };

  const handleSubmit = (onSubmit) => async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      await onSubmit(values);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
    setServerError("");
  };

  return {
    values,
    errors,
    status,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
