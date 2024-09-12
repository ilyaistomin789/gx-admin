import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, TimePicker } from "antd";
import {
  DayType,
  dayTypeTitles,
  GetManyRequestType,
  Placement,
  WeekDay,
  weekDayTitles,
} from "../../../core";
import { useMemo } from "react";
import { BaseOptionType } from "antd/es/cascader";

export const PlacementWorkingTimeCreate = () => {
  const { formProps, saveButtonProps, form } = useForm({});
  const { selectProps: placementSelectProps } = useSelect<Placement>({
    resource: "placements",
    optionLabel: "name",
    meta: {
      requestType: GetManyRequestType.GetAll,
    },
  });

  const dayValues: BaseOptionType[] = useMemo(() => {
    return Object.values(WeekDay).map(
      (d): BaseOptionType => ({
        label: weekDayTitles[d],
        value: d,
      })
    );
  }, []);

  const dayTypeValues: BaseOptionType[] = useMemo(() => {
    return Object.values(DayType).map(
      (d): BaseOptionType => ({
        label: dayTypeTitles[d],
        value: d,
      })
    );
  }, []);

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Day"}
          name={["day"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={dayValues} />
        </Form.Item>
        <Form.Item
          label={"Day Type"}
          name={["dayType"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={dayTypeValues} />
        </Form.Item>

        <Form.Item
          label={"Working Time From"}
          name={["workingTimeFrom"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TimePicker />
        </Form.Item>
        <Form.Item
          label={"Working Time Till"}
          name={["workingTimeTill"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TimePicker />
        </Form.Item>
        <Form.Item
          label={"Placement"}
          name={"placementId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...placementSelectProps} showSearch={false} />
        </Form.Item>
      </Form>
    </Create>
  );
};
