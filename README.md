# 📘 Nooro Todo WEB

Frontend for the **Todo List App** built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Features
- View all tasks
- Create new tasks
- Edit task title & color
- Toggle completion status
- Delete tasks with confirmation
- Responsive design (based on provided Figma)

---

## 🛠 Tech Stack
- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- Fetch API for backend calls

---

## 🔑 Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (to run MySQL in a container)

---

## 📦 Setup

### 1. Clone the Repository & Install Dependencies
```bash
git clone https://github.com/SeaForeEx/nooro-todo-web.git
cd nooro-todo-web
npm install && npm install typescript tailwindcss postcss autoprefixer
```

---

### 2. Create your environment file
Add a ```.env.local``` file with:
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---


### 3. Make sure the Back End is running
Follow the [nooro-todo-api setup instructions](https://github.com/SeaForeEx/nooro-todo-api/edit/main/README.md) and start it on port 4000.

---

### 4. Run the Front End in development mode
```bash
npm run dev
```

---

### 5. Open the app in your browser
It will be available at:
```bash
http://localhost:3000
```

