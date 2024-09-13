import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { Button, Form, Input, InputNumber, Space } from "antd";
import { Placement } from "../../../core";
import { HttpError } from "@refinedev/core";

export const PlacementCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Placement,
    HttpError,
    Placement
  >({});

  const handleFinish = (values: Placement) => {
    const modifiedValues: Placement = {
      ...values,
      telegram: values.telegram ? values.telegram : null,
    };

    formProps.onFinish?.(modifiedValues);
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleFinish}>
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
          label={"Address Code"}
          name={["addressCode"]}
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
          label={"Telegram"}
          name={["telegram"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.List
          name="phones"
          rules={[
            {
              validator: async (_, phones) => {
                console.log(_, phones);
                if (!phones || phones.length < 1) {
                  return Promise.reject(new Error("At least no phone"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name]}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing phone",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input placeholder={`Phone ${index + 1}`} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Phone
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Create>
  );
};
