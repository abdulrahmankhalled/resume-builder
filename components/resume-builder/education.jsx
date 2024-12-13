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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { useState } from "react";

const EDUCATION_LEVELS = [
  { value: "phd", label: "Ph.D." },
  { value: "masters", label: "Master's Degree" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "associate", label: "Associate's Degree" },
  { value: "diploma", label: "Diploma" },
  { value: "certificate", label: "Certificate" },
  { value: "highschool", label: "High School" },
];

const formatDate = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd MMM yyyy", { locale: enUS });
};

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
    <div className="space-y-6">
      <div className="space-y-4">
        {formData.education.map((edu, index) => (
          <div key={index}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{edu.universityName}</p>
                <p className="text-sm text-muted-foreground">
                  {EDUCATION_LEVELS.find((l) => l.value === edu.level)?.label}
                  {edu.startDate &&
                    ` • ${formatDate(edu.startDate)} - ${
                      edu.currentlyStudying
                        ? "Present"
                        : edu.endDate
                        ? formatDate(edu.endDate)
                        : ""
                    }`}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleEducation(index)}
                >
                  {edu.expanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteEducationIndex(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !edu.startDate && "text-muted-foreground"
                          )}
                        >
                          {edu.startDate ? (
                            formatDate(edu.startDate)
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={edu.startDate}
                          onSelect={(date) =>
                            updateEducation(index, "startDate", date)
                          }
                          initialFocus
                          toDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !edu.endDate && "text-muted-foreground"
                          )}
                          disabled={edu.currentlyStudying}
                        >
                          {edu.endDate ? (
                            formatDate(edu.endDate)
                          ) : edu.currentlyStudying ? (
                            "Present"
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={edu.endDate}
                          onSelect={(date) =>
                            updateEducation(index, "endDate", date)
                          }
                          initialFocus
                          fromDate={
                            edu.startDate ? new Date(edu.startDate) : undefined
                          }
                          toDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
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

        <Button variant="outline" className="w-full" onClick={addEducation}>
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      <AlertDialog
        open={deleteEducationIndex !== null}
        onOpenChange={() => setDeleteEducationIndex(null)}
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
            <AlertDialogAction onClick={deleteEducation}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
