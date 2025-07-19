import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import BookingPage from "./pages/BookingPage/BookingPage";
import TicketsPage from "./pages/TicketPage/TicketPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useTheme } from "./hooks/useTheme";

const { Content } = Layout;

const App: React.FC = () => {
  const { themeConfig } = useTheme();

  return (
    <ConfigProvider theme={themeConfig}>
      <Router>
        <Layout style={{ minHeight: "100vh", background: "#f8fafc" }}>
          <Header />
          <Content>
            <Routes>
              <Route path="/" element={<BookingPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
