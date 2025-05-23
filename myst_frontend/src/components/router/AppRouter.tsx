import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import WarrantyPage from "../../pages/WarrantyPage";
import ShippingPage from "../../pages/ShippingPage";
import RefundPage from "../../pages/RefundPage";
import TermsPage from "../../pages/TermsPage";
import PrivacyPage from "../../pages/PrivacyPage";
import BuyPage from "../../pages/BuyPage";
import CheckoutPage from "../../pages/CheckoutPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}
