import { AuthGuard } from "@/components/auth/AuthGuard";
import { DashboardInicial } from "@/components/home/DashboardInicial";

export default function Home() {
  return (
    <AuthGuard>
      <DashboardInicial />
    </AuthGuard>
  );
}
