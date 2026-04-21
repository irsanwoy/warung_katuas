import { HelmetProvider, Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { contact } from './data/contact';
import { schedule } from './data/schedule';

// Public Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Keunggulan from './components/Keunggulan';
import Menu from './components/Menu';
import Lokasi from './components/Lokasi';
import JamBuka from './components/JamBuka';
import Galeri from './components/Galeri';
import Kontak from './components/Kontak';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import CartIcon from './components/CartIcon';
import CartDrawer from './components/CartDrawer';

// Admin Components
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Settings from './pages/admin/Settings';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://warunkkatuas.com',
  name: contact.businessName,
  description: contact.tagline,
  url: 'https://warunkkatuas.com',
  telephone: `+${contact.whatsapp}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address,
    addressCountry: 'ID',
  },
  openingHours: `Mo-Su ${schedule.openTime}-${schedule.closeTime}`,
  sameAs: [contact.instagram, `https://wa.me/${contact.whatsapp}`],
  servesCuisine: 'Indonesian',
  priceRange: 'Rp2.000 - Rp18.000',
};

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Keunggulan />
        <Menu />
        <Lokasi />
        <JamBuka />
        <Galeri />
        <Kontak />
      </main>
      <CartIcon />
      <CartDrawer />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Warunk Katuas — Angkringan Hangat, Harga Bersahabat</title>
        <meta
          name="description"
          content="Warunk Katuas — Angkringan dengan menu lengkap: nasi bakar, sate, kopi, dan lainnya. Harga mulai Rp2.000. Buka setiap hari pukul 17:00–00:00."
        />
        <meta
          property="og:title"
          content="Warunk Katuas — Angkringan Hangat, Harga Bersahabat"
        />
        <meta
          property="og:description"
          content="Tempat nongkrong asik dengan menu angkringan lengkap dan harga ramah di kantong. Yuk mampir!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://warunkkatuas.com" />
        <meta property="og:locale" content="id_ID" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Warunk Katuas — Angkringan Hangat, Harga Bersahabat"
        />
        <meta
          name="twitter:description"
          content="Tempat nongkrong asik dengan menu angkringan lengkap dan harga ramah di kantong."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Route */}
              <Route path="/" element={<PublicLayout />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
