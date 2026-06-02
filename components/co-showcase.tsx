"use client";

import { motion } from "framer-motion";
import { ArrowRight, GitBranch, Network, Orbit, Sigma } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Module = {
  id: string;
  title: string;
  topics: string[];
  summary: string;
};

const iconMap = [Network, GitBranch, Sigma, Orbit];

export function COShowcase({ module }: { module: Module }) {
  const isSearch = module.id === "co2";
  const isCsp = module.id === "co3";

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">AI concept showcase</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">{module.title}</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">{module.summary}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {module.topics.map((topic, index) => {
          const Icon = iconMap[index % iconMap.length];
          return (
            <motion.div key={topic} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className="h-full">
                <CardHeader>
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle>{topic}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {copyFor(module.id, topic)}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>{isSearch ? "Animated Search Tree" : isCsp ? "CSP Constraint Graph" : "Interactive AI Flow"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative min-h-80 overflow-hidden rounded-lg border bg-background/60 p-5">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:36px_36px]" />
              <div className="relative grid h-full min-h-72 place-items-center">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {["Registration", "Search", "Constraint Check", "Bayesian Score", "Policy", "Timetable"].map((node, index) => (
                    <motion.div
                      key={node}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.12 }}
                    >
                      <div className="rounded-lg border bg-card px-4 py-3 text-sm shadow-sm">{node}</div>
                      {index < 5 && <ArrowRight className="h-4 w-4 text-primary" />}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>How it appears in the app</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>The registration page creates variables and domains from selected subjects and faculty clusters.</p>
            <p>The timetable engine evaluates slot quality, rejects conflicts, and records its reasoning for the explanation panel.</p>
            <p>The dashboard converts those decisions into charts, scores, and workload analytics.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function copyFor(id: string, topic: string) {
  const map: Record<string, string> = {
    PEAS: "Performance, environment, actuators, and sensors describe the timetable generator as an intelligent agent.",
    "BFS": "Breadth-first search explores shallow slot assignments before deeper timetable branches.",
    "DFS": "Depth-first search commits quickly to a branch, then backtracks when constraints fail.",
    "A*": "A* combines path cost and heuristic estimates to prefer high-quality schedules.",
    "CSP": "Subjects, faculty, classrooms, days, and periods form variables, domains, and constraints.",
    "Backtracking": "The engine tries a placement, checks constraints, and repairs when the branch becomes invalid.",
    "Bayes Rule": "Bayesian scoring estimates which slots are more likely to remain conflict-free.",
    "Utility Functions": "Utility turns workload balance, free periods, and gaps into comparable schedule scores."
  };
  return map[topic] ?? `${topic} is visualized as part of the ${id.toUpperCase()} learning outcome and tied directly to timetable generation.`;
}
