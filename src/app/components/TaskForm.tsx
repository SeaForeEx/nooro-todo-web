"use client"
import { Task, createTask, updateTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const COLORS = ["#FF3B30", "#FF9500", "#FFCC00", "#34C759", "#007AFF", "#5856D6", "#AF52DE", "#FF2D55", "#A2845E"];

export default function TaskForm({ onClose, initial }: { onClose: () => void; initial?: Task }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [color, setColor] = useState(initial?.color ?? "gray");
  const router = useRouter();

  useEffect(() => {
    if (initial) {
      setTitle(initial.title ?? "");
      setColor(initial.color ?? "gray");
    }
  }, [initial]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initial?.id) {
        await updateTask(initial.id, { title, color, completed: initial.completed });
      } else {
        await createTask({ title, color });
      }
      router.push("/");
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  return (
    <div className="absolute top-[291px] left-1/2 transform -translate-x-1/2 w-[736px] h-[358px] flex flex-col gap-[48px] p-6 opacity-100">
      <form onSubmit={submit} className="flex flex-col gap-6">
        <button
          type="button"
          onClick={onClose}
          className="mb-6 cursor-pointer"
        >
          <Image
            src="/arrow-left.svg"
            alt="Back To Tasks"
            width={21.99}
            height={36.01}
            priority
          />
        </button>
        <div className="mb-1">
          <label className="block mb-3 font-bold text-[14px] leading-[100%] tracking-[0%] text-[#4EA8DE]">
            Title
          </label>
          <input
            className="w-[736px] h-[52px] rounded-lg border border-[#333333] bg-[#262626] px-4 py-3 opacity-100 text-[14px] font-normal leading-[140%] tracking-[0%] text-[#F2F2F2] placeholder-[#808080]"
            placeholder="Ex. Brush your teeth"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-3 font-bold text-[14px] leading-[100%] tracking-[0%] text-[#4EA8DE]">
            Color
          </label>
          <div className="flex gap-4">
            {COLORS.map((c) => (
              <div
                key={c}
                onClick={() => setColor(c)}
                className={`w-[52px] h-[52px] rounded-full cursor-pointer border-2 ${
                  color === c ? "border-[#FFFFFF]" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex gap-3 w-full mt-6">
          <button
            className="cursor-pointer flex flex-shrink-0 items-center justify-center gap-2 w-[736px] h-[52px] rounded-lg bg-[#1E6F9F] text-[#F2F2F2] text-center font-bold text-[14px] leading-[140%] tracking-[0%] opacity-100 hover:bg-[#155a75]"
          >
            {initial?.id ? (
              <>
                <span>Save Changes</span>
                <Image
                  src="/check.svg"
                  alt="Update Task"
                  width={20}
                  height={20}
                  priority
                />
              </>
            ) : (
              <>
                <span>Add Task</span>
                <Image
                  src="/plus.svg"
                  alt="Add Task"
                  width={15.97}
                  height={15.97}
                  priority
                />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}