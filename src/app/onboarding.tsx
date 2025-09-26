"use client"
import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, Upload, FileText, Linkedin, GraduationCap, Building, Code, BookOpen, Target, Briefcase, Calendar, Star, Rocket, CheckCircle, User, Github, Globe, Mail, Loader2, Brain, Sparkles } from 'lucide-react';

// Mock implementations for external dependencies
const useToast = () => ({
  toast: ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
    alert(`${title}\n${description}`);
  }
});

const useNavigate = () => (path: string) => {
  console.log(`Navigate to: ${path}`);
  alert(`Would navigate to: ${path}`);
};

const useUser = () => ({
  user: {
    fullName: 'John Doe',
    primaryEmailAddress: { emailAddress: 'john@example.com' }
  },
  isLoaded: true,
  isSignedIn: true
});

// AI Service Configuration
const AI_CONFIG = {
  apiEndpoint: '/api/ai/analyze-profile',
  model: 'claude-3-sonnet',
  timeout: 30000
};

interface UserProfile {
  name: string;
  email: string;
  userType: string;
  experience: string;
  skills: string[];
  currentRole: string;
  yearsExperience: number;
  linkedinUrl: string;
  githubUrl: string;
  resumeFile: File | null;
  careerGoals: string[];
  education: string;
  certifications: string[];
  previousRoles: string[];
  projects: string[];
  aiAnalysisComplete: boolean;
}

interface ProjectSuggestion {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  skills: string[];
  type: string;
  icon: React.ElementType;
  matchScore: number;
  reasoning: string;
}

interface AIAnalysisResult {
  profile: Partial<UserProfile>;
  projects: ProjectSuggestion[];
  confidence: number;
  analysisType: 'resume' | 'linkedin' | 'manual' | 'hybrid';
}

