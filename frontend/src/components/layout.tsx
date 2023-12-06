import React from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar"; // Sidebar コンポーネントをインポート

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>
        <Sidebar />
        {children}
      </main>
    </div>
  );
}
