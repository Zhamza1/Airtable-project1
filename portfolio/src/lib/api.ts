import { AdminRecord } from "@/types/auth";
import { base } from "@/utils/airtable";

export const getStudents = async () => {
  const students = await base("Student").select({}).all();
  return students;
};

export const getUserByEmail = async (email: string) => {
  const user = await base("Admin")
    .select({
      filterByFormula: `email="${email}"`,
      maxRecords: 1,
    })
    .firstPage();
  return user;
};

export const registerAdmin = async (data: any) => {
  const { email, name, password } = data;

  try {
    const createdUser = await base("Admin").create({
      email,
      name,
      password,
    });
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

export const projectsList = async () => {
  const projects = await base("Project").select({}).all();
  return projects;
};
