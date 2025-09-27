"use client"; // Add this at the top for Next.js client component

import React, { useState, useEffect } from 'react';
import { 
  User, Clock, MessageSquare, Target, Star, AlertTriangle,
  CheckCircle, TrendingUp, Globe, FileText, Phone, Video,
  BarChart3, PieChart, Activity, Calendar, MapPin, ArrowRight,
  Building, Timer, Bell, Code, GitBranch, Coffee, Users // Added Users import
} from 'lucide-react';

interface AssessmentMetrics {
  technicalCompetency: {
    codeQuality: number;
    architecturalThinking: number;
    problemSolving: number;
    documentationSkills: number;
  };
  culturalFit: {
    communicationStyle: number;
    clientInteraction: number;
    crossCulturalAwareness: number;
    stressManagement: number;
  };
  leadershipPotential: {
    mentoring: number;
    knowledgeTransfer: number;
    decisionMaking: number;
    teamCoordination: number;
  };
  businessAcumen: {
    fintechDomainKnowledge: number;
    complianceAwareness: number;
    clientValueFocus: number;
    timeManagement: number;
  };
}

interface CandidateSession {
  candidateName: string;
  sessionId: string;
  startTime: Date;
  duration: number;
  scenario: string;
  currentMetrics: AssessmentMetrics;
  keyObservations: string[];
  redFlags: string[];
  strengths: string[];
  currentTask: string;
  taskProgress: number;
}

