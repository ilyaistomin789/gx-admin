import { EditButton as EditButtonUI, EditButtonProps } from "@refinedev/antd";
import { Pencil } from "lucide-react";

export const EditButton: React.FC<EditButtonProps> = (props) => {
  return <EditButtonUI {...props} icon={<Pencil width={14} height={14} />} />;
};
