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
    <div className="rounded-xl p-2 sm:p-4 min-w-0 w-full">
      <h3 className="font-semibold mb-2 text-base sm:text-lg text-center">Top 5 Projets</h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {sortedProjects.map((project, idx) => (
          <li
            key={project.name}
            className="flex flex-nowrap justify-between items-center py-2 text-sm sm:text-base min-w-0 overflow-hidden"
          >
            <span className="truncate max-w-[70%]">{idx + 1}. {project.name}</span>
            <span className="font-bold whitespace-nowrap">{project.likes} ❤️</span>
          </li>
        ))}
      </ul>
    </div>
  );
}