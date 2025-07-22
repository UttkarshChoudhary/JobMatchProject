"use client";

import { useState } from "react";
import { generateResumePDF } from "@/utils/pdfGenerator";
import { saveAs } from "file-saver";

export default function ResumeGenerator() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeData, setResumeData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobDescription }),
    });

    const data = await res.json();
    setResumeData(data);
    setLoading(false);
  };

  const handleDownloadPDF = async () => {
    if (!resumeData) return;
    const blob = await generateResumePDF(resumeData);
    saveAs(blob, "generated-resume.pdf");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Resume Generator</h1>
      <textarea
        rows={10}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="w-full p-3 border rounded mb-4"
        placeholder="Paste the job description here..."
      />
      <div className="space-x-3 mb-4">
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading || !jobDescription}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
        {resumeData && (
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        )}
      </div>

      {resumeData && (
        <div className="bg-gray-50 p-4 border rounded">
          <h2 className="text-xl font-semibold">Preview</h2>
          <p><strong>Name:</strong> {resumeData.name}</p>
          <p><strong>Email:</strong> {resumeData.email}</p>
          <p><strong>Phone:</strong> {resumeData.phone}</p>
          <p><strong>Summary:</strong> {resumeData.summary}</p>

          <div>
            <strong>Skills:</strong>
            <ul className="list-disc ml-6">
              {resumeData.skills.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Experience:</strong>
            <ul className="list-disc ml-6">
              {resumeData.experience.map((exp: any, index: number) => (
                <li key={index}>
                  <strong>{exp.title}</strong> at {exp.company} ({exp.date})
                  <br />{exp.description}
                </li>
              ))}
            </ul>
          </div>

          <p><strong>Education:</strong> {resumeData.education}</p>
        </div>
      )}
    </div>
  );
}
