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
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SKILL_LEVELS = [
  { value: "expert", label: "Expert", stars: 5 },
  { value: "advanced", label: "Advanced", stars: 4 },
  { value: "intermediate", label: "Intermediate", stars: 3 },
  { value: "beginner", label: "Beginner", stars: 2 },
  { value: "novice", label: "Novice", stars: 1 },
];

export function TechnicalSkills({ formData, setFormData }) {
  const [deleteSkillIndex, setDeleteSkillIndex] = useState(null);
  const [expandedSkills, setExpandedSkills] = useState({});

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: "", level: "", expanded: true }],
    });
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setFormData({ ...formData, skills: newSkills });
  };

  const toggleSkill = (index) => {
    const newSkills = [...formData.skills];
    newSkills[index].expanded = !newSkills[index].expanded;
    setFormData({ ...formData, skills: newSkills });
  };

  const deleteSkill = () => {
    if (deleteSkillIndex === null) return;
    const newSkills = formData.skills.filter((_, i) => i !== deleteSkillIndex);
    setFormData({ ...formData, skills: newSkills });
    setDeleteSkillIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {formData.skills.map((skill, index) => (
          <div key={index} className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{skill.name}</p>
                <p className="text-sm text-muted-foreground">
                  {SKILL_LEVELS.find((l) => l.value === skill.level)?.label}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSkill(index)}
                >
                  {skill.expanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteSkillIndex(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {skill.expanded ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={skill.name}
                      onChange={(e) =>
                        updateSkill(index, "name", e.target.value)
                      }
                      placeholder="Skill name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Level</label>
                    <Select
                      value={skill.level}
                      onValueChange={(value) =>
                        updateSkill(index, "level", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {SKILL_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        ))}

        <Button variant="outline" className="w-full" onClick={addSkill}>
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      <AlertDialog
        open={deleteSkillIndex !== null}
        onOpenChange={() => setDeleteSkillIndex(null)}
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
            <AlertDialogAction onClick={deleteSkill}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
