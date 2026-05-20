import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { API_BASE_URL } from "../config";
import PostCard from "../components/PostCard";
import BottomNav from "../components/BottomNav";

const Profile = () => {
  const { userId } = useParams();

  const userUrl = `${API_BASE_URL}/users/${userId}`;
  const postsUrl = `${API_BASE_URL}/users/${userId}/posts`;

  const { data: user, loading: userLoading, error: userError } = useFetch(userUrl);
  const { data: posts, loading: postsLoading, error: postsError } = useFetch(postsUrl);

  const displayName = user
    ? `${user.name} ${user.lastname}`.trim()
    : "Perfil";

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
        <div className="mx-auto max-w-lg px-4 pb-8 pt-10">
          {userLoading && (
            <p className="text-sm text-indigo-100">Cargando perfil…</p>
          )}
          {userError && (
            <p className="rounded-xl bg-white/20 px-3 py-2 text-sm">
              No se pudo cargar el usuario ({userError})
            </p>
          )}
          {user && (
            <>
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-2xl font-bold ring-4 ring-white/30">
                {user.name?.[0]}
                {user.lastname?.[0]}
              </div>
              <h1 className="text-2xl font-bold">{displayName}</h1>
              <p className="text-indigo-100">@{user.username}</p>
              <div className="mt-6 flex gap-6 text-sm">
                <div>
                  <p className="text-xl font-semibold">{posts?.length ?? 0}</p>
                  <p className="text-indigo-100">Posts</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">—</p>
                  <p className="text-indigo-100">Seguidores</p>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Publicaciones
        </h2>

        {postsLoading && (
          <p className="text-center text-slate-500">Cargando posts…</p>
        )}

        {postsError && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-center text-sm text-rose-700">
            No se pudieron cargar los posts ({postsError})
          </p>
        )}

        {posts?.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          !postsLoading &&
          !postsError && (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Este usuario aún no tiene publicaciones.
            </p>
          )
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
