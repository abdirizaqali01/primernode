import React from 'react';
import { ArrowRight, Eye, Play, Target, Users, Code } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-200/90 backdrop-blur-md border-b border-gray-800/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 relative">
            <div className="flex-1 md:flex-none">
              <a className="text-2xl font-light text-gray-800 hover:opacity-80 transition-opacity" href="/">
                [SIMULABS]
              </a>
            </div>
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8">
              <a className="text-sm font-light transition-colors hover:text-gray-800 text-gray-800/60" href="#features">Features</a>
              <a className="text-sm font-light transition-colors hover:text-gray-800 text-gray-800/60" href="#projects">Projects</a>
              <a className="text-sm font-light transition-colors hover:text-gray-800 text-gray-800/60" href="#pricing">Pricing</a>
            </div>
            <div className="flex items-center space-x-4 flex-1 justify-end">
              <div className="flex items-center space-x-2">
                <a href="/sign-in" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-9 rounded-md px-3 border-gray-800/40 text-gray-800 hover:bg-gray-800/10 font-light hover:border-gray-800/60">
                  Sign In
                </a>
                <a href="/sign-up" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-9 rounded-md px-3 bg-gray-800 text-gray-200 hover:shadow-lg font-light hover:bg-gray-800/80">
                  Get Started
                </a>
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
        
        {/* Floating PlayStation shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Triangle */}
          <div className="absolute top-20 left-16 opacity-40">
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-green-500">
              <path d="M12 2 L22 20 L2 20 Z" fill="currentColor"/>
            </svg>
          </div>
          {/* Square */}
          <div className="absolute top-40 right-24 opacity-35">
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-pink-500">
              <rect x="2" y="2" width="16" height="16" fill="currentColor"/>
            </svg>
          </div>
          {/* Circle */}
          <div className="absolute top-60 left-1/4 opacity-40">
            <svg width="16" height="16" viewBox="0 0 16 16" className="text-red-500">
              <circle cx="8" cy="8" r="6" fill="currentColor"/>
            </svg>
          </div>
          {/* X/Cross */}
          <div className="absolute bottom-80 right-16 opacity-35">
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-blue-500">
              <path d="M6 6 L14 14 M14 6 L6 14" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          {/* Triangle 2 */}
          <div className="absolute bottom-60 left-20 opacity-45 rotate-180">
            <svg width="16" height="16" viewBox="0 0 16 16" className="text-purple-500">
              <path d="M8 2 L14 14 L2 14 Z" fill="currentColor"/>
            </svg>
          </div>
          {/* Square 2 */}
          <div className="absolute top-1/3 right-1/3 opacity-40 rotate-45">
            <svg width="12" height="12" viewBox="0 0 12 12" className="text-yellow-500">
              <rect x="2" y="2" width="8" height="8" fill="currentColor"/>
            </svg>
          </div>
          {/* Circle 2 */}
          <div className="absolute bottom-40 left-1/3 opacity-35">
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-indigo-500">
              <circle cx="10" cy="10" r="8" fill="currentColor"/>
            </svg>
          </div>
          {/* X 2 */}
          <div className="absolute top-80 right-1/4 opacity-40">
            <svg width="18" height="18" viewBox="0 0 18 18" className="text-teal-500">
              <path d="M5 5 L13 13 M13 5 L5 13" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        
        <section className="relative py-32 px-4 bg-gray-200 z-[1]">
          <div className="container mx-auto text-center">
            <h2 className="font-light text-xl text-gray-800 opacity-50 mb-3">for developers, by developers</h2>
            <h1 className="text-5xl md:text-7xl font-light mb-6 text-gray-800 leading-tight">
              Real Team Experience,<br/>Beyond LeetCode
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-800 opacity-80 mb-4 max-w-3xl mx-auto">
              Work with AI teammates on industry projects. Build skills that actually matter.
            </p>
            <p className="text-lg text-gray-800 opacity-60 mb-8 max-w-2xl mx-auto font-light">
              Simulate real development environments. Practice with realistic team dynamics.
            </p>
            
            <div className="flex justify-center items-center gap-6 mb-8 text-sm text-gray-800 opacity-60 font-light flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <span>AI-powered teams</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <span>Real project workflows</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <span>Invite friends</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/onboarding" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 text-xl px-10 py-7 bg-gray-800 hover:bg-gray-800/80 text-gray-200 border-0 rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg">
                Start Your First Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background h-10 text-lg px-8 py-7 border-2 border-gray-800/40 text-gray-200 hover:bg-gray-800 hover:text-gray-200 rounded-full transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md">
                <Eye className="mr-2 w-5 h-5" />
                Browse Projects
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Demo Section */}
      <section className="relative bg-gray-200 py-20 px-4 z-[5]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-800 leading-tight">
            See [SIMULABS]<br/>in Action
          </h2>
          <p className="text-lg text-gray-800 opacity-60 mb-8 max-w-2xl mx-auto font-light">
            Watch how teams collaborate on real projects with realistic development challenges
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gradient-to-br from-gray-800/5 to-gray-800/10 rounded-xl overflow-hidden shadow-lg border border-gray-800/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-10 h-10 text-gray-200 ml-1" />
                  </div>
                  <p className="text-lg font-light text-gray-800 mb-2">Watch Promo</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-gray-200/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-sm font-light text-gray-800">4:12</span>
              </div>
              <div className="absolute top-4 right-4 bg-gray-800 text-gray-200 text-xs font-light px-2 py-1 rounded">LIVE</div>
            </div>
            
            <div className="flex justify-center items-center gap-8 mt-6 text-sm text-gray-800/60 font-light flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <span>Average project completion: 2-3 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <span>200+ projects completed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative bg-gray-200/80 backdrop-blur-[10px] py-32 px-4 md:m-[60px] m-[5%] border border-gray-800/10 rounded-xl shadow-sm z-[10]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-2 text-gray-800 leading-tight">
              From Tutorials<br/>to Real Development
            </h2>
            <p className="text-lg font-light text-gray-800/60 max-w-2xl mx-auto">
              Experience authentic development workflows with AI teammates who challenge your skills
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 cursor-default">
            <div className="rounded-lg text-card-foreground bg-gray-200 border border-gray-800/10 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-8 text-left">
                <div className="w-16 h-16 bg-gray-800/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-800">Choose Your Project</h3>
                <p className="font-light text-gray-800/60 leading-relaxed">
                  Select from web apps, mobile development, DevOps pipelines, or data projects. Each comes with realistic requirements and deadlines.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg text-card-foreground bg-gray-200 border border-gray-800/10 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-8 text-left">
                <div className="w-16 h-16 bg-gray-800/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-800">Meet Your Team</h3>
                <p className="font-light text-gray-800/60 leading-relaxed">
                  Work with AI teammates that have different specialties, communication styles, and working preferences. Invite friends to join your squad.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg text-card-foreground bg-gray-200 border border-gray-800/10 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-8 text-left">
                <div className="w-16 h-16 bg-gray-800/10 rounded-full flex items-center justify-center mb-6">
                  <Code className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-800">Build and Deploy</h3>
                <p className="font-light text-gray-800/60 leading-relaxed">
                  Experience the full development lifecycle. Code reviews, merge conflicts, debugging sessions, and production deployments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="px-4 pt-24 pb-40 bg-gray-200">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-800/10">
            <div className="text-center mb-6">
              <h3 className="text-3xl md:text-4xl text-gray-800 font-light mb-2">Join the Beta Waitlist</h3>
              <p className="text-gray-600 text-md font-light">
                Be the first to experience realistic team development with AI teammates.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2" 
                placeholder="Enter your email" 
                required 
              />
              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 text-gray-200 hover:bg-gray-800/80 h-12 rounded-md sm:w-auto px-6 shadow-md hover:shadow-lg" 
                type="submit"
              >
                Join Waitlist
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}