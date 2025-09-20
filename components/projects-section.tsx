"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Play } from "lucide-react"

const projects = [
{
  id: 1,
  title: "Genetic Predisposition of Lesion Using Machine Learning",
  description:
    "Developed CNN and ANN models to classify cancerous lesions, improving detection accuracy from 75% to 83%.",
  longDescription:
    "Designed and implemented deep learning models (CNN and ANN) to classify various types of cancerous lesions using a dataset of 10,000 medical images. Applied preprocessing and data augmentation to improve robustness, followed by extensive hyperparameter tuning to optimize performance. The project demonstrated the potential of AI-assisted medical diagnostics in improving early detection and accuracy.",
  image: "/images/skin .png",
  technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy", "Matplotlib"],
  github: "https://github.com",   // update with your repo link if available
  demo: "https://demo.com",       // update with live demo if you have one
  category: "Machine Learning & Deep Learning",
},
{
  id: 2,
  title: "Dermatitis Stratification and Cancer Prognostication with Diet Pyramid",
  description:
    "Built a multi-class ML model to classify skin conditions and integrated a diet pyramid for personalized nutrition recommendations.",
  longDescription:
    "Developed an automated dermatological diagnostic system capable of classifying skin conditions as cancerous, non-cancerous, or pre-cancerous. Implemented multi-class classification using Logistic Regression and Random Forest, achieving 82.5% accuracy. Evaluation was conducted with accuracy, precision, recall, and F1-score metrics. Additionally, integrated a custom-built diet pyramid to provide tailored nutritional advice, enhancing the system’s practical utility for preventive healthcare.",
  image: "/images/diet pyramid.png",
  technologies: ["Python", "Scikit-learn", "Random Forest", "Logistic Regression", "Pandas", "Matplotlib"],
  github: "https://github.com",   // replace with your repo link if available
  demo: "https://demo.com",       // replace with live demo if you have one
  category: "Machine Learning & Deep Learning",
},

{
  id: 3,
  title: "Diet Meal Plan Chatbot",
  description:
    "Developed a cloud-based conversational AI chatbot that generates personalized meal plans based on user dietary habits and health goals.",
  longDescription:
    "Built a conversational AI chatbot to provide real-time dietary recommendations and personalized meal plans. Designed natural language understanding (NLU) using AWS Lex and implemented backend logic with AWS Lambda for processing user inputs and generating meal recommendations. The system was deployed on AWS, ensuring scalability and reliability, and successfully handled multiple concurrent users seeking nutrition guidance.",
  image: "/images/dietmeal.png",
  technologies: ["AWS Lex", "AWS Lambda", "Python", "DynamoDB", "CloudWatch"],
  github: "https://github.com",   // replace with your repo link
  demo: "https://demo.com",       // replace with live demo if available
  category: "NLP",
},
  {
  id: 4,
  title: "Election Commission Web Application",
  description:
    "Built a real-time election results app for Karnataka using React.js, Redux, Jenkins, and Terraform on AWS.",
  longDescription:
    "Developed a full-stack web application displaying real-time Karnataka election results. Built front-end interfaces in React.js with state management using Redux, and integrated CI/CD pipelines via Jenkins for automated deployment. Managed cloud infrastructure and security with Terraform on AWS, ensuring scalability, high availability, and security during peak traffic.",
  image: "/images/karnataka.png",
  technologies: ["React.js", "Redux", "Jenkins", "Terraform", "AWS"],
  github: "https://github.com",
  demo: "https://demo.com",
  category: "Cloud & DevOps",
},
{
  id: 5,
  title: "Agriculture Dashboard Application",
  description:
    "Designed a cloud-native dashboard for real-time agricultural analytics using Docker, Kubernetes, and Terraform on AWS.",
  longDescription:
    "Developed a scalable web-based dashboard that provided real-time monitoring and visualization for agricultural data. Designed intuitive interfaces with interactive charts, containerized the app using Docker, orchestrated deployment with Kubernetes, and provisioned infrastructure using Terraform on AWS. The platform enabled large-scale data processing and improved decision-making for crop and field-level management.",
  image: "/images/agri.png",
  technologies: ["React.js", "Docker", "Kubernetes", "Terraform", "AWS"],
  github: "https://github.com",
  demo: "https://demo.com",
  category: "Cloud & DevOps",
},
{
  id: 6,
  title: "Email Phishing Analysis",
  description:
    "Implemented phishing detection by automating email analysis with Splunk and VirusTotal API.",
  longDescription:
    "Built a cybersecurity solution for analyzing and detecting potential phishing threats. Automated parsing of email headers and content using Splunk and integrated VirusTotal API for real-time threat intelligence. The system enhanced the organization’s detection and incident response capabilities, reducing risks from phishing attempts.",
  image: "/images/cybersecurity.png",
  technologies: ["Splunk", "VirusTotal API", "Python", "SIEM"],
  github: "https://github.com",
  demo: "https://demo.com",
  category: "Cybersecurity",
},
{
  id: 7,
  title: "Tax Invoice Reader",
  description:
    "Created an AI-based tool to extract and process tax invoice data using AWS Bedrock and Pinecone.",
  longDescription:
    "Developed a machine learning solution to automate tax invoice processing. The model extracted key fields from scanned invoices, leveraging AWS Bedrock for deployment and Pinecone for vectorized storage and retrieval. This reduced manual data entry effort by 60% and streamlined business operations for invoice handling.",
  image: "/images/tax.png",
  technologies: ["AWS Bedrock", "Pinecone", "Python", "OCR", "LangChain"],
  github: "https://github.com",
  demo: "https://demo.com",
  category: "AI Agents & Productivity Tools",
},
{
  id: 8,
  title: "Website Performance & SEO Checker",
  description:
    "Developed an AI-powered tool to analyze website performance metrics and generate SEO recommendations.",
  longDescription:
    "Built an AI-driven web performance and SEO analyzer that captured key site metrics such as load time, responsiveness, and content ranking signals. Integrated AWS Bedrock to generate automated SEO recommendations. Delivered an end-to-end monitoring system that provided actionable insights to improve website visibility and performance.",
  image: "/images/seo.png",
  technologies: ["AWS Bedrock", "Python", "BeautifulSoup", "Streamlit"],
  github: "https://github.com",
  demo: "https://demo.com",
  category: "AI Agents & Productivity Tools",
},
{
  id: 9,
  title: "AI Agent for Ticket Triage & Auto-Assignment",
  description:
    "Built an AI-powered system with CrewAI to automate ticket triage, assignment, and workload optimization.",
  longDescription:
    "Developed an intelligent ticket triage system that automatically analyzed issues and assigned them based on severity, priority, estimated hours, and developer expertise. Implemented CrewAI agents for dynamic workload assignment and real-time performance tracking. Designed interactive dashboards in Streamlit to monitor progress, improving bug triage speed and ensuring balanced sprint workloads across engineering teams.",
  image: "/images/ticket.png",
  technologies: ["CrewAI", "Streamlit", "Python", "LLMs", "Vector DB"],
  github: "https://github.com",
  demo: "https://demo.com",
  category: "AI Agents & Productivity Tools",
}

]

const categories = [
  "All",  // lesion detection, dermatitis project
  "Machine Learning & Deep Learning",     // dermatitis, lesion prognosis
  "NLP",                 // diet meal plan chatbot
  "Cloud & DevOps",                    // election app",   // agriculture dashboard
  "Cybersecurity",                     // phishing analysis        // tax invoice reader      // SEO checker
  "AI Agents & Productivity Tools",    // ticket triage agent
];


export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Explore my data science projects showcasing machine learning, deep learning, and data engineering solutions
            across various domains.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    {project.category}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription>
                  {selectedProject === project.id ? project.longDescription : project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                    <Play className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
