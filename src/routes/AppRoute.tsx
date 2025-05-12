import MainLayout from "@/layouts/MainLayout";
import Index from "@/pages/Index";
import Leads from "@/pages/Leads";
import MessageGenerator from "@/pages/MessageGenerator";
import NotFound from "@/pages/NotFound";
import { Routes, Route } from "react-router-dom";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Index />} />
        <Route path="/message-generator" element={<MessageGenerator />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
