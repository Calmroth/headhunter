import { contactsFor } from '../data/contacts';
import type { Firm } from '../data/firms';
import { monogram } from '../utils/monogram';
import { websiteFor, displayHost } from '../data/websites';
import './FirmPopup.css';

type Role = { id: string; title: string; discipline: string; seniority: string };

type Props = {
  firm: Firm;
  roleCount: number;
  jobs?: ReadonlyArray<Role>;
};

export function FirmPopup({ firm, roleCount, jobs }: Props) {
  const contacts = contactsFor(firm.id);
  const website = websiteFor(firm.id);
  const visibleJobs = jobs ?? [];
  return (
    <div className="firm-popup">
      <header className="firm-popup-head">
        <span className="firm-popup-mark serif" aria-hidden="true">
          {monogram(firm.name)}
        </span>
        <div className="firm-popup-headtext">
          <span className="firm-popup-name serif">{firm.name}</span>
          <span className="firm-popup-meta mono">
            {firm.city.toUpperCase()} · {firm.country.toUpperCase()} · {roleCount}{' '}
            {roleCount === 1 ? 'ROLE' : 'ROLES'}
          </span>
          {website && (
            <a
              className="firm-popup-website"
              href={website}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
            >
              {displayHost(website)}
              <svg
                aria-hidden="true"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7 7 3" />
                <path d="M4 3h3v3" />
              </svg>
            </a>
          )}
        </div>
      </header>

      <div className="firm-popup-divider" />

      {visibleJobs.length > 0 && (
        <>
          <section className="firm-popup-section">
            <h3 className="mono firm-popup-section-label">
              Open roles · {visibleJobs.length}
            </h3>
            <ul className="firm-popup-roles">
              {visibleJobs.slice(0, 6).map((j) => (
                <li key={j.id} className="firm-popup-role">
                  <span className="firm-popup-role-title serif">{j.title}</span>
                  <span className="firm-popup-role-meta mono">
                    {j.seniority.toUpperCase()} · {j.discipline.toUpperCase()}
                  </span>
                </li>
              ))}
              {visibleJobs.length > 6 && (
                <li className="firm-popup-role-more mono">
                  +{visibleJobs.length - 6} more open
                </li>
              )}
            </ul>
          </section>
          <div className="firm-popup-divider" />
        </>
      )}

      <section className="firm-popup-section">
        <h3 className="mono firm-popup-section-label">Design &amp; Talent</h3>

        {contacts.length > 0 ? (
          <ul className="firm-popup-contacts">
            {contacts.map((c, i) => (
              <li key={`${c.name}-${i}`} className="firm-popup-contact">
                <span className="firm-popup-contact-name serif">{c.name}</span>
                <span className="firm-popup-contact-role mono">{c.role.toUpperCase()}</span>
                {c.email && (
                  <a
                    className="firm-popup-contact-email"
                    href={`mailto:${c.email}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {c.email}
                  </a>
                )}
                {c.linkedin && (
                  <a
                    className="firm-popup-contact-linkedin mono"
                    href={c.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={(e) => e.stopPropagation()}
                  >
                    LinkedIn
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="firm-popup-empty">
            No contact indexed yet. The <span className="mono">contact-researcher</span> agent will
            surface one here once it runs against this firm.
          </p>
        )}
      </section>
    </div>
  );
}
