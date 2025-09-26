"use client";
import React, { useState, useEffect } from 'react';
import { 
  Clock, Users, MessageSquare, FileText, GitBranch, 
  CheckCircle, AlertCircle, Play, Pause, RotateCcw, 
  Settings, Calendar, Globe, Coffee, Video, Phone,
  Bug, Lightbulb, Database, Server, Code, TestTube,
  Target, Zap, ArrowRight, Timer, Bell, Star,
  Building, MapPin, Languages, Briefcase, TrendingUp,
  ChevronRight, Mail, GitPullRequest, FileCode
} from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  timestamp: Date;
  channel: string;
  avatar: string;
}

interface TeamMember {
  name: string;
  role: string;
  location: string;
  timezone: string;
  avatar: string;
  status: string;
  responsibilities: string[];
  availability: string;
}

interface Task {
  id: string;
  title: string;
  type: string;
  priority: string;
  assignee: string;
  status: string;
  description: string;
  timeRemaining: string;
  blockers?: string[];
  techRequirements?: string[];
  needsDiscussion?: boolean;
  discussionWith?: string[];
  compliance?: string[];
  dependencies?: string[];
  author?: string;
}

interface Meeting {
  title: string;
  time: string;
  duration: string;
  attendees: string[];
  type: string;
  channel: string;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  impact: string;
  skills: string[];
  status: string;
}

interface Channel {
  id: string;
  name: string;
  unread: number;
}

interface Activity {
  time: string;
  user: string;
  action: string;
  target: string;
  type: string;
  link: string;
}

interface TeamProgress {
  sprintProgress: number;
  tasksCompleted: number;
  totalTasks: number;
  codeReviews: number;
  bugs: number;
  complianceIssues: number;
}

interface ProjectScenario {
  title: string;
  client: string;
  duration: string;
  phase: string;
  complexity: string;
  techStack: string[];
  description: string;
  compliance: string[];
}

// Define the context responses with proper typing
interface ContextResponses {
  architecture: string[];
  compliance: string[];
  general: string[];
}

