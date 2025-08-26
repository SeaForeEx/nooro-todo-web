"use client"
import { Task, deleteTask, updateTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TaskCard({
    task,
    onDelete,
    onUpdate,
  }: {
    task: Task;
    onDelete: (id: number) => void;
    onUpdate: (updatedTask: Task) => void;
  }) {
  const router = useRouter();
  const remove = async () => {
    if (confirm("Delete this task?")) {
      try {
        await deleteTask(task.id);
        onDelete(task.id); 
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

if (!task) {
    return null;
}

const toggleTaskCompletion = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    try {
        const updatedTask = { ...task, completed: !task.completed };
        await updateTask(task.id, { completed: updatedTask.completed });
        onUpdate(updatedTask);
      } catch (error) {
        console.error("Failed to toggle task completion:", error);
    }
};

const navigateToEdit = () => {
  router.push(`/tasks/${task.id}`);
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
            onClick={navigateToEdit}
            className={`cursor-pointer font-normal text-[14px] leading-[140%] tracking-[0%] ${
                task.completed ? "line-through text-gray-400" : ""
            }`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          remove();
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