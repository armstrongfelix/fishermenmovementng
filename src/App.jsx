import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Curriculum from "./pages/Curriculum";
import Impact from "./pages/Impact";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Button from "./components/common/Button";

function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <span className="not-found__icon">
          <Compass size={32} aria-hidden="true" />
        </span>
        <p className="eyebrow">404</p>
        <h1>That page is off the map.</h1>
        <p>
          The page you are looking for does not exist. Head back home or explore
          the programme.
        </p>
        <div className="button-row">
          <Button to="/">
            <ArrowLeft size={16} aria-hidden="true" />
            Back home
          </Button>
          <Button to="/curriculum" variant="secondary">
            View curriculum
          </Button>
        </div>
        <Link to="/contact" className="text-link">
          Or contact the team
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="impact" element={<Impact />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="news" element={<News />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
