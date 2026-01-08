export const Footer = () => {
  return (
    <footer className="flex items-center justify-center h-16">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Enzo Sylvestrin. All rights reserved.
      </p>
    </footer>
  );
};