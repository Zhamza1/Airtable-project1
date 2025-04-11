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
    <Card>
      <CardHeader>
        <CardTitle className="">{author}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="">{content}</CardContent>
    </Card>
  );
}
