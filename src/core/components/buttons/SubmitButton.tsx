import { Button, Form, FormInstance } from "antd";
import { ButtonProps } from "antd/lib";
import { useEffect, useState } from "react";

interface SubmitButtonProps {
  form: FormInstance;
}

export const FormAccessButton: React.FC<
  React.PropsWithChildren<Omit<ButtonProps, "form"> & SubmitButtonProps>
> = ({ form, children, ...props }) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button {...props} disabled={!submittable}>
      {children}
    </Button>
  );
};
