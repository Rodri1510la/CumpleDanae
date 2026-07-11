import { useState } from 'react';
import { Send, Heart, User, MessageSquare, PartyPopper, Gift, Cake, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabase';

const birthdayEmojis = ['🎂', '🎁', '🎉', '❤️', '✨', '🎈', '🎊', '💖', '🌸', '🌺'];

export default function NuevoMensaje() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {showSuccess && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-2xl text-green-800 text-center shadow-lg">
            <PartyPopper className="mx-auto mb-2 text-green-600" size={32} />
            <p className="text-2xl font-bold">¡Mensaje enviado con éxito! 🎉</p>
            <p className="text-sm mt-2">Gracias por tu mensaje para Danita!</p>
          </div>
        )}

        <div className="text-center mb-8">
          <Heart className="mx-auto text-purple-600 mb-4 animate-pulse" size={50} />
          <h1 className="font-great-vibes text-5xl md:text-7xl text-gray-900 mb-2">
            Deja tu mensaje
          </h1>
          <p className="text-2xl text-gray-700">
            ¡Escribe un mensaje de cumpleaños para Danita! 🎉
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-gray-100">
          <div className="mb-6">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
              <User className="text-purple-600" size={24} />
              Tu nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 text-lg"
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
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none resize-vertical min-h-[200px] transition-all duration-300 text-lg"
              placeholder="Escribe aquí tu mensaje de cumpleaños..."
            />
            
            <div className="flex flex-wrap gap-2 mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
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
    </div>
  );
}
