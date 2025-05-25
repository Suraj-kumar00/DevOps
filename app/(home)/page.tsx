import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "../../components/NewsletterForm";

const projects = [
  {
    title: "Cloud Infrastructure",
    description: "Automated cloud infrastructure deployment using Terraform",
    image: "/projects/cloud-infra.jpg",
    link: "/projects/cloud-infrastructure"
  },
  {
    title: "CI/CD Pipeline",
    description: "Enterprise-grade CI/CD pipeline with GitHub Actions",
    image: "/projects/cicd.jpg",
    link: "/projects/cicd-pipeline"
  },
  {
    title: "Kubernetes Cluster",
    description: "Production-ready Kubernetes cluster setup",
    image: "/projects/kubernetes.jpg",
    link: "/projects/kubernetes-cluster"
  },
  {
    title: "Monitoring Stack",
    description: "Complete monitoring solution with Prometheus & Grafana",
    image: "/projects/monitoring.jpg",
    link: "/projects/monitoring-stack"
  },
  {
    title: "Security Framework",
    description: "DevSecOps implementation for cloud-native apps",
    image: "/projects/security.jpg",
    link: "/projects/security-framework"
  },
  {
    title: "Microservices",
    description: "Scalable microservices architecture deployment",
    image: "/projects/microservices.jpg",
    link: "/projects/microservices"
  }
];

const features = [
  { title: "Cloud & DevOps", description: "Master cloud platforms and DevOps practices" },
  { title: "SRE", description: "Learn Site Reliability Engineering principles" },
  { title: "Platform Engineering", description: "Build and maintain scalable platforms" }
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <div className="min-h-[80vh] w-full dark:bg-black bg-gradient-to-b from-gray-50 to-white dark:from-neutral-950 dark:to-black relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="relative z-20 flex flex-col items-center max-w-6xl mx-auto px-4 py-20">
          <h1 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-neutral-200 dark:to-neutral-500 py-4 text-center mb-6">
            Learn Cloud & DevOps
          </h1>
          <p className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-gray-800 to-gray-600 dark:from-neutral-200 dark:to-neutral-500 text-center max-w-3xl mb-12">
            DevOps is the union of people, <strong>process</strong>, and{" "}
            <strong>products</strong> to enable continuous delivery of value to
            your <strong>end users</strong>.
          </p>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/50 dark:bg-neutral-900/50 border border-gray-200 dark:border-neutral-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-neutral-200">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-neutral-400">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* CNCF Section */}
          <div className="w-full mb-12">
            <Card className="bg-white/50 dark:bg-neutral-900/50 border border-gray-200 dark:border-neutral-800 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center py-8">
                <div className="relative w-64 h-24 mb-6">
                  <Image
                    src="/Assets/cncf.png"
                    alt="CNCF Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-600 dark:text-neutral-400 text-center max-w-2xl mb-6">
                  The Cloud Native Computing Foundation (CNCF) serves as the vendor-neutral home for many of the fastest-growing open source projects, including Kubernetes, Prometheus, and Envoy.
                </p>
                <Link href="https://www.cncf.io/" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-[#446ca9] to-[#2a4b8c] text-white hover:opacity-90 transition-opacity">
                    Visit CNCF Website
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* CNCF Landscape Section */}
          <div className="w-full mb-12">
            <Card className="bg-white/50 dark:bg-neutral-900/50 border border-gray-200 dark:border-neutral-800 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900 dark:text-neutral-200">
                  Explore Coud Native Computing Foundation (CNCF) Landscape
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-neutral-400">
                  Discover the Cloud Native Computing Foundation ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="https://landscape.cncf.io/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:opacity-90 transition-opacity">
                    View CNCF Landscape
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 mt-8">
            <Link href="/docs">
              <Button className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-neutral-200 dark:to-neutral-500 text-white dark:text-black hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
            <Link href="/blogs">
              <Button variant="outline" className="border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-900">
                Read Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Project Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-neutral-200 dark:to-neutral-500">
            Explore Cloud / DevOps / DevSecOps Projects
          </h2>
          <p className="text-gray-600 dark:text-neutral-400 text-center mb-12 max-w-2xl mx-auto text-lg">
            Discover our collection of hands-on projects that will help you master cloud computing and DevOps practices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link href={project.link} key={index}>
                <Card className="h-full bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-200 dark:border-neutral-800 overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-neutral-200">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-neutral-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-white dark:bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-neutral-200 dark:to-neutral-500">
            Subscribe to my newsletter
          </h2>
          <p className="text-gray-600 dark:text-neutral-400 mb-8">
            Get the latest updates about cloud computing and DevOps directly in your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
