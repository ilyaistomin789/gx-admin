import dayjsLib from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjsLib.extend(utc);
dayjsLib.extend(timezone);

export const dayjs = (
  date?: dayjsLib.ConfigType,
  format?: dayjsLib.OptionType,
  locale?: string,
  strict?: boolean
) => dayjsLib(date, format, locale, strict).tz("Europe/Minsk");
