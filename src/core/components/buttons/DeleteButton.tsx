import {
  DeleteButton as DeleteButtonUI,
  DeleteButtonProps,
} from "@refinedev/antd";
import { Trash } from "lucide-react";

export const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  return <DeleteButtonUI {...props} icon={<Trash width={14} height={14} />} />;
};
