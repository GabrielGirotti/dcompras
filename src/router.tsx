import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateShopView from "./views/shops/CreateShopView";
import EditShopView from "./views/shops/EditShopView";
import ShopDetails from "./views/shops/ShopDetails";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewToken from "./views/auth/RequestNewToken";

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

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route path="/auth/confirm-account" element={<ConfirmAccountView />}/>
          <Route path="/auth/request-token" element={<RequestNewToken />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
