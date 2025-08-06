import React from 'react';
import { ArrowLeft } from 'lucide-react';
import icono from '../resource/Icono.png';

interface AboutProps {
  onBack: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 hover:opacity-80 mb-6 transition-colors"
        style={{ color: '#EB9898' }}
      >
        <ArrowLeft className="h-5 w-5" />
        Volver
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ¿Quiénes somos? Historia
        </h2>

        <img
          src={icono}
          alt=""
          className="w-80 h-80 mx-auto mb-4" 
        />

        <p className="text-gray-700 leading-relaxed text-lg text-left">
            Somos dos amigos que, desde chicos, compartimos la pasión por lo dulce. Siempre que había una excusa para cocinar, ahí estábamos, inventando recetas y probando combinaciones.
            <br />
            Después de años de amistad y de muchas meriendas improvisadas, decidimos estudiar gastronomía juntos. Durante la carrera, fuimos perfeccionando técnicas, aprendiendo de los mejores y soñando con tener algún día nuestro propio espacio.
            <br />
            Así nació CandyCrushers, una confitería online pensada para compartir esa misma emoción con la que empezamos: la de crear algo rico, casero y con mucho amor. Todo lo que ves en esta tienda fue hecho pensando en eso… en endulzar momentos, como lo hicimos siempre entre nosotros.
        </p>
      </div>
    </div>
  );
};

export default About;
