import { NextResponse } from "next/server";
import { getProjects, getComments, getStudents, getCategories, getTechnologies } from "@/lib/api";

export async function GET() {
  const projects = await getProjects();
  const comments = await getComments();
  const students = await getStudents();
  const categories = await getCategories();
  const technologies = await getTechnologies();


  const totalProjects = projects.length;

  const totalLikes = projects.reduce((sum, p) => sum + (p.likes || 0), 0);

  const categoryMap: Record<string, string> = {};
  categories.forEach((cat) => {
    categoryMap[cat.id] = cat.name;
  });

  // Now aggregate by category name
  const projectsByCategory: Record<string, number> = {};
  projects.forEach((p) => {
    // If category is a linked record, it's usually an array of IDs
    const catIds = Array.isArray(p.category) ? p.category : [p.category];
    catIds.forEach((catId) => {
      const catName = categoryMap[catId] || "Other";
      projectsByCategory[catName] = (projectsByCategory[catName] || 0) + 1;
    });
  });

  const techMap: Record<string, string> = {};
  technologies.forEach((tech) => {
    techMap[tech.id] = tech.name;
  });
  const technologiesUsage: Record<string, number> = {};
  projects.forEach((p) => {
    const techIds = Array.isArray(p.technology) ? p.technology : [p.technology];
    
    techIds.forEach((techId) => {
      const techName = techMap[techId] || "Other";
      technologiesUsage[techName] = (technologiesUsage[techName] || 0) + 1;
    });
  });

  // Top 5 liked projects
  const topProjects = [...projects]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .reverse()
    .slice(0, 5)
    .map((p) => ({ name: p.name, likes: p.likes }));

  // Build a map of studentId -> promotion
  const studentPromotionMap: Record<string, string> = {};
  students.forEach((student) => {
    studentPromotionMap[student.id] = student.promotion || "Unknown";
  });

  // Aggregate likes by promotion
  const likesByPromotion: Record<string, number> = {};
  projects.forEach((p) => {
    // p.student may be a linked record (array of IDs) or a single ID
    const studentIds = Array.isArray(p.student) ? p.student : [p.student];
    studentIds.forEach((studentId) => {
      const promo = studentPromotionMap[studentId] || "Unknown";
      likesByPromotion[promo] = (likesByPromotion[promo] || 0) + (p.likes || 0);
    });
  });

  const mostLikedPromotionEntry = Object.entries(likesByPromotion).sort((a, b) => b[1] - a[1])[0];
  const mostLikedPromotion = mostLikedPromotionEntry
    ? { name: mostLikedPromotionEntry[0], likes: mostLikedPromotionEntry[1] }
    : null;

  // Top students by likes
  const likesByStudent: Record<string, number> = {};
  projects.forEach((p) => {
    const student = p.student_names;
    if (student) {
      likesByStudent[student] = (likesByStudent[student] || 0) + (p.likes || 0);
    }
    });
  const topStudents = Object.entries(likesByStudent)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, likes]) => ({ name, likes }));

  const projectNameMap: Record<string, string> = {};
  projects.forEach((project) => {
    projectNameMap[project.id] = project.name;
  });
  
  // Most recent comments (show text, author, and project name)
  const mostRecentComments = [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((comment) => {
      // comment.project may be an array of IDs or a single ID
      const projectId = Array.isArray(comment.project) ? comment.project[0] : comment.project;
      return {
        id: comment.id,
        text: comment.text,
        author: comment.author,
        project: projectNameMap[projectId] || "Projet inconnu",
      };
    });

  return NextResponse.json({
    totalProjects,
    totalLikes,
    projectsByCategory,
    topProjects,
    mostLikedPromotion,
    topStudents,
    mostRecentComments,
    technologiesUsage
  });
}