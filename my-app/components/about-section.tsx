import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Coffee, Music } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Passionate about advancing AI and data science while leveraging expertise in cybersecurity, SRE, and DevOps to build secure, scalable, and intelligent systems with real-world impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image and Bio */}
          <div className="space-y-6">
            <div className="relative">
              <img
                src="/images/sarthak.png"
                alt="Sarthak Pokhrel"
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-full">
                <GraduationCap className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Hi, I'm Sarthak Pokhrel</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                I'm currently pursuing my M.S. in Data Science at Fordham University, building on a B.Tech in Computer Science (AI) from India. 
                I have professional experience as a Cloud and DevOps Engineer at Hitachi and a strong passion for AI, machine learning, and data-driven solutions. 
                My journey combines engineering expertise with analytical skills to create predictive models and deploy scalable, impactful solutions.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                When I'm not analyzing datasets or building predictive models, you'll find me developing AI agents, deploying scalable solutions in the cloud, and optimizing workflows through DevOps practices. 
                I also contribute to open-source AI projects and stay up-to-date with the latest research in artificial intelligence and machine learning.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <div>
                      <div className="font-semibold">Education</div>
                      <div className="text-sm text-muted-foreground">Fordham University</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-secondary" />
                    <div>
                      <div className="font-semibold">GPA</div>
                      <div className="text-sm text-muted-foreground">3.9/4.0</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3">
                    <Coffee className="w-8 h-8 text-accent" />
                    <div>
                      <div className="font-semibold">Interests</div>
                      <div className="text-sm text-muted-foreground">AI Research</div>
                      <div className="text-sm text-muted-foreground">DevOps</div>
                      <div className="text-sm text-muted-foreground">Cloud Computing</div>
                      <div className="text-sm text-muted-foreground">Machine Learning</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3">
                    <Music className="w-8 h-8 text-chart-2" />
                    <div>
                      <div className="font-semibold">Hobbies</div>
                      <div className="text-sm text-muted-foreground">Piano, Hiking</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div>
              <h4 className="font-semibold mb-3">Recent Achievements and Cerifications</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">python programming (Pantech Solutions)</Badge>
                <Badge variant="secondary">SII merit Scholarship</Badge>
                <Badge variant="secondary">Cyber Security SIEM and SOC basic</Badge>
                <Badge variant="secondary">Machine Learning (Pantech Solutions)</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
