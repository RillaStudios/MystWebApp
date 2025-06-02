import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import WarrantyPage from "../../pages/WarrantyPage";
import ShippingPage from "../../pages/ShippingPage";
import RefundPage from "../../pages/RefundPage";
import TermsPage from "../../pages/TermsPage";
import PrivacyPage from "../../pages/PrivacyPage";
import BuyPage from "../../pages/BuyPage";
import CheckoutPage from "../../pages/CheckoutPage";
import CheckoutSuccessPage from "../../pages/CheckoutSuccessPage";
import TrackOrderPage from "../../pages/TrackOrderPage";

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
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
