"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const PROFICIENCY_LEVELS = [
  { value: "native", label: "Native" },
  { value: "advanced", label: "Advanced" },
  { value: "intermediate", label: "Intermediate" },
  { value: "beginner", label: "Beginner" },
];

const LANGUAGES = [
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
  // Add more languages as needed
];

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
    <div className="space-y-6">
      <div className="space-y-4">
        {formData.languages.map((lang, index) => (
          <div key={index}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  {LANGUAGES.find((l) => l.value === lang.language)?.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {
                    PROFICIENCY_LEVELS.find((l) => l.value === lang.proficiency)
                      ?.label
                  }
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleLanguage(index)}
                >
                  {lang.expanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteLanguageIndex(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

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
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
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
                        <SelectValue placeholder="Select level" />
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

        <Button variant="outline" className="w-full" onClick={addLanguage}>
          <Plus className="mr-2 h-4 w-4" />
          Add Language
        </Button>
      </div>

      <AlertDialog
        open={deleteLanguageIndex !== null}
        onOpenChange={() => setDeleteLanguageIndex(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Would you like to remove this section?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This can not be undone, this section will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteLanguage}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
