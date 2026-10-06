import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Sparkles,
  RotateCcw,
  Layers,
  CheckCircle2,
  Eye,
  ShieldCheck,
  Maximize2,
  Image as ImageIcon,
  Box
} from 'lucide-react';
import { ASSETS } from '../constants/assets';

interface Hotspot {
  id: number;
  label: string;
  detail: string;
  pos: [number, number, number]; // for 3D WebGL
  photoPos: { x: number; y: number }; // percentage coords on photo
  zone: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    label: 'Hardwood & Herringbone Marble Flooring',
    detail: 'Triple-pass HEPA micro-extraction followed by pH-neutral organic botanical polish. Mirror reflection with non-slip organic sealant.',
    pos: [0, 0.1, 0.5],
    photoPos: { x: 48, y: 84 },
    zone: 'Floor Detailing'
  },
  {
    id: 2,
    label: 'Cove Ceiling & Recessed LED Channels',
    detail: 'Specialized 12-ft extension micro-wand removal of cobwebs, settling silica dust, and LED diffuser streak clearing.',
    pos: [1.8, 1.8, -1.8],
    photoPos: { x: 50, y: 15 },
    zone: 'Ceiling Lighting'
  },
  {
    id: 3,
    label: 'Dining & Accent Surface Sealing',
    detail: 'Anti-static botanical wax barrier prevents micro-particulate adherence for up to 14 days. 100% food and wine safe.',
    pos: [0.3, 0.5, 0.4],
    photoPos: { x: 80, y: 60 },
    zone: 'Surface Sanctuary'
  }
];

