import { toast as baseToast } from "@/hooks/use-toast";

export const globalToast = (options: {
  title?: string;
  description?: string;
  variant: "default" | "destructive" | null | undefined;
}) => {
  baseToast(options);
};