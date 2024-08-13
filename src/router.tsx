import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateShopView from "./views/shops/CreateShopView";
import EditShopView from "./views/shops/EditShopView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/shops/create" element={<CreateShopView/>} />
          <Route path="/shops/:shopId/edit" element={<EditShopView/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
