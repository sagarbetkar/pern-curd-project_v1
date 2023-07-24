import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./components/Categories";
import Home from "./components/Home";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
      </BrowserRouter>
    )
}