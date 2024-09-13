export enum WeekDay {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export enum DayType {
  DayOff = 'DayOff',
  Working = 'Working',
}

export const weekDayTitles: Record<WeekDay, string> = {
  [WeekDay.Monday]: 'Понедельник',
  [WeekDay.Tuesday]: 'Вторник',
  [WeekDay.Wednesday]: 'Среда',
  [WeekDay.Thursday]: 'Четверг',
  [WeekDay.Friday]: 'Пятница',
  [WeekDay.Saturday]: 'Суббота',
  [WeekDay.Sunday]: 'Воскресенье',
};

export const dayTypeTitles: Record<DayType, string> = {
  [DayType.DayOff]: 'Выходной',
  [DayType.Working]: 'Рабочий',
};
