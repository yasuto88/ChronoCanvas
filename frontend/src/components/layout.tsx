import React from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar"; // Sidebar コンポーネントをインポート
import Dial from "./Dial/Dial";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <main>
        <Header />
        <Dial />
        {children}
      </main>
    </div>
  );
}
