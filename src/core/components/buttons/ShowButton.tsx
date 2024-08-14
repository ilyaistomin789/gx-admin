import { ShowButton as ShowButtonUI, ShowButtonProps } from "@refinedev/antd";
import { Eye } from "lucide-react";

export const ShowButton: React.FC<ShowButtonProps> = (props) => {
  return <ShowButtonUI {...props} icon={<Eye width={14} height={14} />} />;
};
