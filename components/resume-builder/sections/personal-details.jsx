"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "../common/date-picker";
import { Editor } from "../common/editor";
import { ChevronsUpDown } from "lucide-react";
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
            type="tel"
            value={formData.phone}
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
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <DatePicker
              value={formData.dateOfBirth}
              onChange={(date) => handleInputChange("dateOfBirth", date)}
              toDate={new Date()}
              fromYear={1900}
            />
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
