"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "../common/date-picker";
import { DeleteDialog } from "../common/delete-dialog";
import { SectionWrapper } from "../common/section-wrapper";
import { ItemHeader } from "../common/item-header";
import { formatDate } from "@/lib/utils";

export function Certificates({ formData, setFormData }) {
  const [deleteCertIndex, setDeleteCertIndex] = useState(null);

  const addCertificate = () => {
    setFormData({
      ...formData,
      certificates: [
        ...formData.certificates,
        {
          name: "",
          date: "",
          expanded: true,
        },
      ],
    });
  };

  const updateCertificate = (index, field, value) => {
    const newCertificates = [...formData.certificates];
    newCertificates[index] = { ...newCertificates[index], [field]: value };
    setFormData({ ...formData, certificates: newCertificates });
  };

  const toggleCertificate = (index) => {
    const newCertificates = [...formData.certificates];
    newCertificates[index].expanded = !newCertificates[index].expanded;
    setFormData({ ...formData, certificates: newCertificates });
  };

  const deleteCertificate = () => {
    if (deleteCertIndex === null) return;
    const newCertificates = formData.certificates.filter(
      (_, i) => i !== deleteCertIndex
    );
    setFormData({ ...formData, certificates: newCertificates });
    setDeleteCertIndex(null);
  };

  return (
    <SectionWrapper onAdd={addCertificate} addButtonText="Add Certificate">
      {formData.certificates.map((cert, index) => (
        <div key={index}>
          <ItemHeader
            title={cert.name || "New Certificate"}
            subtitle={cert.date && formatDate(cert.date)}
            expanded={cert.expanded}
            onToggle={() => toggleCertificate(index)}
            onDelete={() => setDeleteCertIndex(index)}
          />

          {cert.expanded && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Certificate Name</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) =>
                      updateCertificate(index, "name", e.target.value)
                    }
                    placeholder="Enter certificate name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <DatePicker
                    value={cert.date}
                    onChange={(date) => updateCertificate(index, "date", date)}
                    toDate={new Date()}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <DeleteDialog
        open={deleteCertIndex !== null}
        onOpenChange={() => setDeleteCertIndex(null)}
        onConfirm={deleteCertificate}
      />
    </SectionWrapper>
  );
}
