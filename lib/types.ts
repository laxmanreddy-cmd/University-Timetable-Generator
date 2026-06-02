export type Cluster = "A" | "B";

export type Subject = {
  id: string;
  name: string;
  color: string;
  faculty: Record<Cluster, string>;
};

export type StudentProfile = {
  rollNumber: string;
  name: string;
  semester: string;
  branch: string;
};

export type Selection = {
  subjectId: string;
  cluster: Cluster;
};

export type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

export type TimetableCell = {
  day: Weekday;
  period: Period;
  type: "class" | "free";
  subjectId?: string;
  subject?: string;
  faculty?: string;
  classroom?: string;
  cluster?: Cluster;
  score?: number;
};

export type TimetableResult = {
  cells: TimetableCell[];
  explanations: string[];
  constraintChecks: { label: string; passed: boolean; detail: string }[];
  conflicts: string[];
  heuristicScores: { name: string; score: number }[];
  decisions: string[];
  qualityScore: number;
  analytics: {
    totalSubjects: number;
    facultyCount: number;
    classroomUsage: number;
    weeklyLoad: number;
    freePeriods: number;
  };
};
