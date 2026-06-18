"use client";

import { BookOpenText, Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import { z } from "zod";
import { isAuthenticated, saveAuthSession } from "@/lib/auth-storage";
import { registerUser } from "@/services/auth.service";

const registerSchema = z
  .object({
    name: z.string().trim().min(1, "O nome é obrigatório"),
    email: z.email("Informe um e-mail válido").trim(),
    password: z
      .string()
      .min(6, "A senha deve conter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não conferem",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;
type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const isPasswordConfirmationInvalid =
    Boolean(values.confirmPassword) &&
    values.password !== values.confirmPassword;
  const isSubmitDisabled =
    isSubmitting ||
    !values.name.trim() ||
    !values.email.trim() ||
    !values.password ||
    !values.confirmPassword ||
    isPasswordConfirmationInvalid;

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/");
    }
  }, [router]);

  function updateField(field: keyof RegisterFormValues, value: string) {
    const nextValues = {
      ...values,
      [field]: value,
    };

    setValues(nextValues);
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
      confirmPassword:
        nextValues.confirmPassword &&
        nextValues.password !== nextValues.confirmPassword
          ? "As senhas não conferem"
          : undefined,
    }));
    setFormError("");
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = registerSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: RegisterFormErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof RegisterFormValues | undefined;

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
      const session = await registerUser({
        name: result.data.name,
        email: result.data.email,
        password: result.data.password,
      });

      saveAuthSession(session);
      setSuccessMessage("Conta criada com sucesso.");

      setTimeout(() => {
        router.push("/");
      }, 600);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Não foi possível criar sua conta. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <section className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-md sm:p-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
            <BookOpenText aria-hidden="true" size={24} strokeWidth={2.2} />
          </div>
          <h1 className="text-[32px] font-bold leading-tight text-[#0F172A]">
            Crie sua conta
          </h1>
          <p className="mt-3 text-lg font-medium text-[#475569]">
            Comece a explorar a plataforma de dicionário.
          </p>
        </div>

        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-[#0F172A]"
              htmlFor="name"
            >
              Nome completo
            </label>
            <input
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={Boolean(errors.name)}
              className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-base text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE]"
              disabled={isSubmitting}
              id="name"
              name="name"
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Digite seu nome completo"
              type="text"
              value={values.name}
            />
            {errors.name ? (
              <p className="mt-2 text-sm text-[#DC2626]" id="name-error">
                {errors.name}
              </p>
            ) : null}
          </div>

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
                autoComplete="new-password"
                className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 pr-12 text-base text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE]"
                disabled={isSubmitting}
                id="password"
                name="password"
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                placeholder="Pelo menos 6 caracteres"
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

          <div>
            <label
              className="mb-2 block text-sm font-medium text-[#0F172A]"
              htmlFor="confirmPassword"
            >
              Confirmar senha
            </label>
            <div className="relative">
              <input
                aria-describedby={
                  errors.confirmPassword || isPasswordConfirmationInvalid
                    ? "confirm-password-error"
                    : undefined
                }
                aria-invalid={Boolean(
                  errors.confirmPassword || isPasswordConfirmationInvalid,
                )}
                autoComplete="new-password"
                className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 pr-12 text-base text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE]"
                disabled={isSubmitting}
                id="confirmPassword"
                name="confirmPassword"
                onChange={(event) =>
                  updateField("confirmPassword", event.target.value)
                }
                placeholder="Repita sua senha"
                type={isConfirmPasswordVisible ? "text" : "password"}
                value={values.confirmPassword}
              />
              <button
                aria-label={
                  isConfirmPasswordVisible
                    ? "Ocultar confirmação de senha"
                    : "Mostrar confirmação de senha"
                }
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#475569] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
                disabled={isSubmitting}
                onClick={() =>
                  setIsConfirmPasswordVisible((current) => !current)
                }
                type="button"
              >
                {isConfirmPasswordVisible ? (
                  <EyeOff aria-hidden="true" size={18} />
                ) : (
                  <Eye aria-hidden="true" size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword || isPasswordConfirmationInvalid ? (
              <p
                className="mt-2 text-sm text-[#DC2626]"
                id="confirm-password-error"
              >
                {errors.confirmPassword ?? "As senhas não conferem"}
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
            disabled={isSubmitDisabled}
            type="submit"
          >
            {isSubmitting ? (
              <LoaderCircle
                aria-hidden="true"
                className="animate-spin"
                size={20}
              />
            ) : null}
            {isSubmitting ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#475569]">
          Já tem uma conta?{" "}
          <Link
            className="font-semibold text-[#2563EB] transition hover:text-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/entrar"
          >
            Entrar
          </Link>
        </p>
      </section>
    </main>
  );
}
