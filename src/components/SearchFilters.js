"use client";

import { useState } from "react";

const filterOptions = {
  nohakhan: ["All", "Nadeem Sarwar", "Irfan Haider", "Farhan Ali Waris"],
  year: ["All", "2026", "2025", "2024", "2023"],
  category: ["All", "Muharram", "Safar", "Ramzan", "General"],
  language: ["All", "Urdu", "Punjabi", "Sindhi", "Arabic"],
};

export default function SearchFilters() {
  const [filters, setFilters] = useState({
    nohakhan: "All",
    year: "All",
    category: "All",
    language: "All",
  });

  function handleChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex gap-2 flex-wrap mb-5">
      {Object.entries(filterOptions).map(([key, options]) => (
        <select
          key={key}
          value={filters[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          className="bg-surface border border-border text-text-secondary text-xs px-3 py-1.5 rounded-full outline-none capitalize"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {key}: {option}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}