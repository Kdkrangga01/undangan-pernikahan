import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGuestNameFromUrl, setGuestNameInUrl } from '../hooks/useGuestName';
import { invitation } from '../data/invitation';
import { BalineseDivider } from './Ornaments';
import './OwnerPanel.scss';

const DEFAULT_PIN = 'dhici2002';
const AUTH_STORAGE_KEY = 'undangan_owner_auth_token_dhici2002';

type MessageTemplateType = 'bali' | 'formal';

interface OwnerPanelProps {
  gateOpen?: boolean;
}

export const OwnerPanel: React.FC<OwnerPanelProps> = ({ gateOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Single Guest Form State
  const [guestNameInput, setGuestNameInput] = useState('');
  const [customLinkInput, setCustomLinkInput] = useState('');
  const [templateType, setTemplateType] = useState<MessageTemplateType>('bali');
  const [copyFeedback, setCopyFeedback] = useState<'message' | null>(null);

  // Base URL calculation (strips ?to, ?owner, etc.)
  const getBaseInvitationUrl = () => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.href);
    url.searchParams.delete('to');
    url.searchParams.delete('guest');
    url.searchParams.delete('owner');
    url.searchParams.delete('admin');
    url.hash = '';
    return url.origin + url.pathname;
  };

  // Generate URL for specific guest name
  const generateGuestUrl = (name: string) => {
    const baseUrl = getBaseInvitationUrl();
    const trimmed = name.trim();
    if (!trimmed || trimmed === 'Bapak/Ibu/Saudara/i') {
      return baseUrl;
    }
    return `${baseUrl}?to=${encodeURIComponent(trimmed)}`;
  };

  // Check URL params on load (?owner or ?admin) & remember auth
  useEffect(() => {
    const isAuthed = sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    if (isAuthed) {
      setIsAuthenticated(true);
    }

    const params = new URLSearchParams(window.location.search);
    if (params.has('owner') || params.has('admin') || window.location.hash === '#owner') {
      setIsOpen(true);
    }

    // Set initial input from current URL
    const currentName = getGuestNameFromUrl();
    const initialName = currentName && currentName !== 'Bapak/Ibu/Saudara/i' ? currentName : '';
    setGuestNameInput(initialName);
    setCustomLinkInput(generateGuestUrl(initialName));
  }, []);

  // Update link when guest name input changes
  const handleNameChange = (newName: string) => {
    setGuestNameInput(newName);
    setCustomLinkInput(generateGuestUrl(newName));
  };

  // Update guest name when link input is manually edited
  const handleLinkChange = (newLink: string) => {
    setCustomLinkInput(newLink);
    try {
      const parsedUrl = new URL(newLink);
      const toParam = parsedUrl.searchParams.get('to') || parsedUrl.searchParams.get('guest');
      if (toParam && toParam.trim()) {
        setGuestNameInput(decodeURIComponent(toParam.trim()));
      }
    } catch {
      // User is in the middle of typing an incomplete URL, ignore parse error
    }
  };

  // Handle PIN/Password verification
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } else {
      setPinError(true);
    }
  };

  // Logout / Relock
  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPinInput('');
  };

  // Generate WhatsApp text based on template
  const generateWhatsAppMessage = () => {
    const activeUrl = customLinkInput.trim() || generateGuestUrl(guestNameInput);
    const targetName = guestNameInput.trim() || 'Bapak/Ibu/Saudara/i';
    const groomNick = invitation.groom.nickname;
    const brideNick = invitation.bride.nickname;
    const groomFull = invitation.groom.fullName;
    const brideFull = invitation.bride.fullName;

    const r1 = invitation.events[0];
    const r2 = invitation.events[1];

    if (templateType === 'bali') {
      return `Kepada Yth.
*${targetName}*

Om Swastyastu 🙏

Tanpa mengurangi rasa hormat, karena keterbatasan jarak dan waktu, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri Upacara Manusa Yadnya Pawiwahan (Resepsi Pernikahan) kami:

*${groomFull}*
&
*${brideFull}*

Yang akan diselenggarakan pada:

*Resepsi 1*
Hari/Tanggal : ${r1.dayName}, ${r1.date}
Waktu : ${r1.time}
Tempat : ${r1.address}

*Resepsi 2*
Hari/Tanggal : ${r2.dayName}, ${r2.date}
Waktu : ${r2.time}
Tempat : ${r2.address}

Berikut link undangan kami untuk info lengkap acara:
👉 ${activeUrl}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Kami yang berbahagia,
*(${groomNick} & ${brideNick})*

Om Shanti, Shanti, Shanti, Om.`;
    }

    // Formal template
    return `Kepada Yth.
*${targetName}*

Salam Sejahtera,

Tanpa mengurangi rasa hormat, karena keterbatasan jarak dan waktu, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri Resepsi Pernikahan kami:

*${groomFull}*
&
*${brideFull}*

Yang akan diselenggarakan pada:

*Resepsi 1*
Hari/Tanggal : ${r1.dayName}, ${r1.date}
Waktu : ${r1.time}
Tempat : ${r1.address}

*Resepsi 2*
Hari/Tanggal : ${r2.dayName}, ${r2.date}
Waktu : ${r2.time}
Tempat : ${r2.address}

Berikut link undangan kami untuk informasi lengkap acara:
👉 ${activeUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu.

Kami yang berbahagia,
*(${groomNick} & ${brideNick})*`;
  };

  // Copy helper with feedback
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback('message');
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  // Direct WhatsApp sender
  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  // Apply instantly on the web page & close modal
  const handleApplyToWeb = () => {
    const target = guestNameInput.trim() || 'Bapak/Ibu/Saudara/i';
    setGuestNameInUrl(target);
    setIsOpen(false);
  };

  return (
    <>
      {/* Discrete Floating Owner Button — ONLY visible on Front Cover Screen */}
      <AnimatePresence>
        {!gateOpen && (
          <motion.button
            className="owner-floating-trigger"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Akses Khusus Pengantin (Edit Nama Undangan & Link WA)"
            aria-label="Akses Owner"
          >
            <span className="owner-floating-trigger__icon">👑</span>
            <span className="owner-floating-trigger__label">Akses Pengantin</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Owner Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="owner-modal-overlay" onClick={() => setIsOpen(false)}>
            <motion.div
              className="owner-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Modal Header */}
              <div className="owner-modal-header">
                <div className="owner-modal-header__title-group">
                  <div className="owner-modal-header__badge">
                    <span>👑 AKSES OWNER / PENGANTIN</span>
                  </div>
                  <h2 className="owner-modal-header__title font-display">
                    Kelola Nama Undangan & Kirim WhatsApp
                  </h2>
                </div>
                <div className="owner-modal-header__actions">
                  {isAuthenticated && (
                    <button
                      className="owner-modal-lock-btn"
                      onClick={handleLogout}
                      title="Kunci / Keluar dari Akses Owner"
                    >
                      🔒 Kunci
                    </button>
                  )}
                  <button
                    className="owner-modal-close-btn"
                    onClick={() => setIsOpen(false)}
                    aria-label="Tutup"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <BalineseDivider className="owner-modal-divider" />

              {/* Security Screen if not yet authenticated */}
              {!isAuthenticated ? (
                <div className="owner-auth-box">
                  <div className="owner-auth-box__icon">🔒</div>
                  <h3 className="font-display">Password Akses Pengantin</h3>
                  <p className="owner-auth-box__desc font-body">
                    Halaman ini dikhususkan bagi mempelai dan keluarga untuk mengelola nama tamu dan membuat link undangan WhatsApp.
                  </p>

                  <form onSubmit={handlePinSubmit} className="owner-auth-form">
                    <div className="owner-password-wrapper">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        maxLength={40}
                        value={pinInput}
                        onChange={(e) => {
                          setPinInput(e.target.value);
                          setPinError(false);
                        }}
                        placeholder="Masukkan password..."
                        className={`owner-input ${pinError ? 'owner-input--error' : ''}`}
                        autoFocus
                      />
                      <button
                        type="button"
                        className="owner-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {pinError && (
                      <p className="owner-auth-error">Password salah! Silakan periksa kembali.</p>
                    )}
                    <button type="submit" className="owner-btn-primary">
                      Masuk ke Panel Pengantin
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated Owner Form */
                <div className="owner-dashboard">
                  <div className="owner-tab-pane">
                    {/* Input Nama Tamu */}
                    <div className="owner-form-group">
                      <label className="owner-label">
                        Nama Tamu / Gelar yang Dituju: <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        className="owner-input"
                        placeholder="Contoh: Bpk. Made Wijaya & Keluarga / Rizky Cipta"
                        value={guestNameInput}
                        onChange={(e) => handleNameChange(e.target.value)}
                      />
                      <span className="owner-input-hint">
                        Nama ini otomatis tampil di Cover: <em>"Kepada Yth. {guestNameInput || 'Bapak/Ibu/Saudara/i'}"</em>
                      </span>
                    </div>

                    {/* Editable Link Undangan */}
                    <div className="owner-form-group">
                      <label className="owner-label">
                        🔗 Link Undangan Personal (Bisa Diedit):
                      </label>
                      <input
                        type="text"
                        className="owner-input owner-input--url"
                        value={customLinkInput}
                        onChange={(e) => handleLinkChange(e.target.value)}
                        placeholder="https://..."
                      />
                      <span className="owner-input-hint">
                        Link ini otomatis terpasang di dalam pesan WhatsApp di bawah.
                      </span>
                    </div>

                    {/* Pilihan Gaya Bahasa WA */}
                    <div className="owner-form-group">
                      <label className="owner-label">Gaya Bahasa Pesan WA:</label>
                      <select
                        className="owner-select"
                        value={templateType}
                        onChange={(e) => setTemplateType(e.target.value as MessageTemplateType)}
                      >
                        <option value="bali">🌺 Adat Bali & Sopan (Om Swastiastu)</option>
                        <option value="formal">✨ Bahasa Indonesia Formal / Sopan</option>
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="owner-actions-grid owner-actions-grid--compact">
                      <button
                        className="owner-btn-secondary"
                        onClick={() => handleCopyText(generateWhatsAppMessage())}
                      >
                        {copyFeedback === 'message' ? '✅ Pesan Disalin!' : '💬 Salin Teks Chat WA'}
                      </button>

                      <button
                        className="owner-btn-wa"
                        onClick={handleSendWhatsApp}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.838.78 2.796.78h.005c3.18 0 5.767-2.587 5.768-5.766.001-3.182-2.585-5.766-5.773-5.766zm6.208 8.163c-.15.421-.869.805-1.21.85-.341.045-.776.082-2.222-.519-1.849-.769-3.037-2.652-3.13-2.775-.093-.124-.75-1.002-.75-1.91 0-.909.475-1.357.644-1.543.169-.187.37-.234.494-.234.124 0 .248.001.356.007.114.006.267-.043.418.32.155.372.532 1.299.578 1.393.047.093.078.203.016.327-.063.125-.094.203-.187.312-.093.11-.196.246-.28.33-.093.093-.19.195-.082.38.109.186.484.799 1.039 1.292.714.636 1.317.834 1.503.926.186.094.295.078.404-.047.11-.124.467-.544.591-.73.124-.187.249-.156.419-.093.17.062 1.077.508 1.263.601.186.094.31.141.356.219.047.078.047.452-.103.873z" />
                        </svg>
                        Kirim via WhatsApp
                      </button>

                      <button
                        className="owner-btn-primary"
                        style={{ gridColumn: 'span 2' }}
                        onClick={handleApplyToWeb}
                      >
                        👁️ Terapkan & Buka di Web Sekarang
                      </button>
                    </div>

                    {/* WhatsApp Preview Accordion */}
                    <details className="owner-preview-accordion" open>
                      <summary className="owner-preview-summary">
                        🔍 Pratinjau Pesan WhatsApp yang Akan Dikirim:
                      </summary>
                      <pre className="owner-preview-box">
                        {generateWhatsAppMessage()}
                      </pre>
                    </details>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OwnerPanel;
