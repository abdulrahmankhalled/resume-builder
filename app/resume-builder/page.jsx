import { ResumeBuilder } from "../../components/resume-builder/resume-builder";

export default function ResumePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Resume Builder</h1>
      <ResumeBuilder />
    </div>
  );
}
