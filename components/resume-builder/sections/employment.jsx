"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Editor } from "../common/editor";
import { DatePicker } from "../common/date-picker";
import { DeleteDialog } from "../common/delete-dialog";
import { SectionWrapper } from "../common/section-wrapper";
import { ItemHeader } from "../common/item-header";
import { formatDate } from "@/lib/utils";

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
    <SectionWrapper onAdd={addJob} addButtonText="Add Employment">
      {formData.employment.map((job, index) => (
        <div key={index}>
          <ItemHeader
            title={job.jobTitle || "New Position"}
            subtitle={
              job.company &&
              `${job.company}${
                job.startDate
                  ? ` • ${formatDate(job.startDate)} - ${
                      job.currentlyWorking
                        ? "Present"
                        : job.endDate
                        ? formatDate(job.endDate)
                        : ""
                    }`
                  : ""
              }`
            }
            expanded={job.expanded}
            onToggle={() => toggleJob(index)}
            onDelete={() => setDeleteJobIndex(index)}
          />

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
                  <DatePicker
                    value={job.startDate}
                    onChange={(date) => updateJob(index, "startDate", date)}
                    toDate={new Date()}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <DatePicker
                    value={job.endDate}
                    onChange={(date) => updateJob(index, "endDate", date)}
                    fromDate={
                      job.startDate ? new Date(job.startDate) : undefined
                    }
                    toDate={new Date()}
                    disabled={job.currentlyWorking}
                    placeholder={
                      job.currentlyWorking ? "Present" : "Pick a date"
                    }
                  />
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

      <DeleteDialog
        open={deleteJobIndex !== null}
        onOpenChange={() => setDeleteJobIndex(null)}
        onConfirm={deleteJob}
      />
    </SectionWrapper>
  );
}
