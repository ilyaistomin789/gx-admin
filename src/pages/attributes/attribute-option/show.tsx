import { Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Spin, Typography } from "antd";
import { AttributeOption, AttributeType } from "../../../core";

const { Title, Text } = Typography;

export const AttributeOptionShow = () => {
  const { queryResult } = useShow<AttributeOption>({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: attributeTypeData, isLoading: attributeTypeIsLoading } =
    useOne<AttributeType>({
      resource: "attribute-types",
      id: record?.attributeTypeId || "",
      queryOptions: {
        enabled: !!record,
      },
    });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.optionName} />
      <Title level={5}>{"Attribute Type"}</Title>
      <Text>
        {attributeTypeIsLoading ? (
          <Spin size="small" />
        ) : (
          attributeTypeData?.data.name
        )}
      </Text>
    </Show>
  );
};
