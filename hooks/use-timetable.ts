"use client";

import { useMemo, useState } from "react";
import { defaultSelections, generateTimetable } from "@/lib/timetable-engine";
import type { Selection, StudentProfile } from "@/lib/types";

export function useTimetable() {
  const [profile, setProfile] = useState<StudentProfile>({
    rollNumber: "22AI1042",
    name: "Pranav Reddy",
    semester: "6",
    branch: "CSE - Artificial Intelligence"
  });
  const [selections, setSelections] = useState<Selection[]>(defaultSelections);
  const [favorite, setFavorite] = useState(false);
  const [filter, setFilter] = useState("all");

  const result = useMemo(() => generateTimetable(selections), [selections]);

  return {
    profile,
    setProfile,
    selections,
    setSelections,
    result,
    favorite,
    setFavorite,
    filter,
    setFilter
  };
}
