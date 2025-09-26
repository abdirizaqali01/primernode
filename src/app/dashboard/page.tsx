import Link from "next/link";
import { Target, CheckCircle, User, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gray-200/90 backdrop-blur-md border-b border-gray-800/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-light text-gray-800 hover:opacity-80 transition-opacity">
              PrimerNode
            </Link>
            <div className="text-sm font-light text-gray-600">
              Developer Dashboard
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800 mb-4">
              Welcome to PrimerNode
            </h1>
            <p className="text-lg font-light text-gray-600 max-w-2xl">
              Your developer profile is complete. Start exploring project simulations to experience 
              different company cultures and find your perfect match.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-800/10 rounded-full flex items-center justify-center">
                  <Target className="h-4 w-4 text-gray-800" />
                </div>
                <h3 className="font-light text-gray-800">Available Simulations</h3>
              </div>
              <div className="text-3xl font-light text-gray-800 mb-1">0</div>
              <p className="text-xs text-gray-600 font-light">Ready to join</p>
            </div>
            <div className="p-6 bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-800/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-gray-800" />
                </div>
                <h3 className="font-light text-gray-800">Completed Projects</h3>
              </div>
              <div className="text-3xl font-light text-gray-800 mb-1">0</div>
              <p className="text-xs text-gray-600 font-light">Portfolio items</p>
            </div>
            <div className="p-6 bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-800/10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-800" />
                </div>
                <h3 className="font-light text-gray-800">Profile Score</h3>
              </div>
              <div className="text-3xl font-light text-gray-800 mb-1">100%</div>
              <p className="text-xs text-gray-600 font-light">Setup complete</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-gray-800">Quick Actions</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="group p-8 bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                <h3 className="text-xl font-light text-gray-800 mb-3">Browse Simulations</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  Discover project simulations from companies looking for developers like you.
                </p>
                <div className="flex items-center text-gray-800 font-light text-sm">
                  <span>Coming soon</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform opacity-50" />
                </div>
              </div>
              <div className="group p-8 bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                <h3 className="text-xl font-light text-gray-800 mb-3">Update Profile</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  Keep your skills and preferences up to date for better matching.
                </p>
                <div className="flex items-center text-gray-800 font-light text-sm">
                  <span>Available soon</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform opacity-50" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12 p-8 bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm">
            <h3 className="text-xl font-light text-gray-800 mb-6">Recent Activity</h3>
            <div className="text-center py-8">
              <p className="text-gray-600 font-light">No activity yet</p>
              <p className="text-gray-400 text-sm mt-2 font-light">
                Your simulation history will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}