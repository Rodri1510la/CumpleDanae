import { useState, useEffect } from 'react';
import { Send, Heart, User, MessageSquare, PartyPopper, Gift, Cake, Sparkles, ArrowLeft, ArrowUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabase';

const birthdayEmojis = ['🎂', '🎁', '🎉', '❤️', '✨', '🎈', '🎊', '💖', '🌸', '🌺'];

export default function NuevoMensaje() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  const handleConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6B7280', '#3B82F6', '#8B5CF6', '#1F2937']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6B7280', '#3B82F6', '#8B5CF6', '#1F2937']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const addEmoji = (emoji: string) => {
    setMensaje(prev => prev + emoji);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !mensaje.trim()) return;
    setLoading(true);

    const { error } = await supabase.from('mensajes').insert([{ 
      nombre, 
      mensaje, 
      fecha: new Date().toISOString() 
    }]);
    if (error) {
      console.error('Error inserting message:', error);
      alert('Ocurrió un error al enviar el mensaje: ' + error.message);
      setLoading(false);
      return;
    }
    
    setShowSuccess(true);
    handleConfetti();
    setNombre('');
    setMensaje('');
    setLoading(false);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200 py-12 px-4 relative overflow-hidden">
      {/* Floating decorative elements */}
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
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium bg-white/65 backdrop-blur border border-white/70 px-5 py-2 rounded-full shadow-lg">
            <ArrowLeft size={24} />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {showSuccess && (
          <div className="mb-8 p-6 bg-white/65 backdrop-blur border-2 border-green-400 rounded-3xl text-green-800 text-center shadow-xl">
            <PartyPopper className="mx-auto mb-2 text-green-600" size={32} />
            <p className="text-2xl font-bold">¡Mensaje enviado con éxito! 🎉</p>
            <p className="text-sm mt-2">Gracias por tu mensaje para Danita!</p>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-5 py-2 text-sm font-semibold text-gray-700 shadow-lg backdrop-blur">
            <Sparkles size={16} className="text-purple-600" />
            ¡Deja tu mensaje de amor
          </div>
          <Heart className="mx-auto text-purple-600 mb-4 animate-pulse" size={50} />
          <h1 className="font-great-vibes text-5xl md:text-7xl text-gray-900 mb-2">
            Deja tu mensaje
          </h1>
          <p className="text-2xl text-gray-700">
            ¡Escribe un mensaje de cumpleaños para Danita! 🎉
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/65 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-white/70">
          <div className="absolute inset-x-8 top-0 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-70" />
          <div className="mb-6">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
              <User className="text-purple-600" size={24} />
              Tu nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-white/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 text-lg"
              placeholder="¿Cómo te llamas?"
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                <MessageSquare className="text-purple-600" size={24} />
                Tu mensaje para Danita
              </label>
              <span className={`text-sm font-medium ${mensaje.length > 400 ? 'text-red-500' : 'text-gray-500'}`}>
                {mensaje.length}/500
              </span>
            </div>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value.slice(0, 500))}
              maxLength={500}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-white/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none resize-vertical min-h-[200px] transition-all duration-300 text-lg"
              placeholder="Escribe aquí tu mensaje de cumpleaños..."
            />
            
            <div className="flex flex-wrap gap-2 mt-4 p-3 bg-white/60 rounded-xl border border-white/70">
              <span className="text-sm text-gray-500 flex items-center gap-1 mr-2">
                <Sparkles size={16} />
                Emojis:
              </span>
              {birthdayEmojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addEmoji(emoji)}
                  className="text-2xl hover:scale-125 transition-transform duration-200"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 text-xl"
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
            <Send size={24} />
          </button>
        </form>
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
      <footer className="bg-gradient-to-br from-gray-900 to-purple-900 text-white py-16 mt-20 relative z-10">
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
