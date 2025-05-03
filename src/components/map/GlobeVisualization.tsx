import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../context/UserDataContext';

const GlobeVisualization: React.FC = () => {
  const globeRef = useRef<any>(null);
  const navigate = useNavigate();
  const { users } = useUserData();

  useEffect(() => {
    if (!globeRef.current) return;

    // Set initial camera position
    globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
  }, []);

  const pointsData = users.map(user => ({
    id: user.id,
    lat: user.location.lat,
    lng: user.location.lng,
    name: user.name,
    title: user.title,
    interests: user.interests,
    color: '#8B5CF6',
    size: 0.5,
  }));

  // Globe controls
  const zoomIn = () => {
    if (!globeRef.current) return;
    const { altitude } = globeRef.current.pointOfView();
    globeRef.current.pointOfView({ altitude: Math.max(altitude * 0.7, 0.8) });
  };

  const zoomOut = () => {
    if (!globeRef.current) return;
    const { altitude } = globeRef.current.pointOfView();
    globeRef.current.pointOfView({ altitude: Math.min(altitude * 1.3, 4) });
  };

  const resetView = () => {
    if (!globeRef.current) return;
    globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
  };

  const handlePointClick = (point: any) => {
    navigate(`/profile/${point.id}`);
  };

  return (
    <div className="relative w-full h-full">
      <Globe
        ref={globeRef}
        globeImageUrl="/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={pointsData}
        pointColor="color"
        pointAltitude={0.01}
        pointRadius="size"
        pointLabel={(d: any) => `
          <div class="bg-space-900 text-white p-2 rounded-lg text-sm shadow-lg border border-stellar-900">
            <div class="font-bold">${d.name}</div>
            <div class="text-xs text-space-300">${d.title}</div>
            <div class="mt-1 flex gap-1">
              ${d.interests.map((interest: string) => 
                `<span class="px-1.5 py-0.5 text-[10px] rounded-full bg-stellar-900/50 border border-stellar-700/50">${interest}</span>`
              ).join('')}
            </div>
          </div>
        `}
        onPointClick={handlePointClick}
      />
      
      {/* Globe controls */}
      <div className="globe-controls">
        <button onClick={zoomIn} className="globe-control-btn" title="Zoom In">
          <ZoomIn size={18} />
        </button>
        <button onClick={zoomOut} className="globe-control-btn" title="Zoom Out">
          <ZoomOut size={18} />
        </button>
        <button onClick={resetView} className="globe-control-btn" title="Reset View">
          <RotateCw size={18} />
        </button>
      </div>
    </div>
  );
};

export default GlobeVisualization;