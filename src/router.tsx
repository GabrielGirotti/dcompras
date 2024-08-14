import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateShopView from "./views/shops/CreateShopView";
import EditShopView from "./views/shops/EditShopView";
import ShopDetails from "./views/shops/ShopDetails";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/shops/create" element={<CreateShopView />} />
          <Route path="/shops/:shopId" element={<ShopDetails />} />
          <Route path="/shops/:shopId/edit" element={<EditShopView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
