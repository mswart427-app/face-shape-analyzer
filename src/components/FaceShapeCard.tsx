import React from 'react';
import { Info } from 'lucide-react';

type FaceShapeProps = {
  shape: string;
  description: string;
  imageUrl: string;
  characteristics: string[];
};

export function FaceShapeCard({ shape, description, imageUrl, characteristics }: FaceShapeProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={imageUrl}
          alt={`${shape} face shape`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{shape}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="space-y-2">
          {characteristics.map((char, index) => (
            <div key={index} className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-gray-700">{char}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
