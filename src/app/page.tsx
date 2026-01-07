export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 flex items-center justify-center px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
              Enzo Sylvestrin
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-foreground/70 max-w-2xl mx-auto">
            Software Engineer Full Stack
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center text-sm md:text-base text-foreground/60">
            <span className="px-4 py-2 rounded-full bg-accent border border-border">
              TypeScript
            </span>
            <span className="px-4 py-2 rounded-full bg-accent border border-border">
              React
            </span>
            <span className="px-4 py-2 rounded-full bg-accent border border-border">
              Next.js
            </span>
            <span className="px-4 py-2 rounded-full bg-accent border border-border">
              Node.js
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
