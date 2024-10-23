import {
  dayjs,
  DayType,
  dayTypeTitles,
  GetManyRequestType,
  Placement,
  WeekDay,
  weekDayTitles,
} from '@core';
import { Edit, useForm, useSelect } from '@refinedev/antd';
import { Form, Select, TimePicker } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { useMemo } from 'react';

export const PlacementWorkingTimeEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});
  const { selectProps: placementSelectProps } = useSelect<Placement>({
    resource: 'placements',
    optionLabel: 'name',
    meta: {
      requestType: GetManyRequestType.GetAll,
    },
  });
  const dayValues: BaseOptionType[] = useMemo(() => {
    return Object.values(WeekDay).map(
      (d): BaseOptionType => ({
        label: weekDayTitles[d],
        value: d,
      }),
    );
  }, []);

  const dayTypeValues: BaseOptionType[] = useMemo(() => {
    return Object.values(DayType).map(
      (d): BaseOptionType => ({
        label: dayTypeTitles[d],
        value: d,
      }),
    );
  }, []);

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={'Day'}
          name={['day']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={dayValues} />
        </Form.Item>
        <Form.Item
          label={'Day Type'}
          name={['dayType']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={dayTypeValues} />
        </Form.Item>

        <Form.Item
          label={'Working Time From'}
          name={['workingTimeFrom']}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : null,
          })}
        >
          <TimePicker />
        </Form.Item>
        <Form.Item
          label={'Working Time Till'}
          name={['workingTimeTill']}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : null,
          })}
        >
          <TimePicker />
        </Form.Item>
        <Form.Item
          label={'Placement'}
          name={'placementId'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...placementSelectProps} showSearch={false} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
