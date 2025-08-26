"use client";
import { Task } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TaskCard({ task }: { task: Task }) {
  const router = useRouter();
//   const toggle = async () => { await updateTask(task.id, { completed: !task.completed }); router.refresh(); };
//   const remove = async () => { if (confirm("Delete this task?")) { await deleteTask(task.id); router.refresh(); } };

if (!task) {
    return null; // Return nothing if task is undefined
  }

  const toggleTaskCompletion = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log(`Task ${task.id} toggled`);
  };

  return (
    <div
      className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-lg border p-4 bg-[#262626] hover:shadow-md border-[#333333] w-[736px] h-[72px] opacity-100"
    >
      <div className="flex items-center gap-3">
        <div
          onClick={toggleTaskCompletion}
          className="cursor-pointer flex-shrink-0"
        >
          {task.completed ? (
            <Image
              src="/complete.svg"
              alt="Completed"
              width={17.45}
              height={17.45}
              className="cursor-pointer"
            />
          ) : (
            <Image
              src="/incomplete.svg"
              alt="Incomplete"
              width={17.45}
              height={17.45}
              className="cursor-pointer"
            />
          )}
        </div>
        <span
            className={`font-inter font-normal text-[14px] leading-[140%] tracking-[0%] ${
                task.completed ? "line-through text-gray-400" : ""
            }`}
        >
  {task.title}
</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Image
          src="/trashcan.svg"
          alt="Delete Task"
          width={12.48}
          height={14}
          priority
          className="cursor-pointer"
        />
      </button>
    </div>
  );
}