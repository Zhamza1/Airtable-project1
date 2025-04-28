const sections = [
  {
    title: "Projets",
    links: [
      { name: "Tous les projets", href: "#projects" },
      { name: "Nos promotions", href: "#promotions" },
      { name: "Technologies", href: "#technologies" },
    ],
  },
  {
    title: "À propos",
    links: [
      { name: "Filière Ingénierie du Web", href: "#about" },
      { name: "Notre équipe pédagogique", href: "#" },
      { name: "Salons & JPO", href: "#" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { name: "Aide", href: "#" },
      { name: "Contact", href: "#contact" },
      { name: "Mentions légales", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="py-20 bg-background text-foreground">
      <div className="container mx-auto flex flex-col items-center justify-center gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          {sections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-6 text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Portfolio Ingénierie du Web — Projets réalisés par les étudiants pour les Salons & Journées Portes Ouvertes.
        </div>
      </div>
    </footer>
  );
};

export { Footer };
