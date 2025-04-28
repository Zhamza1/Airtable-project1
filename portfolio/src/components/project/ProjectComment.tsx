import { CircleUser } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ProjectComment({
  author,
  content,
}: {
  author: string;
  content: string;
}) {
  return (
    <Card className="min-w-lg bg-slate-50 dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CircleUser className="inline mr-2" />
          {author}
        </CardTitle>
      </CardHeader>
      <CardContent className="font-medium">{content}</CardContent>
    </Card>
  );
}
