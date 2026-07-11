import { Heart, Gift, Sparkles, Star, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useState } from 'react';

const photos = [
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop',
];

export default function Home() {
  const [surprise, setSurprise] = useState(false);

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

    setSurprise(!surprise);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200">
        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-20 left-10 text-gray-400 animate-bounce" size={40} />
          <Star className="absolute top-40 right-20 text-blue-400 animate-pulse" size={30} />
          <Gift className="absolute bottom-32 left-1/4 text-purple-400 animate-bounce" style={{animationDelay: '0.5s'}} size={35} />
          <Sparkles className="absolute bottom-20 right-10 text-gray-300 animate-pulse" style={{animationDelay: '1s'}} size={45} />
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="mb-6">
            <Sparkles className="mx-auto text-purple-600 mb-4" size={60} />
            <h1 className="font-great-vibes text-6xl md:text-8xl text-gray-900 mb-4">
              Feliz Cumpleaños
            </h1>
            <h2 className="font-great-vibes text-5xl md:text-7xl text-blue-600 mb-4">
              Danita
            </h2>
            <div className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg">
              <Sparkles size={24} />
              <span className="text-xl font-bold">¡26 años increíbles!</span>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-12 mt-8 leading-relaxed">
            Hoy es tu día, el día en que el mundo se iluminó con tu llegada. 
            Te deseo todo lo hermoso que la vida tiene para ofrecer.
          </p>

          <button 
            onClick={handleConfetti}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Gift size={24} />
              Abrir Sorpresa
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </section>

      {/* Surprise Message */}
      {surprise && (
        <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Heart className="mx-auto text-purple-500 mb-6 animate-pulse" size={50} />
            <h3 className="font-great-vibes text-5xl text-gray-900 mb-6">
              ¡Te amo más de lo que las palabras pueden decir!
            </h3>
            <p className="text-xl text-gray-700">
              Eres mi sol, mi luna y todas mis estrellas. Que este día sea tan especial como tú lo eres para mí.
            </p>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-great-vibes text-5xl md:text-6xl text-center text-gray-900 mb-12">
            Nuestros Momentos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200">
                <img 
                  src={photo} 
                  alt={`Momento ${index + 1}`} 
                  className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 text-lg font-semibold">
                    Un recuerdo para siempre ❤️
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-dashed border-gray-300">
            <Heart className="mx-auto text-blue-500 mb-6" size={40} />
            <h2 className="font-great-vibes text-5xl text-center text-gray-900 mb-8">
              Mi Carta para Ti
            </h2>
            
            <div className="text-gray-700 text-lg md:text-xl leading-loose space-y-6">
              <p>
                Mi querida Danita,
              </p>
              <p>
                Desde el momento en que te conocí, supe que eras alguien especial. Tu sonrisa ilumina mis días, 
                tu risa es la melodía más hermosa que he escuchado, y tu amor es el regalo más preciado que jamás he recibido.
              </p>
              <p>
                En este día tan especial (tus 26 años!), quiero recordarte lo increíble que eres. Tu bondad, tu generosidad, tu forma de ver 
                la vida con optimismo... todo acerca de ti me inspira a ser una persona mejor.
              </p>
              <p>
                Espero que este cumpleaños esté lleno de todo lo que te hace feliz. Que cada momento sea mágico, 
                cada sueño se haga realidad y sepas, sin lugar a dudas, cuánto te amo.
              </p>
              <p className="font-great-vibes text-3xl text-purple-600 text-right pt-6">
                Con todo mi corazón,
                <br />
                Tu amor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="mx-auto mb-4 text-gray-400" size={40} />
          <h3 className="font-great-vibes text-4xl mb-4">
            ¡Feliz Cumpleaños Danita!
          </h3>
          <p className="text-lg opacity-90">
            Con todo mi amor, hoy y siempre.
          </p>
        </div>
      </footer>
    </div>
  );
}
