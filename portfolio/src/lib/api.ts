import {base} from "@/utils/airtable";


export const getCategoryByName = async (name: string)=> {
  const escaped = name.replace(/'/g, "\\'");
  const records = await base("Category")
      .select({
        filterByFormula: `{name}='${escaped}'`,
        maxRecords: 1,
      })
      .firstPage();
  return records[0] ?? null;
};

export const getTechnologyByName = async (name: string) => {
  const escaped = name.replace(/'/g, "\\'");
  const records = await base("Technologies")
      .select({
        filterByFormula: `{name}='${escaped}'`,
        maxRecords: 1,
      })
      .firstPage();
  return records[0] ?? null;
};

export const getStudentByEmail = async (email: string ) => {
  const escaped = email.replace(/'/g, "\\'");
  const records = await base("Student")
      .select({
        filterByFormula: `{email}='${escaped}'`,
        maxRecords: 1,
      })
      .firstPage();
  return records[0] ?? null;
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
