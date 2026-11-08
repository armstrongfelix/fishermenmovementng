import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { LuArrowLeft, LuCompass } from "react-icons/lu";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Curriculum from "./pages/Curriculum";
import Impact from "./pages/Impact";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Button from "./components/common/Button";
import Container from "./components/common/Container";
import Eyebrow from "./components/common/Eyebrow";

function NotFound() {
  return (
    <section className="flex min-h-[62vh] items-center justify-center py-[90px]">
      <Container className="flex justify-center">
        <div className="flex max-w-[560px] flex-col items-center text-center">
          <span className="mb-[18px] inline-flex h-[68px] w-[68px] items-center justify-center rounded-[20px] bg-primary/[0.08] text-primary">
            <LuCompass size={32} aria-hidden="true" />
          </span>
          <Eyebrow className="mb-2">404</Eyebrow>
          <h1 className="text-[clamp(2rem,4vw,2.9rem)]">
            That page is off the map.
          </h1>
          <p className="mb-6 mt-3 text-sm leading-[1.7] text-muted">
            The page you are looking for does not exist. Head back home or explore
            the programme.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/">
              <LuArrowLeft size={16} aria-hidden="true" />
              Back home
            </Button>
            <Button to="/curriculum" variant="secondary">
              View curriculum
            </Button>
          </div>
          <Link
            to="/contact"
            className="mt-[18px] inline-flex items-center gap-[7px] text-[13.5px] font-bold text-primary hover:text-primary-dark"
          >
            Or contact the team
          </Link>
        </div>
      </Container>
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
