// Website Knowledge Base for CloudFlex IT Solutions
export interface ServiceInfo {
  name: string;
  description: string;
  features: string[];
  benefits: string[];
}

export interface JobInfo {
  title: string;
  level: string;
  requirements: string[];
  skills: string[];
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  founded: string;
  mission: string;
  values: string[];
  specialties: string[];
}

export const COMPANY_INFO: CompanyInfo = {
  name: "CloudFlex IT Solutions",
  tagline: "Your Gateway to Tech Excellence",
  founded: "2020",
  mission: "Empowering professionals and organizations to achieve their technology goals through innovative solutions and exceptional talent placement services.",
  values: [
    "Excellence in service delivery",
    "Innovation and continuous learning", 
    "Client-centric approach",
    "Diversity and inclusion",
    "Professional integrity"
  ],
  specialties: [
    "IT Talent Acquisition",
    "Immigration Services", 
    "Resume Optimization",
    "Career Counseling",
    "Technical Training"
  ]
};

export const SERVICES: ServiceInfo[] = [
  {
    name: "Talent Acquisition & Placement",
    description: "We connect skilled IT professionals with leading companies across various industries.",
    features: [
      "Full-time and contract positions",
      "Remote and on-site opportunities", 
      "Competitive salary negotiations",
      "Career growth planning"
    ],
    benefits: [
      "Access to exclusive job opportunities",
      "Professional career guidance",
      "Interview preparation support",
      "Long-term career development"
    ]
  },
  {
    name: "Immigration Support Services", 
    description: "Comprehensive visa and immigration assistance for IT professionals.",
    features: [
      "H1B visa processing and renewal",
      "L1 visa assistance",
      "OPT and STEM OPT guidance",
      "Green Card processing",
      "Document preparation"
    ],
    benefits: [
      "Expert legal guidance",
      "Streamlined application process",
      "Regular status updates",
      "High success rate"
    ]
  },
  {
    name: "Resume Review & Optimization",
    description: "Professional resume enhancement to maximize your job prospects.",
    features: [
      "ATS-friendly formatting",
      "Keyword optimization",
      "Skills highlighting",
      "Industry-specific customization"
    ],
    benefits: [
      "Increased interview callbacks",
      "Better job matching",
      "Professional presentation",
      "Competitive advantage"
    ]
  },
  {
    name: "Career Counseling",
    description: "Personalized career guidance and development planning.",
    features: [
      "Skills assessment",
      "Career path planning",
      "Interview coaching",
      "Salary negotiation support"
    ],
    benefits: [
      "Clear career direction",
      "Enhanced interview performance",
      "Better compensation packages",
      "Professional confidence"
    ]
  }
];

export const CURRENT_JOBS: JobInfo[] = [
  {
    title: "Java Developer",
    level: "Mid to Senior Level",
    requirements: [
      "3+ years Java development experience",
      "Spring Boot framework expertise",
      "Microservices architecture knowledge",
      "Database design and optimization"
    ],
    skills: ["Java", "Spring Boot", "REST APIs", "SQL", "Git", "Agile"]
  },
  {
    title: "DevOps Engineer", 
    level: "Senior Level",
    requirements: [
      "5+ years DevOps experience",
      "Cloud platforms (AWS/Azure/GCP)",
      "CI/CD pipeline design",
      "Infrastructure as Code"
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Python"]
  },
  {
    title: "Data Scientist",
    level: "Mid Level",
    requirements: [
      "3+ years data science experience",
      "Machine learning expertise",
      "Statistical analysis skills",
      "Data visualization"
    ],
    skills: ["Python", "R", "SQL", "TensorFlow", "PyTorch", "Tableau"]
  },
  {
    title: "Cloud Architect",
    level: "Senior Level", 
    requirements: [
      "7+ years cloud architecture experience",
      "Multi-cloud expertise",
      "Security best practices",
      "Solution design"
    ],
    skills: ["AWS", "Azure", "GCP", "Kubernetes", "Security", "Architecture"]
  },
  {
    title: "React Developer",
    level: "Mid Level",
    requirements: [
      "3+ years React development",
      "Modern JavaScript/TypeScript",
      "State management",
      "Frontend optimization"
    ],
    skills: ["React", "TypeScript", "Redux", "CSS", "Node.js", "Git"]
  },
  {
    title: "Cybersecurity Specialist",
    level: "Senior Level",
    requirements: [
      "5+ years cybersecurity experience", 
      "Security frameworks knowledge",
      "Threat assessment skills",
      "Compliance expertise"
    ],
    skills: ["Security Analysis", "Penetration Testing", "CISSP", "Risk Assessment"]
  }
];

export const CONTACT_INFO = {
  phone: "336-281-2871",
  email: "admin@cloudflexit.com", 
  hrEmail: "hr@cloudflexit.com",
  address: "10926 David Taylor Dr., Ste 120 PMB369, Charlotte, NC 28262",
  website: "cloudflexit.com",
  hours: "Monday - Friday, 9:00 AM - 6:00 PM EST"
};

export const FAQ_DATA = [
  {
    question: "How do I apply for a job?",
    answer: "You can apply by clicking on any job position in our Current Opportunities section and submitting your resume. We review all applications within 24-48 hours."
  },
  {
    question: "Do you charge fees for job placement?",
    answer: "No, our job placement services are completely free for candidates. We are paid by our client companies when we successfully place qualified professionals."
  },
  {
    question: "What is the typical visa processing time?",
    answer: "Processing times vary by visa type: H1B typically takes 2-4 months, L1 takes 1-3 months, and Green Card processing can take 1-3 years depending on your country of birth and category."
  },
  {
    question: "Do you provide remote job opportunities?",
    answer: "Yes, we offer both remote and on-site positions. Many of our clients offer flexible work arrangements including fully remote, hybrid, and traditional office-based roles."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve multiple industries including Technology, Healthcare, Finance, Retail, Manufacturing, Government, Consulting, and Startups, all requiring skilled IT professionals."
  }
];

export const IMMIGRATION_INFO = {
  visaTypes: [
    {
      type: "H1B",
      description: "For specialty occupations requiring bachelor's degree or higher",
      duration: "3 years, renewable once for total of 6 years"
    },
    {
      type: "L1",
      description: "For intra-company transfers from foreign offices", 
      duration: "1-3 years depending on role"
    },
    {
      type: "OPT/STEM OPT",
      description: "For recent graduates to gain practical training",
      duration: "12 months + 24 months STEM extension"
    },
    {
      type: "Green Card",
      description: "Permanent residence in the United States",
      duration: "Permanent (renewable every 10 years)"
    }
  ],
  process: [
    "Initial consultation and document review",
    "Application preparation and filing",
    "Regular status updates and communication",
    "Interview preparation (if required)",
    "Final approval and documentation"
  ]
};