import { Link, useParams } from "react-router";
import { FaArrowLeft, FaHeart, FaComment, FaUser, FaClock } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import { API_BASE_URL } from "../config";
import BottomNav from "../components/BottomNav";

const formatDateTime = (dateString) =>
  new Date(dateString).toLocaleString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const PostDetail = () => {
  const { postId } = useParams();
  const url = `${API_BASE_URL}/posts/${postId}`;
  const { data, loading, error } = useFetch(url);

  const backTo = data?.user_id ? `/profile/${data.user_id}` : "/";

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 pb-24">
      <header className="sticky top-0 z-10 border-b border-rose-200 bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-4">
          <Link
            to={backTo}
            className="rounded-full p-2 text-slate-600 transition-all duration-200 hover:bg-rose-100 hover:text-rose-600"
            aria-label="Volver al perfil"
          >
            <FaArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900">Publicación</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-400 animate-pulse"></div>
              <p className="text-slate-600 font-medium">Cargando publicación…</p>
            </div>
          </div>
        )}

        {error && (
          <p className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-6 text-center text-rose-700 font-medium shadow-md">
            ⚠️ No se pudo cargar el post ({error})
          </p>
        )}

        {data && (
          <article className="space-y-6">
            {/* Post Principal */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Publicación
                  </h2>
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <FaClock className="h-3 w-3" />
                    {formatDateTime(data.created_at)}
                  </p>
                </div>
              </div>

              <div className="my-6 rounded-2xl bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6 border border-pink-100">
                <p className="whitespace-pre-wrap text-lg leading-relaxed text-slate-800 font-medium">
                  {data.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 p-4 border border-rose-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white">
                      <FaHeart className="h-4 w-4" />
                    </div>
                    <span className="text-2xl font-bold text-rose-600">
                      {data.likes?.length ?? 0}
                    </span>
                  </div>
                  <p className="text-xs text-rose-600 font-semibold">LIKES</p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 p-4 border border-pink-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white">
                      <FaComment className="h-4 w-4" />
                    </div>
                    <span className="text-2xl font-bold text-pink-600">
                      {data.comments?.length ?? 0}
                    </span>
                  </div>
                  <p className="text-xs text-pink-600 font-semibold">COMENTARIOS</p>
                </div>
              </div>
            </section>

            {/* Likes Section */}
            {data.likes && data.likes.length > 0 && (
              <section className="rounded-3xl border border-rose-200 bg-white shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-rose-100 to-pink-100 border-b border-rose-300 px-6 py-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-rose-700 flex items-center gap-2">
                    <FaHeart className="h-4 w-4" />
                    {data.likes.length} Me encanta
                  </h2>
                </div>
                <ul className="divide-y divide-slate-100">
                  {data.likes.slice(0, 10).map((like) => (
                    <li
                      key={`${like.user_id}-${like.post_id}`}
                      className="flex items-center gap-4 px-6 py-4 transition hover:bg-slate-50"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-400 text-white font-bold shadow-md">
                        {like.user_id.charAt(0).toUpperCase()}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800">
                          {like.user_id.slice(0, 12)}…
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDateTime(like.created_at)}
                        </p>
                      </div>
                      <FaHeart className="h-4 w-4 text-rose-500" />
                    </li>
                  ))}
                </ul>
                {data.likes.length > 10 && (
                  <div className="bg-slate-50 px-6 py-3 text-center text-xs text-slate-600 font-medium">
                    +{data.likes.length - 10} más
                  </div>
                )}
              </section>
            )}

            {/* Comments Section */}
            <section className="rounded-3xl border border-pink-200 bg-white shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 border-b border-pink-300 px-6 py-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-pink-700 flex items-center gap-2">
                  <FaComment className="h-4 w-4" />
                  {data.comments?.length ?? 0} Comentarios
                </h2>
              </div>

              {data.comments?.length > 0 ? (
                <ul className="divide-y divide-slate-100">
                  {data.comments.map((comment) => (
                    <li key={comment.id} className="px-6 py-5 transition hover:bg-slate-50">
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-400 text-white font-bold text-sm shadow-md">
                          {comment.user_id.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-500">
                            {comment.user_id.slice(0, 12)}…
                          </p>
                          <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                            {comment.content}
                          </p>
                          <p className="mt-2 text-xs text-slate-500">
                            {formatDateTime(comment.created_at)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-6 py-12 text-center">
                  <FaComment className="mx-auto mb-3 h-8 w-8 text-slate-300" />
                  <p className="text-slate-500 font-medium">Sé el primero en comentar.</p>
                  <p className="text-xs text-slate-400 mt-1">
                    La sección de comentarios pronto estará disponible.
                  </p>
                </div>
              )}
            </section>
          </article>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default PostDetail;
