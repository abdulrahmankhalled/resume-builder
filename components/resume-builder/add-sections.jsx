"use client";

import { Briefcase, GraduationCap, Languages, Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";

const AVAILABLE_SECTIONS = [
  {
    id: "skills",
    title: "Skills",
    icon: Lightbulb,
    description: "Highlight your technical and professional skills",
  },
  {
    id: "languages",
    title: "Languages",
    icon: Languages,
    description: "Add languages you speak and your proficiency level",
  },
  {
    id: "employment",
    title: "Employment",
    icon: Briefcase,
    description: "Add your work experience and achievements",
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    description: "Add your educational background and qualifications",
  },
];

export function AddSections({ sections, onAddSection }) {
  const isDisabled = (sectionId) => sections.some((s) => s.id === sectionId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Add sections</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add more sections to your resume to highlight your skills, education,
          work experience, and more. Some sections can only be added once.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AVAILABLE_SECTIONS.map((section) => {
          const disabled = isDisabled(section.id);
          return (
            <Button
              key={section.id}
              variant="ghost"
              className="h-auto justify-start"
              onClick={() => onAddSection(section.id)}
              disabled={disabled}
            >
              <div className="flex items-center gap-4">
                <section.icon className="h-5 w-5 mt-0.5" />
                <div className="space-y-1 text-left">
                  <p className="font-semibold leading-none">{section.title}</p>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
