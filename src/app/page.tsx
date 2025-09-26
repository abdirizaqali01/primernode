import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Play, Target, Users, Code } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-200/90 backdrop-blur-md border-b border-gray-800/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 relative">
            <div className="flex-1 md:flex-none">
              <Link className="text-2xl font-light text-gray-800 hover:opacity-80 transition-opacity" href="/">
                PrimerNode
              </Link>
            </div>
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8">
              <Link className="text-sm font-light transition-colors hover:text-gray-800 text-gray-800/60" href="#features">Features</Link>
              <Link className="text-sm font-light transition-colors hover:text-gray-800 text-gray-800/60" href="#projects">Projects</Link>
              <Link className="text-sm font-light transition-colors hover:text-gray-800 text-gray-800/60" href="#pricing">Pricing</Link>
            </div>
            <div className="flex items-center space-x-4 flex-1 justify-end">
              <div className="flex items-center space-x-2">
                <Link href="/auth/login" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-9 rounded-md px-3 border-gray-800/40 text-gray-800 hover:bg-gray-800/10 font-light hover:border-gray-800/60">
                  Sign In
                </Link>
                <Link href="/onboarding" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-9 rounded-md px-3 bg-gray-800 text-gray-200 hover:shadow-lg font-light hover:bg-gray-800/80">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen bg-gray-200 relative overflow-hidden pt-16">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}>
        </div>
        
        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-16 opacity-40">
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-green-500">
              <path d="M12 2 L22 20 L2 20 Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="absolute top-40 right-24 opacity-35">
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-pink-500">
              <rect x="2" y="2" width="16" height="16" fill="currentColor"/>
            </svg>
          </div>
          <div className="absolute top-60 left-1/4 opacity-40">
            <svg width="16" height="16" viewBox="0 0 16 16" className="text-red-500">
              <circle cx="8" cy="8" r="6" fill="currentColor"/>
            </svg>
          </div>
          <div className="absolute bottom-80 right-16 opacity-35">
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-blue-500">
              <path d="M6 6 L14 14 M14 6 L6 14" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        
        <section className="relative py-32 px-4 bg-gray-200 z-[1]">
          <div className="container mx-auto text-center">
            <h2 className="font-light text-xl text-gray-800 opacity-50 mb-3">for developers, by developers</h2>
            <h1 className="text-5xl md:text-7xl font-light mb-6 text-gray-800 leading-tight">
              Real Project Experience,<br/>Beyond Coding Tests
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-800 opacity-80 mb-4 max-w-3xl mx-auto">
              Experience realistic company cultures through project simulations.
            </p>
            <p className="text-lg text-gray-800 opacity-60 mb-8 max-w-2xl mx-auto font-light">
              Match with companies that fit your work style. Practice real team dynamics.
            </p>
            
            <div className="flex justify-center items-center gap-6 mb-8 text-sm text-gray-800 opacity-60 font-light flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <span>Real company workflows</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <span>Culture matching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <span>Smart recommendations</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/onboarding" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 text-xl px-10 py-7 bg-gray-800 hover:bg-gray-800/80 text-gray-200 border-0 rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background h-10 text-lg px-8 py-7 border-2 border-gray-800/40 text-gray-800 hover:bg-gray-800 hover:text-gray-200 rounded-full transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md">
                <Eye className="mr-2 w-5 h-5" />
                Browse Projects
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <section id="features" className="relative bg-gray-200/80 backdrop-blur-[10px] py-32 px-4 md:m-[60px] m-[5%] border border-gray-800/10 rounded-xl shadow-sm z-[10]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-2 text-gray-800 leading-tight">
              From Tutorials<br/>to Real Development
            </h2>
            <p className="text-lg font-light text-gray-800/60 max-w-2xl mx-auto">
              Experience authentic company workflows and find your perfect cultural fit
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 cursor-default">
            <div className="rounded-lg text-card-foreground bg-gray-200 border border-gray-800/10 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-8 text-left">
                <div className="w-16 h-16 bg-gray-800/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-800">For Developers</h3>
                <p className="font-light text-gray-800/60 leading-relaxed">
                  Join project simulations that match real company workflows and culture. Find teams that fit your style.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg text-card-foreground bg-gray-200 border border-gray-800/10 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-8 text-left">
                <div className="w-16 h-16 bg-gray-800/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-800">For Companies</h3>
                <p className="font-light text-gray-800/60 leading-relaxed">
                  Evaluate candidates through realistic project environments. See how they work in your culture.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg text-card-foreground bg-gray-200 border border-gray-800/10 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-8 text-left">
                <div className="w-16 h-16 bg-gray-800/10 rounded-full flex items-center justify-center mb-6">
                  <Code className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-800">Smart Matching</h3>
                <p className="font-light text-gray-800/60 leading-relaxed">
                  AI-powered matching based on work style, culture fit, and career goals for perfect partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center py-8 bg-gray-200">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-800/60 hover:text-gray-800"
          href="/onboarding"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Start Onboarding
        </Link>
        
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-800/60 hover:text-gray-800"
          href="https://github.com/yourusername/primernode"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          GitHub
        </a>
        
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-800/60 hover:text-gray-800"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Learn more →
        </a>
      </footer>
    </div>
  );
}