import { Edit, useForm, useSelect } from "@refinedev/antd";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";

export const PromoCodeEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Promo Code"}
          name={["promoCode"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Started At"}
          name={["startedAt"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : null,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label={"Expired At"}
          name={["expiredAt"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : null,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label={"Discount"}
          name={["discount"]}
          rules={[
            {
              required: true,
            },
            {
              type: "number",
              max: 100,
              min: 0,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={"Description"}
          name={["description"]}
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
