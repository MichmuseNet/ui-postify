import { Link } from "react-router";
import { FaHeart, FaComment, FaArrowRight } from "react-icons/fa";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const PostCard = ({ post }) => (
  <Link
    to={`/posts/${post.id}`}
    className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100"
  >
    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-red-400 p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 opacity-95"></div>
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-10 bg-white"></div>
      <p className="relative line-clamp-6 text-sm leading-relaxed text-slate-800 font-medium">
        {post.description}
      </p>
      <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition group-hover:opacity-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg">
          <FaArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
    
    <div className="flex flex-col gap-3 px-4 py-4">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold text-slate-600">{formatDate(post.created_at)}</span>
        <span className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-50 text-rose-600 font-medium transition group-hover:bg-rose-100">
            <FaHeart className="h-3.5 w-3.5" />
            {post.likes_count ?? 0}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-pink-50 text-pink-600 font-medium transition group-hover:bg-pink-100">
            <FaComment className="h-3.5 w-3.5" />
            {post.comments_count ?? 0}
          </span>
        </span>
      </div>
    </div>
  </Link>
);

export default PostCard;
