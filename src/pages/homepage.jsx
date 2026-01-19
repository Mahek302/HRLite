import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Menu, X, Clock, Calendar, BarChart3, 
  ChevronRight, LogIn, Users, TrendingUp, Shield,
  Zap, CheckCircle, Briefcase, Home,
  // Careers icons
  MapPin, DollarSign, Heart, Globe, Award, Users as UsersIcon,
  ArrowRight, Upload, FileText, ExternalLink,
  Linkedin as LinkedinIcon, Github as GithubIcon
} from "lucide-react";

export default function Homepage() {
  const navigate = useNavigate();
  
  // Homepage states
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Careers states
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('litehr_applications');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
    linkedin: '',
    github: '',
    resume: null,
    resumeName: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showGeneralApplication, setShowGeneralApplication] = useState(false);

  // Mock images - replace with your actual image imports
  const slides = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ];

  const careerPositions = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      description: "Build amazing user interfaces with React and modern web technologies for our HR platform.",
      requirements: [
        "3+ years experience with React",
        "Strong JavaScript/TypeScript skills",
        "Experience with Tailwind CSS",
        "Knowledge of REST APIs"
      ]
    },
    {
      id: 2,
      title: "HR Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      description: "Lead product strategy and development for our HR management platform.",
      requirements: [
        "5+ years in product management",
        "Experience with HR/SAAS products",
        "Strong analytical skills",
        "Agile/Scrum experience"
      ]
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$85,000 - $110,000",
      description: "Design intuitive and beautiful interfaces for HR professionals.",
      requirements: [
        "Portfolio of design work",
        "Experience with Figma/Adobe XD",
        "User research experience",
        "Understanding of design systems"
      ]
    },
    {
      id: 4,
      title: "Backend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$100,000 - $130,000",
      description: "Build scalable backend systems and APIs for HR automation.",
      requirements: [
        "Node.js/Python experience",
        "Database design (SQL/NoSQL)",
        "API design and security",
        "Cloud platform experience (AWS/Azure)"
      ]
    },
    {
      id: 5,
      title: "Customer Success Manager",
      department: "Operations",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      description: "Ensure customer satisfaction and help clients maximize our HR platform.",
      requirements: [
        "3+ years in customer success",
        "HR/SAAS experience",
        "Excellent communication skills",
        "Problem-solving mindset"
      ]
    },
    {
      id: 6,
      title: "Sales Executive",
      department: "Sales",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 + Commission",
      description: "Drive sales and grow our customer base for LiteHR.",
      requirements: [
        "Proven sales track record",
        "B2B SAAS experience",
        "Strong negotiation skills",
        "Self-motivated and driven"
      ]
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Navigation handlers
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleGetStarted = () => {
    navigate("/login");
  };

  // Careers functions
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setApplicationForm({
      ...applicationForm,
      position: job.title
    });
    setShowGeneralApplication(true);
    document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleGeneralApplicationClick = () => {
    setSelectedJob(null);
    setApplicationForm({
      ...applicationForm,
      position: ''
    });
    setShowGeneralApplication(true);
    document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        alert('Please upload PDF or DOC/DOCX files only');
        return;
      }
      setApplicationForm({
        ...applicationForm,
        resume: file,
        resumeName: file.name
      });
    }
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    
    if (!applicationForm.resume) {
      alert('Please upload your resume');
      return;
    }

    const newApplication = {
      id: Date.now(),
      ...applicationForm,
      appliedDate: new Date().toISOString(),
      status: 'pending',
      jobDetails: selectedJob,
      timestamp: new Date().toISOString()
    };

    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem('litehr_applications', JSON.stringify(updatedApplications));

    setApplicationForm({
      name: '',
      email: '',
      phone: '',
      position: '',
      coverLetter: '',
      linkedin: '',
      github: '',
      resume: null,
      resumeName: ''
    });
    setSelectedJob(null);
    setShowGeneralApplication(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#F9FAFB] overflow-x-hidden">
      {/* ============= NAVBAR ============= */}
      <header className="
        fixed top-0 left-0 w-full h-16 
        bg-[#0F172A]/90 backdrop-blur-md
        text-white flex items-center justify-between 
        shadow-[0_3px_20px_rgba(0,0,0,0.35)]
        z-50 px-6 md:px-20 border-b border-[#374151]
      ">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="h-10 w-10 bg-gradient-to-r from-[#8B5CF6] to-[#10B981] rounded-lg flex items-center justify-center">
            <Briefcase size={20} />
          </div>
          <span className="text-2xl font-semibold tracking-wide">LiteHR</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-8 text-sm tracking-wide">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative text-sm tracking-wide hover:text-[#8B5CF6] transition group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
            className="relative text-sm tracking-wide hover:text-[#8B5CF6] transition group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => document.getElementById('modules').scrollIntoView({ behavior: 'smooth' })}
            className="relative text-sm tracking-wide hover:text-[#8B5CF6] transition group"
          >
            Modules
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => document.getElementById('careers-section').scrollIntoView({ behavior: 'smooth' })}
            className="relative text-sm tracking-wide hover:text-[#8B5CF6] transition group"
          >
            Careers
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })}
            className="relative text-sm tracking-wide hover:text-[#8B5CF6] transition group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
          </button>
        </nav>

        {/* Login Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLoginClick}
            className="
              bg-[#8B5CF6] hover:bg-[#7C3AED]
              px-5 py-2 text-sm rounded-lg shadow-lg 
              transition-all duration-300 hover:shadow-xl
              hover:scale-[1.05] active:scale-[0.98]
              flex items-center gap-2
            "
          >
            <LogIn size={16} />
            Login
          </button>

          <button
            onClick={() => setMenu(!menu)}
            className="sm:hidden p-2 rounded-lg hover:bg-[#1E293B] transition"
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menu && (
        <div className="
          fixed top-16 left-0 w-full bg-[#0F172A] text-white p-6
          sm:hidden z-40 border-b border-[#1F2937]
        ">
          <div className="flex flex-col gap-4 text-sm">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMenu(false);
              }}
              className="py-3 border-b border-[#1F2937] hover:bg-[#1E293B] px-2 rounded transition text-[#D1D5DB] flex items-center gap-2"
            >
              <Home size={16} />
              Home
            </button>
            <button 
              onClick={() => {
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                setMenu(false);
              }}
              className="py-3 border-b border-[#1F2937] hover:bg-[#1E293B] px-2 rounded transition text-[#D1D5DB]"
            >
              Features
            </button>
            <button 
              onClick={() => {
                document.getElementById('modules').scrollIntoView({ behavior: 'smooth' });
                setMenu(false);
              }}
              className="py-3 border-b border-[#1F2937] hover:bg-[#1E293B] px-2 rounded transition text-[#D1D5DB]"
            >
              Modules
            </button>
            <button 
              onClick={() => {
                document.getElementById('careers-section').scrollIntoView({ behavior: 'smooth' });
                setMenu(false);
              }}
              className="py-3 border-b border-[#1F2937] hover:bg-[#1E293B] px-2 rounded transition text-[#D1D5DB] flex items-center gap-2"
            >
              <Briefcase size={16} />
              Careers
            </button>
            <button 
              onClick={() => {
                document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
                setMenu(false);
              }}
              className="py-3 border-b border-[#1F2937] hover:bg-[#1E293B] px-2 rounded transition text-[#D1D5DB]"
            >
              About
            </button>
            <button 
              onClick={() => {
                handleLoginClick();
                setMenu(false);
              }}
              className="
                bg-[#8B5CF6] hover:bg-[#7C3AED] px-4 py-3 rounded-lg shadow transition
                flex items-center justify-center gap-2
              "
            >
              <LogIn size={16} />
              Login
            </button>
          </div>
        </div>
      )}

      {/* ============= HERO SECTION ============= */}
      <section className="
        pt-24 md:pt-28 pb-20 px-6 md:px-20 
        flex flex-col md:flex-row items-center gap-16 
        bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#1E293B] relative
      ">
        {/* TEXT */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-[rgba(139,92,246,0.2)] px-3 py-1 rounded-full text-sm text-[#D1D5DB] mb-4">
            <Zap size={14} />
            Streamlined HR Operations
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#F9FAFB] mb-6 tracking-tight">
            Internal HR Automation{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#10B981] bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#9CA3AF] max-w-xl mb-10">
            A modern internal system designed for employees, managers & admins to
            digitally manage attendance, leaves, work logs, and team activity —
            without using spreadsheets.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleGetStarted}
              className="
                bg-[#8B5CF6] hover:bg-[#7C3AED] text-white
                px-10 py-3 rounded-lg font-medium
                flex items-center gap-2 transition-all
                shadow-lg hover:shadow-xl
              "
            >
              Get Started
              <ChevronRight size={18} />
            </button>
            
            <button 
              onClick={() => document.getElementById('careers-section').scrollIntoView({ behavior: 'smooth' })}
              className="
                bg-transparent border border-[#8B5CF6] text-[#8B5CF6]
                hover:bg-[#8B5CF6]/10 px-10 py-3 rounded-lg font-medium
                flex items-center gap-2 transition-all
                shadow-lg hover:shadow-xl
              "
            >
              <Briefcase size={18} />
              View Careers
            </button>
          </div>
        </div>

        {/* IMAGE SLIDER */}
        <div className="flex-1 w-full max-w-2xl">
          <div className="relative rounded-2xl shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)] transition-all duration-500">
            <img
              src={slides[index]}
              className="w-full h-[320px] md:h-[430px] rounded-2xl object-cover border-[6px] border-[#1E293B]"
              alt="HR Management Dashboard"
            />
            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`
                    w-2 h-2 rounded-full transition-all
                    ${i === index 
                      ? "w-8 bg-[#8B5CF6]" 
                      : "bg-[#374151] hover:bg-[#8B5CF6]"}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============= FEATURES ============= */}
      <section id="features" className="py-20 px-6 md:px-20 bg-[#0F172A]">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F9FAFB]">Key Features</h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            Experience seamless HR management with our intuitive features
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Clock size={22} />} 
            title="Mark Attendance" 
            description="Real-time attendance tracking with geolocation support"
            isActive={activeFeature === 0}
            onClick={() => setActiveFeature(0)}
          />
          <FeatureCard 
            icon={<Calendar size={22} />} 
            title="Leave Management" 
            description="Automated approval workflows and balance tracking"
            isActive={activeFeature === 1}
            onClick={() => setActiveFeature(1)}
          />
          <FeatureCard 
            icon={<BarChart3 size={22} />} 
            title="Work Log Submissions" 
            description="Daily task logging with productivity insights"
            isActive={activeFeature === 2}
            onClick={() => setActiveFeature(2)}
          />
        </div>

        {/* Feature Details Panel */}
        <div className="mt-12 bg-[#1E293B] rounded-2xl p-8 shadow-lg border border-[#374151]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#111827] rounded-lg flex items-center justify-center shadow">
              {activeFeature === 0 ? <Clock size={24} className="text-[#8B5CF6]" /> : 
               activeFeature === 1 ? <Calendar size={24} className="text-[#10B981]" /> : 
               <BarChart3 size={24} className="text-[#3B82F6]" />}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#F9FAFB]">
                {activeFeature === 0 ? "Attendance System" :
                 activeFeature === 1 ? "Leave Management" :
                 "Work Log Analytics"}
              </h3>
              <p className="text-[#9CA3AF]">Feature highlights and benefits</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-[#F9FAFB]">How It Works</h4>
              <p className="text-[#D1D5DB]">
                {activeFeature === 0 ? "Employees can clock in/out with a single click, view their attendance history, and request shift changes. Managers receive instant notifications for attendance exceptions." :
                 activeFeature === 1 ? "Submit leave requests, track balances, and get automated approvals. Managers can approve or reject requests with comments. All leave types are supported." :
                 "Log daily tasks, track project progress, and generate productivity reports. Managers can monitor team performance and identify bottlenecks."}
              </p>
            </div>
            
            <div className="bg-[#111827] rounded-xl p-6 shadow">
              <h4 className="font-semibold text-lg mb-4 text-[#F9FAFB]">Benefits</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-[#D1D5DB]">
                  <CheckCircle size={18} className="text-[#10B981]" />
                  <span>Real-time updates and notifications</span>
                </li>
                <li className="flex items-center gap-2 text-[#D1D5DB]">
                  <CheckCircle size={18} className="text-[#10B981]" />
                  <span>Mobile-friendly interface</span>
                </li>
                <li className="flex items-center gap-2 text-[#D1D5DB]">
                  <CheckCircle size={18} className="text-[#10B981]" />
                  <span>Automated reporting</span>
                </li>
                <li className="flex items-center gap-2 text-[#D1D5DB]">
                  <CheckCircle size={18} className="text-[#10B981]" />
                  <span>Role-based access control</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============= MODULES ============= */}
      <section id="modules" className="py-20 bg-[#1E293B] px-6 md:px-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F9FAFB]">System Modules</h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            Tailored interfaces for different organizational roles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ModuleCard 
            title="Employee Portal" 
            items={[
              "Attendance (IN/OUT)",
              "Leave Requests",
              "Daily Work Summaries",
              "Attendance History"
            ]}
            icon={<Users />}
            color="purple"
          />

          <ModuleCard 
            title="Manager Portal" 
            items={[
              "Approve Attendance",
              "Approve Leaves",
              "Monitor Team Work Logs",
              "Team Overview & Analytics"
            ]}
            icon={<TrendingUp />}
            color="green"
          />

          <ModuleCard 
            title="Admin Portal" 
            items={[
              "Employee Master Records",
              "Role & Department Setup",
              "Leave Policies",
              "Full HR Reporting"
            ]}
            icon={<Shield />}
            color="blue"
          />
        </div>
      </section>

      {/* ============= CAREERS SECTION ============= */}
      <div id="careers-section">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-slideIn">
            <CheckCircle size={20} />
            <div>
              <div className="font-semibold">Application Submitted!</div>
              <div className="text-sm">We'll review your application and get back to you soon.</div>
            </div>
          </div>
        )}

        {/* Careers Hero Section */}
        <section className="py-20 px-6 md:px-20 bg-gradient-to-r from-[#0F172A] to-[#1E293B]">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[rgba(139,92,246,0.2)] px-4 py-2 rounded-full text-sm text-[#8B5CF6] mb-6">
              <Briefcase size={16} />
              We're Hiring!
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Build the Future of
              <span className="block bg-gradient-to-r from-[#8B5CF6] to-[#10B981] bg-clip-text text-transparent">
                HR Technology
              </span>
            </h1>
            <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto mb-10">
              Join our mission to revolutionize HR management. We're looking for passionate 
              individuals who want to make an impact on how companies manage their most valuable asset - people.
            </p>
            <button 
              onClick={() => document.getElementById('open-positions').scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition"
            >
              View Open Positions
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
              <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
                Find the perfect role that matches your skills and passion
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {careerPositions.map((job) => (
                <div key={job.id} className="bg-[#1E293B] rounded-xl p-6 border border-[#374151] hover:border-[#8B5CF6] transition-all hover:shadow-xl group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-[#8B5CF6] transition">{job.title}</h3>
                      <p className="text-sm text-[#10B981] font-medium">{job.department}</p>
                    </div>
                    <span className="bg-[rgba(139,92,246,0.2)] text-[#8B5CF6] text-xs font-semibold px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-[#D1D5DB]">
                      <MapPin size={16} className="text-[#9CA3AF]" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#D1D5DB]">
                      <DollarSign size={16} className="text-[#9CA3AF]" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  
                  <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-3">{job.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-sm font-medium text-[#F9FAFB] mb-2">Key Requirements:</div>
                    <ul className="space-y-1">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                          <div className="w-1 h-1 bg-[#8B5CF6] rounded-full"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handleApplyClick(job)}
                    className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2 group-hover:gap-3"
                  >
                    Apply Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form - Only shown when showGeneralApplication is true */}
        {showGeneralApplication && (
          <section id="apply-form" className="py-20 px-6 md:px-20 bg-[#0F172A]">
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#374151]">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[rgba(139,92,246,0.2)] rounded-lg flex items-center justify-center">
                    <FileText size={24} className="text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedJob ? `Apply for: ${selectedJob.title}` : 'Apply for Position'}
                    </h3>
                    <p className="text-[#9CA3AF]">Fill out your application below</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmitApplication} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#D1D5DB] mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={applicationForm.name}
                        onChange={(e) => setApplicationForm({...applicationForm, name: e.target.value})}
                        className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#D1D5DB] mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                        className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#D1D5DB] mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={applicationForm.phone}
                        onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                        className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#D1D5DB] mb-2">Position *</label>
                      <select
                        required
                        value={applicationForm.position}
                        onChange={(e) => {
                          const job = careerPositions.find(j => j.title === e.target.value);
                          setSelectedJob(job);
                          setApplicationForm({...applicationForm, position: e.target.value});
                        }}
                        className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                      >
                        <option value="">Select a position</option>
                        {careerPositions.map(job => (
                          <option key={job.id} value={job.title}>{job.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#D1D5DB] mb-2">LinkedIn Profile</label>
                      <div className="relative">
                        <LinkedinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF]" size={18} />
                        <input
                          type="url"
                          value={applicationForm.linkedin}
                          onChange={(e) => setApplicationForm({...applicationForm, linkedin: e.target.value})}
                          className="w-full bg-[#111827] border border-[#374151] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#D1D5DB] mb-2">GitHub Profile</label>
                      <div className="relative">
                        <GithubIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF]" size={18} />
                        <input
                          type="url"
                          value={applicationForm.github}
                          onChange={(e) => setApplicationForm({...applicationForm, github: e.target.value})}
                          className="w-full bg-[#111827] border border-[#374151] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                          placeholder="https://github.com/yourusername"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#D1D5DB] mb-2">Cover Letter *</label>
                    <textarea
                      required
                      value={applicationForm.coverLetter}
                      onChange={(e) => setApplicationForm({...applicationForm, coverLetter: e.target.value})}
                      rows="5"
                      className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                      placeholder="Tell us about yourself, your experience, and why you're interested in this position..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#D1D5DB] mb-2">Resume/CV *</label>
                    <div className="space-y-4">
                      <label className="block cursor-pointer">
                        <div className="bg-[#111827] border-2 border-dashed border-[#374151] rounded-lg px-4 py-8 text-center hover:border-[#8B5CF6] transition">
                          <Upload className="mx-auto mb-3 text-[#9CA3AF]" size={28} />
                          <div className="text-[#D1D5DB] font-medium mb-1">Click to upload your resume</div>
                          <div className="text-sm text-[#9CA3AF]">PDF, DOC, DOCX up to 5MB</div>
                          <input 
                            type="file" 
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            required
                          />
                        </div>
                      </label>
                      
                      {applicationForm.resumeName && (
                        <div className="flex items-center justify-between bg-[#111827] rounded-lg px-4 py-3 border border-[#374151]">
                          <div className="flex items-center gap-3">
                            <FileText size={20} className="text-[#8B5CF6]" />
                            <div>
                              <div className="text-[#F9FAFB] font-medium">{applicationForm.resumeName}</div>
                              <div className="text-sm text-[#9CA3AF]">Ready to submit</div>
                            </div>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setApplicationForm({...applicationForm, resume: null, resumeName: ''})}
                            className="text-sm text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#10B981] hover:from-[#7C3AED] hover:to-[#059669] text-white font-bold py-4 px-6 rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      Submit Application
                      <ArrowRight size={18} />
                    </button>
                    <p className="text-sm text-[#9CA3AF] text-center mt-3">
                      By submitting, you agree to our privacy policy. We'll contact you within 5-7 business days.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Careers CTA - Modified to show only when application form is NOT visible */}
        {!showGeneralApplication && (
          <section className="py-20 px-6 md:px-20 bg-gradient-to-r from-[#8B5CF6] to-[#10B981]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build with Us?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Don't see the perfect role? We're always looking for talented individuals.
              </p>
              <button 
                onClick={handleGeneralApplicationClick}
                className="bg-white text-[#8B5CF6] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                Submit General Application
                <ExternalLink size={18} />
              </button>
            </div>
          </section>
        )}
      </div>

      {/* ============= ABOUT SECTION ============= */}
      <section id="about-section" className="py-20 px-6 md:px-20 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F9FAFB]">About LiteHR</h2>
          <p className="text-lg text-[#D1D5DB] mb-8">
            LiteHR is a digitized internal HR solution aimed to replace spreadsheets
            and provide real-time attendance, approval workflows, and consolidated
            reporting for small teams. Our platform streamlines HR processes while
            maintaining data security and compliance.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#8B5CF6]">100%</div>
              <div className="text-sm text-[#9CA3AF]">Secure</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#10B981]">24/7</div>
              <div className="text-sm text-[#9CA3AF]">Availability</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#3B82F6]">99.9%</div>
              <div className="text-sm text-[#9CA3AF]">Uptime</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#F59E0B]">0</div>
              <div className="text-sm text-[#9CA3AF]">Spreadsheets</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============= FINAL CTA SECTION ============= */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-r from-[#8B5CF6] to-[#10B981]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Simplify Your HR Processes?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the modern approach to HR management
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={handleLoginClick}
              className="
                bg-white text-[#8B5CF6] hover:bg-[#F9FAFB]
                px-8 py-3 rounded-lg font-semibold
                flex items-center gap-2 transition-all shadow-lg
              "
            >
              <LogIn size={18} />
              Login to Dashboard
            </button>
            
            <button 
              onClick={() => document.getElementById('careers-section').scrollIntoView({ behavior: 'smooth' })}
              className="
                bg-transparent border-2 border-white text-white hover:bg-white/10
                px-8 py-3 rounded-lg font-semibold
                flex items-center gap-2 transition-all shadow-lg
              "
            >
              <Briefcase size={18} />
              View Open Positions
            </button>
          </div>
        </div>
      </section>

      {/* ============= FOOTER ============= */}
      <footer className="w-full bg-[#020617] text-white py-8 border-t border-[#374151]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="h-10 w-10 bg-gradient-to-r from-[#8B5CF6] to-[#10B981] rounded-lg flex items-center justify-center">
                <Briefcase size={20} />
              </div>
              <span className="text-xl font-semibold tracking-wide">LiteHR</span>
            </div>
            
            <p className="text-sm text-[#9CA3AF] text-center">
              Internal HR Automation System • © 2025 (Not for commercial use)
            </p>
            
            <div className="flex gap-6">
              <button 
                onClick={handleLoginClick}
                className="text-[#9CA3AF] hover:text-[#F9FAFB] transition text-sm"
              >
                Login
              </button>
              <button 
                onClick={() => document.getElementById('careers-section').scrollIntoView({ behavior: 'smooth' })}
                className="text-[#9CA3AF] hover:text-[#F9FAFB] transition text-sm"
              >
                Careers
              </button>
              <button 
                onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })}
                className="text-[#9CA3AF] hover:text-[#F9FAFB] transition text-sm"
              >
                About
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

/* ============= COMPONENTS ============= */

function FeatureCard({ icon, title, description, isActive, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`
        bg-[#1E293B] rounded-xl p-6 text-left transition-all border
        ${isActive 
          ? 'shadow-xl border-[#8B5CF6] -translate-y-1' 
          : 'shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-[rgba(139,92,246,0.3)]'}
      `}
    >
      <div className={`
        w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all
        ${isActive ? 'bg-[rgba(139,92,246,0.2)] text-[#8B5CF6]' : 'bg-[#111827] text-[#9CA3AF]'}
      `}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#F9FAFB]">{title}</h3>
      <p className="text-[#9CA3AF] text-sm">{description}</p>
      {isActive && (
        <div className="mt-4 flex items-center text-[#8B5CF6] text-sm">
          <span>Selected</span>
          <ChevronRight size={16} className="ml-1" />
        </div>
      )}
    </button>
  );
}

function ModuleCard({ title, items, icon, color }) {
  const colorClasses = {
    purple: "bg-[rgba(139,92,246,0.2)] text-[#8B5CF6]",
    green: "bg-[rgba(16,185,129,0.2)] text-[#10B981]",
    blue: "bg-[rgba(59,130,246,0.2)] text-[#3B82F6]"
  };

  const dotColors = {
    purple: "bg-[#8B5CF6]",
    green: "bg-[#10B981]",
    blue: "bg-[#3B82F6]"
  };

  return (
    <div className="bg-[#1E293B] rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all border border-[#374151] group hover:-translate-y-1 hover:border-[rgba(139,92,246,0.3)]">
      <div className={`w-14 h-14 ${colorClasses[color]} rounded-xl flex items-center justify-center mb-6`}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h3 className="text-2xl font-bold mb-5 text-[#F9FAFB]">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 text-[#D1D5DB]">
            <div className={`w-2 h-2 rounded-full ${dotColors[color]}`}></div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}