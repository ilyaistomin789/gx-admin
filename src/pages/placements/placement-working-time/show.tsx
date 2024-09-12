import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Spin, Typography } from "antd";
import { Placement, PlacementWorkingTime } from "../../../core";

const { Title, Text } = Typography;

export const PlacementWorkingTimeShow = () => {
  const { queryResult } = useShow<PlacementWorkingTime>({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: placementData, isLoading: placementIsLoading } =
    useOne<Placement>({
      resource: "placements",
      id: record?.placementId || "",
      queryOptions: {
        enabled: !!record,
      },
    });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{"Day"}</Title>
      <TextField value={record?.day} />
      <Title level={5}>{"Day Type"}</Title>
      <TextField value={record?.dayType} />
      <Title level={5}>{"Working Time From"}</Title>
      <TextField value={record?.workingTimeFrom} />
      <Title level={5}>{"Working Time Till"}</Title>
      <TextField value={record?.workingTimeTill} />
      <Title level={5}>{"Placement"}</Title>
      <Text>
        {placementIsLoading ? <Spin size="small" /> : placementData?.data?.name}
      </Text>
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
