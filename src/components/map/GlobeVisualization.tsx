import React, { useState } from 'react';
import Globe from 'react-globe.gl';
import { useNavigate } from 'react-router-dom';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';

const GlobeVisualization: React.FC = () => {
  const globeRef = React.useRef<any>();
  const navigate = useNavigate();
  const { users } = useUserData();
  const [globeControls, setGlobeControls] = React.useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prepare marker data for react-globe.gl
  const markers = users.map((user) => ({
    lat: user.location.lat,
    lng: user.location.lng,
    id: user.id,
    name: user.name,
    title: user.title,
    profileImage: user.profileImage,
    fullUser: user
  }));

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (globeRef.current && globeRef.current.controls) {
        const controls = globeRef.current.controls();
        if (controls) {
          // Enable all interactivity
          controls.enableZoom = true;
          controls.enablePan = true;
          controls.enableRotate = true;
          setGlobeControls(controls);
          clearInterval(interval);
        }
      }
    }, 100);
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Zoom controls for react-globe.gl
  const handleZoomIn = () => {
    if (globeControls) {
      globeControls.dollyIn(1.2);
      globeControls.update();
    }
  };

  const handleZoomOut = () => {
    if (globeControls) {
      globeControls.dollyOut(1.2);
      globeControls.update();
    }
  };

  const handleReset = () => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2 }, 1000);
    }
  };

  const handleMarkerClick = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="relative w-full h-full">
      <Globe
        ref={globeRef}
        width={window.innerWidth}
        height={window.innerHeight - 100}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={markers}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={() => '#8B5CF6'}
        pointAltitude={0.01}
        pointRadius={0.35} // Increased for easier interaction
        pointsMerge={false} // Disable merge for better interactivity
        onPointClick={(point: any) => {
          console.log('Pin clicked:', point);
          handleMarkerClick(point.id);
        }}
        pointLabel={(d: any) =>
          `<div style='display:flex;align-items:center;gap:8px;'>` +
          (d.profileImage ? `<img src='${d.profileImage}' alt='${d.name}' style='width:32px;height:32px;border-radius:50%;object-fit:cover;'/>` : '') +
          `<div><strong>${d.name}</strong><br/><span style='font-size:12px;color:#aaa;'>${d.title}</span></div></div>`
        }
        animateIn={true}
        onPointHover={point => {
          if (point) {
            globeRef.current && (globeRef.current.renderer().domElement.style.cursor = 'pointer');
          } else {
            globeRef.current && (globeRef.current.renderer().domElement.style.cursor = '');
          }
        }}
      />
      {/* Globe controls */}
      <div className="globe-controls">
        <button onClick={handleZoomIn} className="globe-control-btn" title="Zoom In">
          <ZoomIn size={18} />
        </button>
        <button onClick={handleZoomOut} className="globe-control-btn" title="Zoom Out">
          <ZoomOut size={18} />
        </button>
        <button onClick={handleReset} className="globe-control-btn" title="Reset View">
          <RotateCw size={18} />
        </button>
      </div>
      {/* User Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-none">
          <div className="bg-space-900 rounded-xl p-8 max-w-lg w-full relative border border-space-700 shadow-2xl pointer-events-auto">
            <button onClick={handleCloseModal} className="absolute top-3 right-3 text-space-400 hover:text-white text-xl">&times;</button>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full border-4 border-stellar-500 overflow-visible flex items-center justify-center bg-space-800">
                <img
                  src={selectedUser.profileImage || 'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full object-cover"
                  style={{objectFit: 'cover'}}
                />
              </div>
              <h2 className="text-2xl font-bold mb-1">{selectedUser.name}</h2>
              <p className="text-stellar-300 mb-2">{selectedUser.title}</p>
              <p className="text-space-300 text-center mb-4">{selectedUser.bio}</p>
              <div className="mb-2 text-sm text-space-400">{selectedUser.location.city}, {selectedUser.location.country}</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedUser.interests.map((interest: string, i: number) => (
                  <span key={i} className="badge badge-astronomy text-xs">{interest}</span>
                ))}
              </div>
              <div className="w-full text-left mt-2">
                <h3 className="font-semibold text-stellar-400 mb-1">Dreams</h3>
                <ul className="mb-3 list-disc list-inside text-space-200">
                  {selectedUser.dreams.map((dream: any, i: number) => (
                    <li key={i}><span className="font-medium">{dream.title}:</span> {dream.description}</li>
                  ))}
                </ul>
                <h3 className="font-semibold text-nebula-400 mb-1">Achievements</h3>
                <ul className="list-disc list-inside text-space-200">
                  {selectedUser.achievements.map((ach: any, i: number) => (
                    <li key={i}><span className="font-medium">{ach.title}:</span> {ach.description}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeVisualization;