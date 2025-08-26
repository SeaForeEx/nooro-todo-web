"use client";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";

export default function Home() {
  async function getTasks() {
    const base = process.env.NEXT_PUBLIC_API_URL!;
    const r = await fetch(`${base}/tasks`, { cache: "no-store" });
    if (!r.ok) throw new Error("Failed to load tasks");
    return r.json();
  }

  interface Task {
    id: number;
    completed: boolean;
    // Add other properties of a task as needed
  }

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTasks();
  }, []);

  const handleTaskDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <Head>
        <title>ToDo App</title>
      </Head>
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

        <div className="relative">
          <button className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[736px] h-[52px] bg-[#1E6F9F] text-[#F2F2F2] font-bold rounded-lg border-none flex items-center justify-center gap-[8px] p-[16px] text-[14px] leading-[140%] tracking-[0%] cursor-pointer">
            <span>Create Task</span>
            <Image
              src="/plus.svg"
              alt="Create Task"
              width={15.97}
              height={15.97}
              priority
            />
          </button>
        </div>

        <div className="absolute w-[736px] h-[309px] top-[291px] left-1/2 transform -translate-x-1/2 gap-[24px] opacity-100 flex flex-col">
          <div className="w-[736px] h-[19px] flex justify-between opacity-100">
            <div className="flex items-center gap-[8px]">
              <span className="text-[#4EA8DE] font-sans font-bold text-[14px] leading-[100%] tracking-[0%]">
                Tasks
              </span>
              <div
                className="w-[25px] h-[19px] opacity-100 rounded-full bg-[#333333] text-[#D9D9D9] font-sans font-bold text-[12px] leading-[100%] tracking-[0%] flex items-center justify-center pt-[2px] pr-[8px] pb-[2px] pl-[8px]"
              >
                {tasks.length}
              </div>
            </div>
            <div className="flex items-center gap-[8px]">
              <span className="text-[#8284FA] font-sans font-bold text-[14px] leading-[100%] tracking-[0%]">
                Completed
              </span>
              <div
                className={`${
                  tasks.length > 0 ? "w-[52px]" : "w-[25px]"
                } h-[19px] opacity-100 rounded-full bg-[#333333] text-[#D9D9D9] font-sans font-bold text-[12px] leading-[100%] tracking-[0%] flex items-center justify-center pt-[2px] pr-[8px] pb-[2px] pl-[8px]`}
              >
                {tasks.length > 0
                  ? `${tasks.filter((task: any) => task.completed).length} of ${tasks.length}`
                  : tasks.filter((task: any) => task.completed).length}
              </div>
            </div>
          </div>

          {tasks.length > 0 ? (
            <div className="flex flex-col gap-[16px]">
              {tasks.map((task: any) => (
                <TaskCard key={task.id} task={task} onDelete={handleTaskDelete} />
              ))}
            </div>
          ) : (
            <div className="w-[736px] h-[266px] gap-[16px] opacity-100 rounded-lg border-t border-t-[#333333] pt-[64px] pr-[24px] pb-[64px] pl-[24px] flex flex-col items-center justify-center">
              <div>
                <Image
                  src="/Clipboard.svg"
                  alt="Clipboard"
                  width={56}
                  height={56}
                  priority
                />
              </div>
              <div className="text-center font-sans text-[16px] tracking-[0%] text-[#808080]">
                <div className="font-bold leading-[140%]">
                  You don't have any tasks registered yet.
                </div>
                <div className="font-normal leading-[140%] mt-[16px]">
                  Create tasks and organize your to-do items
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}