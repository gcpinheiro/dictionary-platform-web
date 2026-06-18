import { expect, test } from "@playwright/test";

test("fluxos principais da plataforma de dicionário", async ({ page }) => {
  const email = `usuario-${Date.now()}@example.com`;
  const password = "123456";

  await page.goto("/cadastro");
  await page.getByLabel("Nome completo").fill("Usuário E2E");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByLabel("Confirmar senha").fill(password);
  await page.getByRole("button", { name: "Criar conta" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: /Olá, Usuário E2E/i })).toBeVisible();

  await page.getByRole("button", { name: "Sair" }).click();
  await expect(page).toHaveURL("/entrar");

  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page).toHaveURL("/");
  await page.getByLabel("Pesquisar palavras").fill("energy");
  await page.getByRole("button", { name: /energy/i }).click();

  await expect(page).toHaveURL(/\/palavras\/energy$/, {
    timeout: 30_000,
  });
  await expect(page.getByRole("heading", { name: "energy" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Ouvir pronúncia de energy/i })).toBeVisible();

  await page.getByRole("button", { name: "Adicionar aos favoritos" }).click();
  await expect(page.getByText("Palavra adicionada aos favoritos.")).toBeVisible();

  await page.goto("/favoritos");
  await expect(page.getByRole("heading", { name: "Palavras favoritas" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "energy" })).toBeVisible();

  await page.getByRole("button", { name: "Remover dos favoritos" }).first().click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Remover dos favoritos" })
    .click();
  await expect(page.getByText("energy foi removida dos favoritos.")).toBeVisible();
  await expect(page.getByText("Você ainda não possui palavras favoritas.")).toBeVisible();

  await page.goto("/dicionario");
  await expect(page.getByRole("heading", { name: "Dicionário completo" })).toBeVisible();
  await expect(page.getByText("Página 1")).toBeVisible();

  await page.getByRole("button", { name: "Próxima" }).click();
  await expect(page.getByText("Página 2")).toBeVisible();

  await page.getByRole("button", { name: /storage/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("heading", { name: "storage" })).toBeVisible();
  await page.getByRole("button", { name: "Fechar" }).last().click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
