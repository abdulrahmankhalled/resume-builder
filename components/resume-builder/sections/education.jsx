"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "../common/date-picker";
import { DeleteDialog } from "../common/delete-dialog";
import { SectionWrapper } from "../common/section-wrapper";
import { ItemHeader } from "../common/item-header";
import { formatDate } from "@/lib/utils";
import { EDUCATION_LEVELS } from "@/lib/constants";

export function Education({ formData, setFormData }) {
  const [deleteEducationIndex, setDeleteEducationIndex] = useState(null);

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          universityName: "",
          level: "",
          startDate: "",
          endDate: "",
          currentlyStudying: false,
          expanded: true,
        },
      ],
    });
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };

    if (field === "currentlyStudying" && value === true) {
      newEducation[index].endDate = "";
    }

    setFormData({ ...formData, education: newEducation });
  };

  const toggleEducation = (index) => {
    const newEducation = [...formData.education];
    newEducation[index].expanded = !newEducation[index].expanded;
    setFormData({ ...formData, education: newEducation });
  };

  const deleteEducation = () => {
    if (deleteEducationIndex === null) return;
    const newEducation = formData.education.filter(
      (_, i) => i !== deleteEducationIndex
    );
    setFormData({ ...formData, education: newEducation });
    setDeleteEducationIndex(null);
  };

  return (
    <SectionWrapper onAdd={addEducation} addButtonText="Add Education">
      {formData.education.map((edu, index) => (
        <div key={index}>
          <ItemHeader
            title={edu.universityName || "New Education"}
            subtitle={
              EDUCATION_LEVELS.find((l) => l.value === edu.level)?.label &&
              `${EDUCATION_LEVELS.find((l) => l.value === edu.level)?.label}${
                edu.startDate
                  ? ` • ${formatDate(edu.startDate)} - ${
                      edu.currentlyStudying
                        ? "Present"
                        : edu.endDate
                        ? formatDate(edu.endDate)
                        : ""
                    }`
                  : ""
              }`
            }
            expanded={edu.expanded}
            onToggle={() => toggleEducation(index)}
            onDelete={() => setDeleteEducationIndex(index)}
          />

          {edu.expanded && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>University Name</Label>
                  <Input
                    value={edu.universityName}
                    onChange={(e) =>
                      updateEducation(index, "universityName", e.target.value)
                    }
                    placeholder="Enter university name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Level</Label>
                  <Select
                    value={edu.level}
                    onValueChange={(value) =>
                      updateEducation(index, "level", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EDUCATION_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <DatePicker
                    value={edu.startDate}
                    onChange={(date) =>
                      updateEducation(index, "startDate", date)
                    }
                    toDate={new Date()}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <DatePicker
                    value={edu.endDate}
                    onChange={(date) => updateEducation(index, "endDate", date)}
                    fromDate={
                      edu.startDate ? new Date(edu.startDate) : undefined
                    }
                    toDate={new Date()}
                    disabled={edu.currentlyStudying}
                    placeholder={
                      edu.currentlyStudying ? "Present" : "Pick a date"
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={edu.currentlyStudying}
                  onCheckedChange={(checked) =>
                    updateEducation(index, "currentlyStudying", checked)
                  }
                />
                <Label>I currently study here</Label>
              </div>
            </div>
          )}
        </div>
      ))}

      <DeleteDialog
        open={deleteEducationIndex !== null}
        onOpenChange={() => setDeleteEducationIndex(null)}
        onConfirm={deleteEducation}
      />
    </SectionWrapper>
  );
}
