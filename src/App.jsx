import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import AppShell from './components/layout/AppShell';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import RelationsPage from './pages/RelationsPage';
import TimePage from './pages/TimePage';
import ProfilePage from './pages/ProfilePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppRoutes() {
  const { isOnboarded } = useUser();

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  return (
    <Routes>
      <Route element={<><ScrollToTop /><AppShell /></>}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/relations" element={<RelationsPage />} />
        <Route path="/time" element={<TimePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </HashRouter>
  );
}