const DevOnboarding = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiAnalysisProgress, setAiAnalysisProgress] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    userType: '',
    experience: '',
    skills: [],
    currentRole: '',
    yearsExperience: 0,
    linkedinUrl: '',
    githubUrl: '',
    resumeFile: null,
    careerGoals: [],
    education: '',
    certifications: [],
    previousRoles: [],
    projects: [],
    aiAnalysisComplete: false
  });

  const [suggestedProjects, setSuggestedProjects] = useState<ProjectSuggestion[]>([]);
  const [aiConfidence, setAiConfidence] = useState(0);

  // Pre-fill user data if available
  React.useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setProfile(prev => ({
        ...prev,
        name: user.fullName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
      }));
    }
  }, [user]);

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
    { title: 'Welcome to [SIMULABS]', subtitle: 'Real team experience for developers', progress: 0 },
    { title: 'What brings you here?', subtitle: 'Tell us about your situation', progress: 16 },
    { title: 'Your experience level', subtitle: 'Help us understand your background', progress: 33 },
    { title: 'Share your profile', subtitle: 'Upload resume or LinkedIn for AI analysis', progress: 50 },
    { title: 'AI Profile Analysis', subtitle: 'Our AI is analyzing your background...', progress: 66 },
    { title: 'Personalized Projects', subtitle: 'AI-recommended projects based on your profile', progress: 83 },
    { title: 'Ready to start!', subtitle: 'Join your first development team', progress: 100 }
  ];

  const handleStepTransition = (nextStep: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setIsAnimating(false);
    }, 300);
  };

  const handleUserTypeSelect = (type: string) => {
    setProfile(prev => ({ ...prev, userType: type }));
    setTimeout(() => handleStepTransition(2), 800);
  };

  const handleExperienceSelect = (level: string, years: number) => {
    setProfile(prev => ({ ...prev, experience: level, yearsExperience: years }));
    setTimeout(() => handleStepTransition(3), 800);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfile(prev => ({ ...prev, resumeFile: file }));
    }
  };

  // Main AI Analysis Function
  const analyzeProfileWithAI = async () => {
    setIsProcessing(true);
    setAiAnalysisProgress('Initializing AI analysis...');
    
    try {
      let analysisResult: AIAnalysisResult;
      
      if (profile.resumeFile) {
        analysisResult = await analyzeResumeWithAI(profile.resumeFile);
      } else if (profile.linkedinUrl) {
        analysisResult = await analyzeLinkedInWithAI(profile.linkedinUrl);
      } else {
        analysisResult = await analyzeManualInputWithAI();
      }
      
      // Update profile with AI analysis
      setProfile(prev => ({ 
        ...prev, 
        ...analysisResult.profile,
        aiAnalysisComplete: true 
      }));
      
      setSuggestedProjects(analysisResult.projects);
      setAiConfidence(analysisResult.confidence);
      
      toast({
        title: "🧠 AI Analysis Complete!",
        description: `Analyzed your profile with ${analysisResult.confidence}% confidence`,
      });
      
    } catch (error) {
      console.error('AI Analysis Error:', error);
      toast({
        title: "AI Analysis Failed",
        description: "We'll use your basic info to create recommendations",
      });
      
      // Fallback to basic analysis
      await fallbackAnalysis();
    }
    
    setIsProcessing(false);
    handleStepTransition(5);
  };

  // Resume Analysis with AI
  const analyzeResumeWithAI = async (file: File): Promise<AIAnalysisResult> => {
    setAiAnalysisProgress('Extracting text from resume...');
    const resumeText = await extractTextFromFile(file);
    
    setAiAnalysisProgress('AI analyzing resume content...');
    const aiPrompt = createResumeAnalysisPrompt(resumeText);
    const aiResponse = await callAIService(aiPrompt);
    
    setAiAnalysisProgress('Generating project recommendations...');
    const projects = await generateAIProjectRecommendations(aiResponse.profile);
    
    return {
      profile: aiResponse.profile,
      projects,
      confidence: 85,
      analysisType: 'resume'
    };
  };

  // LinkedIn Analysis with AI
  const analyzeLinkedInWithAI = async (linkedinUrl: string): Promise<AIAnalysisResult> => {
    setAiAnalysisProgress('Fetching LinkedIn profile data...');
    // In production, this would use LinkedIn API or web scraping
    const linkedinData = await mockLinkedInFetch(linkedinUrl);
    
    setAiAnalysisProgress('AI analyzing LinkedIn profile...');
    const aiPrompt = createLinkedInAnalysisPrompt(linkedinData);
    const aiResponse = await callAIService(aiPrompt);
    
    setAiAnalysisProgress('Generating project recommendations...');
    const projects = await generateAIProjectRecommendations(aiResponse.profile);
    
    return {
      profile: aiResponse.profile,
      projects,
      confidence: 75,
      analysisType: 'linkedin'
    };
  };

  // Manual Input Analysis with AI
  const analyzeManualInputWithAI = async (): Promise<AIAnalysisResult> => {
    setAiAnalysisProgress('AI analyzing your selections...');
    const manualData = {
      name: profile.name,
      email: profile.email,
      userType: profile.userType,
      experience: profile.experience,
      yearsExperience: profile.yearsExperience
    };
    
    const aiPrompt = createManualAnalysisPrompt(manualData);
    const aiResponse = await callAIService(aiPrompt);
    
    setAiAnalysisProgress('Generating personalized recommendations...');
    const projects = await generateAIProjectRecommendations(aiResponse.profile);
    
    return {
      profile: aiResponse.profile,
      projects,
      confidence: 60,
      analysisType: 'manual'
    };
  };

  // Core AI Service Call
  const callAIService = async (prompt: string): Promise<{ profile: Partial<UserProfile> }> => {
    // Simulate AI API call - in production, replace with actual AI service
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAIResponse = {
      profile: await simulateAIAnalysis(prompt)
    };
    
    return mockAIResponse;
  };

  // AI Prompt Creation Functions
  const createResumeAnalysisPrompt = (resumeText: string): string => {
    return `
Analyze this resume and extract detailed professional information:

Resume Content:
${resumeText}

User Context:
- Selected user type: ${profile.userType}
- Self-reported experience: ${profile.experience}

Please extract and infer:
1. Professional details (name, email, current role, years of experience)
2. Technical skills (programming languages, frameworks, tools)
3. Career trajectory and goals based on experience
4. Education and certifications
5. Notable projects or achievements
6. GitHub/portfolio URLs if mentioned

Return structured data that helps match them with appropriate development projects.
Focus on their technical capabilities and career growth areas.
    `;
  };

  const createLinkedInAnalysisPrompt = (linkedinData: string): string => {
    return `
Analyze this LinkedIn profile data for a developer seeking team experience:

LinkedIn Data:
${linkedinData}

User Context:
- Selected user type: ${profile.userType}
- Self-reported experience: ${profile.experience}

Extract professional information and recommend development focus areas.
Pay attention to their network, endorsements, and career progression.
    `;
  };

  const createManualAnalysisPrompt = (manualData: any): string => {
    return `
Based on limited user input, create a comprehensive developer profile:

User Input:
${JSON.stringify(manualData, null, 2)}

Infer realistic profile details including:
- Appropriate technical skills for their experience level
- Suitable career goals for their user type
- Relevant project interests
- Learning priorities

Make intelligent assumptions based on typical developer career paths.
    `;
  };

  // File Processing Functions
  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          let extractedText = '';
          
          if (file.type === 'application/pdf') {
            // In production, use PDF.js or pdf-parse
            extractedText = await mockPDFExtraction(arrayBuffer);
          } else if (file.type.includes('word')) {
            // In production, use mammoth.js for Word documents
            extractedText = await mockWordExtraction(arrayBuffer);
          } else {
            // For plain text files
            extractedText = new TextDecoder().decode(arrayBuffer);
          }
          
          resolve(extractedText);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  // Mock file extraction functions (replace with real libraries in production)
  const mockPDFExtraction = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `
JANE SMITH
Senior Full Stack Developer
jane.smith@email.com | +1-555-0199 | github.com/janesmith

PROFESSIONAL EXPERIENCE

Senior Full Stack Developer | TechInnovate Inc. | 2021 - Present
• Lead development of React-based web applications serving 100K+ users
• Architected microservices using Node.js, Docker, and AWS
• Mentored team of 5 junior developers
• Implemented CI/CD pipelines reducing deployment time by 60%

Full Stack Developer | StartupHub | 2019 - 2021
• Built scalable web applications using React, Node.js, and PostgreSQL
• Collaborated with product team using Agile methodologies
• Contributed to 40% improvement in application performance

Junior Developer | CodeCraft Solutions | 2017 - 2019
• Developed frontend components using JavaScript and React
• Participated in code reviews and testing processes

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, Go
Frontend: React, Next.js, Vue.js, HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express, Django, REST APIs, GraphQL
Databases: PostgreSQL, MongoDB, Redis
Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes
Tools: Git, Jenkins, Jira, Figma

EDUCATION
Bachelor of Computer Science | State University | 2013-2017

PROJECTS
• E-commerce Platform: Built full-stack marketplace with 10K+ products
• Real-time Chat App: WebSocket-based messaging with 1K concurrent users
• Open Source Contributions: Contributor to popular React libraries
    `;
  };

  const mockWordExtraction = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return "Mock Word document extraction - similar resume content";
  };

  const mockLinkedInFetch = async (url: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `
LinkedIn Profile: ${url}
Name: Alex Rodriguez
Title: Software Engineer at Google
Experience: 4 years
Skills: Python, Machine Learning, TensorFlow, Django
Education: MS Computer Science, Stanford
Connections: 500+
Recent Activity: Posted about AI/ML trends
    `;
  };

  // AI Simulation (replace with actual AI service)
  const simulateAIAnalysis = async (prompt: string): Promise<Partial<UserProfile>> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Extract key information from prompt to create realistic profile
    const isResume = prompt.includes('Resume Content:');
    const isLinkedIn = prompt.includes('LinkedIn Data:');
    
    let aiGeneratedProfile: Partial<UserProfile> = {};
    
    if (isResume) {
      aiGeneratedProfile = {
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        currentRole: 'Senior Full Stack Developer',
        yearsExperience: 6,
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
        education: 'Bachelor of Computer Science',
        certifications: ['AWS Certified Developer'],
        previousRoles: ['Junior Developer', 'Full Stack Developer', 'Senior Full Stack Developer'],
        projects: ['E-commerce Platform', 'Real-time Chat App', 'Open Source Contributions'],
        careerGoals: ['Technical Leadership', 'System Architecture', 'Team Mentoring'],
        githubUrl: 'https://github.com/janesmith'
      };
    } else if (isLinkedIn) {
      aiGeneratedProfile = {
        name: 'Alex Rodriguez',
        currentRole: 'Software Engineer',
        yearsExperience: 4,
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'Django', 'JavaScript'],
        education: 'MS Computer Science',
        careerGoals: ['AI/ML Engineering', 'Senior Engineer Role', 'Research & Development'],
        linkedinUrl: profile.linkedinUrl
      };
    } else {
      // Manual input analysis
      const experienceMap = {
        'Complete Beginner': {
          skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
          currentRole: 'Aspiring Developer',
          yearsExperience: 0,
          careerGoals: ['Learn Programming Fundamentals', 'Build First Projects', 'Land First Job']
        },
        'Some Experience': {
          skills: ['JavaScript', 'React', 'Node.js', 'Git', 'CSS', 'HTML'],
          currentRole: 'Junior Developer',
          yearsExperience: 1,
          careerGoals: ['Master Full Stack Development', 'Join Development Team', 'Build Portfolio']
        },
        'Intermediate': {
          skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'Git'],
          currentRole: 'Software Developer',
          yearsExperience: 3,
          careerGoals: ['Senior Developer Role', 'System Design', 'Technical Leadership']
        },
        'Advanced': {
          skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Kubernetes', 'PostgreSQL', 'Redis'],
          currentRole: 'Senior Software Engineer',
          yearsExperience: 7,
          careerGoals: ['Technical Architecture', 'Team Leadership', 'Mentoring Developers']
        }
      };
      
      const experienceData = experienceMap[profile.experience as keyof typeof experienceMap];
      aiGeneratedProfile = {
        name: profile.name || 'Developer',
        email: profile.email,
        ...experienceData
      };
    }
    
    return aiGeneratedProfile;
  };

  // AI-Generated Project Recommendations
  const generateAIProjectRecommendations = async (profileData: Partial<UserProfile>): Promise<ProjectSuggestion[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const skills = profileData.skills || [];
    const experience = profileData.yearsExperience || 0;
    const userType = profile.userType;
    
    // AI would analyze the profile and generate personalized projects
    let projects: ProjectSuggestion[] = [];
    
    if (experience === 0 || userType === 'Student') {
      projects = [
        {
          title: 'Interactive Portfolio Website',
          description: 'Build a responsive portfolio showcasing your projects with modern web technologies. Perfect for learning HTML, CSS, and JavaScript fundamentals.',
          difficulty: 'Beginner',
          duration: '1-2 weeks',
          skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
          type: 'Frontend',
          icon: Globe,
          matchScore: 95,
          reasoning: 'Perfect first project to learn web fundamentals and create something you can use.'
        },
        {
          title: 'Task Management App',
          description: 'Create a simple todo application with local storage. Learn DOM manipulation, event handling, and basic data persistence.',
          difficulty: 'Beginner',
          duration: '1 week',
          skills: ['JavaScript', 'HTML', 'CSS', 'Local Storage'],
          type: 'Web App',
          icon: CheckCircle,
          matchScore: 90,
          reasoning: 'Great for practicing JavaScript basics and building something useful.'
        }
      ];
    } else if (experience <= 2) {
      projects = [
        {
          title: 'Weather Dashboard with API',
          description: 'Build a weather app that fetches data from external APIs. Learn about asynchronous JavaScript, API integration, and responsive design.',
          difficulty: 'Intermediate',
          duration: '2-3 weeks',
          skills: ['React', 'API Integration', 'CSS', 'JavaScript'],
          type: 'Frontend + API',
          icon: Target,
          matchScore: 88,
          reasoning: 'Builds on your React knowledge while introducing API concepts.'
        },
        {
          title: 'Recipe Sharing Platform',
          description: 'Full-stack application where users can share and discover recipes. Practice database design, authentication, and CRUD operations.',
          difficulty: 'Intermediate',
          duration: '3-4 weeks',
          skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Authentication'],
          type: 'Full Stack',
          icon: Code,
          matchScore: 85,
          reasoning: 'Perfect for learning full-stack development with technologies you know.'
        }
      ];
    } else if (experience <= 5) {
      projects = [
        {
          title: 'Real-time Collaboration Tool',
          description: 'Build a Slack-like application with real-time messaging, file sharing, and team management. Focus on WebSocket implementation and scalability.',
          difficulty: 'Advanced',
          duration: '4-6 weeks',
          skills: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
          type: 'Full Stack + Real-time',
          icon: Building,
          matchScore: 92,
          reasoning: 'Challenges your skills with real-time features and system design.'
        },
        {
          title: 'Microservices E-commerce',
          description: 'Design and implement a scalable e-commerce platform using microservices architecture. Learn about service communication and deployment.',
          difficulty: 'Advanced',
          duration: '6-8 weeks',
          skills: ['Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'API Gateway'],
          type: 'Backend + DevOps',
          icon: Target,
          matchScore: 87,
          reasoning: 'Great for learning enterprise-level architecture and deployment.'
        }
      ];
    } else {
      projects = [
        {
          title: 'Distributed Task Processing System',
          description: 'Build a high-performance task queue system similar to Celery. Focus on distributed systems, monitoring, and performance optimization.',
          difficulty: 'Expert',
          duration: '8-10 weeks',
          skills: ['Python', 'Redis', 'Docker', 'Kubernetes', 'Monitoring'],
          type: 'Infrastructure',
          icon: Target,
          matchScore: 90,
          reasoning: 'Perfect for senior developers looking to deepen infrastructure knowledge.'
        },
        {
          title: 'Multi-tenant SaaS Platform',
          description: 'Complete SaaS application with multi-tenancy, billing integration, admin dashboards, and enterprise features.',
          difficulty: 'Expert',
          duration: '10-12 weeks',
          skills: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS', 'Monitoring'],
          type: 'Full Stack + SaaS',
          icon: Building,
          matchScore: 88,
          reasoning: 'Comprehensive project covering all aspects of modern SaaS development.'
        }
      ];
    }
    
    return projects;
  };

  // Fallback analysis if AI fails
  const fallbackAnalysis = async () => {
    const basicProfile = {
      name: profile.name || 'Developer',
      email: profile.email,
      currentRole: `${profile.userType} Developer`,
      skills: ['JavaScript', 'HTML', 'CSS'],
      careerGoals: ['Learn Development', 'Build Projects']
    };
    
    setProfile(prev => ({ ...prev, ...basicProfile }));
    setSuggestedProjects([
      {
        title: 'Getting Started Project',
        description: 'A beginner-friendly project to start your development journey.',
        difficulty: 'Beginner',
        duration: '1-2 weeks',
        skills: ['HTML', 'CSS', 'JavaScript'],
        type: 'Web Development',
        icon: Code,
        matchScore: 70,
        reasoning: 'Basic project to get you started.'
      }
    ]);
    setAiConfidence(50);
  };

  const saveUserProfile = async (userProfile: UserProfile) => {
    try {
      console.log('Saving AI-analyzed user profile:', userProfile);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Profile saved successfully' };
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      await saveUserProfile(profile);
      
      toast({
        title: "🎉 AI-Powered Profile Created!",
        description: "Let's start your personalized development journey!",
      });
      
      setTimeout(() => {
        navigate('/projects');
      }, 1500);
    } catch (error) {
      console.error('Error saving user profile:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Let's try that again",
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Welcome
        return (
          <div className="text-center space-y-12 h-[calc(100vh-200px)] flex flex-col justify-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-light leading-tight text-gray-800">
                  Welcome to [SIMULABS]
                </h1>
                <h2 className="text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed text-gray-600">
                  AI-powered team experience for developers. Get personalized project recommendations and work with intelligent teammates.
                </h2>
              </div>
              
              <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span>AI-powered analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Personalized recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Real project workflows</span>
                </div>
              </div>
              
              <div className="pt-6">
                <button 
                  className="group inline-flex items-center space-x-3 px-12 py-4 bg-gray-800 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
                  onClick={() => handleStepTransition(1)}
                >
                  <span className="text-xl font-light">Start AI Analysis</span>
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        );

      case 1: // User Type
        return (
          <div className="space-y-8 py-4">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
                What brings you here?
              </h1>
              <h2 className="text-lg font-light text-gray-600">
                This helps our AI understand your goals and create personalized recommendations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {userTypes.map((item, index) => (
                <div 
                  key={item.type}
                  className={`p-6 text-center border border-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 group bg-white shadow-sm hover:shadow-md`}
                  onClick={() => handleUserTypeSelect(item.type)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-gray-800 transition-colors">
                      <item.icon className="h-6 w-6 text-gray-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">{item.type}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2: // Experience Level
        return (
          <div className="space-y-8 py-4">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
                Your experience level
              </h1>
              <h2 className="text-lg font-light text-gray-600">
                Our AI will use this to calibrate the difficulty of recommended projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {experienceLevels.map((item, index) => (
                <div 
                  key={item.level}
                  className="p-8 text-center border border-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 group bg-white shadow-sm hover:shadow-md"
                  onClick={() => handleExperienceSelect(item.level, item.years)}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-gray-800 transition-colors">
                      <item.icon className="h-8 w-8 text-gray-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800">{item.level}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Profile Upload
        return (
          <div className="space-y-8 max-w-2xl mx-auto py-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
                AI Profile Analysis
              </h1>
              <h2 className="text-lg font-light text-gray-600">
                Upload your resume or share your LinkedIn for personalized AI analysis
              </h2>
            </div>

            <div className="space-y-6">
              {/* LinkedIn URL */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  LinkedIn Profile (Recommended for AI analysis)
                </label>
                <input
                  type="url"
                  value={profile.linkedinUrl}
                  onChange={(e) => setProfile(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                  placeholder="https://linkedin.com/in/yourname"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <p className="text-xs text-gray-500">
                  AI will analyze your experience, skills, and career progression
                </p>
              </div>

              <div className="text-center text-gray-500 font-light">or</div>

              {/* Resume Upload */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Upload Resume/CV for AI Analysis
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-3">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto group-hover:text-blue-500 transition-colors" />
                    <p className="text-sm text-gray-600">
                      {profile.resumeFile ? (
                        <span className="text-green-600 font-medium">{profile.resumeFile.name}</span>
                      ) : (
                        'Click to upload PDF, DOC, or DOCX'
                      )}
                    </p>
                    <p className="text-xs text-gray-400">
                      AI will extract skills, experience, projects, and career goals
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Manual Info Fallback */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Or provide basic info for AI analysis:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-6">
              <button
                className="inline-flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={analyzeProfileWithAI}
                disabled={!profile.resumeFile && !profile.linkedinUrl && (!profile.name || !profile.email)}
              >
                <Brain className="h-5 w-5" />
                <span className="font-light">Start AI Analysis</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-xs text-gray-500 mt-2">
                AI analysis takes 10-30 seconds
              </p>
            </div>
          </div>
        );

      case 4: // AI Processing
        return (
          <div className="text-center space-y-8 h-[calc(100vh-200px)] flex flex-col justify-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Brain className="w-10 h-10 text-blue-600 animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
                AI Analyzing Your Profile
              </h1>
              <h2 className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
                {aiAnalysisProgress || 'Our AI is analyzing your background to create personalized recommendations...'}
              </h2>
              
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
              
              <div className="max-w-md mx-auto">
                <div className="text-xs text-gray-500 space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-3 h-3 text-yellow-500" />
                    <span>Extracting skills and experience</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Target className="w-3 h-3 text-green-500" />
                    <span>Matching with suitable projects</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Rocket className="w-3 h-3 text-blue-500" />
                    <span>Creating personalized roadmap</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // AI Project Suggestions
        return (
          <div className="space-y-8 py-4">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">AI Confidence: {aiConfidence}%</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
                Your AI-Recommended Projects
              </h1>
              <h2 className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
                Based on your profile as <strong>{profile.currentRole}</strong>, our AI selected these projects to accelerate your growth
              </h2>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {suggestedProjects.map((project, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <project.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-medium text-gray-800">{project.title}</h3>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {project.matchScore}% match
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            project.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {project.difficulty}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 leading-relaxed">{project.description}</p>
                      
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                        <p className="text-sm text-blue-800">
                          <strong>AI Insight:</strong> {project.reasoning}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Code className="w-4 h-4" />
                          <span>{project.type}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <span key={skill} className={`px-2 py-1 text-xs rounded ${
                            profile.skills?.includes(skill) 
                              ? 'bg-green-100 text-green-700 border border-green-200' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {skill}
                            {profile.skills?.includes(skill) && ' ✓'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-6">
              <button
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
                onClick={() => handleStepTransition(6)}
              >
                <span className="text-lg font-light">Start My AI-Recommended Journey</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        );

      case 6: // Ready
        return (
          <div className="text-center space-y-8 py-4">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
                AI Profile Complete!
              </h1>
              <h2 className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
                Welcome <strong>{profile.name || 'Developer'}</strong>! Your AI-analyzed profile is ready. Start your personalized development journey with intelligent teammates.
              </h2>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-800">AI-Analyzed Profile</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {aiConfidence}% confidence
                  </span>
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{profile.currentRole}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{profile.yearsExperience} years experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{profile.skills?.length || 0} skills identified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{suggestedProjects.length} AI-recommended projects</span>
                  </div>
                  {profile.education && (
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{profile.education}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-6">
                <button 
                  className="inline-flex items-center space-x-3 px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
                  onClick={handleSubmit}
                >
                  <span className="text-xl font-light">Join My AI-Matched Team</span>
                  <Rocket className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Progress Bubbles Component
  const ProgressBubbles = () => (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex items-center gap-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`rounded-full transition-all duration-300 ${
              index === currentStep
                ? 'w-8 h-2 bg-gradient-to-r from-blue-600 to-purple-600'
                : index < currentStep
                ? 'w-2 h-2 bg-blue-600 opacity-60'
                : 'w-2 h-2 bg-gray-400 opacity-20'
            }`}
          />
        ))}
      </div>
    </div>
  );

  // Show loading while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="text-gray-600">Loading AI-powered onboarding...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-blue-400/5 animate-pulse"></div>
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}>
      </div>

      {/* Progress bar */}
      {currentStep > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-gray-600 flex items-center gap-2">
                <Brain className="w-3 h-3 text-blue-600" />
                Step {currentStep} of {steps.length - 1}
              </div>
              <div className="text-xs font-light text-gray-600">
                {steps[currentStep].subtitle}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${steps[currentStep].progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`container mx-auto px-6 ${currentStep > 0 ? 'pt-20 pb-20' : 'py-4'}`}>
        <div className="max-w-6xl mx-auto min-h-[calc(100vh-160px)] flex flex-col justify-center">
          <div className={`transition-all duration-300 ease-out ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            {renderStepContent()}
          </div>

          {/* Back button */}
          {currentStep > 0 && currentStep !== 4 && (
            <div className="fixed bottom-6 left-6 z-40">
              <button 
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                onClick={() => handleStepTransition(currentStep - 1)}
              >
                <ArrowLeft className="h-4 w-4 text-gray-600" />
                <span className="font-light text-sm text-gray-600">Back</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bubbles */}
      <ProgressBubbles />
    </div>
  );
};

export default DevOnboarding;