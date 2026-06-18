import type { FavoriteWord } from "@/types/favorite";
import { CardFavorito } from "./CardFavorito";

interface ListaFavoritosProps {
  favorites: FavoriteWord[];
  removingId: string;
  onRemove: (favorite: FavoriteWord) => void;
}

export function ListaFavoritos({
  favorites,
  removingId,
  onRemove,
}: ListaFavoritosProps) {
  return (
    <div className="grid gap-4">
      {favorites.map((favorite) => (
        <CardFavorito
          favorite={favorite}
          isRemoving={removingId === favorite.id}
          key={favorite.id}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

