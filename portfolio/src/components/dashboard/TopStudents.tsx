type Student = {
  name: string;
  likes: number;
};

type TopStudentsProps = {
  students: Student[];
};

export function TopStudents({ students }: TopStudentsProps) {
  const sorted = [...students].sort((a, b) => b.likes - a.likes).slice(0, 5);
  return (
    <div className="p-2 sm:p-4 min-w-0">
      <h3 className="font-semibold mb-2 text-base sm:text-lg text-center">Étudiants avec le plus de likes</h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {sorted.map((student, idx) => (
          <li
            key={student.name}
            className="flex justify-between items-center py-2 text-sm sm:text-base"
          >
            <span className="truncate">{idx + 1}. {student.name}</span>
            <span className="font-bold">{student.likes} 👍</span>
          </li>
        ))}
      </ul>
    </div>
  );
}