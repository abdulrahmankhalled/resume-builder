export const PROFICIENCY_LEVELS = [
  { value: "native", label: "Native" },
  { value: "advanced", label: "Advanced" },
  { value: "intermediate", label: "Intermediate" },
  { value: "beginner", label: "Beginner" },
];

export const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "italian", label: "Italian" },
  { value: "portuguese", label: "Portuguese" },
  { value: "russian", label: "Russian" },
  { value: "chinese", label: "Chinese" },
  { value: "japanese", label: "Japanese" },
  { value: "korean", label: "Korean" },
  { value: "arabic", label: "Arabic" },
];

export const EDUCATION_LEVELS = [
  { value: "phd", label: "Ph.D." },
  { value: "masters", label: "Master's Degree" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "associate", label: "Associate's Degree" },
  { value: "diploma", label: "Diploma" },
  { value: "certificate", label: "Certificate" },
  { value: "highschool", label: "High School" },
];

export const SKILL_LEVELS = [
  { value: "expert", label: "Expert", stars: 5 },
  { value: "advanced", label: "Advanced", stars: 4 },
  { value: "intermediate", label: "Intermediate", stars: 3 },
  { value: "beginner", label: "Beginner", stars: 2 },
  { value: "novice", label: "Novice", stars: 1 },
];

export const DEFAULT_SECTIONS = [
  {
    id: "personal",
    title: "Personal Details",
    description: "Add your personal and contact information.",
  },
  {
    id: "skills",
    title: "Technical Skills",
    description:
      "Select 5 relevant skills that align with the job requirements.",
  },
  {
    id: "employment",
    title: "Employment",
    description: "Add your work experience and achievements.",
  },
  {
    id: "education",
    title: "Education",
    description: "Add your educational background and qualifications.",
  },
  {
    id: "certificates",
    title: "Certificates",
    description: "List relevant certificates and certifications.",
  },
  {
    id: "languages",
    title: "Languages",
    description: "List languages you speak and your proficiency level.",
  },
];
