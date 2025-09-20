import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, MapPin } from "lucide-react"

const experiences = [
{
    title: "Cloud, DevOps & SRE Intern",
    company: "Hitachi Digital Services",
    location: "Bangalore, India",
    duration: "Jan 2023 - Jan 2024",
    type: "Internship",
    description:
      "Contributed to cloud infrastructure automation, CI/CD pipeline optimization, and site reliability engineering initiatives. Gained hands-on experience in AWS, container orchestration, and observability tools while implementing security best practices across cloud environments.",
    technologies: [
      "AWS",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "ELK Stack",
      "IAM",
      "KMS",
    ],
    achievements: [
      "Implemented CI/CD pipelines using Jenkins and GitHub Actions, reducing deployment time by 40%",
      "Deployed and managed containerized applications with Docker and Kubernetes on AWS",
      "Automated infrastructure provisioning with Terraform, ensuring consistency and reducing manual effort",
      "Established monitoring and alerting with Prometheus, Grafana, and ELK Stack for proactive incident response",
      "Enhanced cloud security by managing IAM roles, enforcing least privilege, and integrating vulnerability scans",
      "Contributed to SRE practices by improving system reliability and reducing mean time to recovery (MTTR)",
    ],
  },
{
  title: "Cloud Infrastructure-AsA-Service (IAAS) Specialist ParaProfessional",
  company: "Hitachi Digital Services",
  location: "Bangalore, India",
  duration: "Jan 2023 - Jan 2024",
  type: "Professional Experience",
  description:
    "Led DevOps and release management initiatives for large-scale enterprise projects, focusing on cloud infrastructure automation, CI/CD pipeline development, and secure deployments. Worked across AWS and Azure environments, integrated CMS platforms, and contributed to testing automation and emerging GenAI solutions.",
  technologies: [
    "AWS",
    "Azure DevOps",
    "Terraform",
    "Docker",
    "Kubernetes",
    "Pantheon",
    "PHP",
    "Jenkins",
    "GitHub Actions",
    "Selenium",
    "GenAI",
  ],
  achievements: [
    "Designed and automated CI/CD pipelines using Azure DevOps, Jenkins, and GitHub Actions, reducing release cycles by 45%",
    "Managed large-scale deployments across AWS and Azure cloud environments with high availability and scalability",
    "Integrated Pantheon CMS with PHP backend for enterprise-grade content management workflows",
    "Automated testing using Selenium to ensure reliability and faster feedback in release cycles",
    "Collaborated with cross-functional teams to establish best practices in release management and incident response",
    "Experimented with Generative AI tools to prototype intelligent automation workflows for DevOps pipelines",
  ],
},

{
  title: "Teaching Assistant – Database Management Systems",
  company: "Fordham University",
  location: "New York, USA",
  duration: "Aug 2025 – Present",
  type: "Part-time",
  description:
    "Assisted faculty in delivering the Database Management Systems (DBMS) course, supporting both instruction and student learning. Responsibilities included grading assignments, holding office hours, and guiding students on SQL, schema design, and query optimization.",
  technologies: ["SQL", "PostgreSQL", "MySQL", "ER Modeling", "Python (Pandas)"],
  achievements: [
    "Graded and provided feedback on 100+ student assignments and projects",
    "Conducted office hours and 1-on-1 mentoring sessions to support student success",
    "Helped improve student project outcomes by guiding best practices in schema design and query optimization",
  ],
},
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Hands-on experience in machine learning, data analysis, and research across leading tech companies and
            academic institutions.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{experience.title}</CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{experience.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.duration}</span>
                    </div>
                    <Badge variant={experience.type === "Internship" ? "default" : "secondary"}>
                      {experience.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{experience.description}</p>

                <div>
                  <h4 className="font-semibold mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
