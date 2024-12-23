import { Loader2 } from "lucide-react";

export const StudentPageLoading = () => {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};
