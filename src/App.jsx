import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TodoProvider } from './contexts/TodoContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { TagProvider } from './contexts/TagContext';

// Composants de Layout
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';

// Composants Communs
import PrivateRoute from './components/Common/PrivateRoute';

// Pages d'Authentification
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';

// Pages Principales du Tableau de Bord
import DashboardPage from './pages/DashboardPage';
import TodosPage from './pages/TodosPage';
import CategoriesPage from './pages/CategoriesPage';
import TagsPage from './pages/TagsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import Seetings from './components/Layout/Seetings';

// Layout pour les routes privées (avec Sidebar)
const PrivateLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="wrapper">
        <div className="main-panel">
          <Header />
            <Outlet /> {/* Rend le contenu de la route enfant ici */}
          <Footer />
        </div>
        <Seetings/>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="d-flex flex-column min-vh-100">
          <div className="flex-grow-1 d-flex flex-column"> {/* Permet à ce div de prendre l'espace restant */}
            <Routes>
              {/* <Header/> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

              {/* Private Routes Grouped under PrivateLayout */}
              <Route element={<PrivateRoute />}>
                <Route element={
                  <TodoProvider>
                    <CategoryProvider>
                      <TagProvider>
                        <PrivateLayout />
                      </TagProvider>
                    </CategoryProvider>
                  </TodoProvider>
                }>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/todos" element={<TodosPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/tags" element={<TagsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
              </Route>

              {/* 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;