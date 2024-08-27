import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateShopView from "./views/shops/CreateShopView";
import EditShopView from "./views/shops/EditShopView";
import ShopDetails from "./views/shops/ShopDetails";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewToken from "./views/auth/RequestNewToken";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";

import HomeView from "./views/home/HomeView";
import HomeLayout from "./layouts/HomeLayout";
import PrivacyView from "./views/home/PrivacyView";
import ShopTeamView from "./views/shops/ShopTeamView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/shops" element={<DashboardView />} />
          <Route path="/shops/create" element={<CreateShopView />} />
          <Route path="/shops/:shopId" element={<ShopDetails />} />
          <Route path="/shops/:shopId/edit" element={<EditShopView />} />
          <Route path="/shops/:shopId/team" element={<ShopTeamView/>} />
        </Route>

        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomeView />} index />
          <Route path="/privacy" element={<PrivacyView/>} />
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-token" element={<RequestNewToken />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
