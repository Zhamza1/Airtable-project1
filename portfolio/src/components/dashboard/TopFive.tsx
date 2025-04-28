type Project = {
    name: string;
    likes: number;
  };
  
  type TopLikedProjectsProps = {
    projects: Project[];
  };
  
  export function TopLikedProjects({ projects }: TopLikedProjectsProps) {
    const sortedProjects = [...projects]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5);

    return (
      <div className="rounded-xl ">
        <h3 className="font-semibold mb-2">Top 5 Projets</h3>
        <ul>
          {sortedProjects.map((project, idx) => (
            <li key={project.name} className="flex justify-between py-1">
              <span>{idx + 1}. {project.name}</span>
              <span className="font-bold">{project.likes} ❤️</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }