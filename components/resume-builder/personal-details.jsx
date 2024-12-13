"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronsUpDown } from "lucide-react";
import { Editor } from "./editor";
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

export function PersonalDetails({ formData, setFormData }) {
  const [showMore, setShowMore] = useState(false);

  const handleInputChange = (nameOrEvent, value) => {
    if (nameOrEvent.target) {
      const { name, value } = nameOrEvent.target;
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [nameOrEvent]: value });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <Button
        variant="link"
        className="flex items-center text-blue-500"
        onClick={() => setShowMore(!showMore)}
      >
        Additional Details
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>

      {showMore && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="drivingLicense">Driving License</Label>
            <Input
              id="drivingLicense"
              name="drivingLicense"
              value={formData.drivingLicense}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="placeOfBirth">Place of Birth</Label>
            <Input
              id="placeOfBirth"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dateOfBirth && "text-muted-foreground"
                  )}
                >
                  {formData.dateOfBirth ? (
                    formatDate(formData.dateOfBirth)
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.dateOfBirth}
                  onSelect={(date) => handleInputChange("dateOfBirth", date)}
                  initialFocus
                  toDate={new Date()}
                  fromYear={1900}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Summary</Label>
        <Editor
          value={formData.summary}
          onChange={(value) => setFormData({ ...formData, summary: value })}
        />
        <p className="text-sm text-muted-foreground">
          Summarize your qualifications and strength in 2-3 sentences.
        </p>
      </div>
    </div>
  );
}