const TekaiSimulation = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [simulationState, setSimulationState] = useState<'active' | 'paused'>('active');
  const [selectedView, setSelectedView] = useState('overview');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "Duc Nguyen",
      message: "Hey team! I've reviewed the payment service architecture. We need to discuss the Nordic compliance requirements.",
      timestamp: new Date(Date.now() - 300000),
      channel: "general",
      avatar: "DN"
    },
    {
      id: 2,
      sender: "Lila Virtanen", 
      message: "Good morning! Client demo is scheduled for Friday. Please ensure all features are tested by Thursday evening.",
      timestamp: new Date(Date.now() - 240000),
      channel: "general",
      avatar: "LV"
    },
    {
      id: 3,
      sender: "Mikko Laakso",
      message: "The client has approved the extended timeline for GDPR compliance. Let's focus on the payment gateway integration first.",
      timestamp: new Date(Date.now() - 120000),
      channel: "general",
      avatar: "ML"
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState('general');
  const [teamProgress, setTeamProgress] = useState<TeamProgress>({
    sprintProgress: 65,
    tasksCompleted: 12,
    totalTasks: 18,
    codeReviews: 3,
    bugs: 2,
    complianceIssues: 1
  });

  // Fixed time progression - 1 real second = 1 simulation minute
  useEffect(() => {
    const timer = setInterval(() => {
      if (simulationState === 'active') {
        setCurrentTime(prev => new Date(prev.getTime() + 60000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [simulationState]);

  // Project scenario data tailored for Tekai's fintech focus
  const projectScenario: ProjectScenario = {
    title: "Nordic Banking API Modernization",
    client: "Scandinavian Financial Group",
    duration: "12 weeks",
    phase: "Sprint 3 of 6",
    complexity: "Enterprise-level financial services",
    techStack: ["Java/Spring Boot", "React", "PostgreSQL", "Docker", "AWS", "Kafka", "OAuth2"],
    description: "Modernizing legacy banking APIs to microservices architecture with PSD2 compliance and real-time transaction processing for Nordic markets.",
    compliance: ["PSD2", "GDPR", "AML", "Local Banking Regulations"]
  };

  const teamMembers: TeamMember[] = [
    {
      name: "Lila Virtanen",
      role: "Product Owner",
      location: "Helsinki, Finland",
      timezone: "EET (UTC+2)",
      avatar: "LV",
      status: "online",
      responsibilities: ["Client communication", "Sprint planning", "Backlog prioritization"],
      availability: "09:00-17:00 EET"
    },
    {
      name: "Mikko Laakso", 
      role: "Delivery Manager",
      location: "Tampere, Finland",
      timezone: "EET (UTC+2)",
      avatar: "ML",
      status: "online",
      responsibilities: ["Team coordination", "Risk management", "Stakeholder updates"],
      availability: "08:00-16:00 EET"
    },
    {
      name: "Duc Nguyen",
      role: "Tech Lead",
      location: "Ho Chi Minh City, Vietnam", 
      timezone: "ICT (UTC+7)",
      avatar: "DN",
      status: "active",
      responsibilities: ["Architecture design", "Code review", "Mentoring team"],
      availability: "13:00-21:00 ICT"
    },
    {
      name: "You",
      role: "Senior Engineer (Candidate)",
      location: "Ho Chi Minh City, Vietnam",
      timezone: "ICT (UTC+7)", 
      avatar: "YU",
      status: "active",
      responsibilities: ["API development", "System integration", "Security implementation"],
      availability: "13:00-21:00 ICT"
    },
    {
      name: "Linh Tran",
      role: "Mid-level Engineer",
      location: "Da Nang, Vietnam",
      timezone: "ICT (UTC+7)",
      avatar: "LT", 
      status: "active",
      responsibilities: ["Frontend development", "API integration", "Testing"],
      availability: "13:00-21:00 ICT"
    },
    {
      name: "An Pham", 
      role: "Junior Engineer", 
      location: "Hanoi, Vietnam",
      timezone: "ICT (UTC+7)",
      avatar: "AP",
      status: "active",
      responsibilities: ["Bug fixes", "Documentation", "Support tasks"],
      availability: "13:00-21:00 ICT"
    }
  ];

  const currentTasks: Task[] = [
    {
      id: "BANK-234",
      title: "Implement PSD2-compliant payment API",
      type: "feature",
      priority: "high", 
      assignee: "You",
      status: "in-progress",
      description: "Develop secure payment initiation API with Strong Customer Authentication (SCA) for Nordic markets",
      timeRemaining: "3 days",
      blockers: ["Waiting for security audit results", "Need clarification on Swedish banking standards"],
      techRequirements: ["Spring Boot", "OAuth2", "JWT", "PostgreSQL", "Docker"],
      needsDiscussion: true,
      discussionWith: ["Duc Nguyen", "Lila Virtanen"],
      compliance: ["PSD2", "GDPR"]
    },
    {
      id: "BANK-235", 
      title: "Code review: Transaction monitoring service",
      type: "review",
      priority: "high",
      assignee: "Duc Nguyen", 
      status: "pending",
      description: "Review AML transaction monitoring implementation and performance optimizations",
      timeRemaining: "1 day",
      author: "Linh Tran",
      needsDiscussion: true,
      discussionWith: ["Linh Tran", "You"],
      compliance: ["AML"]
    },
    {
      id: "BANK-236",
      title: "Database schema migration for real-time analytics",
      type: "devops", 
      priority: "medium",
      assignee: "You",
      status: "todo",
      description: "Migrate legacy banking data to new microservices architecture with zero downtime",
      timeRemaining: "2 days",
      dependencies: ["BANK-234"],
      needsDiscussion: true,
      discussionWith: ["Duc Nguyen", "An Pham"],
      compliance: ["GDPR"]
    }
  ];

  const upcomingMeetings: Meeting[] = [
    {
      title: "Daily Standup",
      time: "09:00 EET / 14:00 ICT",
      duration: "15 min",
      attendees: ["All team"],
      type: "recurring",
      channel: "general"
    },
    {
      title: "PSD2 Compliance Review", 
      time: "11:00 EET / 16:00 ICT", 
      duration: "60 min",
      attendees: ["Lila", "Mikko", "Duc", "You"],
      type: "compliance",
      channel: "architecture"
    },
    {
      title: "Architecture Decision Record",
      time: "15:00 EET / 20:00 ICT",
      duration: "45 min", 
      attendees: ["Duc", "You", "Linh"],
      type: "technical",
      channel: "architecture"
    }
  ];

  const recentActivity: Activity[] = [
    {
      time: "2 min ago",
      user: "Duc Nguyen", 
      action: "approved pull request",
      target: "Payment service authentication",
      type: "approval",
      link: "#"
    },
    {
      time: "15 min ago",
      user: "Lila Virtanen",
      action: "updated compliance requirements", 
      target: "Added Swedish banking standards",
      type: "update",
      link: "#"
    },
    {
      time: "32 min ago",
      user: "An Pham",
      action: "fixed security vulnerability",
      target: "BANK-201: Input validation issue", 
      type: "resolution",
      link: "#"
    },
    {
      time: "1 hour ago",
      user: "Linh Tran",
      action: "submitted for review",
      target: "Transaction monitoring service",
      type: "submission",
      link: "#"
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Cross-timezone Compliance Coordination", 
      description: "Coordinate PSD2 and GDPR compliance requirements across Finland and Vietnam teams with 5-hour time difference",
      impact: "high",
      skills: ["Async communication", "Regulatory knowledge", "Documentation"],
      status: "active"
    },
    {
      id: 2,
      title: "Legacy System Data Migration",
      description: "Migrate sensitive banking data from monolithic system to microservices without disrupting live services",
      impact: "high", 
      skills: ["Data architecture", "Risk management", "Zero-downtime deployment"],
      status: "active"
    },
    {
      id: 3,
      title: "Real-time Transaction Processing",
      description: "Implement real-time AML monitoring while maintaining sub-100ms response times",
      impact: "medium",
      skills: ["Performance optimization", "System architecture", "Monitoring"],
      status: "pending"
    }
  ];

  const channels: Channel[] = [
    { id: 'general', name: 'General', unread: 2 },
    { id: 'architecture', name: 'Architecture', unread: 1 },
    { id: 'compliance', name: 'Compliance', unread: 0 },
    { id: 'dev-team', name: 'Dev Team', unread: 3 }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: chatMessages.length + 1,
        sender: "You",
        message: newMessage,
        timestamp: new Date(),
        channel: activeChannel,
        avatar: "YU"
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
      
      // Simulate team responses based on context
      setTimeout(() => {
        const contextResponses: ContextResponses = {
          'architecture': [
            "I've reviewed the approach. Let's consider using event sourcing for better audit trails.",
            "The microservice boundaries look good. Have we considered the failure scenarios?",
            "Good point about the database partitioning. Let me check the performance implications."
          ],
          'compliance': [
            "The GDPR requirements for data retention are clearly documented in section 4.2.",
            "We need to ensure all PSD2 endpoints have proper SCA implementation.",
            "The Swedish banking authority has updated their API standards. I'll share the document."
          ],
          'general': [
            "Thanks for the update! I'll review the changes and provide feedback.",
            "Good point. Let's discuss this in tomorrow's standup meeting.",
            "I agree with this approach. It aligns with our security guidelines."
          ]
        };

        const teamMembers = ["Duc Nguyen", "Lila Virtanen", "Mikko Laakso"];
        const randomMember = teamMembers[Math.floor(Math.random() * teamMembers.length)];
        
        // Type-safe access to contextResponses
        const responses = contextResponses[activeChannel as keyof ContextResponses] || contextResponses.general;
        
        const autoResponse: ChatMessage = {
          id: chatMessages.length + 2,
          sender: randomMember,
          message: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          channel: activeChannel,
          avatar: randomMember === "Duc Nguyen" ? "DN" : randomMember === "Lila Virtanen" ? "LV" : "ML"
        };
        setChatMessages(prev => [...prev, autoResponse]);
      }, 2000 + Math.random() * 3000);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-light text-gray-800">{projectScenario.title}</h2>
            <p className="text-gray-600 mt-1 font-light">{projectScenario.client} • {projectScenario.phase}</p>
          </div>
          <div className="text-right space-y-2">
            <span className="px-3 py-1 bg-gray-800/10 text-gray-800 rounded-full text-sm font-light block">
              Enterprise FinTech
            </span>
            <span className="px-3 py-1 bg-gray-800/20 text-gray-800 rounded-full text-sm font-light block">
              {projectScenario.duration}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mb-4 font-light leading-relaxed">{projectScenario.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-800/60" />
            <span className="text-sm text-gray-600 font-light">{projectScenario.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-800/60" />
            <span className="text-sm text-gray-600 font-light">{teamMembers.length} team members</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-800/60" />
            <span className="text-sm text-gray-600 font-light">Finland + Vietnam</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-gray-800/60" />
            <span className="text-sm text-gray-600 font-light">{currentTasks.length} active tasks</span>
          </div>
        </div>

        {/* Compliance Requirements */}
        <div className="pt-4 border-t border-gray-800/10">
          <h4 className="text-sm font-light text-gray-800 mb-2">Compliance Requirements:</h4>
          <div className="flex gap-2 flex-wrap">
            {projectScenario.compliance.map((req, index) => (
              <span key={index} className="px-2 py-1 bg-gray-800/10 text-gray-800 text-xs rounded font-light">
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sprint Progress */}
      <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-light text-gray-800 mb-4">Sprint Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-light text-gray-800">{teamProgress.sprintProgress}%</div>
            <div className="text-sm text-gray-600 font-light">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-gray-800">{teamProgress.tasksCompleted}/{teamProgress.totalTasks}</div>
            <div className="text-sm text-gray-600 font-light">Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-gray-800">{teamProgress.codeReviews}</div>
            <div className="text-sm text-gray-600 font-light">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-gray-800">{teamProgress.bugs}</div>
            <div className="text-sm text-gray-600 font-light">Bugs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-gray-800">{teamProgress.complianceIssues}</div>
            <div className="text-sm text-gray-600 font-light">Compliance</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1 font-light">
            <span>Sprint 3 Progress</span>
            <span>{teamProgress.sprintProgress}%</span>
          </div>
          <div className="w-full bg-gray-800/20 rounded-full h-1">
            <div 
              className="bg-gray-800 h-1 rounded-full transition-all duration-300" 
              style={{ width: `${teamProgress.sprintProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Current Challenges */}
      <div className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-light text-gray-800 mb-4">Key Challenges</h3>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="border-l-4 border-gray-800/40 pl-4 py-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-light text-gray-800">{challenge.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-light ${
                      challenge.impact === 'high' ? 'bg-gray-800/20 text-gray-800' :
                      'bg-gray-800/10 text-gray-800'
                    }`}>
                      {challenge.impact} impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-light leading-relaxed">{challenge.description}</p>
                  <div className="flex gap-2 mt-2">
                    {challenge.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800/10 text-gray-800 text-xs rounded font-light">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-light text-gray-800">Your Current Tasks</h3>
        <span className="text-sm text-gray-600 font-light">{currentTasks.length} active tasks</span>
      </div>
      
      {currentTasks.map((task) => (
        <div key={task.id} className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-light text-gray-600">{task.id}</span>
                <span className={`px-2 py-1 rounded text-xs font-light ${
                  task.priority === 'high' ? 'bg-gray-800/20 text-gray-800' :
                  task.priority === 'medium' ? 'bg-gray-800/10 text-gray-800' :
                  'bg-gray-800/5 text-gray-800'
                }`}>
                  {task.priority} priority
                </span>
              </div>
              <h4 className="font-light text-gray-800 text-lg mb-2">{task.title}</h4>
              <p className="text-gray-600 text-sm font-light leading-relaxed">{task.description}</p>
            </div>
            <div className="text-right ml-4">
              <span className={`px-3 py-1 rounded-full text-sm font-light ${
                task.status === 'in-progress' ? 'bg-gray-800/10 text-gray-800' :
                task.status === 'pending' ? 'bg-gray-800/20 text-gray-800' :
                'bg-gray-800/5 text-gray-800'
              }`}>
                {task.status.replace('-', ' ')}
              </span>
              <div className="text-sm text-gray-600 mt-1 font-light flex items-center gap-1 justify-end">
                <Timer className="h-3 w-3" />
                {task.timeRemaining}
              </div>
            </div>
          </div>
          
          {/* Compliance Tags */}
          {task.compliance && (
            <div className="mb-3">
              <div className="text-sm font-light text-gray-800 mb-1">Compliance:</div>
              <div className="flex gap-1 flex-wrap">
                {task.compliance.map((comp, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-800/10 text-gray-800 text-xs rounded font-light">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tech Requirements */}
          {task.techRequirements && (
            <div className="mb-3">
              <div className="text-sm font-light text-gray-800 mb-1">Tech Stack:</div>
              <div className="flex gap-1 flex-wrap">
                {task.techRequirements.map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-800/10 text-gray-800 text-xs rounded font-light">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Blockers */}
          {task.blockers && (
            <div className="mb-3">
              <div className="flex items-center gap-1 text-sm font-light text-gray-800 mb-1">
                <AlertCircle className="h-3 w-3" />
                Blockers:
              </div>
              <ul className="text-sm text-gray-600 font-light">
                {task.blockers.map((blocker, index) => (
                  <li key={index}>• {blocker}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Discussion Needed */}
          {task.needsDiscussion && (
            <div className="mb-3 p-3 bg-gray-800/5 rounded-lg border border-gray-800/10">
              <div className="flex items-center gap-1 text-sm font-light text-gray-800 mb-1">
                <MessageSquare className="h-3 w-3" />
                Discussion needed with:
              </div>
              <div className="flex gap-2 mb-2">
                {task.discussionWith?.map((person, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-800/10 text-gray-800 text-xs rounded font-light">
                    {person}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => {
                  setSelectedView('chat');
                  setActiveChannel('architecture');
                }}
                className="text-sm font-light text-gray-800 hover:opacity-80 transition-opacity flex items-center gap-1"
              >
                <ArrowRight className="h-3 w-3" />
                Start discussion in chat
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-800/10">
            <div className="text-sm text-gray-600 font-light">
              Assigned to: <span className="font-light text-gray-800">{task.assignee}</span>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-800 text-gray-200 text-sm rounded hover:bg-gray-800/80 transition-colors font-light">
                Update Progress
              </button>
              <button className="px-3 py-1 bg-gray-800/10 text-gray-800 text-sm rounded hover:bg-gray-800/20 transition-colors font-light">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-light text-gray-800">Team Members</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <div key={member.name} className="bg-gray-200 border border-gray-800/10 rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800/10 rounded-full flex items-center justify-center text-gray-800 font-light">
                  {member.avatar}
                </div>
                <div>
                  <h4 className="font-light text-gray-800">{member.name}</h4>
                  <p className="text-sm text-gray-600 font-light">{member.role}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-light ${
                member.status === 'online' ? 'bg-gray-800/20 text-gray-800' :
                'bg-gray-800/10 text-gray-800'
              }`}>
                {member.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-gray-800/60" />
                <span className="text-gray-600 font-light">{member.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-gray-800/60" />
                <span className="text-gray-600 font-light">{member.timezone} • {member.availability}</span>
              </div>
            </div>

            <div>
              <div className="text-sm font-light text-gray-800 mb-1">Responsibilities:</div>
              <ul className="text-sm text-gray-600 space-y-1 font-light">
                {member.responsibilities.map((resp, idx) => (
                  <li key={idx}>• {resp}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="h-full flex flex-col">
      {/* Channel Header */}
      <div className="bg-gray-200 border border-gray-800/10 rounded-t-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-light text-gray-800">Team Chat</h3>
          <div className="flex gap-2">
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`px-3 py-1 rounded-full text-sm font-light transition-colors ${
                  activeChannel === channel.id
                    ? 'bg-gray-800 text-gray-200'
                    : 'bg-gray-800/10 text-gray-800 hover:bg-gray-800/20'
                }`}
              >
                {channel.name}
                {channel.unread > 0 && (
                  <span className="ml-1 bg-gray-200 text-gray-800 rounded-full px-1 text-xs">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-gray-200 border border-gray-800/10 border-t-0 rounded-b-xl p-4 overflow-y-auto">
        <div className="space-y-4">
          {chatMessages
            .filter(msg => msg.channel === activeChannel)
            .map((message) => (
              <div key={message.id} className="flex gap-3">
                <div className="w-8 h-8 bg-gray-800/10 rounded-full flex items-center justify-center text-sm font-light text-gray-800">
                  {message.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-light text-gray-800">{message.sender}</span>
                    <span className="text-xs text-gray-600 font-light">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-800 font-light leading-relaxed">{message.message}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={`Message #${activeChannel}...`}
          className="flex-1 px-4 py-2 border border-gray-800/20 rounded-lg bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent font-light"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-800/80 transition-colors font-light"
        >
          Send
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased relative overflow-hidden">
      {/* Background texture matching onboarding */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}>
      </div>

      {/* Header */}
      <div className="relative bg-gray-200/90 backdrop-blur-md border-b border-gray-800/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-gray-800" />
              <h1 className="text-xl font-light text-gray-800">Tekai Project Simulation</h1>
            </div>
            <span className="px-3 py-1 bg-gray-800/10 text-gray-800 rounded-full text-sm font-light">
              Fin-Viet Banking Modernization
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 font-light">
              Simulation: {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSimulationState(simulationState === 'active' ? 'paused' : 'active')}
                className={`p-2 rounded-full transition-colors ${
                  simulationState === 'active' 
                    ? 'bg-gray-800/10 text-gray-800 hover:bg-gray-800/20' 
                    : 'bg-gray-800/20 text-gray-800 hover:bg-gray-800/30'
                }`}
              >
                {simulationState === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button 
                onClick={() => {
                  setCurrentTime(new Date());
                  setSimulationState('active');
                }}
                className="p-2 rounded-full bg-gray-800/10 text-gray-800 hover:bg-gray-800/20 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-200/90 backdrop-blur-md border-r border-gray-800/10 h-full overflow-y-auto">
          <div className="p-4">
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Project Overview', icon: Target },
                { id: 'tasks', label: 'My Tasks', icon: CheckCircle },
                { id: 'team', label: 'Team', icon: Users },
                { id: 'chat', label: 'Team Chat', icon: MessageSquare },
                { id: 'meetings', label: 'Meetings', icon: Video },
                { id: 'activity', label: 'Activity', icon: Bell }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors font-light ${
                    selectedView === item.id 
                      ? 'bg-gray-800/10 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-800/5'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Team Status */}
          <div className="p-4 border-t border-gray-800/10">
            <h4 className="text-sm font-light text-gray-800 mb-3">Team Availability</h4>
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    member.status === 'online' ? 'bg-gray-800' : 'bg-gray-800/40'
                  }`}></div>
                  <span className="text-sm text-gray-600 font-light truncate">{member.name}</span>
                  <span className="text-xs text-gray-500 font-light">{member.availability.split('-')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Meeting */}
          <div className="p-4 border-t border-gray-800/10">
            <h4 className="text-sm font-light text-gray-800 mb-3">Next Meeting</h4>
            <div className="text-sm">
              <div className="font-light text-gray-800">{upcomingMeetings[0].title}</div>
              <div className="text-gray-600 font-light">{upcomingMeetings[0].time}</div>
              <div className="text-gray-500 font-light">{upcomingMeetings[0].duration}</div>
              <button 
                onClick={() => {
                  setSelectedView('chat');
                  setActiveChannel(upcomingMeetings[0].channel);
                }}
                className="text-xs font-light text-gray-800 hover:opacity-80 transition-opacity mt-1 flex items-center gap-1"
              >
                <MessageSquare className="h-3 w-3" />
                Join discussion
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {selectedView === 'overview' && renderOverview()}
            {selectedView === 'tasks' && renderTasks()}
            {selectedView === 'team' && renderTeam()}
            {selectedView === 'chat' && renderChat()}
            {selectedView === 'meetings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-light text-gray-800">Upcoming Meetings</h3>
                {upcomingMeetings.map((meeting, index) => (
                  <div key={index} className="bg-gray-200 border border-gray-800/10 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-light text-gray-800 text-lg mb-1">{meeting.title}</h4>
                        <p className="text-sm text-gray-600 font-light">{meeting.time} • {meeting.duration}</p>
                        <p className="text-sm text-gray-500 font-light">Attendees: {meeting.attendees.join(', ')}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedView('chat');
                            setActiveChannel(meeting.channel);
                          }}
                          className="px-3 py-1 bg-gray-800/10 text-gray-800 text-sm rounded hover:bg-gray-800/20 transition-colors font-light"
                        >
                          Discuss
                        </button>
                        <button className="px-3 py-1 bg-gray-800 text-gray-200 text-sm rounded hover:bg-gray-800/80 transition-colors font-light">
                          Join Meeting
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedView === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-light text-gray-800">Recent Activity</h3>
                <div className="bg-gray-200 border border-gray-800/10 rounded-xl shadow-sm">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className={`p-4 ${index < recentActivity.length - 1 ? 'border-b border-gray-800/10' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'approval' ? 'bg-gray-800' :
                          activity.type === 'update' ? 'bg-gray-800/80' :
                          activity.type === 'resolution' ? 'bg-gray-800/60' :
                          'bg-gray-800/40'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 font-light">
                            <span className="font-light">{activity.user}</span> {activity.action}{' '}
                            <span className="font-light">{activity.target}</span>
                          </p>
                          <p className="text-xs text-gray-600 font-light">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TekaiSimulation;