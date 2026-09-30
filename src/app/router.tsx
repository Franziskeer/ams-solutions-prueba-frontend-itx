import { Route, Routes } from "react-router";
import { RootLayout } from "../layout/RootLayout.tsx";
import { NotFoundPage } from "../pages/NotFoundPage.tsx";
import { ProductDetailPage } from "../pages/ProductDetailPage.tsx";
import { ProductListPage } from "../pages/ProductListPage.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
