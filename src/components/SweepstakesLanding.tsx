import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Star, Users, Clock, CheckCircle, Gift, DollarSign, Wallet, Smartphone, Trophy, Zap, Shield, TrendingUp } from 'lucide-react';

interface PrizeConfig {
  grandPrize: number;
  secondPrize: number;
  thirdPrize: number;
  runnerUpPrize: number;
  grandWinners: number;
  secondWinners: number;
  thirdWinners: number;
  runnerUpWinners: number;
}

function SweepstakesLanding() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  // Get URL parameters with defaults
  const prizeConfig: PrizeConfig = {
    grandPrize: parseInt(searchParams.get('grandPrize') || '750'),
    secondPrize: parseInt(searchParams.get('secondPrize') || '250'),
    thirdPrize: parseInt(searchParams.get('thirdPrize') || '100'),
    runnerUpPrize: parseInt(searchParams.get('runnerUpPrize') || '50'),
    grandWinners: parseInt(searchParams.get('grandWinners') || '1'),
    secondWinners: parseInt(searchParams.get('secondWinners') || '3'),
    thirdWinners: parseInt(searchParams.get('thirdWinners') || '10'),
    runnerUpWinners: parseInt(searchParams.get('runnerUpWinners') || '20'),
  };

  const buttonLink = searchParams.get('buttonLink') || '#entry-form';
  const customTitle = searchParams.get('title') || 'Win Up To';

  // Calculate total prize pool
  const totalPrizePool = (
    prizeConfig.grandPrize * prizeConfig.grandWinners +
    prizeConfig.secondPrize * prizeConfig.secondWinners +
    prizeConfig.thirdPrize * prizeConfig.thirdWinners +
    prizeConfig.runnerUpPrize * prizeConfig.runnerUpWinners
  );

  const totalWinners = prizeConfig.grandWinners + prizeConfig.secondWinners + prizeConfig.thirdWinners + prizeConfig.runnerUpWinners;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setIsSubmitted(true);
    }
  };

  const handleButtonClick = () => {
    if (buttonLink.startsWith('http') || buttonLink.startsWith('https')) {
      window.open(buttonLink, '_blank');
    } else {
      document.getElementById(buttonLink.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToForm = () => {
    document.getElementById('entry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-20"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-25"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background with Multiple Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/60 to-indigo-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
        
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 animate-float delay-1000">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-sm"></div>
          </div>
          <div className="absolute top-40 right-20 animate-float delay-2000">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-15 blur-sm"></div>
          </div>
          <div className="absolute bottom-20 left-1/4 animate-float delay-3000">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-25 blur-sm"></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Hero Mobile Finance App Image */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-30 scale-150"></div>
              <div className="relative animate-float">
                <img 
                  src="/finance-app-3d-icon-png-download-12624036.png" 
                  alt="Digital Finance Prize" 
                  className="w-32 h-32 md:w-48 md:h-48 hover:scale-110 transition-all duration-500 drop-shadow-2xl"
                />
              </div>
              {/* Floating Elements Around Main Image */}
              <div className="absolute -top-4 -right-4 animate-bounce delay-500">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 animate-bounce delay-1000">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Trophy className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full px-6 py-2 mb-6">
              <Zap className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-yellow-300 font-semibold">Limited Time Offer</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight">
            {customTitle}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse">
              ${prizeConfig.grandPrize.toLocaleString()}
            </span>
            <br />
            <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Cash Prize!
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-100 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4">
            Join our <span className="font-bold text-yellow-400">exclusive digital sweepstakes</span> for a chance to win 
            life-changing cash prizes delivered straight to your mobile wallet.
            <br />
            <span className="text-base md:text-lg text-gray-300 mt-2 md:mt-4 block">
              🎯 No purchase necessary • 📱 Instant digital payouts • 🔒 100% secure
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-8 md:mb-16 px-4">
            <button 
              onClick={handleButtonClick}
              className="group relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 text-white font-black py-4 md:py-5 px-6 md:px-10 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 md:hover:scale-110 shadow-2xl hover:shadow-yellow-500/25"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Gift className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                Enter Now - It's FREE!
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button 
              onClick={scrollToForm}
              className="group border-2 md:border-3 border-white/50 text-white hover:bg-white hover:text-purple-900 font-bold py-4 md:py-5 px-6 md:px-10 rounded-full text-lg md:text-xl transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-none"
            >
              <span className="flex items-center justify-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                View All Prizes
              </span>
            </button>
          </div>

          <div className="animate-bounce cursor-pointer" onClick={scrollToForm}>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <ChevronDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8 md:mb-12">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Clock className="w-6 h-6 text-white mr-3 animate-spin" />
              <span className="text-white font-bold text-lg">URGENT</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white mb-4 px-4">
              Sweepstakes Ends Soon!
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4">
              Don't miss your chance to win big! Entry closes when the timer hits zero.
            </p>
          </div>
          
          <div className="flex justify-center space-x-2 md:space-x-8 mb-6 md:mb-8 px-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-white/15 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 md:p-6 min-w-[70px] md:min-w-[100px] border border-white/20">
                  <div className="text-2xl md:text-5xl font-black text-white mb-1 md:mb-2">{String(value).padStart(2, '0')}</div>
                  <div className="text-xs md:text-base text-gray-200 uppercase font-bold">{unit}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleButtonClick}
              className="bg-white text-red-600 font-black py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Enter Before Time Runs Out!
            </button>
          </div>
        </div>
      </section>

      {/* Cash Money Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <DollarSign className="w-6 h-6 text-green-400 mr-2" />
              <span className="text-green-300 font-bold">CASH PRIZES</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 px-4">
              Real Cash, Real Winners
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto px-4">
              We've paid out thousands in cash prizes to lucky winners just like you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6 md:space-y-8 px-4 lg:px-0">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">100% Legitimate</h3>
                    <p className="text-gray-300 text-base md:text-lg">Licensed and regulated sweepstakes with verified payouts to real winners.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Instant Payouts</h3>
                    <p className="text-gray-300 text-base md:text-lg">Winners receive their cash prizes within 24-48 hours via secure digital transfer.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">5,000+ Participants</h3>
                    <p className="text-gray-300 text-base md:text-lg">Join thousands of people who trust us with their chance to win big.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-500 rounded-full blur-3xl opacity-40 scale-150"></div>
                <div className="relative animate-float">
                  <img 
                    src="/cash-3d-icon-png-download-5014025.png" 
                    alt="Cash Money Prize" 
                    className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 hover:scale-110 transition-all duration-500 drop-shadow-2xl"
                  />
                </div>
                {/* Floating Money Elements */}
                <div className="absolute -top-8 -right-8 animate-bounce delay-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-lg">$</span>
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-8 animate-bounce delay-700">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold">$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Showcase with Wallet */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center bg-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Trophy className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-purple-300 font-bold">PRIZE TIERS</span>
            </div>
            <h2 className="text-3xl md:text-7xl font-black text-white mb-6 md:mb-8 px-4">
              Amazing Prizes Await
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto px-4">
              Multiple ways to win with prizes ranging from ${prizeConfig.runnerUpPrize} to ${prizeConfig.grandPrize.toLocaleString()} in cash.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-16">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl opacity-40 scale-150"></div>
                <div className="relative animate-float delay-500">
                  <img 
                    src="/financial-wallet-3d-icon-png-download-11524892.png" 
                    alt="Digital Wallet Prize" 
                    className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 hover:scale-110 transition-all duration-500 drop-shadow-2xl"
                  />
                </div>
                {/* Floating Wallet Elements */}
                <div className="absolute -top-6 -right-6 animate-pulse">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 animate-pulse delay-500">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-xl transform -rotate-12">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 px-4 lg:px-0">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Secure Digital Payouts</h3>
                <p className="text-gray-300 text-base md:text-lg mb-6">
                  All prizes are delivered securely to your digital wallet or bank account within 48 hours of winning.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Bank Grade Security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">Instant Transfer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-0">
            <div className="group relative bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-yellow-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 backdrop-blur-sm">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Grand Prize</h3>
                <div className="text-4xl md:text-6xl font-black text-white mb-4">${prizeConfig.grandPrize.toLocaleString()}</div>
                <p className="text-white/90 text-base md:text-lg font-semibold">Cash deposited directly to your account</p>
                <div className="mt-6 inline-flex items-center bg-white/20 rounded-full px-4 py-2">
                  <span className="text-white font-bold">{prizeConfig.grandWinners} Winner{prizeConfig.grandWinners > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-green-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 backdrop-blur-sm">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Second Prize</h3>
                <div className="text-4xl md:text-6xl font-black text-white mb-4">${prizeConfig.secondPrize.toLocaleString()}</div>
                <p className="text-white/90 text-base md:text-lg font-semibold">Instant cash reward</p>
                <div className="mt-6 inline-flex items-center bg-white/20 rounded-full px-4 py-2">
                  <span className="text-white font-bold">{prizeConfig.secondWinners} Winner{prizeConfig.secondWinners > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 backdrop-blur-sm">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Third Prize</h3>
                <div className="text-4xl md:text-6xl font-black text-white mb-4">${prizeConfig.thirdPrize.toLocaleString()}</div>
                <p className="text-white/90 text-base md:text-lg font-semibold">Digital payment or check</p>
                <div className="mt-6 inline-flex items-center bg-white/20 rounded-full px-4 py-2">
                  <span className="text-white font-bold">{prizeConfig.thirdWinners} Winner{prizeConfig.thirdWinners > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 backdrop-blur-sm">
                  <DollarSign className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Runner-up</h3>
                <div className="text-4xl md:text-6xl font-black text-white mb-4">${prizeConfig.runnerUpPrize}</div>
                <p className="text-white/90 text-base md:text-lg font-semibold">Cash bonus prize</p>
                <div className="mt-6 inline-flex items-center bg-white/20 rounded-full px-4 py-2">
                  <span className="text-white font-bold">{prizeConfig.runnerUpWinners} Winner{prizeConfig.runnerUpWinners > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-8 py-4 border border-yellow-500/30">
              <Gift className="w-6 h-6 text-yellow-400 mr-3" />
              <span className="text-lg md:text-2xl font-bold text-yellow-300">
                Total Prize Pool: ${totalPrizePool.toLocaleString()} • {totalWinners} Total Winners!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Form */}
      <section id="entry-form" className="py-16 md:py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl border border-white/20">
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-flex items-center bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Gift className="w-6 h-6 text-pink-400 mr-2" />
                <span className="text-pink-300 font-bold">FREE ENTRY</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6">
                Enter to Win Now!
              </h2>
              <p className="text-lg md:text-xl text-gray-200">
                Join thousands of participants competing for life-changing cash prizes
              </p>
            </div>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white text-base md:text-lg font-bold mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl bg-white/15 backdrop-blur-sm text-white placeholder-gray-300 border border-white/30 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300 text-base md:text-lg"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white text-base md:text-lg font-bold mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl bg-white/15 backdrop-blur-sm text-white placeholder-gray-300 border border-white/30 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300 text-base md:text-lg"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-yellow-500/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-yellow-400" />
                    <span className="text-yellow-300 font-bold text-base md:text-lg">Your Information is Safe</span>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base">
                    We use bank-level encryption to protect your data. Your information will never be sold or shared with third parties.
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-6 h-6 text-pink-500 focus:ring-pink-500 rounded mt-1"
                  />
                  <label htmlFor="terms" className="text-gray-300 text-base leading-relaxed">
                    I agree to the <span className="text-pink-400 underline cursor-pointer">terms and conditions</span> and 
                    <span className="text-pink-400 underline cursor-pointer"> privacy policy</span>. 
                    I confirm I am 18+ years old and eligible to participate.
                  </label>
                </div>

                <button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 text-white font-black py-4 md:py-6 px-6 md:px-8 rounded-xl text-lg md:text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-pink-500/25"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 md:w-8 md:h-8 mr-3 md:mr-4" />
                    Enter Sweepstakes - 100% FREE!
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    🔒 Secure Entry • 📧 Instant Confirmation • 🎯 No Spam Guarantee
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 md:mb-6">Entry Confirmed!</h3>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-green-500/30 mb-6 md:mb-8">
                  <p className="text-green-300 text-lg md:text-xl font-semibold mb-2">
                    🎉 Congratulations! You're officially entered!
                  </p>
                  <p className="text-gray-300 text-base md:text-lg">
                    We'll notify you immediately if you're selected as a winner. 
                    Check your email for confirmation and keep an eye out for our announcement!
                  </p>
                </div>
                <div className="flex justify-center space-x-4 md:space-x-8">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-yellow-400">{totalWinners}</div>
                    <div className="text-gray-400 text-sm md:text-base">Total Prizes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-green-400">${(totalPrizePool / 1000).toFixed(1)}K</div>
                    <div className="text-gray-400 text-sm md:text-base">Prize Pool</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400">48hrs</div>
                    <div className="text-gray-400 text-sm md:text-base">Payout Time</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Social Proof */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center bg-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Users className="w-6 h-6 text-blue-400 mr-2" />
              <span className="text-blue-300 font-bold">WINNER TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8">
              Join Thousands of Happy Winners
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Real people, real wins, real money. See what our winners have to say about their experience.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  GRAND PRIZE WINNER
                </div>
              </div>
              <p className="text-gray-200 mb-6 text-base md:text-lg leading-relaxed">
                "I still can't believe it! The ${prizeConfig.grandPrize.toLocaleString()} was in my account within 24 hours. 
                This helped me pay my bills this month. Thank you!"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <div className="text-white font-bold text-base md:text-lg">Sarah M.</div>
                  <div className="text-gray-400 text-sm md:text-base">${prizeConfig.grandPrize.toLocaleString()} Winner • California</div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  VERIFIED WINNER
                </div>
              </div>
              <p className="text-gray-200 mb-6 text-base md:text-lg leading-relaxed">
                "Easy to enter, legitimate company, and they actually pay out! 
                Won ${prizeConfig.secondPrize.toLocaleString()} and used it for groceries. Highly recommend!"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <div className="text-white font-bold text-base md:text-lg">Mike T.</div>
                  <div className="text-gray-400 text-sm md:text-base">${prizeConfig.secondPrize.toLocaleString()} Winner • Texas</div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  REPEAT WINNER
                </div>
              </div>
              <p className="text-gray-200 mb-6 text-base md:text-lg leading-relaxed">
                "Won ${prizeConfig.thirdPrize.toLocaleString()} last year and they paid out within a week! 
                The process was so smooth that I'm entering again this year. Fingers crossed!"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <div>
                  <div className="text-white font-bold text-base md:text-lg">Jennifer L.</div>
                  <div className="text-gray-400 text-sm md:text-base">${prizeConfig.thirdPrize.toLocaleString()} Winner • New York</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-12 border border-gray-600/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <div className="group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2">5,000+</div>
                <div className="text-gray-400 font-semibold text-sm md:text-base">Total Participants</div>
              </div>
              <div className="group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2">${(totalPrizePool / 1000).toFixed(0)}K+</div>
                <div className="text-gray-400 font-semibold text-sm md:text-base">Total Paid Out</div>
              </div>
              <div className="group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2">4.9/5</div>
                <div className="text-gray-400 font-semibold text-sm md:text-base">Winner Rating</div>
              </div>
              <div className="group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2">{totalWinners}+</div>
                <div className="text-gray-400 font-semibold text-sm md:text-base">Happy Winners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 md:py-16 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500 to-blue-500"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <Gift className="inline-block w-8 h-8 mr-3" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">Cash Prize Sweepstakes</h3>
            </div>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Your trusted partner for legitimate, secure, and exciting cash prize sweepstakes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="text-center">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-lg md:text-xl font-bold text-white mb-2">100% Secure</h4>
              <p className="text-gray-400 text-sm md:text-base">Bank-level encryption protects all your data</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="text-lg md:text-xl font-bold text-white mb-2">Fast Payouts</h4>
              <p className="text-gray-400 text-sm md:text-base">Winners receive prizes within 24-48 hours</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg md:text-xl font-bold text-white mb-2">Trusted by Thousands</h4>
              <p className="text-gray-400 text-sm md:text-base">Over 5,000 satisfied participants</p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left text-sm md:text-base">
                © 2025 Cash Prize Sweepstakes. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center space-x-4 md:space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Official Rules</a>
              </div>
            </div>
            <div className="mt-4 md:mt-6 text-center">
              <p className="text-gray-500 text-sm leading-relaxed max-w-4xl mx-auto">
                No purchase necessary to enter or win. Void where prohibited by law. 
                Must be 18+ years old and a legal resident of the United States to participate. 
                Sweepstakes subject to official rules and regulations. 
                Winners will be selected randomly and notified via email within 48 hours of contest end.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SweepstakesLanding;