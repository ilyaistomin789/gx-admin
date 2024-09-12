import { List, useTable } from "@refinedev/antd";
import { useMany, type BaseRecord } from "@refinedev/core";
import { Space, Spin, Table } from "antd";
import { DeleteButton, EditButton, ShowButton } from "../../../core";
import { AttributeOption, AttributeType } from "../../../core/types";

export const AttributeOptionList = () => {
  const { tableProps } = useTable<AttributeOption>({
    syncWithLocation: true,
  });

  const { data: attributeTypeData, isLoading: attributeTypeIsLoading } =
    useMany<AttributeType>({
      resource: "attribute-types",
      ids:
        tableProps?.dataSource
          ?.map((item) => item?.attributeTypeId)
          .filter(Boolean) ?? [],
      queryOptions: {
        enabled: !!tableProps?.dataSource,
      },
    });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="optionName" title={"Name"} />
        <Table.Column
          dataIndex={"attributeTypeId"}
          title={"Attribute Type"}
          render={(value) =>
            attributeTypeIsLoading ? (
              <Spin size="small" />
            ) : (
              attributeTypeData?.data?.find((item) => item.id === value)?.name
            )
          }
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
