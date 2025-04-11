export interface Project {
  name: string;
  description: string;
  technology: string[];
  link: string;
  visuals: AirtableImageProps[];
  class: string;
  creator: string;
  student: string;
  category: string;
  comments?: string[];
  likes?: number;
  list_technos?: string[];
  creator_name?: string;
  student_names?: string[];
  category_name?: string;
}

export interface ProjectCardProps {
  projectData: Project;
}

export interface AirtableImageProps {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
}
