import Link from "next/link";
import { GraduationCap, Building2, ArrowRight } from 'lucide-react';

export default function OnboardingHome() {
  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-light text-gray-800 hover:opacity-80 transition-opacity inline-block mb-8">
              PrimerNode
            </Link>
            <h1 className="text-5xl md:text-6xl font-light leading-tight text-gray-800">
              Choose Your Path
            </h1>
            <p className="text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed text-gray-600">
              Tell us who you are to get personalized project recommendations and culture matching.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Link
              href="/onboarding/developer"
              className="group p-8 bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 text-left"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gray-800/10 rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                  <GraduationCap className="h-8 w-8 text-gray-800 group-hover:text-gray-200" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-gray-800 mb-3">I'm a Developer</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Join project simulations, experience different company cultures, and get matched 
                    with organizations that fit your work style and career goals.
                  </p>
                </div>
                <div className="flex items-center text-gray-800 font-light">
                  <span>Start onboarding</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            
            <Link
              href="/onboarding/company"
              className="group p-8 bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 text-left"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gray-800/10 rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                  <Building2 className="h-8 w-8 text-gray-800 group-hover:text-gray-200" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-gray-800 mb-3">I'm a Company</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Create realistic project simulations, evaluate candidates in authentic work 
                    environments, and find developers who truly fit your team culture.
                  </p>
                </div>
                <div className="flex items-center text-gray-800 font-light">
                  <span>Start setup</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link 
              href="/" 
              className="text-gray-800/60 hover:text-gray-800 font-light text-sm transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}