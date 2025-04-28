type Comment = {
  id: string;
  student: string;
  text: string;
  date: string; // ISO string or formatted date
};

type MostRecentCommentsProps = {
  comments: Comment[];
};

export function MostRecentComments({ comments }: MostRecentCommentsProps) {
  return (
    <div className="p-4">
      <h3 className="font-semibold mb-2">Commentaires récents</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-2">
            <div className="text-sm text-muted-foreground">{comment.author} <span className="text-xs text-gray-400">({comment.project})</span></div>
            <div className="text-base">{comment.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}