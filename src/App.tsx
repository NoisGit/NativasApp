import { HashRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './presentation/layouts/SiteLayout'
import { HomePage } from './presentation/pages/HomePage'
import { ApplicationPage } from './presentation/pages/ApplicationPage'
import { PrivacyPage } from './presentation/pages/PrivacyPage'
import { NotFoundPage } from './presentation/pages/NotFoundPage'
import { ScrollToTop } from './presentation/components/ScrollToTop'

export function App () {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/postular' element={<ApplicationPage />} />
          <Route path='/privacidad' element={<PrivacyPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
