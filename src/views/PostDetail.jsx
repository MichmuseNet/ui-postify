import { Link, useParams } from "react-router";
import { FaArrowLeft, FaHeart, FaComment, FaUser } from "react-icons/fa";
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
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-4">
          <Link
            to={backTo}
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
            aria-label="Volver al perfil"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-lg font-semibold text-slate-900">Publicación</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        {loading && (
          <p className="rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm">
            Cargando publicación…
          </p>
        )}

        {error && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700">
            No se pudo cargar el post ({error})
          </p>
        )}

        {data && (
          <article className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-800">
                {data.description}
              </p>
              <p className="mt-4 text-sm text-slate-500">
                {formatDateTime(data.created_at)}
              </p>
              <div className="mt-4 flex gap-4 text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-rose-600">
                  <FaHeart />
                  {data.likes?.length ?? 0} likes
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-indigo-600">
                  <FaComment />
                  {data.comments?.length ?? 0} comentarios
                </span>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <h2 className="border-b border-slate-100 px-5 py-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Likes
              </h2>
              {data.likes?.length > 0 ? (
                <ul className="divide-y divide-slate-100">
                  {data.likes.map((like) => (
                    <li
                      key={`${like.user_id}-${like.post_id}`}
                      className="flex items-center gap-3 px-5 py-3"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                        <FaUser className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          Usuario {like.user_id.slice(0, 8)}…
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDateTime(like.created_at)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-5 py-6 text-sm text-slate-500">
                  Aún no hay likes en este post.
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <h2 className="border-b border-slate-100 px-5 py-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Comentarios
              </h2>
              {data.comments?.length > 0 ? (
                <ul className="divide-y divide-slate-100">
                  {data.comments.map((comment) => (
                    <li key={comment.id} className="px-5 py-4">
                      <p className="text-sm font-medium text-indigo-600">
                        Usuario {comment.user_id.slice(0, 8)}…
                      </p>
                      <p className="mt-1 text-slate-800">{comment.content}</p>
                      <p className="mt-2 text-xs text-slate-500">
                        {formatDateTime(comment.created_at)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-5 py-6 text-sm text-slate-500">
                  Sé el primero en comentar.
                </p>
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
