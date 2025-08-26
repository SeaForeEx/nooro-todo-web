"use client";
import { useEffect, useState } from "react";
import TaskForm from "@/app/components/TaskForm";
import { getSingleTask } from "@/lib/api";
import Image from "next/image";
import { useParams } from "next/navigation";

type Task = {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    color: string;
    createdAt: string;
    updatedAt: string;
};

export default function EditTask() {
  const params = useParams(); // Use `useParams` to access the `id` parameter
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    async function fetchTask() {
      if (params?.id) {
        if (typeof params.id === "string") {
          const fetchedTask = await getSingleTask(parseInt(params.id, 10));
          setTask(fetchedTask);
        }
      }
    }
    fetchTask();
  }, [params]);

  if (!task) return <main className="p-6">Not found</main>;

  return (
    <main className="bg-[#1A1A1A] min-h-screen text-white">
      <div className="bg-[#0D0D0D] flex items-center justify-center gap-4 p-4 h-[200px] relative">
        <Image
          src="/rocket.svg"
          alt="Rocket"
          width={21.99}
          height={36.01}
          priority
        />
        <div className="font-sans font-black text-[40px] leading-[100%] tracking-[0%]">
          <span className="text-[#4EA8DE]">Todo</span>{" "}
          <span className="text-[#5E60CE]">App</span>
        </div>
      </div>
      <TaskForm onClose={() => window.history.back()} initial={task} />
    </main>
  );
}