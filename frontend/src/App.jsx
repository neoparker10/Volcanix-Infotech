import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public pages
import HomePage      from './pages/HomePage';
import ServicesPage  from './pages/ServicesPage';
import AboutPage     from './pages/AboutPage';
import ContactPage   from './pages/ContactPage';
import BlogPage      from './pages/BlogPage';
import BlogPostPage  from './pages/BlogPostPage';
import NotFoundPage  from './pages/NotFoundPage';

// Admin pages
import AdminLoginPage  from './pages/admin/AdminLoginPage';
import AdminLayout     from './pages/admin/AdminLayout';
import AdminDashboard  from './pages/admin/AdminDashboard';
import AdminMessages   from './pages/admin/AdminMessages';
import AdminPosts      from './pages/admin/AdminPosts';
import AdminPostEditor from './pages/admin/AdminPostEditor';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              borderRadius: '0px',
              background: '#1A1A2E',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            success: { iconTheme: { primary: '#00C9C8', secondary: '#1A1A2E' } },
            error:   { iconTheme: { primary: '#ff6b6b', secondary: '#1A1A2E' } },
          }}
        />

        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/"          element={<HomePage />} />
            <Route path="/services"  element={<ServicesPage />} />
            <Route path="/about"     element={<AboutPage />} />
            <Route path="/contact"   element={<ContactPage />} />
            <Route path="/blog"      element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Route>

          {/* Admin */}
          <Route path="/x-admin" element={<AdminLoginPage />} />
          <Route
            path="/x-admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard"        element={<AdminDashboard />} />
            <Route path="messages"         element={<AdminMessages />} />
            <Route path="posts"            element={<AdminPosts />} />
            <Route path="posts/new"        element={<AdminPostEditor />} />
            <Route path="posts/:id/edit"   element={<AdminPostEditor />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
