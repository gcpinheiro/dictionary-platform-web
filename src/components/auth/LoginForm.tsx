"use client";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import { z } from "zod";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { isAuthenticated, saveAuthSession } from "@/lib/auth-storage";
import { loginUser } from "@/services/auth.service";

const loginSchema = z.object({
  email: z.email("Informe um e-mail válido").trim(),
  password: z.string().min(1, "A senha é obrigatória"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/");
    }
  }, [router]);

  function updateField(field: keyof LoginFormValues, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
    setFormError("");
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = loginSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: LoginFormErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginFormValues | undefined;

        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const session = await loginUser(result.data);

      saveAuthSession(session);
      setSuccessMessage("Login realizado com sucesso.");

      setTimeout(() => {
        router.push("/");
      }, 600);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Não foi possível entrar na sua conta. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      footer={
        <p className="mt-8 text-center text-sm text-[#475569]">
          Ainda não tem uma conta?{" "}
          <Link
            className="font-semibold text-[#2563EB] transition hover:text-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/cadastro"
          >
            Criar conta
          </Link>
        </p>
      }
      subtitle="Continue explorando a plataforma de dicionário."
      title="Entre na sua conta"
    >
        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-[#0F172A]"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-base text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE]"
              disabled={isSubmitting}
              id="email"
              name="email"
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="voce@exemplo.com"
              type="email"
              value={values.email}
            />
            {errors.email ? (
              <p className="mt-2 text-sm text-[#DC2626]" id="email-error">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-[#0F172A]"
              htmlFor="password"
            >
              Senha
            </label>
            <div className="relative">
              <input
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                aria-invalid={Boolean(errors.password)}
                autoComplete="current-password"
                className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 pr-12 text-base text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE]"
                disabled={isSubmitting}
                id="password"
                name="password"
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                placeholder="Digite sua senha"
                type={isPasswordVisible ? "text" : "password"}
                value={values.password}
              />
              <button
                aria-label={
                  isPasswordVisible ? "Ocultar senha" : "Mostrar senha"
                }
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#475569] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
                disabled={isSubmitting}
                onClick={() => setIsPasswordVisible((current) => !current)}
                type="button"
              >
                {isPasswordVisible ? (
                  <EyeOff aria-hidden="true" size={18} />
                ) : (
                  <Eye aria-hidden="true" size={18} />
                )}
              </button>
            </div>
            {errors.password ? (
              <p className="mt-2 text-sm text-[#DC2626]" id="password-error">
                {errors.password}
              </p>
            ) : null}
          </div>

          {formError ? (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-[#DC2626]">
              {formError}
            </p>
          ) : null}

          {successMessage ? (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-[#16A34A]">
              {successMessage}
            </p>
          ) : null}

          <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <LoaderCircle
                aria-hidden="true"
                className="animate-spin"
                size={20}
              />
            ) : null}
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
    </AuthLayout>
  );
}
