import { readFile, writeFile } from "node:fs/promises";

const sourcePath = "mock/db.json";
const targetPath = "mock/db.e2e.json";
const db = JSON.parse(await readFile(sourcePath, "utf8"));

db.users = [
  {
    id: "e2e-user",
    name: "Usuário Teste",
    email: "teste@example.com",
    password: "123456",
  },
];

db.favorites = [];
db.history = [];

await writeFile(targetPath, `${JSON.stringify(db, null, 2)}\n`, "utf8");
