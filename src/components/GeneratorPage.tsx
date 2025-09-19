import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, ArrowLeft, Settings, DollarSign, Trophy, Gift, ExternalLink } from 'lucide-react';

function GeneratorPage() {
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    grandPrize: 750,
    secondPrize: 250,
    thirdPrize: 100,
    runnerUpPrize: 50,
    grandWinners: 1,
    secondWinners: 3,
    thirdWinners: 10,
    runnerUpWinners: 20,
    buttonLink: '',
    title: 'Win Up To'
  });

  const generateUrl = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    
    Object.entries(config).forEach(([key, value]) => {
      if (value !== '' && value !== 0) {
        params.append(key, value.toString());
      }
    });
    
    return `${baseUrl}/?${params.toString()}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const totalPrizePool = (
    config.grandPrize * config.grandWinners +
    config.secondPrize * config.secondWinners +
    config.thirdPrize * config.thirdWinners +
    config.runnerUpPrize * config.runnerUpWinners
  );

  const totalWinners = config.grandWinners + config.secondWinners + config.thirdWinners + config.runnerUpWinners;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#222' }}>
      <header style={{ marginBottom: 30 }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#0073aa', display: 'inline-flex', alignItems: 'center', marginBottom: 20 }}>
          <ArrowLeft style={{ marginRight: 6 }} />
          Back to Sweepstakes
        </Link>
        <h1 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10 }}>
          Create Your Custom Sweepstakes Campaign
        </h1>
        <p style={{ fontSize: 16, color: '#555' }}>
          Configure your prize structure and generate a custom link for your sweepstakes campaign.
        </p>
      </header>

      <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
        {/* Configuration Panel */}
        <section style={{ flex: '1 1 400px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: 4, padding: 20 }}>
          <h2 style={{ marginBottom: 20, fontSize: 20, borderBottom: '1px solid #ddd', paddingBottom: 6 }}>
            <Settings style={{ verticalAlign: 'middle', marginRight: 6 }} />
            Prize Configuration
          </h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: 6 }}>Campaign Title</label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => setConfig({...config, title: e.target.value})}
              placeholder="Win Up To"
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: 16,
                border: '1px solid #ccc',
                borderRadius: 3,
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: 30 }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: 6 }}>Button External Link (optional)</label>
            <input
              type="url"
              value={config.buttonLink}
              onChange={(e) => setConfig({...config, buttonLink: e.target.value})}
              placeholder="https://example.com/signup"
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: 16,
                border: '1px solid #ccc',
                borderRadius: 3,
                boxSizing: 'border-box'
              }}
            />
            <small style={{ color: '#666', fontSize: 12 }}>
              Leave empty to scroll to entry form. Use full URL for external links.
            </small>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>Prize Tiers</h3>

          {/* Prize Tier Inputs */}
          {[
            { label: 'Grand Prize', prizeKey: 'grandPrize', winnersKey: 'grandWinners', icon: <Trophy size={16} color="#f5a623" /> },
            { label: 'Second Prize', prizeKey: 'secondPrize', winnersKey: 'secondWinners', icon: <DollarSign size={16} color="#46b450" /> },
            { label: 'Third Prize', prizeKey: 'thirdPrize', winnersKey: 'thirdWinners', icon: <Gift size={16} color="#6b5b95" /> },
            { label: 'Runner-up', prizeKey: 'runnerUpPrize', winnersKey: 'runnerUpWinners', icon: <DollarSign size={16} color="#4a90e2" /> },
          ].map(({ label, prizeKey, winnersKey, icon }) => (
            <div key={label} style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: '600', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                {icon}
                {label}
              </label>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    min="0"
                    value={config[prizeKey]}
                    onChange={(e) => setConfig({ ...config, [prizeKey]: parseInt(e.target.value) || 0 })}
                    placeholder="Prize Amount ($)"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: 16,
                      border: '1px solid #ccc',
                      borderRadius: 3,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    min="0"
                    value={config[winnersKey]}
                    onChange={(e) => setConfig({ ...config, [winnersKey]: parseInt(e.target.value) || 0 })}
                    placeholder="Number of Winners"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: 16,
                      border: '1px solid #ccc',
                      borderRadius: 3,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Preview & Generate */}
        <section style={{ flex: '1 1 400px' }}>
          <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: 4, padding: 20, marginBottom: 30 }}>
            <h2 style={{ fontSize: 20, fontWeight: '600', marginBottom: 20 }}>
              <DollarSign style={{ verticalAlign: 'middle', marginRight: 6, color: '#46b450' }} />
              Campaign Summary
            </h2>

            <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
              <div style={{ flex: 1, backgroundColor: '#e6f4ea', border: '1px solid #b2d8a7', borderRadius: 3, padding: 15, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: '700', marginBottom: 4 }}>
                  ${totalPrizePool.toLocaleString()}
                </div>
                <div style={{ color: '#4b8b3b', fontWeight: '600', fontSize: 14 }}>
                  Total Prize Pool
                </div>
              </div>
              <div style={{ flex: 1, backgroundColor: '#e8f0fe', border: '1px solid #a3c0f9', borderRadius: 3, padding: 15, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: '700', marginBottom: 4 }}>
                  {totalWinners}
                </div>
                <div style={{ color: '#3b6fc3', fontWeight: '600', fontSize: 14 }}>
                  Total Winners
                </div>
              </div>
            </div>

            {/* Prize breakdown */}
            <div>
              {config.grandPrize > 0 && config.grandWinners > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #ddd' }}>
                  <span>Grand Prize</span>
                  <span style={{ fontWeight: '600' }}>
                    {config.grandWinners} x ${config.grandPrize.toLocaleString()} = ${(config.grandPrize * config.grandWinners).toLocaleString()}
                  </span>
                </div>
              )}
              {config.secondPrize > 0 && config.secondWinners > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #ddd' }}>
                  <span>Second Prize</span>
                  <span style={{ fontWeight: '600' }}>
                    {config.secondWinners} x ${config.secondPrize.toLocaleString()} = ${(config.secondPrize * config.secondWinners).toLocaleString()}
                  </span>
                </div>
              )}
              {config.thirdPrize > 0 && config.thirdWinners > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #ddd' }}>
                  <span>Third Prize</span>
                  <span style={{ fontWeight: '600' }}>
                    {config.thirdWinners} x ${config.thirdPrize.toLocaleString()} = ${(config.thirdPrize * config.thirdWinners).toLocaleString()}
                  </span>
                </div>
              )}
              {config.runnerUpPrize > 0 && config.runnerUpWinners > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span>Runner-up</span>
                  <span style={{ fontWeight: '600' }}>
                    {config.runnerUpWinners} x ${config.runnerUpPrize.toLocaleString()} = ${(config.runnerUpPrize * config.runnerUpWinners).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* URL Generator */}
          <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: 4, padding: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: '600', marginBottom: 20 }}>
              <ExternalLink style={{ verticalAlign: 'middle', marginRight: 6, color: '#666' }} />
              Generated Campaign URL
            </h2>

            <textarea
              readOnly
              value={generateUrl()}
              style={{
                width: '100%',
                height: 80,
                padding: 10,
                fontSize: 14,
                fontFamily: 'monospace',
                border: '1px solid #ccc',
                borderRadius: 3,
                marginBottom: 15,
                resize: 'none',
                backgroundColor: '#fff',
                color: '#333'
              }}
            />

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={copyToClipboard}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  backgroundColor: copied ? '#46b450' : '#0073aa',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 3,
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: 16,
                  transition: 'background-color 0.3s ease'
                }}
              >
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <a
                href={generateUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  textDecoration: 'none',
                  backgroundColor: '#eee',
                  color: '#333',
                  border: '1px solid #ccc',
                  borderRadius: 3,
                  fontWeight: '600',
                  fontSize: 16,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer'
                }}
              >
                Preview Campaign
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default GeneratorPage;
