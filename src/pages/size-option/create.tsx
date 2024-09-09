import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";
import { GetManyRequestType, SizeCategory, SizeOption } from "../../core/types";

export const SizeOptionCreate = () => {
  const { formProps, saveButtonProps } = useForm<SizeOption>({});

  const { selectProps: categorySelectProps } = useSelect<SizeCategory>({
    resource: "size-categories",
    optionLabel: "name",
    meta: {
      requestType: GetManyRequestType.GetAll,
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
          <Select {...categorySelectProps} showSearch={false} />
        </Form.Item>
      </Form>
    </Create>
  );
};
