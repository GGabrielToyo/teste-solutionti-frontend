
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "../layout"
import Auth from "../pages/Auth"
import Page from "@/pages/dashboard/page";
import Profile from "@/pages/Profile";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Rota pública - Página de autenticação */}
                <Route path="/auth" element={<Auth />} />

                {/* Rota principal - Dashboard com sidebar */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Page />
                        </Layout>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Layout>
                            <Profile />
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
}
