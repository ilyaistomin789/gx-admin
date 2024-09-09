import { DayType, WeekDay } from '@gx/interfaces/common';

export interface PlacementWorkingTime {
  id: string;
  day: WeekDay;
  dayType: DayType;
  workingTimeFrom: string;
  workingTimeTill: string;
  placementId: string;
  createdAt: Date;
  updatedAt: Date;
}
