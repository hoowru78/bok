import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AccessibilityProvider } from './hooks/useAccessibility'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import UserInfoPage from './pages/UserInfoPage'
import SurveyPage from './pages/SurveyPage'
import RecommendationsPage from './pages/RecommendationsPage'
import WelfareDetailPage from './pages/WelfareDetailPage'
import HelpPage from './pages/HelpPage'
import AccessibilityPage from './pages/AccessibilityPage'
import PrivacyPage from './pages/PrivacyPage'

function App() {
  return (
    <AccessibilityProvider>
      <div className="App min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user-info" element={<UserInfoPage />} />
            <Route path="/survey/*" element={<SurveyPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/recommendations/:id" element={<WelfareDetailPage />} />
            <Route path="/help/*" element={<HelpPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AccessibilityProvider>
  )
}

export default App