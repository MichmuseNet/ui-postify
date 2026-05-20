import { Link } from "react-router";
import { FaHeart, FaComment } from "react-icons/fa";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const PostCard = ({ post }) => (
  <Link
    to={`/posts/${post.id}`}
    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-indigo-200 hover:shadow-md"
  >
    <div className="aspect-square bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 p-4">
      <p className="line-clamp-6 text-sm leading-relaxed text-slate-700 group-hover:text-slate-900">
        {post.description}
      </p>
    </div>
    <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-3 py-2 text-xs text-slate-500">
      <span>{formatDate(post.created_at)}</span>
      <span className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1">
          <FaHeart className="text-rose-400" />
          {post.likes_count ?? 0}
        </span>
        <span className="inline-flex items-center gap-1">
          <FaComment className="text-indigo-400" />
          {post.comments_count ?? 0}
        </span>
      </span>
    </div>
  </Link>
);

export default PostCard;
