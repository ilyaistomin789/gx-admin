import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";
import { GetManyRequestType, SizeCategory } from "../../core/types";

export const SizeOptionEdit = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: categorySelectProps } = useSelect<SizeCategory>({
    resource: "size-categories",
    optionLabel: "name",
    meta: {
      requestType: GetManyRequestType.GetAll,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
        <Form.Item
          label={"Sort Order"}
          name="sortOrder"
          rules={[
            {
              required: true,
              type: "number",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={"Size Category"}
          name={"sizeCategoryId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
