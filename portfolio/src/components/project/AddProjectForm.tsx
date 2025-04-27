import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import {projectSchema, ProjectSchemaType} from "@/schemas/projectSchema";

export default function AddProjectForm() {
  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {},
  });
  return (
    <Form>
      <form></form>
    </Form>
  );
}
