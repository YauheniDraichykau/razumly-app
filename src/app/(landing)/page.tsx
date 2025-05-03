import Link from 'next/link';
import { ArrowRight, FileText, Shield, Zap } from 'lucide-react';
import { Button, Card, CardContent } from '@core/ui';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col m-auto">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Razumly</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="hidden md:inline-flex">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-primary hover:bg-primary-hover">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Simplify Complex Documents with AI
              </h1>
              <p className="mb-8 text-lg text-muted-foreground/80 md:text-xl">
                Razumly helps you understand medical, financial, and legal documents by translating
                them into simple, human-friendly language.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-primary hover:bg-primary-hover w-full sm:w-auto">
                    Simplify Your Documents Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-secondary/50" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              Why Choose Razumly?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border border-secondary shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-muted-foreground">Fast & Accurate</h3>
                  <p className="text-muted-foreground/80">
                    Get simplified explanations in seconds, with important points highlighted for
                    quick understanding.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-secondary shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Secure & Private</h3>
                  <p className="text-muted-foreground/80">
                    Your documents are processed securely and never stored permanently. Your privacy
                    is our priority.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-secondary shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Multiple Document Types</h3>
                  <p className="text-muted-foreground/80">
                    Works with medical reports, legal contracts, financial statements, and more.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-secondary/50">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">How It Works</h2>
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                    1
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Upload or Paste</h3>
                  <p className="text-muted-foreground/80">
                    Upload your document or paste the text you need simplified.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                    2
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Select Document Type</h3>
                  <p className="text-muted-foreground/80">
                    Choose the category that best matches your document.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                    3
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Get Simplified Results</h3>
                  <p className="text-muted-foreground/80">
                    Receive an easy-to-understand version with highlighted important points.
                  </p>
                </div>
              </div>
              <div className="mt-12 text-center">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-primary hover:bg-primary-hover">
                    Try It Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">About Razumly</h2>
              <p className="mb-8 text-lg text-muted-foreground/80">
                Razumly uses advanced AI to break down complex documents into simple, understandable
                language. Our mission is to make information accessible to everyone, regardless of
                their expertise in medical, legal, or financial fields.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Ready to Simplify Your Documents?
              </h2>
              <p className="mb-8 text-lg text-white/90">
                Join thousands of users who are understanding complex documents with ease.
              </p>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Razumly</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground/70 hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground/70 hover:text-primary">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground/70 hover:text-primary">
                Contact Us
              </Link>
            </nav>
            <div className="text-sm text-muted-foreground/70">
              © {new Date().getFullYear()} Razumly. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
