import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateShopView from "./views/shops/CreateShopView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/shops/create" element={<CreateShopView/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
