import { notFound } from "next/navigation";
import { COShowcase } from "@/components/co-showcase";
import { coModules } from "@/lib/mock-data";

export function generateStaticParams() {
  return coModules.map((courseOutcome) => ({ id: courseOutcome.id }));
}

export default async function COPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courseOutcome = coModules.find((item) => item.id === id);
  if (!courseOutcome) notFound();
  return <COShowcase module={courseOutcome} />;
}
