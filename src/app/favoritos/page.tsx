import { AuthGuard } from "@/components/auth/AuthGuard";
import { FavoritosPageContent } from "@/components/favorites/FavoritosPageContent";

export default function FavoritesPage() {
  return (
    <AuthGuard>
      <FavoritosPageContent />
    </AuthGuard>
  );
}
