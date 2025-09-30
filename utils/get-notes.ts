import { weeklyNotesLinks, theoryLinks } from "@/data/constants/notes";

export const getThisWeekNoteLink = (selectedWeek: string, yearName: string): string | null => {
  // Extract the numeric values from the string inputs
  const weekNumber = parseInt(selectedWeek.replace("Week ", ""), 10);
  const yearNumber = parseInt(yearName.replace("Year ", ""), 10);

  if (isNaN(weekNumber) || isNaN(yearNumber) || weekNumber < 1 || weekNumber > 52) {
    return null; // Return null for invalid inputs
  }

  // Construct the key based on the extracted year and week
  const key = `year-${yearNumber}-week-${weekNumber}` as keyof typeof weeklyNotesLinks;

  return weeklyNotesLinks[key] || null; // Return the corresponding link or null if not found
};


export const getTheoryLink = (selectedWeek: string, yearName: string): string | null => {
  // Extract the numeric values from the string inputs
  const weekNumber = parseInt(selectedWeek.replace("Week ", ""), 10);
  const yearNumber = parseInt(yearName.replace("Year ", ""), 10);

  if (isNaN(weekNumber) || isNaN(yearNumber) || weekNumber < 1 || weekNumber > 52) {
    return null; // Return null for invalid inputs
  }

  // Determine the corresponding month (each month has ~4.33 weeks)
  const month = Math.ceil(weekNumber / 4.33);

  // Construct the key based on the extracted year and month
  const key = `year-${yearNumber}-month-${month}-theory` as keyof typeof theoryLinks;

  return theoryLinks[key] || null; // Return the corresponding link or null if not found
};