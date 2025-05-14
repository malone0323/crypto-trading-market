'use client'

import React, { useEffect, useRef, useState } from 'react';
import { CustomButton } from '@/components/ui/custom-button';
import { GlassCard } from '@/components/ui/glass-card';
import { theme } from '@/lib/theme';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, Coins, TrendingUp, BarChart4, Zap, Wallet, CreditCard, ArrowRightLeft } from 'lucide-react';
import { BuyStep } from '@/components/BuyStep';
import { AnimatedSection } from '@/components/AnimatedSection';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SwapInterface } from '@/components/SwapInterface';
import LiveTokenChart from '@/components/LiveTokenChart';
import LandingLayout from './landing-layout';
import { Award } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';


export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      stepsRef.current.forEach((step, index) => {
        if (step && step.offsetTop <= scrollPosition) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LandingLayout>
      <div className="relative">
        {/* Banner Image */}
        <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 overflow-hidden z-50">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-2hwy9b4fWACQS6lom0dFn5indJTZNp.png"
            alt="Gold bars banner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Video Background */}
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dust-uetv9XRsYgv83IA7VeMgyZeavkfPgG.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 bg-gradient-to-b from-black/70 to-black/30 text-white">
          <main className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <motion.section style={{ opacity }} className="text-center mb-12 pt-4 sm:pt-6 md:pt-8 lg:pt-10">
              <h1 
                className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text fade-in" 
                style={{ 
                  background: theme.gradients.gold, 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' 
                }}
              >
                Metal Commodity Market
              </h1>
              <p className="text-xl md:text-2xl mb-8 fade-in delay-200">
                Stack your metals. Boost your rewards!
              </p>
              <motion.div 
                className="flex flex-col items-center sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <CustomButton variant="gold" className="w-full sm:w-auto">Launch dApp</CustomButton>
                </Link>
                <CustomButton 
                  variant="secondary" 
                  className="w-full sm:w-auto"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                  <ArrowDown className="ml-2 h-4 w-4" />
                </CustomButton>
              </motion.div>
            </motion.section>

            {/* Key Features Section */}
            <AnimatedSection>
              <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center" style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <FeatureCard
                    icon={<Coins className="h-12 w-12 text-yellow-400" />}
                    title="Stake $METAL"
                    description="Earn valuable metal NFTs by staking your $METAL tokens."
                    delay={0.1}
                  />
                  <FeatureCard
                    icon={<BarChart4 className="h-12 w-12 text-yellow-400" />}
                    title="Trade NFTs"
                    description="Buy and sell metal NFTs in our dynamic Metal Market."
                    delay={0.2}
                  />
                  <FeatureCard
                    icon={<TrendingUp className="h-12 w-12 text-yellow-400" />}
                    title="Stack Multipliers"
                    description="Boost your rewards by collecting different metal types."
                    delay={0.3}
                  />
                  <FeatureCard
                    icon={<Award className="h-12 w-12 text-yellow-400" />}
                    title="Early Staker Advantage"
                    description="Get priority access to exclusive NFT drops."
                    delay={0.4}
                  />
                </div>
              </section>
            </AnimatedSection>

            {/* Project Overview Section */}
            <section id="about" className="pt-16 mb-20">
              <AnimatedSection>
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-10 text-center text-transparent bg-clip-text" 
                  style={{ 
                    background: theme.gradients.gold, 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' 
                  }}
                >
                  About Metal Commodity Market
                </h2>
              </AnimatedSection>
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-4 md:p-8 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  <div>
                    <AnimatedSection delay={0.2}>
                      <h3 className="text-xl md:text-2xl font-bold mb-6" style={{ color: theme.colors.primary }}>What is $METAL?</h3>
                    </AnimatedSection>
                    <div className="space-y-4 md:space-y-6">
                      <AnimatedSection delay={0.4}>
                        <div className="flex items-start">
                          <Coins className="mr-4 mt-1 text-yellow-400 flex-shrink-0" />
                          <p>
                            Metal Commodity Market ($METAL) is a revolutionary DeFi platform that 
                            <span className="bg-yellow-300 text-black px-1 rounded mx-1">bridges traditional precious metals with cutting-edge blockchain technology</span>.
                            Our ecosystem offers a unique blend of digital assets backed by real-world commodities.
                          </p>
                        </div>
                      </AnimatedSection>
                      <AnimatedSection delay={0.6}>
                        <div className="flex items-start">
                          <TrendingUp className="mr-4 mt-1 text-yellow-400 flex-shrink-0" />
                          <p>
                            By staking $METAL tokens, users can earn a variety of metal-backed NFTs, each representing different precious metals with intrinsic value and unique properties within our ecosystem.
                          </p>
                        </div>
                      </AnimatedSection>
                      <AnimatedSection delay={0.8}>
                        <div className="flex items-start">
                          <BarChart4 className="mr-4 mt-1 text-yellow-400 flex-shrink-0" />
                          <p>
                            Our platform features a <span className="bg-yellow-300 text-black px-1 rounded">dynamic staking system with tiered rewards</span>, allowing users to build diverse portfolios of digital precious metals and unlock increasing benefits as they progress.
                          </p>
                        </div>
                      </AnimatedSection>
                      <AnimatedSection delay={1}>
                        <div className="flex items-start">
                          <Zap className="mr-4 mt-1 text-yellow-400 flex-shrink-0" />
                          <p>
                            As you accumulate different metal types and reach higher tiers, you'll <span className="bg-yellow-300 text-black px-1 rounded">unlock multipliers that significantly boost your staking rewards</span>, creating a compelling reason to diversify and grow your holdings.
                          </p>
                        </div>
                      </AnimatedSection>
                    </div>
                  </div>
                  <div>
                    <AnimatedSection delay={0.2}>
                      <h3 className="text-xl md:text-2xl font-bold mb-6" style={{ color: theme.colors.primary }}>Why Choose $METAL?</h3>
                    </AnimatedSection>
                    <ul className="space-y-4">
                      {[
                        { title: "Diverse Metal-Backed NFTs", description: "Collect NFTs representing various precious metals, each with unique properties and real utility within our ecosystem." },
                        { title: "Tiered Staking System", description: "Enjoy a dynamic staking experience where your strategy in collecting different metal types directly impacts your reward multipliers and benefits." },
                        { title: "Kilo NFT Rewards", description: "Accumulate 1kg worth of a specific metal to mint exclusive Kilo NFTs, offering enhanced staking benefits and tradability." },
                        { title: "Interactive Metal Vault", description: "Visualize your metal holdings in a personalized virtual vault, adding a gamified element to your investment strategy." },
                        { title: "Community Governance", description: "Participate in shaping the future of the platform through our robust governance system, where your voice matters." },
                        { title: "Built on Solana", description: "Leverage Solana's high-speed, low-cost infrastructure for seamless transactions and efficient trading." }
                      ].map((item, index) => (
                        <AnimatedSection key={item.title} delay={0.4 + index * 0.2}>
                          <li className="flex items-start">
                            <span className="text-2xl mr-2 flex-shrink-0" style={{ color: theme.colors.primary }}>•</span>
                            <span>
                              <strong className="text-lg" style={{ color: theme.colors.secondary }}>{item.title}:</strong>{' '}
                              {item.description}
                            </span>
                          </li>
                        </AnimatedSection>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Live Token Chart Section */}
            <AnimatedSection>
              <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
                  Live Market Chart
                </h2>
                <GlassCard className="p-4">
                  <LiveTokenChart />
                </GlassCard>
              </section>
            </AnimatedSection>

            {/* How to Buy Section */}
            <section className="pt-16 mb-32">
              <AnimatedSection>
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-10 text-center text-transparent bg-clip-text" 
                  style={{ 
                    background: theme.gradients.gold, 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' 
                  }}
                >
                  How to Buy $METAL
                </h2>
              </AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-16">
                <div className="space-y-16 md:space-y-32 mb-8 md:mb-0">
                  <AnimatedSection delay={0.2}>
                    <BuyStep
                      ref={(el) => (stepsRef.current[0] = el)}
                      icon={<Wallet className="w-12 h-12 md:w-16 md:h-16" />}
                      title="Get Phantom Wallet App"
                      description="Download and install the Phantom wallet app on your device. It's available for both mobile and desktop."
                      isActive={activeStep === 0}
                      index={0}
                    />
                  </AnimatedSection>
                  <AnimatedSection delay={0.4}>
                    <BuyStep
                      ref={(el) => (stepsRef.current[1] = el)}
                      icon={<CreditCard className="w-12 h-12 md:w-16 md:h-16" />}
                      title="Buy Solana on the App"
                      description="Use the Phantom wallet to purchase Solana (SOL) directly within the app using your preferred payment method."
                      isActive={activeStep === 1}
                      index={1}
                    />
                  </AnimatedSection>
                  <AnimatedSection delay={0.6}>
                    <BuyStep
                      ref={(el) => (stepsRef.current[2] = el)}
                      icon={<ArrowRightLeft className="w-12 h-12 md:w-16 md:h-16" />}
                      title="Swap Solana for $METAL"
                      description="Use our integrated Jupiter swap interface to easily exchange your SOL for $METAL tokens."
                      isActive={activeStep === 2}
                      index={2}
                    />
                  </AnimatedSection>
                </div>
                <AnimatedSection delay={0.8} className="pt-8 md:pt-0">
                  <SwapInterface className="w-full max-w-md mx-auto" />
                </AnimatedSection>
              </div>
            </section>
          </main>
        </div>
      </div>
    </LandingLayout>
  );
}
