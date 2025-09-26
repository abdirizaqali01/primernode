"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, GraduationCap, Target, Code, BookOpen, Building, Briefcase, Rocket, Star, CheckCircle, Upload, FileText, Github } from 'lucide-react';

export default function DeveloperOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCvTextBox, setShowCvTextBox] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState({
    userType: '',
    experience: '',
    email: '',
    github: '',
    cvFile: null as File | null,
    cvText: ''
  });

  const userTypes = [
    { type: 'Student', icon: GraduationCap, desc: 'Learning programming & computer science' },
    { type: 'Career Changer', icon: Target, desc: 'Transitioning into tech from another field' },
    { type: 'Junior Developer', icon: Code, desc: 'Early career developer seeking experience' },
    { type: 'Company Team', icon: Building, desc: 'Team looking to practice together' },
    { type: 'Self-Learning', icon: BookOpen, desc: 'Teaching myself programming skills' },
    { type: 'Interview Prep', icon: Briefcase, desc: 'Preparing for technical interviews' }
  ];

  const experienceLevels = [
    { level: 'Complete Beginner', years: 0, icon: Rocket, desc: 'Just starting my coding journey' },
    { level: 'Some Experience', years: 1, icon: Code, desc: '6 months - 2 years of coding' },
    { level: 'Intermediate', years: 2, icon: Star, desc: '2-5 years of development experience' },
    { level: 'Advanced', years: 5, icon: Target, desc: '5+ years, looking for team dynamics' }
  ];

  const steps = [
    { title: 'Welcome to PrimerNode', subtitle: 'Real project experience for developers', progress: 0 },
    { title: 'Upload your CV', subtitle: 'Quick setup with your resume', progress: 16 },
    { title: 'What brings you here?', subtitle: 'Tell us about your situation', progress: 33 },
    { title: 'Your experience level', subtitle: 'Help us understand your background', progress: 50 },
    { title: 'Contact details', subtitle: 'Email and GitHub profile', progress: 75 },
    { title: 'Ready to start!', subtitle: 'Join your first project simulation', progress: 100 }
  ];

  const handleStepTransition = (nextStep: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setIsAnimating(false);
    }, 300);
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type === 'application/pdf') {
      setProfile(prev => ({ ...prev, cvFile: file }));
      // Skip to step 5 (contact details) after CV upload
      setTimeout(() => handleStepTransition(4), 800);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleUserTypeSelect = (type: string) => {
    setProfile(prev => ({ ...prev, userType: type }));
    setTimeout(() => handleStepTransition(3), 800);
  };

  const handleExperienceSelect = (level: string) => {
    setProfile(prev => ({ ...prev, experience: level }));
    setTimeout(() => handleStepTransition(4), 800);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Welcome
        return (
          <div className="text-center space-y-12 h-[calc(100vh-200px)] flex flex-col justify-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-light leading-tight text-gray-800">
                Welcome to PrimerNode
              </h1>
              <h2 className="text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed text-gray-600">
                Experience real company cultures through project simulations. Get matched with teams that fit your work style.
              </h2>
              
              <div className="flex justify-center items-center gap-6 text-sm text-gray-800 opacity-60 font-light">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <span>Real workflows</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <span>Culture matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <span>Project simulations</span>
                </div>
              </div>
              
              <div className="pt-6">
                <button 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 text-xl px-10 py-7 bg-gray-800 hover:bg-gray-800/80 text-gray-200 border-0 rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                  onClick={() => handleStepTransition(1)}
                >
                  <span>Start Onboarding</span>
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        );

      case 1: // CV Upload
        return (
          <div className="space-y-8 py-4 max-w-3xl mx-auto">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
                Upload your CV
              </h1>
              <h2 className="text-lg font-light text-gray-600">
                Skip the form filling - let us extract your info automatically
              </h2>
            </div>

            <div className="space-y-6">
              {/* Drag & Drop Area */}
              <div 
                className="border-2 border-dashed border-gray-800/30 rounded-xl p-12 text-center hover:border-gray-800/50 transition-colors cursor-pointer bg-gray-100 hover:bg-gray-50"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-gray-800/60 mx-auto mb-4" />
                <p className="text-lg font-light text-gray-800 mb-2">
                  Drop your CV here
                </p>
                <p className="text-sm text-gray-600 font-light">
                  or click to browse files
                </p>
                <p className="text-xs text-gray-500 font-light mt-2">
                  PDF files only
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* CV Text Paste */}
              <div className="text-center">
                <button
                  onClick={() => setShowCvTextBox(!showCvTextBox)}
                  className="text-gray-800 font-light underline hover:no-underline transition-all duration-200"
                >
                  Or paste your CV text
                </button>
              </div>

              {showCvTextBox && (
                <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <textarea
                    value={profile.cvText}
                    onChange={(e) => setProfile(prev => ({ ...prev, cvText: e.target.value }))}
                    placeholder="Paste your resume content here..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-800/20 rounded-lg bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent font-light resize-none"
                    autoFocus
                  />
                  {profile.cvText && (
                    <button
                      onClick={() => handleStepTransition(4)}
                      className="w-full inline-flex items-center justify-center gap-2 h-10 px-6 py-2 bg-gray-800 hover:bg-gray-800/80 text-gray-200 border-0 rounded-lg transition-all duration-200 font-light"
                    >
                      <FileText className="h-4 w-4" />
                      Use This CV
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 2: // User Type
        return (
          <div className="space-y-8 py-4">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
                What brings you here?
              </h1>
              <h2 className="text-lg font-light text-gray-600">
                This helps us create personalized project recommendations for you
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {userTypes.map((item, index) => (
                <div 
                  key={item.type}
                  className="group p-6 text-center bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleUserTypeSelect(item.type)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gray-800/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-gray-800 transition-colors">
                      <item.icon className="h-6 w-6 text-gray-800 group-hover:text-gray-200" />
                    </div>
                    <h3 className="text-lg font-light text-gray-800">{item.type}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Experience Level
        return (
          <div className="space-y-8 py-4">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
                Your experience level
              </h1>
              <h2 className="text-lg font-light text-gray-600">
                We'll match you with appropriate project complexity and team dynamics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {experienceLevels.map((item, index) => (
                <div 
                  key={item.level}
                  className="group p-8 text-center bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleExperienceSelect(item.level)}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-800/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-gray-800 transition-colors">
                      <item.icon className="h-8 w-8 text-gray-800 group-hover:text-gray-200" />
                    </div>
                    <h3 className="text-xl font-light text-gray-800">{item.level}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4: // Contact Details
        return (
          <div className="space-y-8 max-w-2xl mx-auto py-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
                Contact Details
              </h1>
              <h2 className="text-lg font-light text-gray-600">
                How can we reach you and see your work?
              </h2>
            </div>

            <div className="space-y-6 p-6 bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm">
              <div>
                <label className="block text-sm font-light text-gray-800 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-800/20 rounded-lg bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent font-light"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-800 mb-2">
                  <Github className="inline w-4 h-4 mr-1" />
                  GitHub Profile
                </label>
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) => setProfile(prev => ({ ...prev, github: e.target.value }))}
                  placeholder="https://github.com/yourusername"
                  className="w-full px-4 py-3 border border-gray-800/20 rounded-lg bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent font-light"
                />
                <p className="text-xs text-gray-500 font-light mt-1">
                  Help us understand your coding style and projects
                </p>
              </div>

              {/* CV Upload Status */}
              {(profile.cvFile || profile.cvText) && (
                <div className="bg-gray-100 rounded-lg p-4 border border-gray-800/10">
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <FileText className="w-4 h-4" />
                    <span className="font-light">
                      CV {profile.cvFile ? 'uploaded' : 'added'} ✓
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center pt-6">
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 text-lg px-8 py-6 bg-gray-800 hover:bg-gray-800/80 text-gray-200 border-0 rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                onClick={() => handleStepTransition(5)}
                disabled={!profile.email}
              >
                <span>Complete Setup</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        );

      case 5: // Complete
        return (
          <div className="text-center space-y-8 py-4">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-gray-800/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-gray-800" />
              </div>
              <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
                Profile Created!
              </h1>
              <h2 className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
                Welcome! You're ready to start experiencing real project environments.
              </h2>
              
              <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm max-w-xl mx-auto">
                <h3 className="text-lg font-light text-gray-800 mb-4">Your Profile</h3>
                <div className="space-y-3 text-left">
                  {(profile.cvFile || profile.cvText) && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CV:</span>
                      <span className="text-sm font-light text-gray-800">
                        {profile.cvFile ? 'File uploaded' : 'Text provided'} ✓
                      </span>
                    </div>
                  )}
                  {profile.userType && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm font-light text-gray-800">{profile.userType}</span>
                    </div>
                  )}
                  {profile.experience && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Experience:</span>
                      <span className="text-sm font-light text-gray-800">{profile.experience}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm font-light text-gray-800">{profile.email}</span>
                  </div>
                  {profile.github && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">GitHub:</span>
                      <a 
                        href={profile.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-light text-gray-800 hover:underline flex items-center gap-1"
                      >
                        <Github className="w-3 h-3" />
                        Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-6">
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 text-xl px-10 py-7 bg-gray-800 hover:bg-gray-800/80 text-gray-200 border-0 rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <span>Enter Dashboard</span>
                  <Rocket className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}>
      </div>

      {/* Progress bar */}
      {currentStep > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-200/90 backdrop-blur-md border-b border-gray-800/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <Link href="/onboarding" className="text-lg font-light text-gray-800 hover:opacity-80 transition-opacity">
                PrimerNode
              </Link>
              <div className="text-xs font-light text-gray-600">
                Step {currentStep} of {steps.length - 1}
              </div>
            </div>
            <div className="w-full bg-gray-800/20 rounded-full h-1 mb-3">
              <div 
                className="h-1 bg-gray-800 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${steps[currentStep].progress}%` }}
              />
            </div>
            <div className="flex justify-start">
              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-light ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 rounded-full px-3 bg-gray-200/90 backdrop-blur-sm border border-gray-800/20 text-gray-800 hover:bg-gray-800/10 shadow-sm hover:shadow-md hover:scale-105"
                onClick={() => handleStepTransition(currentStep - 1)}
              >
                <ArrowLeft className="h-3 w-3" />
                <span className="text-xs">Back</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`container mx-auto px-6 ${currentStep > 0 ? 'pt-24 pb-20' : 'py-4'}`}>
        <div className="max-w-6xl mx-auto min-h-[calc(100vh-160px)] flex flex-col justify-center">
          <div className={`transition-all duration-300 ease-out ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            {renderStepContent()}
          </div>

          {/* Remove the old bottom-left back button since it's now in the header */}
        </div>
      </div>

      {/* Manual continuation button */}
      {currentStep === 1 && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40">
          <button
            onClick={() => handleStepTransition(2)}
            className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 bg-gray-200/90 backdrop-blur-sm border border-gray-800/20 text-gray-800 hover:bg-gray-800/10 rounded-full transition-all duration-200 font-light text-sm shadow-sm hover:shadow-md hover:scale-105"
          >
            Continue Manually
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Progress dots */}
      {currentStep > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex items-center gap-2">
            {steps.slice(1).map((step, index) => (
              <button
                key={index}
                onClick={() => {
                  // Only allow backward navigation
                  if (index + 1 < currentStep) {
                    handleStepTransition(index + 1);
                  }
                }}
                className={`rounded-full transition-all duration-300 ${
                  index + 1 === currentStep
                    ? 'w-8 h-2 bg-gray-800'
                    : index + 1 < currentStep
                    ? 'w-2 h-2 bg-gray-800 opacity-60 cursor-pointer hover:opacity-80'
                    : 'w-2 h-2 bg-gray-800 opacity-20 cursor-not-allowed'
                }`}
                disabled={index + 1 >= currentStep}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};