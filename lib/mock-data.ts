import type { Subject, Weekday } from "@/lib/types";

export const weekdays: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const periods = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export const classrooms = ["C101", "C102", "C103", "C104", "C105", "C106", "C107", "C108", "C109", "C110"];

export const subjects: Subject[] = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    color: "bg-cyan-500",
    faculty: { A: "Dr. Ravi Kumar", B: "Dr. Pradeep Rao" }
  },
  {
    id: "ml",
    name: "Machine Learning",
    color: "bg-emerald-500",
    faculty: { A: "Dr. Suresh Babu", B: "Dr. Naveen Kumar" }
  },
  {
    id: "dm",
    name: "Data Mining",
    color: "bg-amber-500",
    faculty: { A: "Dr. Kiran Reddy", B: "Dr. Rajesh Verma" }
  },
  {
    id: "cn",
    name: "Computer Networks",
    color: "bg-rose-500",
    faculty: { A: "Dr. Anil Kumar", B: "Dr. Arun Teja" }
  },
  {
    id: "cc",
    name: "Cloud Computing",
    color: "bg-sky-500",
    faculty: { A: "Dr. Harsha Vardhan", B: "Dr. Mahesh Babu" }
  },
  {
    id: "cs",
    name: "Cyber Security",
    color: "bg-violet-500",
    faculty: { A: "Dr. Lakshmi Priya", B: "Dr. Kavitha Reddy" }
  },
  {
    id: "dl",
    name: "Deep Learning",
    color: "bg-fuchsia-500",
    faculty: { A: "Dr. Vani Devi", B: "Dr. Sunitha Devi" }
  },
  {
    id: "nlp",
    name: "Natural Language Processing",
    color: "bg-lime-500",
    faculty: { A: "Dr. Sneha Sharma", B: "Dr. Swathi Krishna" }
  }
];

export const coModules = [
  {
    id: "co1",
    title: "CO1: Intelligent Agents",
    topics: ["PEAS Model", "Agents", "Environment Types", "Knowledge Representation", "Graphs", "Trees", "Rules", "Constraints"],
    summary: "Model the timetable system as a rational scheduling agent that senses registrations and acts by assigning slots."
  },
  {
    id: "co2",
    title: "CO2: Search Algorithms",
    topics: ["BFS", "DFS", "UCS", "Greedy Search", "A*"],
    summary: "Compare frontier strategies for finding feasible paths through the weekly slot graph."
  },
  {
    id: "co3",
    title: "CO3: CSP Optimization",
    topics: ["CSP", "Backtracking", "Forward Checking", "MRV", "Degree Heuristic", "LCV", "Min Conflicts"],
    summary: "Treat subjects, faculty, classrooms, and periods as constrained variables with explainable repair steps."
  },
  {
    id: "co4",
    title: "CO4: Decision Theory",
    topics: ["Utility Functions", "Minimax", "Alpha Beta Pruning", "Expectimax", "Policy Selection"],
    summary: "Rank schedule alternatives by utility under workload, gap, and preference tradeoffs."
  },
  {
    id: "co5",
    title: "CO5: Probabilistic AI",
    topics: ["Bayes Rule", "Bayesian Networks", "Variable Elimination", "Sampling", "Markov Chains", "Hidden Markov Models"],
    summary: "Estimate availability, clash likelihood, and attendance-friendly patterns with Bayesian concepts."
  },
  {
    id: "co6",
    title: "CO6: Hybrid AI Architecture",
    topics: ["Search", "CSP", "Bayesian Reasoning", "Decision Theory"],
    summary: "Combine search, constraints, probability, and utility into a single transparent scheduling pipeline."
  }
];
