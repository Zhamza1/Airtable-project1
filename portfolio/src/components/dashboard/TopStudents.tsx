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
    <div className="">
      <h3 className="font-semibold mb-2">Étudiants avec le plus de likes</h3>
      <ul>
        {sorted.map((student, idx) => (
          <li key={student.name} className="flex justify-between py-1">
            <span>{idx + 1}. {student.name}</span>
            <span className="font-bold">{student.likes} 👍</span>
          </li>
        ))}
      </ul>
    </div>
  );
}