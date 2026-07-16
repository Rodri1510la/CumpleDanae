import { Heart, Gift, Sparkles, Star, Music, X, Play, Pause, Camera, MessageCircle, Quote, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const photos = [
  '/images/yo_y_danita.jpeg',
  '/images/comida_juntos_1.jpeg',
  '/images/comida_juntos2.jpeg',
  '/images/flores_amarillas_para_danae.jpeg',
  '/images/fogata_en_la_playa.jpeg',
  '/images/lirios.jpg',
  '/images/perritos.jpeg',
];

const photoCaptions = [
  'Ese día en el que todo se sintió tan perfecto, como si el mundo se detuviera solo para nosotros.',
  'Nuestras comidas juntos, donde siempre como mas pero soy feliz al comer contigo.',
  'Momentos simples que se volvieron inolvidables por que estabas ahi.',
  'Flores que nunca serán tan bonitas como tu sonrisa.',
  'Atardecer, y la fogata a tu lado fue de lo mas bonito.',
  'Lirios para mi delirio dicen jeje TE AMO.',
  'Perritos siempre sere tu fan asi como eres fan de los perros.',
];

const thingsILove = [
  "Tu mirada, que me hace sentir como la persona más importante del mundo",
  "Tu risa, que es el sonido que quiero escuchar todos los días",
  "Tu ternura, que me abraza incluso cuando no estás físicamente",
  "Lo mucho que amas a Snoopy, y cómo cada sticker y verlo siempre me recuerda a ti",
  "La manera en que me haces creer que todo es posible de verdad gracias por eso",
  "Tu amor por los lirios 🌺, y cómo iluminas cuando los ves",
  "Tu pasión por Siddhartha Morat y Taylor 🎶, y cómo las escuchamos juntos",
  "Tu felicidad en la playa 🏖️, cada dia ahi juntos jamas olvidare",
  "Tu manera de amar a los perritos 🐕, con toda tu alma me hace amarlos tambien",
  "Tu gusto por la mayonesa 😄, que aunque no me guste se que te gusta",
];

const favoriteSongs = [
  { name: "Únicos", artist: "Siddhartha" },
  { name: "Brujula", artist: "Siddhartha" },
  { name: "Cuanto Me Duele", artist: "Morat" },
  { name: "Love Story", artist: "Taylor Swift" }
];

export default function Home() {
  const [surprise, setSurprise] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [modalFadingOut, setModalFadingOut] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Controlar visibilidad del botón de volver arriba
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Controlar animaciones de secciones con scroll
  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            entry.target.classList.remove('section-hidden');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    sections.forEach((section) => {
      section.classList.add('section-hidden');
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

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

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openPhotoModal = (photo: string) => {
    setSelectedPhoto(photo);
    setModalFadingOut(false);
  };

  const closePhotoModal = () => {
    setModalFadingOut(true);
    setTimeout(() => {
      setSelectedPhoto(null);
    }, 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Cuenta regresiva desactivada permanentemente (ya es el 16 de julio!)
  const SKIP_COUNTDOWN = true;

  return (
    <div className="min-h-screen bg-white">
      {/* Audio Element */}
      <audio ref={audioRef} src="/music/Siddhartha-Únicos-_Letra_.mp3" loop />

      {/* Floating Music Player */}
      <div className="fixed bottom-4 right-4 z-50 bg-white rounded-full shadow-2xl p-4 flex items-center gap-3 border-2 border-gray-200">
        <button 
          onClick={toggleMusic}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        {isPlaying && (
          <div className="text-sm font-semibold text-gray-700">
            Siddhartha & Morat 🎶
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-all duration-300 ${modalFadingOut ? 'opacity-0' : 'opacity-100'}`}
          onClick={closePhotoModal}
        >
          <button 
            className="absolute top-4 right-4 text-white"
            onClick={closePhotoModal}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedPhoto} 
            alt="Recuerdo" 
            className={`max-w-full max-h-[90vh] rounded-lg shadow-2xl transition-all duration-300 ${modalFadingOut ? 'scale-90' : 'scale-100'}`}
          />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient z-0">
        {/* Floating icons, Snoopy, Lilies and Beach elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-12 left-4 md:top-20 md:left-10 text-gray-400 animate-float-slow" size={24} />
          <Star className="absolute top-24 right-4 md:top-40 md:right-20 text-blue-400 animate-float-fast" size={20} />
          <Gift className="absolute bottom-24 left-4 md:bottom-32 md:left-1/4 text-purple-400 animate-float-medium" style={{animationDelay: '0.5s'}} size={24} />
          <Sparkles className="absolute bottom-12 right-4 md:bottom-20 md:right-10 text-gray-300 animate-float-slow" style={{animationDelay: '1s'}} size={32} />
          {/* Floating Snoopy Images */}
          <img 
            src="/images/snoopy_cool.png" 
            alt="Snoopy" 
            className="absolute bottom-16 left-4 w-20 md:w-32 animate-float-medium opacity-80"
          />
          <img 
            src="/images/snoopy_hug.png" 
            alt="Snoopy" 
            className="absolute top-32 right-4 md:top-40 md:right-10 w-16 md:w-24 animate-float-slow opacity-75"
            style={{animationDelay: '0.3s'}}
          />
          <img 
            src="/images/Snoopy_Peanuts.png" 
            alt="Snoopy" 
            className="absolute bottom-40 right-1/4 w-14 md:w-20 animate-float-fast opacity-70"
            style={{animationDelay: '0.6s'}}
          />
          <img 
            src="/images/494-4942883_snoopy-amor-png-imagenes-de-snoopy-de-amor.png" 
            alt="Snoopy" 
            className="absolute top-1/2 left-1/4 w-16 md:w-24 animate-float-medium opacity-75"
            style={{animationDelay: '0.9s'}}
          />
          {/* Woodstock emoji as a backup! */}
          <div 
            className="absolute top-16 right-8 text-3xl md:text-5xl animate-float-fast opacity-70"
          >
            🐦
          </div>
          {/* Floating Lily Images */}
          <img 
            src="/images/lirios.jpg" 
            alt="Lirio" 
            className="absolute top-20 left-8 w-16 md:w-24 rounded-full shadow-lg animate-float-slow"
          />
          <img 
            src="/images/lirios.jpg" 
            alt="Lirio" 
            className="absolute bottom-32 right-8 w-16 md:w-20 rounded-full shadow-lg animate-float-medium"
          />
          {/* Beach elements */}
          <div className="absolute top-8 right-16 md:top-16 md:right-1/4 text-yellow-500 animate-float-fast">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="absolute bottom-24 right-16 md:bottom-32 md:right-1/4 text-cyan-600 animate-float-medium">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.98 14H22V12H20C18.69 12,17.58 11.17,17.17 10H6.83C6.42 11.17,5.31 12,4 12H2V14H2.02C2.14 14.94,2.55 15.82,3.19 16.56L2 18L3.41 19.41L5 18C6.47 19.25,8.4 20,10.5 20H13.5C15.6 20,17.53 19.25,19 18L20.59 19.41L22 18L20.81 16.56C21.45 15.82,21.86 14.94,21.98 14Z" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-5 py-2 text-sm font-semibold text-gray-700 shadow-lg backdrop-blur">
              <Sparkles size={16} className="text-purple-600" />
              Hoy es tu día, mi amor
            </div>

            <div className="rounded-[2rem] border border-white/60 bg-white/60 px-6 py-10 shadow-[0_30px_80px_rgba(76,29,149,0.15)] backdrop-blur-xl md:px-10 md:py-14">
              <Sparkles className="mx-auto mb-4 text-purple-600" size={60} />
              <h1 className="font-great-vibes text-6xl text-gray-900 md:text-8xl mb-4">
                Feliz Cumpleaños
              </h1>
              <h2 className="font-great-vibes text-5xl text-blue-600 md:text-7xl mb-6">
                Mi Danita
              </h2>
              <div className="inline-flex items-center gap-3 rounded-full bg-gray-900 px-6 py-3 text-white shadow-lg">
                <Sparkles size={24} />
                <span className="text-xl font-bold">¡Hoy celebramos TU existencia! 🎉</span>
              </div>

              <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-gray-700 md:text-2xl">
                Hoy es el día en el que nacio la mujer mas increible que pudo existir de Tacnita: TÚ.
                Quiero dedicarte esta página como un recordatorio de todo lo que te amo,
                de todos los momentos que hemos compartido y de todo lo que aún nos espera juntos bb.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <div className="rounded-full border border-purple-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                  Tu sonrisa ilumina mi vida
                </div>
                <div className="rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                  Cada momento contigo es un sueño hecho realidad
                </div>
                <div className="rounded-full border border-purple-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                  Te amo más de lo que las palabras pueden decir
                </div>
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={handleConfetti}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Gift size={24} />
                  Abrir mi corazón
                </button>
                <Link
                  to="/mensajes"
                  className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-10 py-4 font-semibold text-gray-800 shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <MessageCircle size={22} />
                  Lee los mensajes de amor
                </Link>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/60 bg-white/65 p-5 shadow-lg backdrop-blur">
              <Heart className="mb-3 text-purple-600" size={28} />
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Esencia de Ti</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">
                Toda tu alma, tu forma de ser y tu humor estan aqui jum , creo :D.
              </p>
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/65 p-5 shadow-lg backdrop-blur">
              <Camera className="mb-3 text-blue-600" size={28} />
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Nuestra Historia</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">
                Los momentos que juntos que de verdad nunca creo que olvide danae.
              </p>
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/65 p-5 shadow-lg backdrop-blur">
              <MessageCircle className="mb-3 text-purple-600" size={28} />
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Cariño Infinito</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">
                Todas las palabras bonitas que se me pueden ocurrir de solo pensarte mi bonita.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Surprise Message */}
      {surprise && (
        <section className="scroll-section py-16 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Heart className="mx-auto text-purple-500 mb-6 animate-pulse" size={50} />
            <h3 className="font-great-vibes text-5xl text-gray-900 mb-6">
              ¡Eres mi vida entera!
            </h3>
            <p className="text-xl text-gray-700">
              Sin ti, el mundo sería un lugar menos brillante. Gracias por existir, por ser tú, y por permitirme amarte.
              Te amo más hoy que ayer, y menos que mañana.
            </p>
          </div>
        </section>
      )}

      {/* Things I Love About You Section */}
      <section className="scroll-section py-24 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-great-vibes text-5xl md:text-6xl text-center text-gray-900 mb-12">
            Cosas que amo de ti
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-600 md:text-xl">
            No hay lista larga para incluir todo lo que amo de ti danita, pero estas son
            solo algunas de las razones por las que te elijo cada día de mi vida.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {thingsILove.map((thing, index) => {
              const cardClasses = [
                "love-card-1",
                "love-card-2",
                "love-card-3",
                "love-card-4",
                "love-card-1",
                "love-card-2",
                "love-card-3",
                "love-card-4",
                "love-card-1",
                "love-card-2"
              ];
              return (
                <div 
                  key={index} 
                  className={`group relative overflow-hidden rounded-3xl border-2 border-white/60 ${cardClasses[index % 10]} p-6 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-sm`}
                >
                  <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Heart className="mx-auto mb-4 text-blue-500 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6" size={32} />
                  <p className="text-lg font-semibold text-gray-700 relative z-10">
                    {thing}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="scroll-section py-24 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-yellow-200/20 blur-3xl" />
        <div className="absolute bottom-40 left-20 w-28 h-28 rounded-full bg-pink-200/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-great-vibes text-5xl md:text-6xl text-center text-gray-900 mb-12">
            Nuestros Momentos Inolvidables
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-600 md:text-xl">
            Cada fotografía es una ventana al pasado, a esos momentos que juntos hemos hecho únicos y que
            guardo con todo mi corazón.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden border-2 border-gray-200 shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-2xl ${
                  index === 0 ? 'rounded-[2rem] md:col-span-2 md:h-[32rem]' : 'rounded-[2rem] h-80'
                }`}
                onClick={() => openPhotoModal(photo)}
              >
                <img 
                  src={photo} 
                  alt={`Momento ${index + 1}`} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-100 flex items-end">
                  <div className="p-6 text-white">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
                      <Camera size={16} />
                      {index === 0 ? 'Nuestro recuerdo más preciado' : 'Un pedacito de nuestra historia'}
                    </div>
                    <p className="text-lg font-semibold leading-relaxed md:text-xl">
                      {photoCaptions[index]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Favorite Songs Section */}
      <section className="scroll-section py-24 bg-gradient-to-b from-white to-purple-50/50 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-20 right-1/4 w-36 h-36 rounded-full bg-purple-200/20 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-32 h-32 rounded-full bg-blue-200/20 blur-3xl" />
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-great-vibes text-5xl md:text-6xl text-center text-gray-900 mb-12">
            Nuestras Canciones
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-600 md:text-xl">
            La banda sonora de nuestra historia, canciones que me recuerdan a ti y a todo lo que compartimos.
          </p>
          
          <div className="space-y-4">
            {favoriteSongs.map((song, index) => (
              <div 
                key={index}
                className="group flex items-center gap-4 rounded-[2rem] border border-white/70 bg-white/70 px-6 py-4 shadow-lg backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  <Music size={28} />
                </div>
                <div className="flex-grow">
                  <p className="text-xl font-bold text-gray-900">{song.name}</p>
                  <p className="text-gray-600">{song.artist}</p>
                </div>
                <Heart size={20} className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guestbook Call to Action Section */}
      <section className="scroll-section py-24 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2rem] border border-purple-100 bg-white/70 px-6 py-12 text-center shadow-[0_24px_60px_rgba(59,130,246,0.12)] backdrop-blur md:px-10">
            <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-purple-200/50 blur-3xl" />
            <div className="relative z-10">
              <Heart className="mx-auto mb-6 text-purple-500" size={60} />
              <h2 className="font-great-vibes text-5xl text-gray-900 md:text-6xl mb-4">
                Danita, aquí está el amor del mundo para ti
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
                Todas las palabras bonitas, los buenos deseos y todo el cariño de quienes te quieren
                están aquí, guardados para ti siempre.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/nuevo-mensaje"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Gift size={20} />
                  Deja tu mensaje de amor
                </Link>
                <Link
                  to="/mensajes"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-purple-200 bg-white px-10 py-4 font-semibold text-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <MessageCircle size={20} />
                  Lee todo el cariño 
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="scroll-section py-24 bg-gradient-to-b from-purple-50/50 to-white relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-pink-100/40 blur-3xl" />
        <div className="absolute bottom-10 right-1/3 w-32 h-32 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2rem] border border-purple-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 shadow-2xl md:p-12">
            <div className="absolute right-6 top-6 opacity-10">
              <Quote size={120} className="text-purple-900" />
            </div>
            <div className="relative z-10">
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-700 shadow">
                  <Quote size={16} className="text-purple-600" />
                  Una carta desde lo más profundo de mi corazón
                </div>
              </div>
              <Heart className="mx-auto text-blue-500 mb-6" size={40} />
              <h2 className="font-great-vibes text-5xl text-center text-gray-900 mb-8">
                Mi Carta para Ti, Mi Loquita
              </h2>
            
              <div className="text-gray-700 text-lg md:text-xl leading-loose space-y-6">
                <p>
                  Mi vida, mi Danita,
                </p>
                <p>
                  No hay palabras suficientes en el mundo para expresar todo lo que te amo, pero hoy,
                  en tu cumpleaños, quiero intentarlo. Desde el primer momento en que te vi,
                  supe que eras alguien diferente, alguien que llegaría para quedarse y cambiarlo todo.
                </p>
                <p>
                  Tu sonrisa es el sol que ilumina mis mañanas, tu risa es la melodía que quiero escuchar
                  todos los días y tu abrazo es el hogar donde siempre quiero estar. Amo tu manera de ver
                  el mundo con optimismo, tu bondad infinita, tu generosidad sin límites y tu corazón tan
                  grande que todos caben en él.
                </p>
                <p>
                  Amo cómo tus ojos brillan cuando hablas de las cosas que amas: los lirios, la música de
                  Siddhartha y Morat, Snoopy, la playa, los perritos... amo todo eso porque forma parte de ti.
                </p>
                <p>
                  Hoy celebramos Tu cumple y de verdad me siento afortunado de estar contigo. Deseo que este día esté lleno de todo lo que
                  te hace feliz, que cada momento sea mágico, que cada sueño que tengas se haga realidad y que
                  nunca olvides lo increíble que eres y lo mucho que te amo mi bb.
                </p>
                <p>
                  Gracias por ser tú, por existir, por entrar en mi vida y hacerla mejor en cada aspecto.
                  Prometo amarte, cuidarte, respetarte y hacerte feliz todos los días de mi vida.
                  Eres mi sol, mi norte y mi lugar favorito.
                </p>
                <p className="pt-6 text-right font-great-vibes text-3xl text-purple-600">
                  Con todo mi corazón, para siempre,
                  <br />
                  Tu rodriguito
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <ArrowUp size={28} />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-purple-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <Heart className="text-purple-400 animate-pulse" size={40} />
            <Sparkles className="text-blue-400 animate-pulse" style={{animationDelay: '0.2s'}} size={40} />
            <Gift className="text-purple-400 animate-pulse" style={{animationDelay: '0.4s'}} size={40} />
          </div>
          <h3 className="font-great-vibes text-5xl md:text-6xl mb-4">
            ¡Feliz Cumpleaños, Mi Enojona!
          </h3>
          <p className="text-xl opacity-90">
            Te amo hoy, mañana y siempre. Con todo mi corazón de verdad.
          </p>
        </div>
      </footer>
    </div>
  );
}
