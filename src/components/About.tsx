import React from 'react';
import { ArrowLeft } from 'lucide-react';

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
          ¿Quiénes somos?
        </h2>

        <img
          src="https://images.unsplash.com/photo-1586773860414-d37222d8fce3"
          alt="Quiénes somos"
          className="rounded-xl w-full h-64 object-cover mb-6"
        />

        <p className="text-gray-700 leading-relaxed text-lg text-center">
          Somos CandyCrushers, una confitería dedicada a ofrecer las mejores
          delicias artesanales para alegrar tus días. Nos apasiona crear
          experiencias únicas con nuestros productos, hechos con amor,
          creatividad y los mejores ingredientes. ¡Gracias por confiar en
          nosotros!
        </p>
      </div>
    </div>
  );
};

export default About;
