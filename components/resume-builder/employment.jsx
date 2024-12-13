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

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Editor } from "./editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { useState } from "react";

const formatDate = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd MMM yyyy", { locale: enUS });
};

export function Employment({ formData, setFormData }) {
  const [deleteJobIndex, setDeleteJobIndex] = useState(null);

  const addJob = () => {
    setFormData({
      ...formData,
      employment: [
        ...formData.employment,
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
          expanded: true,
        },
      ],
    });
  };

  const updateJob = (index, field, value) => {
    const newEmployment = [...formData.employment];
    newEmployment[index] = { ...newEmployment[index], [field]: value };

    // If currently working is toggled on, clear end date
    if (field === "currentlyWorking" && value === true) {
      newEmployment[index].endDate = "";
    }

    setFormData({ ...formData, employment: newEmployment });
  };

  const toggleJob = (index) => {
    const newEmployment = [...formData.employment];
    newEmployment[index].expanded = !newEmployment[index].expanded;
    setFormData({ ...formData, employment: newEmployment });
  };

  const deleteJob = () => {
    if (deleteJobIndex === null) return;
    const newEmployment = formData.employment.filter(
      (_, i) => i !== deleteJobIndex
    );
    setFormData({ ...formData, employment: newEmployment });
    setDeleteJobIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {formData.employment.map((job, index) => (
          <div key={index}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{job.jobTitle}</p>
                <p className="text-sm text-muted-foreground">
                  {job.company}
                  {job.startDate &&
                    ` • ${formatDate(job.startDate)} - ${
                      job.currentlyWorking
                        ? "Present"
                        : job.endDate
                        ? formatDate(job.endDate)
                        : ""
                    }`}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleJob(index)}
                >
                  {job.expanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteJobIndex(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {job.expanded && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      value={job.jobTitle}
                      onChange={(e) =>
                        updateJob(index, "jobTitle", e.target.value)
                      }
                      placeholder="Enter job title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={job.company}
                      onChange={(e) =>
                        updateJob(index, "company", e.target.value)
                      }
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !job.startDate && "text-muted-foreground"
                          )}
                        >
                          {job.startDate ? (
                            formatDate(job.startDate)
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={job.startDate}
                          onSelect={(date) =>
                            updateJob(index, "startDate", date)
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
                            !job.endDate && "text-muted-foreground"
                          )}
                          disabled={job.currentlyWorking}
                        >
                          {job.endDate ? (
                            formatDate(job.endDate)
                          ) : job.currentlyWorking ? (
                            "Present"
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={job.endDate}
                          onSelect={(date) => updateJob(index, "endDate", date)}
                          initialFocus
                          fromDate={
                            job.startDate ? new Date(job.startDate) : undefined
                          }
                          toDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={job.currentlyWorking}
                    onCheckedChange={(checked) =>
                      updateJob(index, "currentlyWorking", checked)
                    }
                  />
                  <Label>I currently work here</Label>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Editor
                    value={job.description}
                    onChange={(value) => updateJob(index, "description", value)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        <Button variant="outline" className="w-full" onClick={addJob}>
          <Plus className="mr-2 h-4 w-4" />
          Add Employment
        </Button>
      </div>

      <AlertDialog
        open={deleteJobIndex !== null}
        onOpenChange={() => setDeleteJobIndex(null)}
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
            <AlertDialogAction onClick={deleteJob}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
