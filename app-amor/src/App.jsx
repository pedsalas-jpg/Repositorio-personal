import React from 'react';
import { Heart } from 'lucide-react';

export default function App() {
    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4">
            {/* Ícono de corazón */}
            <Heart className="w-12 h-12 text-red-500 fill-red-500 animate-bounce mb-4" />

            {/* Contenedor circular de la foto */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-red-300 shadow-lg mb-6 bg-white flex items-center justify-center">
                <img
                    src={`${import.meta.env.BASE_URL}nosotros.jpg`}
                    alt="Nuestra foto"
                    className="w-full h-full object-cover"
                />
            </div>

            <h1 className="text-3xl font-bold text-red-600 text-center mb-2">
                Nuestro Tiempo Juntos
            </h1>

            {/* Aquí continúa el resto del contenido de tu app (contador, cupones, etc.) */}
        </div>
    );
}