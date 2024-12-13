"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Star, FileText } from "lucide-react";

export function ResumePreview({ formData, sections }) {
  const resumeRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculatePages = () => {
      if (resumeRef.current) {
        const contentDiv = resumeRef.current.querySelector(".resume-content");
        if (!contentDiv) return;

        const contentHeight = contentDiv.getBoundingClientRect().height;
        const a4Height = 297 * 3.7795275591; // Convert mm to px (1mm = 3.7795275591px)
        const calculatedPages = Math.ceil(contentHeight / a4Height);
        setPageCount(Math.max(1, calculatedPages));
      }
    };

    const timer = setTimeout(calculatePages, 100);
    window.addEventListener("resize", calculatePages);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculatePages);
    };
  }, [isClient, formData, sections]);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(d);
  };

  const handleDownload = async () => {
    if (!resumeRef.current || !isClient) return;

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: 0,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().set(opt).from(resumeRef.current).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const renderStars = (level) => {
    const stars = [];
    const levels = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      expert: 5,
    };
    const numStars = levels[level] || 0;

    for (let i = 0; i < 5; i++) {
      if (i < numStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const renderSection = (sectionId) => {
    switch (sectionId) {
      case "personal":
        return (
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">
              {formData.firstName} {formData.lastName}
            </h1>
            <p className="text-gray-600">{formData.jobTitle}</p>
            <div className="text-sm text-gray-500">
              {[
                formData.email,
                formData.phone,
                formData.city && formData.country
                  ? `${formData.city}, ${formData.country}`
                  : formData.city || formData.country,
              ]
                .filter(Boolean)
                .join(" • ")}
            </div>
            {(formData.address ||
              formData.postalCode ||
              formData.nationality ||
              formData.dateOfBirth) && (
              <div className="text-sm text-gray-500">
                {[
                  formData.address,
                  formData.postalCode,
                  formData.nationality,
                  formData.dateOfBirth && formatDate(formData.dateOfBirth),
                ]
                  .filter(Boolean)
                  .join(" • ")}
              </div>
            )}
            {formData.summary && (
              <div className="mt-4 text-left">
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: formData.summary }}
                />
              </div>
            )}
          </div>
        );

      case "summary":
        return (
          formData.summary && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Professional Summary
              </h2>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: formData.summary }}
              />
            </div>
          )
        );

      case "employment":
        return (
          formData.employment?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Employment History
              </h2>
              <div className="space-y-4">
                {formData.employment.map((job, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{job.jobTitle}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-500">
                      {job.startDate && formatDate(job.startDate)} -{" "}
                      {job.currentlyWorking
                        ? "Present"
                        : job.endDate && formatDate(job.endDate)}
                    </p>
                    {job.description && (
                      <div
                        className="mt-2 text-gray-700"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        );

      case "education":
        return (
          formData.education?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Education
              </h2>
              <div className="space-y-4">
                {formData.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{edu.universityName}</h3>
                    <p className="text-gray-600">{edu.level}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate &&
                        new Date(edu.startDate).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}{" "}
                      -{" "}
                      {edu.currentlyStudying
                        ? "Present"
                        : edu.endDate &&
                          new Date(edu.endDate).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        );

      case "skills":
        return (
          formData.skills?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-4">
                {formData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg"
                  >
                    <span className="font-semibold">{skill.name}</span>
                    <div className="flex">{renderStars(skill.level)}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        );

      case "languages":
        return (
          formData.languages?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Languages
              </h2>
              <div className="flex flex-wrap gap-4">
                {formData.languages.map((lang, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="font-semibold capitalize">
                      {lang.language}
                    </span>
                    <span className="text-gray-600 capitalize">
                      - {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        );

      case "certificates":
        return (
          formData.certificates?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Certificates
              </h2>
              <div className="space-y-2">
                {formData.certificates.map((cert, index) => (
                  <div key={index}>
                    <p className="font-semibold">{cert.name}</p>
                    {cert.date && (
                      <p className="text-sm text-gray-500">
                        {new Date(cert.date).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-auto h-[calc(100vh-10rem)]">
        <div
          ref={resumeRef}
          className="bg-white"
          style={{
            minHeight: "297mm",
            width: "210mm",
            maxWidth: "100%",
            margin: "0 auto",
            transform: "scale(var(--preview-scale, 0.8))",
            transformOrigin: "top center",
          }}
        >
          <div className="resume-content space-y-6 py-8">
            {sections.map((section) => {
              const content = renderSection(section.id);
              return content ? (
                <div key={section.id} className="print:break-inside-avoid px-8">
                  {content}
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
      {isClient && pageCount > 0 && (
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FileText className="h-4 w-4" />
            <span>
              {pageCount} page{pageCount !== 1 ? "s" : ""}
            </span>
          </div>
          <Button onClick={handleDownload} disabled={!isClient}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      )}
    </div>
  );
}
