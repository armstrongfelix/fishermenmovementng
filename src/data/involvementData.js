export const SUBJECT_OPTIONS = [
  { value: "school-visit", label: "School visit" },
  { value: "partnership", label: "Partnership" },
  { value: "sponsor", label: "Sponsor" },
  { value: "volunteer", label: "Volunteer" },
];

export const SUBJECT_LABELS = Object.fromEntries(
  SUBJECT_OPTIONS.map(({ value, label }) => [value, label]),
);
