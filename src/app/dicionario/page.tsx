import { AuthGuard } from "@/components/auth/AuthGuard";
import { DicionarioPageContent } from "@/components/dictionary/DicionarioPageContent";

export default function DictionaryPage() {
  return (
    <AuthGuard>
      <DicionarioPageContent />
    </AuthGuard>
  );
}
