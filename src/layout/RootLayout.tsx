import { Outlet } from "react-router";
import { Header } from "../components/layout/Header.tsx";

export function RootLayout() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
}
