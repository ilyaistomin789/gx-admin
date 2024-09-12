import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";
import {
  AttributeType,
  GetManyRequestType,
  SizeCategory,
} from "../../../core/types";

export const AttributeOptionEdit = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: attributeTypeSelectProps } = useSelect<AttributeType>({
    resource: "attribute-types",
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
          name={["optionName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Slug"}
          name={["slug"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Attribute Type"}
          name={"attributeTypeId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...attributeTypeSelectProps} showSearch={false} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
