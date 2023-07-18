import { toast } from "react-toastify";

export const notify = (type: string, message: string) => {
  switch (type) {
    case "info":
      toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      break;
    case "success":
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      break;
    case "warning":
      toast.warn(message, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      break;
    default:
      break;
  }
};
