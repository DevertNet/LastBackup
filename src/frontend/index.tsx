import './scss/main.scss'
import React from "react";
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router";
import { Container, Navbar } from "react-bootstrap";
import { FileEarmarkLockFill } from 'react-bootstrap-icons';
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import Privacypolicy from "./containers/Privacypolicy";
import BackupContextProvider from "./context/BackupContext";
import StoragePasswordContextProvider from "./context/StoragePasswordContext";

export default function App() {
  return (
    <BackupContextProvider>
      <StoragePasswordContextProvider>
        <Router>
          <div>
            <div className="Header">
              <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                  <Navbar.Brand as={Link} to="/">
                    <FileEarmarkLockFill />{' '}
                    LastBackup
                  </Navbar.Brand>
                </Container>
              </Navbar>
            </div>

            <Container className="page-content">
              {/*
                  A <Routes> looks through all its children <Route>
                  elements and renders the first one whose path
                  matches the current URL. Use a <Routes> any time
                  you have multiple routes, but you want only one
                  of them to render at a time
                */}
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/privacypolicy" element={<Privacypolicy />} />
              </Routes>

              <footer className="mt-4 mb-4">
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <Link className="nav-link" to="/privacypolicy">Privacy policy</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="https://www.devert.net/impressum" target="_blank" rel="noreferrer">Imprint</a>
                  </li>
                </ul>
              </footer>
            </Container>
          </div>
        </Router>
      </StoragePasswordContextProvider>
    </BackupContextProvider>
  );
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container #root not found');
}
createRoot(container).render(<App />);
