import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from "../pages/Auth"

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Router>
    );
}
