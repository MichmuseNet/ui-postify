import React from 'react';
import useFetch from '../hooks/useFetch';
import { API_BASE_URL } from '../config';
import PostCard from '../components/PostCard';
import BottomNav from '../components/BottomNav';

const Home = () => {
  const { data: posts, loading, error } = useFetch(`${API_BASE_URL}/posts`);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 pb-24">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto max-w-lg px-4 py-4">
          <h1 className="text-2xl font-bold text-slate-900">Postify</h1>
          <p className="text-xs text-slate-500 mt-1">Comparte tus momentos</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-8">
        {loading && (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-2xl bg-white animate-pulse shadow-md"
              ></div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-6 text-center shadow-md">
            <p className="text-sm font-semibold text-rose-700">
              ⚠️ Error al cargar los posts
            </p>
            <p className="text-xs text-rose-600 mt-1">({error})</p>
            <p className="text-xs text-rose-500 mt-3">
              Verifica que el servidor esté corriendo en http://localhost:8000
            </p>
          </div>
        )}

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
              <p className="text-slate-500 font-medium">No hay posts aún</p>
            </div>
          )
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;