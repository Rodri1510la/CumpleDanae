import { useState, useEffect } from 'react';
import { Heart, Plus, Sparkles, ArrowLeft, Gift, Cake, Star, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Mensaje = {
  id: number;
  nombre: string;
  mensaje: string;
  fecha: string;
};

// Función para obtener iniciales del nombre
const getIniciales = (nombre: string) => {
  return nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function Mensajes() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fetchMensajes = async () => {
      const { data, error } = await supabase
        .from('mensajes')
        .select('*')
        .order('fecha', { ascending: false });
      if (error) {
        console.error('Error fetching messages:', error);
        alert('Ocurrió un error al cargar los mensajes: ' + error.message);
      }
      if (data) setMensajes(data);
      setLoading(false);
    };
    fetchMensajes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200 py-12 px-4 relative overflow-hidden">
      {/* Floating decorative elements - Mejorados */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-12 left-4 md:top-16 md:left-10 text-gray-400 animate-float-slow" size={24} />
        <Star className="absolute top-24 right-4 md:top-32 md:right-20 text-blue-400 animate-float-fast" size={20} />
        <Gift className="absolute bottom-24 left-4 md:bottom-24 md:left-1/4 text-purple-400 animate-float-medium" style={{animationDelay: '0.5s'}} size={24} />
        <Cake className="absolute bottom-12 right-4 md:bottom-16 md:right-10 text-gray-300 animate-float-slow" style={{animationDelay: '1s'}} size={32} />
        <div 
          className="absolute top-20 right-8 text-3xl md:text-5xl animate-float-fast opacity-70"
        >
          🐦
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium bg-white/60 backdrop-blur border border-white/70 px-5 py-2 rounded-full shadow-lg"
          >
            <ArrowLeft size={24} />
            <span>Volver al inicio</span>
          </Link>
          <Link 
            to="/nuevo-mensaje" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg"
          >
            <Plus size={24} />
            <span>Agregar mensaje</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-5 py-2 text-sm font-semibold text-gray-700 shadow-lg backdrop-blur">
            <Sparkles size={16} className="text-purple-600" />
            Todos los mensajes de amor
          </div>
          <h1 className="font-great-vibes text-5xl md:text-7xl text-gray-900 mb-2">
            Mensajes de cumpleaños
          </h1>
          <p className="text-2xl text-gray-700">
            Todos los mensajes para Danita! 🎉
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 py-20 text-xl font-medium">
            <div className="flex flex-col items-center gap-4 bg-white/65 backdrop-blur border border-white/70 rounded-3xl p-10 shadow-xl">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="text-xl font-semibold text-gray-700">Cargando mensajes...</p>
            </div>
          </div>
        ) : mensajes.length === 0 ? (
          <div className="text-center py-16 bg-white/65 backdrop-blur rounded-3xl shadow-xl border border-white/70">
            <Heart className="mx-auto text-purple-400 mb-4 animate-pulse" size={64} />
            <p className="text-2xl text-gray-600 mb-6 font-medium">¡Aún no hay mensajes!</p>
            <Link to="/nuevo-mensaje" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg">
              <Plus size={24} />
              <span>Ser el primero en dejar un mensaje</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {mensajes.map((m, index) => (
              <div 
                key={m.id} 
                className="bg-white/65 backdrop-blur rounded-3xl shadow-xl p-8 border-2 border-white/70 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-x-8 top-0 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-70" />
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar con iniciales */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {getIniciales(m.nombre)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{m.nombre}</h3>
                </div>
                <p className="text-gray-700 mb-4 text-xl leading-relaxed">{m.mensaje}</p>
                {m.fecha && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Sparkles size={16} className="text-purple-400" />
                    <p>
                      {new Date(m.fecha).toLocaleString('es-ES', { 
                        timeZone: 'America/Lima',
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300"
        >
          <ArrowUp size={28} />
        </button>
      )}
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-purple-900 text-white py-16 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <Heart className="text-purple-400 animate-pulse" size={40} />
            <Sparkles className="text-blue-400 animate-pulse" style={{animationDelay: '0.2s'}} size={40} />
            <Gift className="text-purple-400 animate-pulse" style={{animationDelay: '0.4s'}} size={40} />
          </div>
          <h3 className="font-great-vibes text-5xl md:text-6xl mb-4">
            ¡Feliz Cumpleaños Danita!
          </h3>
          <p className="text-xl opacity-90">
            Con todo mi amor, hoy y siempre.
          </p>
        </div>
      </footer>
    </div>
  );
}
