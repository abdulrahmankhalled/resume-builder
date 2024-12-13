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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { useState } from "react";

const formatDate = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd MMM yyyy", { locale: enUS });
};

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
    <div className="space-y-6">
      <div className="space-y-4">
        {formData.certificates.map((cert, index) => (
          <div key={index}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{cert.name}</p>
                <p className="text-sm text-muted-foreground">
                  {cert.date && formatDate(cert.date)}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleCertificate(index)}
                >
                  {cert.expanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteCertIndex(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !cert.date && "text-muted-foreground"
                          )}
                        >
                          {cert.date ? (
                            formatDate(cert.date)
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={cert.date}
                          onSelect={(date) =>
                            updateCertificate(index, "date", date)
                          }
                          initialFocus
                          toDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <Button variant="outline" className="w-full" onClick={addCertificate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Certificate
        </Button>
      </div>

      <AlertDialog
        open={deleteCertIndex !== null}
        onOpenChange={() => setDeleteCertIndex(null)}
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
            <AlertDialogAction onClick={deleteCertificate}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
