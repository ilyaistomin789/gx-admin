import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const AttributeTypeEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
