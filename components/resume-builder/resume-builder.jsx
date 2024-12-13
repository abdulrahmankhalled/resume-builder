"use client";

import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { AddSections } from "./add-sections";
import { Certificates } from "./sections/certificates";
import { Education } from "./sections/education";
import { Employment } from "./sections/employment";
import { Languages } from "./sections/languages";
import { PersonalDetails } from "./sections/personal-details";
import { ResumePreview } from "./resume-preview";
import { TechnicalSkills } from "./sections/technical-skills";
import { DeleteDialog } from "./common/delete-dialog";
import { DEFAULT_SECTIONS } from "@/lib/constants";
import { SectionHeader } from "./section-header";
const DEFAULT_FORM_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  jobTitle: "",
  address: "",
  postalCode: "",
  drivingLicense: "",
  nationality: "",
  placeOfBirth: "",
  dateOfBirth: "",
  summary: "",
  skills: [],
  employment: [],
  education: [],
  certificates: [],
  languages: [],
};

const SECTION_COMPONENTS = {
  personal: PersonalDetails,
  skills: TechnicalSkills,
  employment: Employment,
  education: Education,
  certificates: Certificates,
  languages: Languages,
};

export function ResumeBuilder() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [deleteSectionId, setDeleteSectionId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSections((sections) => {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      return arrayMove(sections, oldIndex, newIndex);
    });
  };

  const handleAddSection = (sectionId) => {
    const section = DEFAULT_SECTIONS.find((s) => s.id === sectionId);
    if (!section) return;
    setSections([...sections, section]);
  };

  const handleSectionDelete = () => {
    if (!deleteSectionId) return;
    setSections(sections.filter((s) => s.id !== deleteSectionId));
    setDeleteSectionId(null);
  };

  const handleSectionTitleChange = (id, newTitle) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, title: newTitle } : s))
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => {
              const Component = SECTION_COMPONENTS[section.id];
              if (!Component) return null;

              return (
                <div key={section.id} className="space-y-6">
                  <div className="space-y-2">
                    <SectionHeader
                      id={section.id}
                      title={section.title}
                      onDelete={() => setDeleteSectionId(section.id)}
                      onTitleChange={(newTitle) =>
                        handleSectionTitleChange(section.id, newTitle)
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                  <Component formData={formData} setFormData={setFormData} />
                  <div className="border-t border-gray-200" />
                </div>
              );
            })}
          </SortableContext>
        </DndContext>

        <div>
          <AddSections sections={sections} onAddSection={handleAddSection} />
        </div>

        <DeleteDialog
          open={deleteSectionId !== null}
          onOpenChange={() => setDeleteSectionId(null)}
          onConfirm={handleSectionDelete}
        />
      </div>
      <div className="sticky top-6">
        <ResumePreview formData={formData} sections={sections} />
      </div>
    </div>
  );
}