const TekaiAssessmentDashboard: React.FC = () => {
  const [currentSession, setCurrentSession] = useState<CandidateSession>({
    candidateName: "Nguyen Van Duc",
    sessionId: "TK-2024-003",
    startTime: new Date(),
    duration: 45,
    scenario: "Nordic Banking API Crisis",
    currentTask: "Explaining PSD2 compliance requirements to Finnish stakeholders",
    taskProgress: 68,
    currentMetrics: {
      technicalCompetency: {
        codeQuality: 4.2,
        architecturalThinking: 4.5,
        problemSolving: 4.8,
        documentationSkills: 3.9
      },
      culturalFit: {
        communicationStyle: 4.1,
        clientInteraction: 3.7,
        crossCulturalAwareness: 4.3,
        stressManagement: 4.0
      },
      leadershipPotential: {
        mentoring: 3.8,
        knowledgeTransfer: 4.2,
        decisionMaking: 4.1,
        teamCoordination: 3.9
      },
      businessAcumen: {
        fintechDomainKnowledge: 4.0,
        complianceAwareness: 3.6,
        clientValueFocus: 3.8,
        timeManagement: 4.4
      }
    },
    keyObservations: [
      "Immediately identified timezone coordination challenges",
      "Used clear, direct language suitable for Nordic clients",
      "Proactively suggested documentation improvements",
      "Showed strong understanding of fintech regulations"
    ],
    redFlags: [
      "Slight hesitation when explaining complex compliance details",
      "Could improve on providing specific timelines"
    ],
    strengths: [
      "Excellent crisis management and communication",
      "Natural technical leadership presence",
      "Strong cultural awareness of Nordic expectations",
      "Effective cross-timezone coordination skills"
    ]
  });

  const [realTimeNotes, setRealTimeNotes] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<keyof AssessmentMetrics>('technicalCompetency');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Match the simulation's time progression
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 4.0) return 'text-gray-800 bg-gray-800/20';
    if (score >= 3.0) return 'text-gray-800 bg-gray-800/10';
    return 'text-gray-800 bg-gray-800/5';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 4.0) return <CheckCircle className="h-4 w-4" />;
    if (score >= 3.0) return <AlertTriangle className="h-4 w-4" />;
    return <Star className="h-4 w-4" />;
  };

  // Fixed type safety for calculating overall score
  const overallScore = Object.values(currentSession.currentMetrics)
    .flatMap(category => Object.values(category as Record<string, number>))
    .reduce((sum: number, score: number) => sum + score, 0) / 16;

  // Fixed type safety for category averages
  const categoryAverages = Object.entries(currentSession.currentMetrics).map(([category, metrics]) => ({
    category: category as keyof AssessmentMetrics,
    average: Object.values(metrics as Record<string, number>).reduce((sum: number, score: number) => sum + score, 0) / Object.values(metrics as Record<string, number>).length
  }));

  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased relative overflow-hidden">
      {/* Background texture matching simulation */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}>
      </div>

      {/* Header matching simulation style */}
      <div className="relative bg-gray-200/90 backdrop-blur-md border-b border-gray-800/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-gray-800" />
              <h1 className="text-xl font-light text-gray-800">Tekai Assessment Dashboard</h1>
            </div>
            <span className="px-3 py-1 bg-gray-800/10 text-gray-800 rounded-full text-sm font-light">
              Behavioral Interview - {currentSession.scenario}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 font-light">
              Session: {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div>
              <span className="text-sm font-light text-gray-800">Live Assessment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Candidate Header */}
          <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800/10 rounded-full flex items-center justify-center text-gray-800 font-light">
                  DV
                </div>
                <div>
                  <h2 className="text-2xl font-light text-gray-800">
                    {currentSession.candidateName}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1 font-light">
                    <span className="flex items-center gap-1">
                      <Timer className="h-4 w-4" />
                      {currentSession.duration} minutes
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      Senior Engineer Assessment
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      {currentSession.sessionId}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-light text-gray-800">
                  {overallScore.toFixed(1)}<span className="text-lg font-light text-gray-600">/5.0</span>
                </div>
                <div className="text-sm text-gray-600 font-light">Overall Score</div>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-light mt-1 ${getScoreColor(overallScore)}`}>
                  {getScoreIcon(overallScore)}
                  {overallScore >= 4.0 ? 'Strong Cultural Fit' : overallScore >= 3.0 ? 'Potential Fit' : 'Needs Development'}
                </div>
              </div>
            </div>

            {/* Current Task Progress */}
            <div className="mt-6 p-4 bg-gray-800/5 rounded-lg border border-gray-800/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-light text-gray-800">Current Assessment Task</h4>
                <span className="text-sm text-gray-600 font-light">{currentSession.taskProgress}% complete</span>
              </div>
              <p className="text-sm text-gray-600 font-light mb-3">{currentSession.currentTask}</p>
              <div className="w-full bg-gray-800/20 rounded-full h-1">
                <div 
                  className="bg-gray-800 h-1 rounded-full transition-all duration-300" 
                  style={{ width: `${currentSession.taskProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Assessment Categories */}
            <div className="lg:col-span-2 space-y-6">
              {/* Category Overview */}
              <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-light text-gray-800 mb-4">Tekai Cultural Fit Assessment</h3>
                <div className="grid grid-cols-2 gap-4">
                  {categoryAverages.map(({ category, average }) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`group p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                        selectedCategory === category 
                          ? 'border-gray-800/40 bg-gray-800/10 shadow-sm' 
                          : 'border-gray-800/20 hover:border-gray-800/30 hover:bg-gray-800/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="font-light text-gray-800 capitalize">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-2xl font-light text-gray-800 mt-1">
                            {average.toFixed(1)}
                          </div>
                        </div>
                        <div className={`p-2 rounded-full transition-colors ${getScoreColor(average)}`}>
                          {getScoreIcon(average)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-light text-gray-800 mb-4 capitalize">
                  {selectedCategory.replace(/([A-Z])/g, ' $1').trim()} Assessment
                </h3>
                <div className="space-y-4">
                  {Object.entries(currentSession.currentMetrics[selectedCategory]).map(([metric, score]) => (
                    <div key={metric} className="flex items-center justify-between p-4 bg-gray-800/5 rounded-lg border border-gray-800/10">
                      <div className="flex-1">
                        <div className="font-light text-gray-800 capitalize">
                          {metric.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-sm text-gray-600 font-light mt-1">
                          {getMetricDescription(selectedCategory, metric)}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-light text-gray-800">{score as number}</div>
                        <div className={`p-1 rounded-full ${getScoreColor(score as number)}`}>
                          {getScoreIcon(score as number)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tekai-Specific Cultural Indicators */}
              <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-light text-gray-800 mb-4">Tekai Cultural Fit Indicators</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-800/5 rounded-lg border border-gray-800/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-gray-800/60" />
                      <span className="text-sm font-light text-gray-800">Nordic Communication</span>
                    </div>
                    <div className="text-2xl font-light text-gray-800">
                      {currentSession.currentMetrics.culturalFit.communicationStyle.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600 font-light">Direct, solution-focused style</div>
                  </div>
                  <div className="p-4 bg-gray-800/5 rounded-lg border border-gray-800/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-gray-800/60" />
                      <span className="text-sm font-light text-gray-800">Timezone Coordination</span>
                    </div>
                    <div className="text-2xl font-light text-gray-800">
                      {currentSession.currentMetrics.businessAcumen.timeManagement.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600 font-light">Fin-Viet 5-hour difference</div>
                  </div>
                  <div className="p-4 bg-gray-800/5 rounded-lg border border-gray-800/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-gray-800/60" />
                      <span className="text-sm font-light text-gray-800">Client Interaction</span>
                    </div>
                    <div className="text-2xl font-light text-gray-800">
                      {currentSession.currentMetrics.culturalFit.clientInteraction.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600 font-light">Finnish stakeholder management</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Assessment Panel */}
            <div className="space-y-6">
              {/* Live Notes */}
              <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-light text-gray-800 mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Live Assessment Notes
                </h3>
                <textarea
                  value={realTimeNotes}
                  onChange={(e) => setRealTimeNotes(e.target.value)}
                  placeholder="Real-time observations about cultural fit and technical communication..."
                  className="w-full h-32 p-3 border border-gray-800/20 rounded-lg bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent font-light resize-none"
                />
                <button className="mt-3 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-800/80 transition-colors font-light">
                  Add Note
                </button>
              </div>

              {/* Key Observations */}
              <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-light text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Key Observations
                </h3>
                <div className="space-y-3">
                  {currentSession.keyObservations.map((observation, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-gray-800/5 rounded border-l-2 border-gray-800/40">
                      <CheckCircle className="h-3 w-3 text-gray-800 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-light">{observation}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-light text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Tekai Cultural Strengths
                </h3>
                <div className="space-y-2">
                  {currentSession.strengths.map((strength, index) => (
                    <div key={index} className="text-sm text-gray-700 font-light p-3 bg-gray-800/10 rounded-lg border border-gray-800/20">
                      {strength}
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Areas */}
              <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-light text-gray-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Development Areas
                </h3>
                <div className="space-y-2">
                  {currentSession.redFlags.map((flag, index) => (
                    <div key={index} className="text-sm text-gray-700 font-light p-3 bg-gray-800/5 rounded-lg border border-gray-800/10">
                      {flag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment Actions */}
              <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-light text-gray-800 mb-4">Assessment Actions</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-800/80 transition-all duration-200 font-light flex items-center justify-center gap-2">
                    Complete Assessment
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button className="w-full px-4 py-3 bg-gray-800/10 text-gray-800 rounded-lg hover:bg-gray-800/20 transition-all duration-200 font-light">
                    Generate Tekai Report
                  </button>
                  <button className="w-full px-4 py-3 bg-gray-800/5 border border-gray-800/20 text-gray-800 rounded-lg hover:bg-gray-800/10 transition-all duration-200 font-light">
                    Save Progress
                  </button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-800/10 text-center">
                  <div className="text-xs text-gray-600 font-light">
                    Assessment started: {currentSession.startTime.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to provide Tekai-specific context for each metric
const getMetricDescription = (category: keyof AssessmentMetrics, metric: string): string => {
  const descriptions: Record<string, Record<string, string>> = {
    technicalCompetency: {
      codeQuality: "Clean, maintainable code following Tekai's fintech standards",
      architecturalThinking: "Microservices design for Nordic banking compliance",
      problemSolving: "Crisis management approach under client pressure",
      documentationSkills: "Knowledge transfer quality for Finnish stakeholders"
    },
    culturalFit: {
      communicationStyle: "Direct, solution-focused Nordic communication style",
      clientInteraction: "Professional Finnish client relationship management",
      crossCulturalAwareness: "Fin-Viet cultural bridge and sensitivity",
      stressManagement: "Performance under Nordic business pressure"
    },
    leadershipPotential: {
      mentoring: "Ability to guide Vietnam-based junior developers",
      knowledgeTransfer: "Effective knowledge sharing across 5-hour timezone gap",
      decisionMaking: "Technical leadership in Fin-Viet blended teams",
      teamCoordination: "Cross-cultural team management effectiveness"
    },
    businessAcumen: {
      fintechDomainKnowledge: "Nordic financial services and banking expertise",
      complianceAwareness: "PSD2, GDPR, and Finnish banking regulations",
      clientValueFocus: "Finnish client business value orientation",
      timeManagement: "Finland-Vietnam timezone coordination mastery"
    }
  };

  return descriptions[category]?.[metric] || "Tekai-specific assessment criteria";
};

export default TekaiAssessmentDashboard;