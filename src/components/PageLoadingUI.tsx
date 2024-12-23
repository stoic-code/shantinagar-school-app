import { Loader2 } from "lucide-react";

export const PageLoadingUI = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};
