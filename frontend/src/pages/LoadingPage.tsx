import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader className="size-10 animate-spin" />
    </div>
  );
};

export default LoadingPage;
