export type Task = {
    id: number; title: string; color: string; completed: boolean;
    createdAt: string; updatedAt: string;
};

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export const listTasks = async (): Promise<Task[]> => {
    const r = await fetch(`${BASE}/tasks`, { cache: "no-store" });
    if (!r.ok) throw new Error("Failed to fetch tasks");
    return r.json();
};

export const createTask = async (data: Pick<Task, "title" | "color">) => {
    const r = await fetch(`${BASE}/tasks`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error("Failed to create");
    return r.json();
};

export const updateTask = async (
    id: number,
    data: Partial<Pick<Task, "title" | "color" | "completed">>
  ) => {
    const r = await fetch(`${BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error("Failed to update task");
    return r.json();
};

export const deleteTask = async (id: number) => {
    const r = await fetch(`${BASE}/tasks/${id}`, { method: "DELETE" });
    if (!r.ok) throw new Error("Failed to delete");
};