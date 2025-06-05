import React, { useState } from 'react';

interface IntegranteCardProps {
    nome: string;
    funcao: string;
    fotoUrl: string;
    imagemAlternativa?: string;
    funcaoAlternativa?: string;
}

const IntegranteCard: React.FC<IntegranteCardProps> = ({ nome, funcao, fotoUrl, imagemAlternativa, funcaoAlternativa }) => 
    {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative border border-gray-200 rounded-lg p-4 pb-8 w-64 text-center shadow-md bg-white"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative w-full h-60 mb-3">
                <img
                    src={fotoUrl}
                    alt={`Foto de ${nome}`}
                    className={`absolute inset-0 w-full h-full object-cover rounded-md shadow-lg transition-opacity duration-500 ${
                        hovered && imagemAlternativa ? 'opacity-0' : 'opacity-100'
                    }`}
                />
                {imagemAlternativa && (
                    <img
                        src={imagemAlternativa}
                        alt={`Imagem alternativa de ${nome}`}
                        className={`absolute inset-0 w-full h-full object-cover rounded-md shadow-lg transition-opacity duration-500 ${
                            hovered ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                )}
            </div>

            <h3 className="mt-2 mb-1 text-lg font-semibold">{nome}</h3>
            <p className={`absolute text-center text-gray-600 m-0 transition-opacity duration-500 ${
                        hovered && funcaoAlternativa? 'opacity-0' : 'opacity-100'
                    }`}>{funcao}</p>
            {hovered && funcaoAlternativa && (
                <p className={`absolute text-center text-gray-600 m-0 transition-opacity duration-500 ${
                            hovered ? 'opacity-100' : 'opacity-0'
                        }`}>{funcaoAlternativa}</p>
            )}
        </div>
    )};

export default IntegranteCard;
