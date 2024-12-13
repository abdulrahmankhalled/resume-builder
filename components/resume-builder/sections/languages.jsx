"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DeleteDialog } from "../common/delete-dialog";
import { SectionWrapper } from "../common/section-wrapper";
import { ItemHeader } from "../common/item-header";
import { LANGUAGES, PROFICIENCY_LEVELS } from "@/lib/constants";

export function Languages({ formData, setFormData }) {
  const [deleteLanguageIndex, setDeleteLanguageIndex] = useState(null);

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [
        ...formData.languages,
        {
          language: "",
          proficiency: "",
          expanded: true,
        },
      ],
    });
  };

  const updateLanguage = (index, field, value) => {
    const newLanguages = [...formData.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    setFormData({ ...formData, languages: newLanguages });
  };

  const toggleLanguage = (index) => {
    const newLanguages = [...formData.languages];
    newLanguages[index].expanded = !newLanguages[index].expanded;
    setFormData({ ...formData, languages: newLanguages });
  };

  const deleteLanguage = () => {
    if (deleteLanguageIndex === null) return;
    const newLanguages = formData.languages.filter(
      (_, i) => i !== deleteLanguageIndex
    );
    setFormData({ ...formData, languages: newLanguages });
    setDeleteLanguageIndex(null);
  };

  return (
    <SectionWrapper onAdd={addLanguage} addButtonText="Add Language">
      {formData.languages.map((lang, index) => (
        <div key={index}>
          <ItemHeader
            title={
              LANGUAGES.find((l) => l.value === lang.language)?.label ||
              "New Language"
            }
            subtitle={
              PROFICIENCY_LEVELS.find((l) => l.value === lang.proficiency)
                ?.label
            }
            expanded={lang.expanded}
            onToggle={() => toggleLanguage(index)}
            onDelete={() => setDeleteLanguageIndex(index)}
          />

          {lang.expanded && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={lang.language}
                    onValueChange={(value) =>
                      updateLanguage(index, "language", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Proficiency</Label>
                  <Select
                    value={lang.proficiency}
                    onValueChange={(value) =>
                      updateLanguage(index, "proficiency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFICIENCY_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <DeleteDialog
        open={deleteLanguageIndex !== null}
        onOpenChange={() => setDeleteLanguageIndex(null)}
        onConfirm={deleteLanguage}
      />
    </SectionWrapper>
  );
}
