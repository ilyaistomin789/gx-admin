import { ProductItemBff } from '@data';
import { DateField, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Image as ImageUI, List, Switch, Typography } from 'antd';
import { useMemo } from 'react';

const { Title, Text } = Typography;

export const ProductItemShow = () => {
  const { queryResult } = useShow<ProductItemBff>({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const imageList = useMemo(() => {
    if (!record?.images) return null;

    return record.images.map((i) => <ImageUI width={300} src={i.url} />);
  }, [record?.images]);

  const listDataSource = useMemo(() => {
    if (!record?.characteristics) return [];

    return record?.characteristics.map((c) => ({
      title: c.title,
      value: c.value,
      id: c.id,
    }));
  }, [record?.characteristics]);

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{'ID'}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{'Name'}</Title>
      <Text>{record?.name}</Text>
      <Title level={5}>{'Code'}</Title>
      <Text>{record?.code}</Text>
      {record?.sku && (
        <>
          <Title level={5}>{'Sku'}</Title>
          <Text>{record?.sku}</Text>
        </>
      )}
      <Title level={5}>{'Original Price'}</Title>
      <Text>{record?.price.original}</Text>
      <Title level={5}>{'Sale Price'}</Title>
      <Text>{record?.price.sale}</Text>
      <Title level={5}>{'Color'}</Title>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        {`${record?.color.name} - ${record?.color.value}`}
        <div
          style={{
            marginLeft: '5px',
            width: '25px',
            backgroundColor: record?.color.value,
            height: '25px',
            border: '1px solid transparent',
          }}
        ></div>
      </div>
      {record?.images?.length ? (
        <div style={{ marginBottom: 8 }}>
          <Title level={5}>{'Images'}</Title>
          <ImageUI.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            {imageList}
          </ImageUI.PreviewGroup>
        </div>
      ) : null}
      {record?.characteristics?.length ? (
        <div style={{ marginBottom: 8 }}>
          <Title level={5}>{'Characteristics'}</Title>
          <List
            itemLayout="horizontal"
            dataSource={listDataSource}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta title={item.title} description={item.value} />
              </List.Item>
            )}
          />
        </div>
      ) : null}
      <Title level={5}>{'Is Customizable'}</Title>
      <Switch
        defaultChecked={record?.isCustomizable}
        disabled
        size="small"
        style={{ marginBottom: 8 }}
      />
      <Title level={5}>{'Status'}</Title>
      <Switch
        defaultChecked={record?.status}
        disabled
        size="small"
        style={{ marginBottom: 8 }}
      />
      <Title level={5}>{'CreatedAt'}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
