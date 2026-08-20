import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { invitation } from '../data/invitation';
import { BalineseCorner, BalineseDivider } from './Ornaments';
import './DigitalEnvelope.scss';

const DigitalEnvelope: React.FC = () => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const copyToClipboard = (accountNumber: string, bankName: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedBank(bankName);
    setTimeout(() => setCopiedBank(null), 3000);
  };

  return (
    <section className="section section--light envelope-section" id="gift">
      <BalineseCorner position="top-left" />
      <BalineseCorner position="top-right" />

      <div className="container">
        <div className="text-center mb-4">
          <p className="envelope-section__tag font-utility text-gold-dark">
            Tanda Kasih
          </p>
          <h2 className="envelope-section__title font-display text-charcoal">
            Amplop Digital
          </h2>
          <p className="envelope-section__desc font-body text-muted-brown">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Anda ingin memberikan tanda kasih, Anda dapat menyalurkannya melalui rekening berikut:
          </p>
          <BalineseDivider />
        </div>

        <div className="row g-4 justify-content-center">
          {invitation.giftAccounts.map((account, idx) => (
            <div className="col-12 col-md-5" key={idx}>
              <motion.div
                className="card-aesthetic envelope-card text-center"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <div className="envelope-card__badge font-utility">
                  {account.bankName}
                </div>

                <div className="envelope-card__number font-display text-charcoal">
                  {account.accountNumber}
                </div>

                <p className="envelope-card__name font-body text-muted-brown">
                  a.n {account.accountName}
                </p>

                <button
                  className="btn-balinese btn-balinese--outline-gold envelope-card__btn"
                  onClick={() => copyToClipboard(account.accountNumber, account.bankName)}
                >
                  {copiedBank === account.bankName ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      Salin No. Rekening
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalEnvelope;
