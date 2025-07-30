
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "../layout"
import Auth from "../pages/Auth"
import Page from "@/pages/dashboard/page";
import Profile from "@/pages/Profile";
import { ProtectedRoute } from "./ProtectedRoute";

function PrivateRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Page />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Layout>
    )
}

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth />} />

                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <PrivateRoutes />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}
