import AppRoute from "./routes/AppRoute";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <>
      <AppRoute />
      <Toaster />
    </>
  );
};

export default App;
