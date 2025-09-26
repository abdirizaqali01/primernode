import Link from "next/link";
import { Building2, ArrowRight, Clock } from 'lucide-react';

export default function CompanyOnboarding() {
  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-12 max-w-2xl mx-auto">
          <div className="space-y-6">
            <Link href="/onboarding" className="text-2xl font-light text-gray-800 hover:opacity-80 transition-opacity inline-block mb-8">
              PrimerNode
            </Link>
            <div className="w-16 h-16 bg-gray-800/10 rounded-full flex items-center justify-center mx-auto">
              <Building2 className="w-8 h-8 text-gray-800" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
              Company Onboarding
            </h1>
            <p className="text-lg font-light text-gray-600 leading-relaxed">
              Company simulation tools are currently in development. We're building powerful features to help you evaluate developers through realistic project environments.
            </p>
          </div>
          
          <div className="p-6 bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-gray-800" />
              <span className="text-sm font-light text-gray-800">Coming Soon</span>
            </div>
            <p className="text-sm text-gray-600 font-light">
              Expected release: Q2 2024
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/onboarding/developer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-6 py-6 bg-gray-800 hover:bg-gray-800/80 text-gray-200 border-0 rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Try Developer Path
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-light ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-6 py-6 bg-gray-200 border-2 border-gray-800/40 text-gray-800 hover:bg-gray-800/10 rounded-full hover:scale-105 shadow-sm hover:shadow-md"
            >
              Back to Options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}