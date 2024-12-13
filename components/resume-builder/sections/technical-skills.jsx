"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteDialog } from "../common/delete-dialog";
import { SectionWrapper } from "../common/section-wrapper";
import { ItemHeader } from "../common/item-header";
import { SKILL_LEVELS } from "@/lib/constants";

export function TechnicalSkills({ formData, setFormData }) {
  const [deleteSkillIndex, setDeleteSkillIndex] = useState(null);

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [
        ...formData.skills,
        {
          name: "",
          level: "",
          expanded: true,
        },
      ],
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
    <SectionWrapper onAdd={addSkill} addButtonText="Add Skill">
      {formData.skills.map((skill, index) => (
        <div key={index}>
          <ItemHeader
            title={skill.name || "New Skill"}
            subtitle={SKILL_LEVELS.find((l) => l.value === skill.level)?.label}
            expanded={skill.expanded}
            onToggle={() => toggleSkill(index)}
            onDelete={() => setDeleteSkillIndex(index)}
          />

          {skill.expanded && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Skill Name</Label>
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(index, "name", e.target.value)}
                    placeholder="Enter skill name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Level</Label>
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
            </div>
          )}
        </div>
      ))}

      <DeleteDialog
        open={deleteSkillIndex !== null}
        onOpenChange={() => setDeleteSkillIndex(null)}
        onConfirm={deleteSkill}
      />
    </SectionWrapper>
  );
}