export const ThreeRoomInspector: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'photo-inspection' | 'webgl-3d'>('photo-inspection');
  const [cleanlinessLevel, setCleanlinessLevel] = useState<number>(100);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[0]);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [screenCoords, setScreenCoords] = useState<{ [key: number]: { x: number; y: number; visible: boolean } }>({});
  const [partitionImgSrc, setPartitionImgSrc] = useState(ASSETS.DESIGN_CAFE_LIVING_ROOM);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sparklesRef = useRef<THREE.Points | null>(null);
  const dustRef = useRef<THREE.Points | null>(null);
  const floorMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Mouse interaction for orbit
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const rotationTarget = useRef({ x: 0.35, y: -0.6 });

  useEffect(() => {
    if (viewMode !== 'webgl-3d') return;

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 540;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfff7f9);
    scene.fog = new THREE.FogExp2(0xfff7f9, 0.04);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.5, 3.2, 5.0);
    camera.lookAt(0, 0.8, 0);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // LIGHTING (Warm girly blush tone)
    const ambientLight = new THREE.AmbientLight(0xfff1f3, 1.1);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff8f5, 1.9);
    dirLight.position.set(5, 7, 3);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Soft pink fill light
    const fillLight = new THREE.PointLight(0xfce7f3, 1.4, 10);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Architectural Room Group
    const room = new THREE.Group();
    scene.add(room);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(7, 7);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf5edf0,
      roughness: 0.15,
      metalness: 0.1,
    });
    floorMatRef.current = floorMat;
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    room.add(floor);

    // Back Wall
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xfbf2f4, roughness: 0.9 });
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(7, 3.8, 0.1), wallMat);
    backWall.position.set(0, 1.9, -3.5);
    backWall.receiveShadow = true;
    room.add(backWall);

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.8, 7), wallMat);
    leftWall.position.set(-3.5, 1.9, 0);
    leftWall.receiveShadow = true;
    room.add(leftWall);

    // Architectural Fluted Partition screen in 3D
    const partitionGroup = new THREE.Group();
    const slatMat = new THREE.MeshStandardMaterial({ color: 0xd9b99b, roughness: 0.4 });
    for (let i = -1.2; i <= 1.2; i += 0.25) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.2, 0.08), slatMat);
      slat.position.set(i, 1.6, 0);
      slat.castShadow = true;
      partitionGroup.add(slat);
    }
    partitionGroup.position.set(1.5, 0, -1.5);
    room.add(partitionGroup);

    // Designer Sofa
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0xf2ece9, roughness: 0.85 });
    const sofaGroup = new THREE.Group();
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 1.1), sofaMat);
    sofaBase.position.y = 0.25;
    sofaBase.castShadow = true;
    sofaGroup.add(sofaBase);

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 0.3), sofaMat);
    sofaBack.position.set(0, 0.65, -0.4);
    sofaBack.castShadow = true;
    sofaGroup.add(sofaBack);

    // Pink / blush decorative pillows
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.7 });
    const pillow1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.2), pillowMat);
    pillow1.position.set(-0.7, 0.55, -0.2);
    pillow1.rotation.y = 0.2;
    pillow1.castShadow = true;
    const pillow2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.2), pillowMat);
    pillow2.position.set(0.7, 0.55, -0.2);
    pillow2.rotation.y = -0.2;
    pillow2.castShadow = true;
    sofaGroup.add(pillow1, pillow2);

    sofaGroup.position.set(-0.8, 0, -1.2);
    room.add(sofaGroup);

    // Coffee Table
    const tableMat = new THREE.MeshStandardMaterial({ color: 0xfffcfd, roughness: 0.1 });
    const tabletop = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.06, 32), tableMat);
    tabletop.position.set(0.3, 0.38, 0.3);
    tabletop.castShadow = true;
    room.add(tabletop);

    // GIRLY PINK SPARKLE PARTICLES
    const sparkleCount = 140;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sparklePositions[i] = (Math.random() - 0.5) * 5.0;
      sparklePositions[i + 1] = Math.random() * 2.8 + 0.1;
      sparklePositions[i + 2] = (Math.random() - 0.5) * 5.0;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0xf472b6,
      size: 0.09,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    sparklesRef.current = sparkles;
    room.add(sparkles);

    // DUST PARTICLES
    const dustCount = 180;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 5.0;
      dustPositions[i + 1] = Math.random() * 2.5 + 0.05;
      dustPositions[i + 2] = (Math.random() - 0.5) * 5.0;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x9c8e82,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    dustRef.current = dustPoints;
    room.add(dustPoints);

    // Orbit mouse handling
    const dom = renderer.domElement;
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMousePos.current.x;
      const deltaY = e.clientY - prevMousePos.current.y;
      rotationTarget.current.y += deltaX * 0.005;
      rotationTarget.current.x = Math.max(0.15, Math.min(0.7, rotationTarget.current.x + deltaY * 0.003));
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isRotating && !isDraggingRef.current) {
        rotationTarget.current.y += 0.0018;
      }

      const radius = 6.2;
      const targetCamX = Math.sin(rotationTarget.current.y) * Math.cos(rotationTarget.current.x) * radius;
      const targetCamY = Math.sin(rotationTarget.current.x) * radius + 0.5;
      const targetCamZ = Math.cos(rotationTarget.current.y) * Math.cos(rotationTarget.current.x) * radius;

      camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.08);
      camera.lookAt(0, 0.7, 0);

      if (sparklesRef.current) {
        sparklesRef.current.rotation.y = elapsedTime * 0.08;
      }
      if (dustRef.current) {
        dustRef.current.rotation.y = -elapsedTime * 0.03;
      }

      const coords: { [key: number]: { x: number; y: number; visible: boolean } } = {};
      HOTSPOTS.forEach((hs) => {
        const v = new THREE.Vector3(...hs.pos);
        v.project(camera);
        const hw = width / 2;
        const hh = height / 2;
        const screenX = v.x * hw + hw;
        const screenY = -v.y * hh + hh;
        coords[hs.id] = {
          x: screenX,
          y: screenY,
          visible: v.z < 1.0 && screenX > 20 && screenX < width - 20 && screenY > 20 && screenY < height - 20
        };
      });
      setScreenCoords(coords);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [viewMode, isRotating]);

  // Handle Cleanliness slider updates
  useEffect(() => {
    const factor = cleanlinessLevel / 100;
    if (floorMatRef.current) {
      floorMatRef.current.roughness = 0.6 - factor * 0.48;
      floorMatRef.current.metalness = factor * 0.15;
    }
    if (sparklesRef.current) {
      sparklesRef.current.visible = factor > 0.4;
      (sparklesRef.current.material as THREE.PointsMaterial).opacity = Math.max(0, (factor - 0.4) * 1.6);
    }
    if (dustRef.current) {
      dustRef.current.visible = factor < 0.8;
      (dustRef.current.material as THREE.PointsMaterial).opacity = (1 - factor) * 0.8;
    }
    if (dirLightRef.current) {
      dirLightRef.current.intensity = 1.2 + factor * 0.9;
    }
  }, [cleanlinessLevel]);

  return (
    <section id="inspector" className="py-24 bg-gradient-to-b from-[#fffbfc] via-[#fff5f7] to-[#fffbfc] border-b border-pink-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-pink-700 mb-3">
              <Layers className="w-3.5 h-3.5 text-pink-500" />
              <span>Interactive Space Architecture</span>
              <span aria-hidden="true" className="text-pink-300">·</span>
              <span>Luxury Living Sanctuary</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 tracking-tight text-balance">
              3D Space Cleanliness Inspector
            </h2>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              Explore how Jess Pristine resets modern luxury residences. Inspect key detail zones, slide the cleanliness meter, or toggle between architectural high-resolution view and 3D WebGL orbit!
            </p>
          </div>

          {/* Mode Switcher & Cleanliness Control */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-pink-200 shadow-md shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 bg-pink-50/80 p-1 rounded-2xl">
              <button
                onClick={() => setViewMode('photo-inspection')}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all flex items-center gap-1.5 ${
                  viewMode === 'photo-inspection'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Open Living Room</span>
              </button>
              <button
                onClick={() => setViewMode('webgl-3d')}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all flex items-center gap-1.5 ${
                  viewMode === 'webgl-3d'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D WebGL Model</span>
              </button>
            </div>

            <div className="h-6 w-px bg-pink-200 hidden sm:block" />

            {/* Cleanliness Slider */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label htmlFor="cleanliness-slider" className="text-xs font-mono tabular-nums text-pink-900 whitespace-nowrap font-medium">
                {cleanlinessLevel}% Detailing
              </label>
              <input
                id="cleanliness-slider"
                type="range"
                min="0"
                max="100"
                value={cleanlinessLevel}
                onChange={(e) => setCleanlinessLevel(Number(e.target.value))}
                className="w-28 sm:w-32 accent-pink-500 h-1.5 bg-pink-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Viewport Box */}
        <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden border border-pink-200 shadow-xl select-none bg-neutral-950">
          
          {viewMode === 'photo-inspection' ? (
            /* Open Living Room with Partition Design Image Inspection View */
            <div className="relative w-full h-full">
              <img
                src={partitionImgSrc}
                alt="Open living room with partition design"
                referrerPolicy="no-referrer"
                onError={() => setPartitionImgSrc(ASSETS.DESIGN_CAFE_FALLBACK)}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  cleanlinessLevel < 40 ? 'filter contrast-75 brightness-75 sepia-[0.3]' : 'filter brightness-105 contrast-105'
                }`}
              />

              {/* Dynamic Dust or Sparkle Layer over Image */}
              {cleanlinessLevel < 60 && (
                <div
                  className="absolute inset-0 bg-stone-900/40 pointer-events-none transition-opacity"
                  style={{ opacity: (100 - cleanlinessLevel) / 100 * 0.7 }}
                />
              )}

              {/* Girly Pink Sparkle Overlay */}
              {cleanlinessLevel >= 80 && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-pink-500/10 via-transparent to-rose-400/10" />
              )}

              {/* Photo Inspection Hotspot Pins */}
              {HOTSPOTS.map((hs) => {
                const isSelected = activeHotspot?.id === hs.id;
                return (
                  <div
                    key={hs.id}
                    style={{
                      position: 'absolute',
                      left: `${hs.photoPos.x}%`,
                      top: `${hs.photoPos.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="z-20 pointer-events-auto"
                  >
                    <button
                      onClick={() => setActiveHotspot(hs)}
                      className={`group relative flex items-center justify-center transition-all ${
                        isSelected ? 'scale-125' : 'hover:scale-110'
                      }`}
                      aria-label={`View hotspot ${hs.label}`}
                    >
                      {/* Pulsing Pink Aura */}
                      <span
                        className={`absolute -inset-2.5 rounded-full animate-ping opacity-75 ${
                          isSelected ? 'bg-pink-500' : 'bg-white/40'
                        }`}
                      />
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-lg transition-all ${
                          isSelected
                            ? 'bg-gradient-to-tr from-pink-600 to-rose-400 text-white ring-2 ring-white ring-offset-2 ring-offset-pink-500'
                            : 'bg-white/95 text-pink-900 border border-pink-200 hover:bg-pink-500 hover:text-white'
                        }`}
                      >
                        {hs.id}
                      </span>
                    </button>
                  </div>
                );
              })}

              {/* Image Info Tag */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <div className="px-3.5 py-1.5 bg-black/60 backdrop-blur-md text-white rounded-xl text-xs font-mono flex items-center gap-2 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                  <span>Open Living Room & Partition Design · Click Pins to Inspect</span>
                </div>
              </div>
            </div>
          ) : (
            /* Three.js 3D WebGL Canvas View */
            <div className="relative w-full h-full">
              <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              {/* 3D WebGL Projected Hotspot Pins */}
              {HOTSPOTS.map((hs) => {
                const coords = screenCoords[hs.id];
                if (!coords || !coords.visible) return null;
                const isSelected = activeHotspot?.id === hs.id;

                return (
                  <div
                    key={hs.id}
                    style={{
                      position: 'absolute',
                      left: `${coords.x}px`,
                      top: `${coords.y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="z-20 pointer-events-auto"
                  >
                    <button
                      onClick={() => setActiveHotspot(hs)}
                      className={`group relative flex items-center justify-center transition-all ${
                        isSelected ? 'scale-125' : 'hover:scale-110'
                      }`}
                      aria-label={`View hotspot ${hs.label}`}
                    >
                      <span
                        className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                          isSelected ? 'bg-pink-500' : 'bg-neutral-900/20'
                        }`}
                      />
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-md transition-all ${
                          isSelected
                            ? 'bg-gradient-to-tr from-pink-600 to-rose-400 text-white ring-2 ring-white'
                            : 'bg-white/95 text-neutral-800 border border-pink-200 hover:bg-pink-500 hover:text-white'
                        }`}
                      >
                        {hs.id}
                      </span>
                    </button>
                  </div>
                );
              })}

              {/* 3D Controls HUD */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className="px-3 py-1.5 bg-white/90 backdrop-blur-md border border-pink-200 rounded-xl text-xs font-medium text-neutral-700 hover:text-neutral-900 shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
                  {isRotating ? 'Orbit Active' : 'Orbit Paused'}
                </button>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md border border-pink-200 rounded-xl text-xs text-neutral-600 shadow-sm">
                  <Eye className="w-3.5 h-3.5 text-pink-500" />
                  <span>Drag mouse to rotate 3D room</span>
                </div>
              </div>
            </div>
          )}

          {/* Cleanliness State Status Badge (Top Right) */}
          <div className="absolute top-4 right-4 z-20">
            <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-2xl border border-pink-200 shadow-md flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${cleanlinessLevel > 60 ? 'bg-pink-500 animate-pulse' : 'bg-amber-500'}`} />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase text-neutral-400">Pristine Status</span>
                <span className="text-xs font-semibold text-neutral-900">
                  {cleanlinessLevel === 100
                    ? '✨ Hospital-Grade Sparkle'
                    : cleanlinessLevel > 60
                    ? '🌸 Deep Detailing Active'
                    : 'Dusty Ambient State'}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
