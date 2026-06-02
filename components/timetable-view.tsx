"use client";

import { motion } from "framer-motion";
import { Download, Filter, Heart, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { periods, subjects, weekdays } from "@/lib/mock-data";
import { defaultSelections, generateTimetable } from "@/lib/timetable-engine";
import { cn } from "@/lib/utils";

export function TimetableView() {
  const result = generateTimetable(defaultSelections);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Generated timetable</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">Conflict-free weekly plan</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Classes, faculty, rooms, and free periods are arranged by a local CSP engine with explainable decisions.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 no-print">
          <Button variant="outline"><Filter className="h-4 w-4" /> Filter</Button>
          <Button variant="outline"><Share2 className="h-4 w-4" /> Share</Button>
          <Button variant="outline"><Download className="h-4 w-4" /> PDF Mock</Button>
          <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4" /> Print</Button>
          <Button><Heart className="h-4 w-4" /> Favorite</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            <div className="grid grid-cols-[120px_repeat(8,1fr)] border-b bg-muted/50 text-sm font-medium">
              <div className="p-3">Day</div>
              {periods.map((period) => <div key={period} className="border-l p-3 text-center">P{period}</div>)}
            </div>
            {weekdays.map((day) => (
              <div key={day} className="grid grid-cols-[120px_repeat(8,1fr)] border-b last:border-b-0">
                <div className="flex items-center p-3 text-sm font-semibold">{day}</div>
                {periods.map((period) => {
                  const cell = result.cells.find((item) => item.day === day && item.period === period);
                  const subject = subjects.find((item) => item.id === cell?.subjectId);
                  return (
                    <motion.div
                      key={`${day}-${period}`}
                      className="min-h-32 border-l p-2"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {cell?.type === "class" ? (
                        <div className={cn("h-full rounded-md p-3 text-white shadow-sm", subject?.color)}>
                          <div className="text-sm font-semibold leading-tight">{cell.subject}</div>
                          <div className="mt-2 text-xs opacity-95">{cell.faculty}</div>
                          <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                            <span className="rounded bg-white/20 px-1.5 py-0.5">C{cell.cluster}</span>
                            <span className="rounded bg-white/20 px-1.5 py-0.5">{cell.classroom}</span>
                            <span className="rounded bg-white/20 px-1.5 py-0.5">{cell.score}/100</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">Free</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Explainable AI Reasoning</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {result.explanations.slice(0, 6).map((item) => (
              <div key={item} className="rounded-md border bg-background/60 p-3 text-sm">{item}</div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Constraint Checks</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {result.constraintChecks.map((check) => (
              <div key={check.label} className="rounded-md bg-muted/60 p-3 text-sm">
                <div className="font-medium">{check.passed ? "Passed" : "Review"}: {check.label}</div>
                <div className="mt-1 text-muted-foreground">{check.detail}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
