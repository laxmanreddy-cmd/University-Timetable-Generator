"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { subjects } from "@/lib/mock-data";
import type { Cluster, Selection } from "@/lib/types";

export function RegistrationView() {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [selections, setSelections] = useState<Selection[]>([
    { subjectId: "ai", cluster: "A" },
    { subjectId: "ml", cluster: "B" },
    { subjectId: "cc", cluster: "A" },
    { subjectId: "cs", cluster: "B" }
  ]);

  const filtered = useMemo(
    () => subjects.filter((subject) => subject.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  function toggleSubject(subjectId: string) {
    setSelections((current) => {
      if (current.some((item) => item.subjectId === subjectId)) {
        return current.filter((item) => item.subjectId !== subjectId);
      }
      if (current.length >= 4) {
        setToast("Exactly 4 subjects are allowed. Remove one before adding another.");
        return current;
      }
      return [...current, { subjectId, cluster: "A" }];
    });
  }

  function updateCluster(subjectId: string, cluster: Cluster) {
    setSelections((current) => current.map((item) => (item.subjectId === subjectId ? { ...item, cluster } : item)));
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-sm font-medium text-primary">Student registration</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">Build a personalized elective timetable.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Select exactly four subjects, choose the preferred faculty cluster, and feed the CSP scheduler with clean local state.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input defaultValue="22AI1042" aria-label="Roll Number" />
            <Input defaultValue="Pranav Reddy" aria-label="Student Name" />
            <div className="grid grid-cols-2 gap-3">
              <Input defaultValue="6" aria-label="Semester" />
              <Input defaultValue="CSE AI" aria-label="Branch" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses or faculty" className="pl-9" />
        </div>
        <div className="rounded-md border bg-background px-3 py-2 text-sm">
          {selections.length}/4 subjects selected
        </div>
      </div>

      {toast && <div className="no-print rounded-md border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm">{toast}</div>}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((subject, index) => {
          const selected = selections.find((item) => item.subjectId === subject.id);
          return (
            <motion.div key={subject.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className={`h-2 w-14 rounded-full ${subject.color}`} />
                  <CardTitle>{subject.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2 text-sm">
                    {(["A", "B"] as Cluster[]).map((cluster) => (
                      <button
                        key={cluster}
                        className={`rounded-md border p-3 text-left transition ${selected?.cluster === cluster ? "border-primary bg-primary/10" : "hover:bg-muted"}`}
                        onClick={() => (selected ? updateCluster(subject.id, cluster) : undefined)}
                      >
                        <span className="font-medium">Cluster {cluster}</span>
                        <span className="block text-muted-foreground">{subject.faculty[cluster]}</span>
                      </button>
                    ))}
                  </div>
                  <Button className="w-full" variant={selected ? "secondary" : "default"} onClick={() => toggleSubject(subject.id)}>
                    {selected && <CheckCircle2 className="h-4 w-4" />}
                    {selected ? "Selected" : "Select Subject"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
