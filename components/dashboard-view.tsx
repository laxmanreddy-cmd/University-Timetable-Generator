"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BrainCircuit, CalendarCheck, DoorOpen, Gauge, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultSelections, generateTimetable } from "@/lib/timetable-engine";
import { periods, weekdays } from "@/lib/mock-data";

export function DashboardView() {
  const [mounted, setMounted] = useState(false);
  const result = generateTimetable(defaultSelections);
  const dailyLoad = weekdays.map((day) => ({
    day: day.slice(0, 3),
    classes: result.cells.filter((cell) => cell.day === day && cell.type === "class").length,
    free: result.cells.filter((cell) => cell.day === day && cell.type === "free").length
  }));
  const periodLoad = periods.map((period) => ({
    period: `P${period}`,
    load: result.cells.filter((cell) => cell.period === period && cell.type === "class").length
  }));

  const cards = [
    { label: "Total Subjects", value: result.analytics.totalSubjects, icon: BrainCircuit },
    { label: "Faculty Count", value: result.analytics.facultyCount, icon: UsersRound },
    { label: "Classroom Usage", value: result.analytics.classroomUsage, icon: DoorOpen },
    { label: "Weekly Load", value: result.analytics.weeklyLoad, icon: CalendarCheck },
    { label: "Free Period Count", value: result.analytics.freePeriods, icon: CalendarCheck },
    { label: "Quality Score", value: `${result.qualityScore}%`, icon: Gauge }
  ];

  useEffect(() => setMounted(true), []);

  return (
    <section className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-medium text-primary">AI scheduling command center</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">Plan better weeks with transparent optimization.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            A frontend-only university SaaS demo with CSP scheduling, search-inspired heuristics, Bayesian scoring, and decision analytics.
          </p>
        </div>
        <Card className="shadow-glow">
          <CardHeader><CardTitle>Optimization Decisions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {result.decisions.map((decision) => (
              <div key={decision} className="rounded-md bg-muted/60 p-3 text-sm">{decision}</div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label}>
              <CardContent className="p-4">
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-4 text-2xl font-semibold">{card.value}</div>
                <div className="text-xs text-muted-foreground">{card.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Weekly Load</CardTitle></CardHeader>
          <CardContent className="h-80">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyLoad}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="classes" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.25} />
                  <Area dataKey="free" stroke="#10b981" fill="#10b981" fillOpacity={0.18} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Period Density</CardTitle></CardHeader>
          <CardContent className="h-80">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={periodLoad}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="load" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
