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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-20"></div>
      </div>

      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Sweepstakes
            </Link>
            
            <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Settings className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-purple-300 font-bold">CAMPAIGN GENERATOR</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Create Your Custom
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                Sweepstakes Campaign
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Configure your prize structure and generate a custom link for your sweepstakes campaign.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
                Prize Configuration
              </h2>
              
              <div className="space-y-8">
                {/* Campaign Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Campaign Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Campaign Title
                      </label>
                      <input
                        type="text"
                        value={config.title}
                        onChange={(e) => setConfig({...config, title: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
                        placeholder="Win Up To"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Button External Link (optional)
                      </label>
                      <input
                        type="url"
                        value={config.buttonLink}
                        onChange={(e) => setConfig({...config, buttonLink: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
                        placeholder="https://example.com/signup"
                      />
                      <p className="text-gray-400 text-xs mt-1">
                        Leave empty to scroll to entry form. Use full URL for external links.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prize Tiers */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Prize Tiers</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Grand Prize */}
                    <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center mb-3">
                        <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-yellow-300 font-semibold">Grand Prize</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Prize Amount ($)</label>
                          <input
                            type="number"
                            value={config.grandPrize}
                            onChange={(e) => setConfig({...config, grandPrize: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20 focus:border-yellow-400"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Number of Winners</label>
                          <input
                            type="number"
                            value={config.grandWinners}
                            onChange={(e) => setConfig({...config, grandWinners: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20 focus:border-yellow-400"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Second Prize */}
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
                      <div className="flex items-center mb-3">
                        <DollarSign className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-green-300 font-semibold">Second Prize</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Prize Amount ($)</label>
                          <input
                            type="number"
                            value={config.secondPrize}
                            onChange={(e) => setConfig({...config, secondPrize: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20 focus:border-green-400"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Number of Winners</label>
                          <input
                            type="number"
                            value={config.secondWinners}
                            onChange={(e) => setConfig({...config, secondWinners: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20 focus:border-green-400"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Third Prize */}
                    <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-lg p-4 border border-purple-500/30">
                      <div className="flex items-center mb-3">
                        <Gift className="w-5 h-5 text-purple-400 mr-2" />
                        <span className="text-purple-300 font-semibold">Third Prize</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Prize Amount ($)</label>
                          <input
                            type="number"
                            value={config.thirdPrize}
                            onChange={(e) => setConfig({...config, thirdPrize: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20 focus:border-purple-400"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Number of Winners</label>
                          <input
                            type="number"
                            value={config.thirdWinners}
                            onChange={(e) => setConfig({...config, thirdWinners: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20 focus:border-purple-400"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Runner-up Prize */}
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-500/30">
                      <div className="flex items-center mb-3">
                        <DollarSign className="w-5 h-5 text-blue-400 mr-2" />
                        <span className="text-blue-300 font-semibold">Runner-up</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Prize Amount ($)</label>
                          <input
                            type="number"
                            value={config.runnerUpPrize}
                            onChange={(e) => setConfig({...config, runnerUpPrize: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20 focus:border-blue-400"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Number of Winners</label>
                          <input
                            type="number"
                            value={config.runnerUpWinners}
                            onChange={(e) => setConfig({...config, runnerUpWinners: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20 focus:border-blue-400"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview & Generate */}
            <div className="space-y-8">
              {/* Prize Summary */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-green-400" />
                  Campaign Summary
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 text-center border border-green-500/30">
                    <div className="text-2xl font-black text-white mb-1">
                      ${totalPrizePool.toLocaleString()}
                    </div>
                    <div className="text-green-300 text-sm font-semibold">Total Prize Pool</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 text-center border border-blue-500/30">
                    <div className="text-2xl font-black text-white mb-1">{totalWinners}</div>
                    <div className="text-blue-300 text-sm font-semibold">Total Winners</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {config.grandPrize > 0 && config.grandWinners > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-300">Grand Prize</span>
                      <span className="text-white font-semibold">
                        {config.grandWinners}x ${config.grandPrize.toLocaleString()} = ${(config.grandPrize * config.grandWinners).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {config.secondPrize > 0 && config.secondWinners > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-300">Second Prize</span>
                      <span className="text-white font-semibold">
                        {config.secondWinners}x ${config.secondPrize.toLocaleString()} = ${(config.secondPrize * config.secondWinners).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {config.thirdPrize > 0 && config.thirdWinners > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-300">Third Prize</span>
                      <span className="text-white font-semibold">
                        {config.thirdWinners}x ${config.thirdPrize.toLocaleString()} = ${(config.thirdPrize * config.thirdWinners).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {config.runnerUpPrize > 0 && config.runnerUpWinners > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-300">Runner-up</span>
                      <span className="text-white font-semibold">
                        {config.runnerUpWinners}x ${config.runnerUpPrize.toLocaleString()} = ${(config.runnerUpPrize * config.runnerUpWinners).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Generated URL */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <ExternalLink className="w-6 h-6 mr-3 text-purple-400" />
                  Generated Campaign URL
                </h2>
                
                <div className="bg-gray-900/50 rounded-lg p-4 mb-6 border border-gray-600/30">
                  <code className="text-green-400 text-sm break-all font-mono">
                    {generateUrl()}
                  </code>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 group relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-400 hover:via-pink-400 hover:to-red-400 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <span className="flex items-center justify-center">
                      {copied ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5 mr-2" />
                          Copy URL
                        </>
                      )}
                    </span>
                  </button>
                  
                  <a
                    href={generateUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 group border-2 border-white/50 text-white hover:bg-white hover:text-purple-900 font-bold py-4 px-6 rounded-lg transition-all duration-300 text-center backdrop-blur-sm hover:backdrop-blur-none"
                  >
                    <span className="flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Preview Campaign
                    </span>
                  </a>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                  <p className="text-yellow-300 text-sm">
                    <strong>💡 Pro Tip:</strong> Share this URL to launch your custom sweepstakes campaign. 
                    All prize amounts and winner counts will be automatically updated throughout the landing page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratorPage;