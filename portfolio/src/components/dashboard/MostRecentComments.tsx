type Comment = {
  id: string;
  author: string;
  project: string;
  text: string;
};

type MostRecentCommentsProps = {
  comments: Comment[];
};

export function MostRecentComments({ comments }: MostRecentCommentsProps) {
  return (
    <div className="p-2 sm:p-4 min-w-0">
      <h3 className="font-semibold mb-2 text-base sm:text-lg text-center">Commentaires récents</h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {comments.map((comment) => (
          <li key={comment.id} className="py-2">
            <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
              <span className="truncate font-medium">{comment.author}</span>
              <span className="text-xs text-gray-400 truncate">({comment.project})</span>
            </div>
            <div className="text-base break-words">{comment.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}