import { useParams } from "react-router";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_BASE_URL } from "../config";
import PostCard from "../components/PostCard";
import BottomNav from "../components/BottomNav";
import { FaUser, FaLink } from "react-icons/fa";

const Profile = () => {
  const { userId } = useParams();

  const userUrl = `${API_BASE_URL}/users/${userId}`;
  const postsUrl = `${API_BASE_URL}/users/${userId}/posts`;

  const { data: user, loading: userLoading, error: userError } = useFetch(userUrl);
  const { data: posts, loading: postsLoading, error: postsError } = useFetch(postsUrl);

  const displayName = user
    ? `${user.name} ${user.lastname}`.trim()
    : "Perfil";

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files || []));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) return;
    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));

      const res = await fetch(`${API_BASE_URL}/users/${userId}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(res.statusText || res.status);
      // opcional: refrescar datos o mostrar mensaje
      setFiles([]);
      // puedes forzar recarga de los posts/user si el backend devuelve cambios
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!files.length) return;
    const formData = new FormData();
    formData.append("description", "nuevo post!!!!!!");
    formData.append("user_id", userId);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        body: formData,
      });

      const post = await res.json();
      console.log(post);
      setFiles([]);
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 pb-24">
      {/* Header con Gradient */}
      <header className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-rose-600 to-red-500 text-white">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-white"></div>
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white"></div>
        </div>

        <div className="relative mx-auto max-w-lg px-4 pb-12 pt-10">
          {userLoading && (
            <div className="animate-pulse">
              <div className="mb-4 h-20 w-20 rounded-full bg-white/30"></div>
              <div className="mb-2 h-6 w-32 rounded-lg bg-white/30"></div>
              <div className="h-4 w-24 rounded-lg bg-white/20"></div>
            </div>
          )}

          {/* Formulario de subida (restaurado) */}
          <form onSubmit={handleSubmit} className="mt-4">
            <label className="mb-2 block text-sm font-medium text-white/90">Subir imágenes</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-white/20 file:px-3 file:py-2 file:text-sm file:font-semibold"
            />

            {files.length > 0 && (
              <div className="mt-3 text-sm text-white/90">
                Archivos seleccionados: {files.map((f) => f.name).join(", ")}
              </div>
            )}

            <div className="mt-3">
              <button
                type="submit"
                disabled={uploading}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {uploading ? "Subiendo..." : "Enviar archivos"}
              </button>
            </div>
          </form>
        </div>

          {userError && (
            <div className="rounded-2xl bg-white/20 backdrop-blur px-4 py-3 border border-white/30">
              <p className="text-sm font-semibold">⚠️ No se pudo cargar el usuario</p>
              <p className="text-xs text-indigo-100 mt-1">({userError})</p>
            </div>
          )}

          {user && (
            <>
              <div className="mb-6 flex items-end gap-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-white/30 to-white/10 text-4xl font-bold ring-4 ring-white/40 shadow-xl">
                  {user.name?.[0]}
                  {user.lastname?.[0]}
                </div>
                <div className="flex-1 pb-1">
                  <h1 className="text-3xl font-bold leading-tight">{displayName}</h1>
                  <p className="text-rose-100 font-semibold">@{user.username}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 px-4 py-4">
                  <p className="text-3xl font-bold">
                    {posts?.length ?? 0}
                  </p>
                  <p className="text-sm text-rose-100 font-semibold">Publicaciones</p>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 px-4 py-4">
                  <p className="text-3xl font-bold">—</p>
                  <p className="text-sm text-rose-100 font-semibold">Seguidores</p>
                </div>
              </div>

              {/* Bio si existe */}
              {user.bio && (
                <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 px-4 py-3">
                  <p className="text-sm text-rose-50 flex items-start gap-2">
                    <FaLink className="mt-1 h-3 w-3 flex-shrink-0" />
                    {user.bio}
                  </p>
                </div>
              )}
            </>
          )}
      </header>

      <main className="mx-auto max-w-lg px-4 py-10">
        {/* Título de publicaciones */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-1 w-8 rounded-full bg-gradient-to-r from-pink-600 to-rose-600"></div>
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-700">
            Publicaciones
          </h2>
        </div>

        {postsLoading && (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-white animate-pulse shadow-md"
              ></div>
            ))}
          </div>
        )}

        {postsError && (
          <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-6 text-center">
            <p className="text-sm font-semibold text-rose-700">
              ⚠️ No se pudieron cargar los posts
            </p>
            <p className="text-xs text-rose-600 mt-1">({postsError})</p>
          </div>
        )}

        {posts?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          !postsLoading &&
          !postsError && (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
              <FaUser className="mx-auto mb-3 h-8 w-8 text-slate-300" />
              <p className="text-slate-500 font-medium">Este usuario aún no tiene publicaciones.</p>
              <p className="text-xs text-slate-400 mt-1">
                Sé el primero en seguir este usuario para ver sus posts.
              </p>
            </div>
          )
        )}
      </main>

      <BottomNav />
    </div>
  );

}
export default Profile;
