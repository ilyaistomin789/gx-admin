import { Create, useForm } from "@refinedev/antd";
import { DatePicker, Form, Input, InputNumber } from "antd";

export const PromoCodeCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
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
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label={"Expired At"}
          name={["expiredAt"]}
          rules={[
            {
              required: true,
            },
          ]}
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
    </Create>
  );
};
