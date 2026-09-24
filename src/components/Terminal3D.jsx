import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Terminal3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    const isMobileInitial = window.innerWidth < 1024;
    const isPhoneInitial = window.innerWidth < 640;
    const dprCapInitial = isMobileInitial ? Math.min(window.devicePixelRatio, 1.6) : Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dprCapInitial);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      isPhoneInitial ? 42 : isMobileInitial ? 38 : 36,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, isPhoneInitial ? 6.4 : isMobileInitial ? 6.5 : 5.4);

    // Studio precision lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFF7EC, 2.1);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xDCE4EC, 1.3);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const softFillLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
    softFillLight.position.set(0, -3, 3);
    scene.add(softFillLight);

    // Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d');
    const shadowGrad = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 105);
    shadowGrad.addColorStop(0, 'rgba(18, 19, 22, 0.28)');
    shadowGrad.addColorStop(0.5, 'rgba(18, 19, 22, 0.10)');
    shadowGrad.addColorStop(1, 'rgba(18, 19, 22, 0)');
    shadowCtx.fillStyle = shadowGrad;
    shadowCtx.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 4.2),
      new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.6;
    scene.add(shadowMesh);

    // Physical Terminal Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x1A1C20,
      metalness: 0.25,
      roughness: 0.62
    });

    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x2A2D34,
      metalness: 0.55,
      roughness: 0.38
    });

    const darkControlMat = new THREE.MeshStandardMaterial({
      color: 0x22252B,
      metalness: 0.35,
      roughness: 0.55
    });

    const metalButtonMat = new THREE.MeshStandardMaterial({
      color: 0x383D47,
      metalness: 0.75,
      roughness: 0.3
    });

    const amberButtonMat = new THREE.MeshStandardMaterial({
      color: 0xC86414,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0x7E3507,
      emissiveIntensity: 0.35
    });


    const screenGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0A0D12,
      metalness: 0.08,
      roughness: 0.06,
      transmission: 0.18,
      thickness: 0.08,
      transparent: true,
      opacity: 0.28
    });

    // Terminal Root Mesh Hierarchy
    const terminalRoot = new THREE.Group();
    scene.add(terminalRoot);

    terminalRoot.position.set(isMobileInitial ? 0.0 : 1.35, 0.0, 0);
    terminalRoot.rotation.set(0.12, -0.28, 0.02);

    const chassisGeo = new THREE.BoxGeometry(1.44, 2.05, 0.18);
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    terminalRoot.add(chassisMesh);

    const frontBezelGeo = new THREE.BoxGeometry(1.39, 2.0, 0.03);
    const frontBezelMesh = new THREE.Mesh(frontBezelGeo, bezelMat);
    frontBezelMesh.position.z = 0.095;
    terminalRoot.add(frontBezelMesh);

    // Corner Fasteners
    const cornerOffsets = [
      [-0.61, 0.92],
      [0.61, 0.92],
      [-0.61, -0.92],
      [0.61, -0.92]
    ];
    cornerOffsets.forEach(([bx, by]) => {
      const boltMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, 0.04, 12),
        metalButtonMat
      );
      boltMesh.rotation.x = Math.PI / 2;
      boltMesh.position.set(bx, by, 0.105);
      terminalRoot.add(boltMesh);
    });

    // Bottom USB-C Port
    const usbcPort = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.045, 0.08),
      darkControlMat
    );
    usbcPort.position.set(0, -1.025, 0);
    terminalRoot.add(usbcPort);

    // Stationary Physical Controls Group
    const controlsGroup = new THREE.Group();
    controlsGroup.position.set(0, -0.58, 0.108);
    terminalRoot.add(controlsGroup);

    // D-Pad Cross
    const dpadGroup = new THREE.Group();
    dpadGroup.position.set(-0.36, 0, 0);
    controlsGroup.add(dpadGroup);

    const dpadH = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.10, 0.035), darkControlMat);
    const dpadV = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.32, 0.035), darkControlMat);
    dpadGroup.add(dpadH);
    dpadGroup.add(dpadV);

    const dpadCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.04, 16), bezelMat);
    dpadCenter.rotation.x = Math.PI / 2;
    dpadGroup.add(dpadCenter);

    // Two Stationary Action Buttons (One Brushed Steel, One Warm Amber)
    const btnB = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.035, 24), metalButtonMat);
    btnB.rotation.x = Math.PI / 2;
    btnB.position.set(0.24, -0.04, 0);
    controlsGroup.add(btnB);

    const btnA = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.035, 24), amberButtonMat);
    btnA.rotation.x = Math.PI / 2;
    btnA.position.set(0.44, 0.05, 0);
    controlsGroup.add(btnA);



    const screenWidth = 1.25;
    const screenHeight = 1.30;
    const screenCenterY = 0.22;

    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 1064;
    const screenCtx = screenCanvas.getContext('2d');

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    const screenDisplayMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      emissive: 0xFFFFFF,
      emissiveMap: screenTexture,
      emissiveIntensity: 0.82,
      roughness: 0.45,
      metalness: 0.05
    });

    const displayMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(screenWidth, screenHeight),
      screenDisplayMat
    );
    displayMesh.position.set(0, screenCenterY, 0.111);
    terminalRoot.add(displayMesh);

    const glassMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(screenWidth + 0.02, screenHeight + 0.02),
      screenGlassMat
    );
    glassMesh.position.set(0, screenCenterY, 0.118);
    terminalRoot.add(glassMesh);

    // Screen state tracking
    let blinkState = false;
    let transitionProgress = 1.0;
    let screenFlicker = 0.0;
    let lastSelectedProject = -1;

    const blinkInterval = setInterval(() => {
      blinkState = !blinkState;
    }, 520);

    function renderScreenFrame(delta = 0.016, elapsed = 0) {
      const activeSec = window.__portfolioActiveSection || 'intro';
      const activeProjIdx = window.__portfolioSelectedProject || 0;

      if (lastSelectedProject !== activeProjIdx) {
        lastSelectedProject = activeProjIdx;
        transitionProgress = 0.0;
        screenFlicker = 1.0;
      }

      // Handle CRT phosphor scan decay
      if (screenFlicker > 0) {
        screenFlicker = Math.max(0, screenFlicker - delta * 3.8);
        const flickerDip = Math.sin(elapsed * 45) * (screenFlicker * 0.12);
        screenDisplayMat.emissiveIntensity = 0.82 - (screenFlicker * 0.28) + flickerDip;
      } else {
        screenDisplayMat.emissiveIntensity = 0.82;
      }

      const w = screenCanvas.width;
      const h = screenCanvas.height;

      screenCtx.fillStyle = '#0D0F13';
      screenCtx.fillRect(0, 0, w, h);

      // Scanline grid
      screenCtx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      for (let y = 0; y < h; y += 4) {
        screenCtx.fillRect(0, y, w, 1);
      }

      // Top Status Header Bar
      screenCtx.fillStyle = '#14181F';
      screenCtx.fillRect(0, 0, w, 56);

      screenCtx.fillStyle = '#C86414';
      screenCtx.font = '700 22px "JetBrains Mono", monospace';
      screenCtx.fillText('MOHD FAIZAAN', 36, 38);

      screenCtx.fillStyle = '#737887';
      screenCtx.font = '600 20px "JetBrains Mono", monospace';
      screenCtx.fillText(`[${activeSec.toUpperCase()}]`, 820, 38);

      screenCtx.fillStyle = '#262B35';
      screenCtx.fillRect(0, 56, w, 2);

      // Animated amber sweep scanline
      if (transitionProgress < 1.0) {
        transitionProgress += delta * 2.8;
        const sweepY = Math.min(transitionProgress, 1.0) * h;
        screenCtx.fillStyle = 'rgba(200, 100, 20, 0.15)';
        screenCtx.fillRect(0, sweepY - 45, w, 45);
        screenCtx.fillStyle = '#C86414';
        screenCtx.fillRect(0, sweepY, w, 2.5);
      }

      if (activeSec === 'intro') {
        screenCtx.fillStyle = '#737887';
        screenCtx.font = '500 24px "JetBrains Mono", monospace';
        screenCtx.fillText('PORTFOLIO // OVERVIEW', 50, 160);

        screenCtx.fillStyle = '#FFFFFF';
        screenCtx.font = '800 78px "Space Grotesk", sans-serif';
        screenCtx.fillText('MOHD FAIZAAN', 50, 280);

        screenCtx.fillStyle = '#C86414';
        screenCtx.font = '700 32px "JetBrains Mono", monospace';
        screenCtx.fillText('SYSTEMS / SOFTWARE', 50, 360);

        screenCtx.fillStyle = '#141820';
        screenCtx.fillRect(50, 430, 924, 150);
        screenCtx.strokeStyle = '#252C39';
        screenCtx.lineWidth = 1.5;
        screenCtx.strokeRect(50, 430, 924, 150);

        screenCtx.fillStyle = '#C86414';
        screenCtx.font = '700 22px "JetBrains Mono", monospace';
        screenCtx.fillText('CORE FOCUS', 80, 475);

        screenCtx.fillStyle = '#FFFFFF';
        screenCtx.font = '600 22px "JetBrains Mono", monospace';
        screenCtx.fillText('Database Internals • Storage Engines • Distributed Systems', 80, 515);

        screenCtx.fillStyle = '#737887';
        screenCtx.font = '500 20px "JetBrains Mono", monospace';
        screenCtx.fillText('C++17 • Java • Spring Boot • Python • Flutter', 80, 550);

        screenCtx.fillStyle = '#737887';
        screenCtx.font = '500 22px "JetBrains Mono", monospace';
        screenCtx.fillText('3D INTERACTIVE TERMINAL', 50, 650);
        screenCtx.fillText('SCROLL OR DRAG TO EXPLORE', 50, 690);

      } else if (activeSec === 'engineering') {
        screenCtx.fillStyle = '#C86414';
        screenCtx.font = '700 28px "JetBrains Mono", monospace';
        screenCtx.fillText('TECHNICAL COMPETENCIES', 50, 140);

        const skillEntries = [
          { name: 'C++', tag: 'SYSTEMS PROGRAMMING' },
          { name: 'JAVA', tag: 'BACKEND SERVICES' },
          { name: 'PYTHON', tag: 'COMPUTER VISION & ML' },
          { name: 'REACT', tag: 'FRONTEND ARCHITECTURE' },
          { name: 'SPRING BOOT', tag: 'DISTRIBUTED SYSTEMS' },
          { name: 'DATABASE SYSTEMS', tag: 'STORAGE ENGINES & ACID' }
        ];

        skillEntries.forEach((entry, idx) => {
          const sy = 220 + idx * 85;
          screenCtx.fillStyle = '#141820';
          screenCtx.fillRect(50, sy - 40, 924, 62);
          screenCtx.strokeStyle = '#252C39';
          screenCtx.lineWidth = 1.5;
          screenCtx.strokeRect(50, sy - 40, 924, 62);

          screenCtx.fillStyle = '#C86414';
          screenCtx.font = '700 26px "JetBrains Mono", monospace';
          screenCtx.fillText('>', 80, sy);

          screenCtx.fillStyle = '#FFFFFF';
          screenCtx.font = '700 26px "JetBrains Mono", monospace';
          screenCtx.fillText(entry.name, 130, sy);

          screenCtx.fillStyle = '#737887';
          screenCtx.font = '600 18px "JetBrains Mono", monospace';
          screenCtx.fillText(entry.tag, 620, sy);
        });

      } else if (activeSec === 'projects') {
        if (activeProjIdx === 0) {
          // EmberDB
          screenCtx.fillStyle = '#C86414';
          screenCtx.font = '700 28px "JetBrains Mono", monospace';
          screenCtx.fillText('PROJECT // EMBERDB', 50, 130);

          screenCtx.fillStyle = '#737887';
          screenCtx.font = '600 20px "JetBrains Mono", monospace';
          screenCtx.fillText('RELATIONAL STORAGE ENGINE', 50, 170);

          screenCtx.fillStyle = '#131720';
          screenCtx.fillRect(50, 205, 924, 205);
          screenCtx.strokeStyle = '#252C39';
          screenCtx.lineWidth = 1.5;
          screenCtx.strokeRect(50, 205, 924, 205);

          ['C++17 NATIVE', 'LRU BUFFER POOL', 'B+ TREE INDEX', 'WAL RECOVERY'].forEach((spec, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const sx = 80 + col * 460;
            const sy = 260 + row * 85;
            screenCtx.fillStyle = '#C86414';
            screenCtx.font = '700 24px "JetBrains Mono", monospace';
            screenCtx.fillText('●', sx, sy);
            screenCtx.fillStyle = '#FFFFFF';
            screenCtx.font = '700 24px "JetBrains Mono", monospace';
            screenCtx.fillText(spec, sx + 30, sy);
          });

          screenCtx.fillStyle = '#C86414';
          screenCtx.font = '700 22px "JetBrains Mono", monospace';
          screenCtx.fillText('ARCHITECTURE', 50, 465);

          screenCtx.fillStyle = '#12151B';
          screenCtx.fillRect(50, 485, 924, 290);
          screenCtx.strokeStyle = '#252B36';
          screenCtx.lineWidth = 1.5;
          screenCtx.strokeRect(50, 485, 924, 290);

          const archLayers = [
            { name: 'SQL PARSER', detail: 'Recursive-Descent AST' },
            { name: 'QUERY EXECUTION', detail: 'Volcano Iterator Model' },
            { name: 'BUFFER POOL', detail: 'Clock / LRU Frame Cache' },
            { name: 'B+ TREE', detail: 'Slotted Page Disk Index' },
            { name: 'DISK STORAGE', detail: '4096-Byte Hardware Blocks' },
            { name: 'WAL', detail: 'ARIES Protocol Crash Durability' }
          ];
          archLayers.forEach((layer, li) => {
            const ly = 535 + li * 40;
            screenCtx.fillStyle = '#10B981';
            screenCtx.font = '700 20px "JetBrains Mono", monospace';
            screenCtx.fillText('->', 80, ly);
            screenCtx.fillStyle = '#FFFFFF';
            screenCtx.font = '700 20px "JetBrains Mono", monospace';
            screenCtx.fillText(layer.name, 130, ly);
            screenCtx.fillStyle = '#737887';
            screenCtx.font = '500 18px "JetBrains Mono", monospace';
            screenCtx.fillText(layer.detail, 480, ly);
          });

        } else if (activeProjIdx === 1) {
          // Mini UPI
          screenCtx.fillStyle = '#C86414';
          screenCtx.font = '700 28px "JetBrains Mono", monospace';
          screenCtx.fillText('PROJECT // MINI UPI', 50, 130);

          screenCtx.fillStyle = '#737887';
          screenCtx.font = '600 20px "JetBrains Mono", monospace';
          screenCtx.fillText('DISTRIBUTED PAYMENT SYSTEM', 50, 170);

          screenCtx.fillStyle = '#131720';
          screenCtx.fillRect(50, 205, 924, 205);
          screenCtx.strokeStyle = '#252C39';
          screenCtx.lineWidth = 1.5;
          screenCtx.strokeRect(50, 205, 924, 205);

          ['SPRING BOOT', 'MYSQL', 'DOUBLE-ENTRY', 'IDEMPOTENCY'].forEach((spec, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const sx = 80 + col * 460;
            const sy = 260 + row * 85;
            screenCtx.fillStyle = '#C86414';
            screenCtx.font = '700 24px "JetBrains Mono", monospace';
            screenCtx.fillText('●', sx, sy);
            screenCtx.fillStyle = '#FFFFFF';
            screenCtx.font = '700 24px "JetBrains Mono", monospace';
            screenCtx.fillText(spec, sx + 30, sy);
          });

          screenCtx.fillStyle = '#C86414';
          screenCtx.font = '700 22px "JetBrains Mono", monospace';
          screenCtx.fillText('TRANSACTION MODEL', 50, 465);

          screenCtx.fillStyle = '#12151B';
          screenCtx.fillRect(50, 485, 924, 290);
          screenCtx.strokeStyle = '#252B36';
          screenCtx.lineWidth = 1.5;
          screenCtx.strokeRect(50, 485, 924, 290);

          const upiFlow = [
            { step: '01', name: 'PAYMENT REQUEST', desc: 'Idempotent Ingestion' },
            { step: '02', name: 'BANK ROUTING', desc: 'Inter-Bank Clearance' },
            { step: '03', name: 'BALANCE MUTATION', desc: 'Two-Phase Concurrency Lock' },
            { step: '04', name: 'LEDGER RECORD', desc: 'Double-Entry Accounting' }
          ];
          upiFlow.forEach((item, si) => {
            const sy = 550 + si * 55;
            screenCtx.fillStyle = '#C86414';
            screenCtx.font = '700 22px "JetBrains Mono", monospace';
            screenCtx.fillText(item.step, 80, sy);
            screenCtx.fillStyle = '#FFFFFF';
            screenCtx.font = '700 22px "JetBrains Mono", monospace';
            screenCtx.fillText(item.name, 140, sy);
            screenCtx.fillStyle = '#737887';
            screenCtx.font = '500 18px "JetBrains Mono", monospace';
            screenCtx.fillText(item.desc, 560, sy);
          });

        } else if (activeProjIdx === 2) {
          // Fitness Tracker
          screenCtx.fillStyle = '#C86414';
          screenCtx.font = '700 28px "JetBrains Mono", monospace';
          screenCtx.fillText('PROJECT // FITNESS TRACKER', 50, 130);

          screenCtx.fillStyle = '#737887';
          screenCtx.font = '600 20px "JetBrains Mono", monospace';
          screenCtx.fillText('MOBILE / HEALTH & FITNESS', 50, 170);

          screenCtx.fillStyle = '#131720';
          screenCtx.fillRect(50, 205, 924, 205);
          screenCtx.strokeStyle = '#252C39';
          screenCtx.lineWidth = 1.5;
          screenCtx.strokeRect(50, 205, 924, 205);

          ['FLUTTER', 'DART', 'HIVE DB', 'MOTION TRACKING'].forEach((spec, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const sx = 80 + col * 460;
            const sy = 260 + row * 85;
            screenCtx.fillStyle = '#C86414';
            screenCtx.font = '700 24px "JetBrains Mono", monospace';
            screenCtx.fillText('●', sx, sy);
            screenCtx.fillStyle = '#FFFFFF';
            screenCtx.font = '700 24px "JetBrains Mono", monospace';
            screenCtx.fillText(spec, sx + 30, sy);
          });

          screenCtx.fillStyle = '#C86414';
          screenCtx.font = '700 22px "JetBrains Mono", monospace';
          screenCtx.fillText('APPLICATION MODULES', 50, 465);

          screenCtx.fillStyle = '#12151B';
          screenCtx.fillRect(50, 485, 924, 290);
          screenCtx.strokeStyle = '#252B36';
          screenCtx.lineWidth = 1.5;
          screenCtx.strokeRect(50, 485, 924, 290);

          const fitModules = [
            { id: '01', name: 'STEP TRACKING', desc: 'Pedometer & Accelerometer' },
            { id: '02', name: 'LOCAL STORAGE', desc: 'Hive DB Offline Persistence' },
            { id: '03', name: 'SIGNAL PROCESSING', desc: 'Moving Average Smoothing' },
            { id: '04', name: 'HEALTH INSIGHTS', desc: 'Activity & Trend Analytics' }
          ];
          fitModules.forEach((mod, mi) => {
            const my = 550 + mi * 55;
            screenCtx.fillStyle = '#C86414';
            screenCtx.font = '700 22px "JetBrains Mono", monospace';
            screenCtx.fillText(mod.id, 80, my);
            screenCtx.fillStyle = '#FFFFFF';
            screenCtx.font = '700 22px "JetBrains Mono", monospace';
            screenCtx.fillText(mod.name, 140, my);
            screenCtx.fillStyle = '#737887';
            screenCtx.font = '500 18px "JetBrains Mono", monospace';
            screenCtx.fillText(mod.desc, 520, my);
          });

        } else if (activeProjIdx === 3) {
          // ISL Translator
          screenCtx.fillStyle = '#C86414';
          screenCtx.font = '700 28px "JetBrains Mono", monospace';
          screenCtx.fillText('PROJECT // ISL TRANSLATOR', 50, 130);

          screenCtx.fillStyle = '#737887';
          screenCtx.font = '600 20px "JetBrains Mono", monospace';
          screenCtx.fillText('COMPUTER VISION / MACHINE LEARNING', 50, 170);

          screenCtx.fillStyle = '#131720';
          screenCtx.fillRect(50, 205, 924, 205);
          screenCtx.strokeStyle = '#252C39';
          screenCtx.lineWidth = 1.5;
          screenCtx.strokeRect(50, 205, 924, 205);

          ['PYTHON', 'TENSORFLOW', 'MEDIAPIPE', 'OPENCV'].forEach((spec, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const sx = 80 + col * 460;
            const sy = 260 + row * 85;
            screenCtx.fillStyle = '#C86414';
            screenCtx.font = '700 24px "JetBrains Mono", monospace';
            screenCtx.fillText('●', sx, sy);
            screenCtx.fillStyle = '#FFFFFF';
            screenCtx.font = '700 24px "JetBrains Mono", monospace';
            screenCtx.fillText(spec, sx + 30, sy);
          });

          screenCtx.fillStyle = '#C86414';
          screenCtx.font = '700 22px "JetBrains Mono", monospace';
          screenCtx.fillText('PROCESSING PIPELINE', 50, 465);

          screenCtx.fillStyle = '#12151B';
          screenCtx.fillRect(50, 485, 924, 290);
          screenCtx.strokeStyle = '#252B36';
          screenCtx.lineWidth = 1.5;
          screenCtx.strokeRect(50, 485, 924, 290);

          const islPipeline = [
            { step: '01', name: 'FRAME INGESTION', desc: 'OpenCV Video Capture' },
            { step: '02', name: 'LANDMARK TRACKING', desc: 'MediaPipe 21-Point 3D Joints' },
            { step: '03', name: 'SEQUENCE BUFFER', desc: 'Temporal Feature Vectorization' },
            { step: '04', name: 'CLASSIFICATION', desc: 'TensorFlow Gesture Model' }
          ];
          islPipeline.forEach((item, ni) => {
            const ny = 550 + ni * 55;
            screenCtx.fillStyle = '#C86414';
            screenCtx.font = '700 22px "JetBrains Mono", monospace';
            screenCtx.fillText(item.step, 80, ny);
            screenCtx.fillStyle = '#FFFFFF';
            screenCtx.font = '700 22px "JetBrains Mono", monospace';
            screenCtx.fillText(item.name, 140, ny);
            screenCtx.fillStyle = '#737887';
            screenCtx.font = '500 18px "JetBrains Mono", monospace';
            screenCtx.fillText(item.desc, 520, ny);
          });
        }

      } else if (activeSec === 'journey') {
        screenCtx.fillStyle = '#C86414';
        screenCtx.font = '700 28px "JetBrains Mono", monospace';
        screenCtx.fillText('JOURNEY & TRAJECTORY', 50, 140);

        const journeyEntries = [
          { period: '2026 — PRESENT', title: 'SYSTEMS & ARCHITECTURE', desc: 'Low-Level Storage Engines & Database Internals' },
          { period: '2024 — 2026', title: 'DISTRIBUTED BACKENDS & APPS', desc: 'Payment Systems & Offline-First Mobile' },
          { period: '2022 — 2024', title: 'CS FOUNDATIONS & VISION', desc: 'Data Structures, Operating Systems & Vision' }
        ];

        journeyEntries.forEach((log, idx) => {
          const ly = 230 + idx * 170;
          screenCtx.fillStyle = '#141820';
          screenCtx.fillRect(50, ly - 45, 924, 105);
          screenCtx.strokeStyle = '#252C39';
          screenCtx.lineWidth = 1.5;
          screenCtx.strokeRect(50, ly - 45, 924, 105);

          screenCtx.fillStyle = '#C86414';
          screenCtx.font = '700 24px "JetBrains Mono", monospace';
          screenCtx.fillText(log.period, 80, ly + 6);

          screenCtx.fillStyle = '#FFFFFF';
          screenCtx.font = '600 22px "JetBrains Mono", monospace';
          screenCtx.fillText(log.title, 80, ly + 42);

          screenCtx.fillStyle = '#737887';
          screenCtx.font = '500 18px "JetBrains Mono", monospace';
          screenCtx.fillText(log.desc, 80, ly + 82);
        });

      } else if (activeSec === 'contact') {
        screenCtx.fillStyle = '#C86414';
        screenCtx.font = '700 26px "JetBrains Mono", monospace';
        screenCtx.fillText('DIRECT CONTACT', 50, 160);

        screenCtx.fillStyle = '#FFFFFF';
        screenCtx.font = '800 64px "Space Grotesk", sans-serif';
        screenCtx.fillText("LET'S BUILD", 50, 280);
        screenCtx.fillText('SOMETHING.', 50, 360);

        screenCtx.fillStyle = '#10B981';
        screenCtx.font = '600 22px "JetBrains Mono", monospace';
        screenCtx.fillText('OPEN TO OPPORTUNITIES', 50, 460);

        screenCtx.fillStyle = '#737887';
        screenCtx.font = '500 22px "JetBrains Mono", monospace';
        screenCtx.fillText('mohdfaizaan35@gmail.com', 50, 520);
        screenCtx.fillText('github.com/faizaan35', 50, 560);
      }

      screenTexture.needsUpdate = true;
    }

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let manualRotY = 0;
    let manualRotX = 0;

    const onMouseDown = (e) => {
      if (e.target.closest('button, a, input, .depth-carousel-container, article, nav')) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      manualRotY += dx * 0.005;
      manualRotX += dy * 0.005;
      manualRotX = Math.max(-0.45, Math.min(0.45, manualRotX));
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Mobile Smart Touch Handling: Distinguishes between natural page scrolling and deliberate terminal rotation
    let touchStartX = 0;
    let touchStartY = 0;
    let isTouchRotating = false;
    let touchDetermined = false;

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      if (e.target.closest('button, a, input, .depth-carousel-container, article, nav')) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isTouchRotating = false;
      touchDetermined = false;
    };

    const onTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const dx = currentX - touchStartX;
      const dy = currentY - touchStartY;

      if (!touchDetermined) {
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        if (absDx > 7 || absDy > 7) {
          touchDetermined = true;
          // Predominantly horizontal swipe: rotate the 3D terminal
          if (absDx > absDy * 1.25) {
            isTouchRotating = true;
            touchStartX = currentX;
            touchStartY = currentY;
          } else {
            // Predominantly vertical swipe: let natural page scroll happen without terminal fighting
            isTouchRotating = false;
          }
        }
      }

      if (isTouchRotating) {
        manualRotY += dx * 0.007;
        manualRotX += dy * 0.003;
        manualRotX = Math.max(-0.35, Math.min(0.35, manualRotX));
        touchStartX = currentX;
        touchStartY = currentY;
      }
    };

    const onTouchEnd = () => {
      isTouchRotating = false;
      touchDetermined = false;
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const clock = new THREE.Clock();
    let currentScale = 1.0;
    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const t = clock.getElapsedTime();

      const width = window.innerWidth;
      const height = window.innerHeight;
      const isDesktop = width >= 1024;
      const isMobile = !isDesktop;
      const isPhone = width < 640;
      const isTablet = isMobile && !isPhone;
      const isLandscapeMobile = isMobile && width > height && height < 520;

      renderScreenFrame(delta, t);

      // Subtle micro-breathing idle motion (never conflicts with section shifts)
      const idleY = Math.sin(t * 1.1) * 0.016;
      const idleRotZ = Math.sin(t * 0.6) * 0.009;

      const curSec = window.__portfolioActiveSection || 'intro';

      let targetPosX = 1.35;
      let targetPosY = 0.0;
      let targetPosZ = 0.0;
      let targetRotX = 0.12;
      let targetRotY = -0.28;
      let targetRotZ = 0.02;
      let targetScale = 1.0;
      let targetCamX = 0.0;
      let targetCamY = 0.0;
      let targetCamZ = 5.4;

      if (isDesktop) {
        // Desktop Baseline Layout - 100% Intact
        if (curSec === 'intro') {
          targetPosX = 1.35;
          targetPosY = 0.0;
          targetPosZ = 0.0;
          targetRotX = 0.12;
          targetRotY = -0.28;
          targetRotZ = 0.02;
          targetScale = 1.0;
          targetCamX = 0.0;
          targetCamZ = 5.4;
        } else if (curSec === 'engineering') {
          targetPosX = 1.80;
          targetPosY = 0.10;
          targetPosZ = -0.15;
          targetRotX = 0.19;
          targetRotY = -0.11;
          targetRotZ = 0.01;
          targetScale = 1.03;
          targetCamX = 0.12;
          targetCamZ = 4.95;
        } else if (curSec === 'projects') {
          targetPosX = 2.05;
          targetPosY = 0.05;
          targetPosZ = -0.20;
          targetRotX = 0.07;
          targetRotY = -0.29;
          targetRotZ = 0.015;
          targetScale = 1.05;
          targetCamX = 0.18;
          targetCamZ = 5.1;
        } else if (curSec === 'journey') {
          targetPosX = 1.55;
          targetPosY = -0.25;
          targetPosZ = 0.0;
          targetRotX = 0.08;
          targetRotY = -0.18;
          targetRotZ = 0.01;
          targetScale = 1.0;
          targetCamX = 0.05;
          targetCamZ = 5.35;
        } else if (curSec === 'contact') {
          targetPosX = 1.25;
          targetPosY = 0.0;
          targetPosZ = 0.0;
          targetRotX = 0.12;
          targetRotY = -0.26;
          targetRotZ = 0.02;
          targetScale = 1.0;
          targetCamX = 0.0;
          targetCamZ = 5.4;
        }
      } else {
        // Mobile & Tablet Layout - Intentionally Framed in Dedicated Section Stages
        targetPosX = 0.0;
        targetPosZ = 0.0;
        targetCamX = 0.0;
        targetCamY = 0.0;

        if (isLandscapeMobile) {
          targetScale = 0.52;
          targetCamZ = 6.2;
          targetPosY = 0.0;
          targetRotX = 0.05;
          targetRotY = -0.05;
          targetRotZ = 0.0;
        } else if (isTablet) {
          // Portrait Tablet (640px to 1023px)
          targetScale = 0.68;
          targetCamZ = 6.5;
          targetRotX = 0.08;
          targetRotY = -0.06;
          targetRotZ = 0.0;

          if (curSec === 'intro') {
            targetPosY = -0.42;
          } else if (curSec === 'engineering') {
            targetPosY = 0.06;
          } else if (curSec === 'projects') {
            targetPosY = 0.06;
          } else if (curSec === 'journey') {
            targetPosY = 0.06;
          } else if (curSec === 'contact') {
            targetPosY = -0.38;
          }
        } else {
          // Portrait Phone (< 640px)
          if (window.__mobileScrollProgress !== undefined) {
            const p = window.__mobileScrollProgress;
            targetPosX = 0.0;
            targetPosZ = 0.0;
            targetCamX = 0.0;
            targetCamY = 0.0;

            if (p <= 0.15) {
              // Stage 1: Hero Intro framing
              targetScale = 0.66;
              targetPosY = -0.32;
              targetCamZ = 6.4;
              targetRotX = 0.08;
              targetRotY = -0.06;
              targetRotZ = 0.0;
            } else if (p <= 0.32) {
              // Stage 2: Smooth Terminal Takeover Transition
              const t = (p - 0.15) / (0.32 - 0.15);
              const easeT = t * t * (3 - 2 * t);
              targetScale = 0.66 + easeT * (1.02 - 0.66);
              targetPosY = -0.32 + easeT * (0.02 - -0.32);
              targetCamZ = 6.4 + easeT * (4.38 - 6.4);
              targetRotX = 0.08 + easeT * (0.04 - 0.08);
              targetRotY = -0.06 + easeT * (-0.02 - -0.06);
              targetRotZ = 0.0;
            } else if (p <= 0.48) {
              // Stage 3: Engineering Fullscreen Terminal
              targetScale = 1.02;
              targetPosY = 0.02;
              targetCamZ = 4.38;
              targetRotX = 0.04;
              targetRotY = -0.02;
              targetRotZ = 0.0;
            } else if (p <= 0.54) {
              // Transition from Engineering to Projects
              const t = (p - 0.48) / (0.54 - 0.48);
              const easeT = t * t * (3 - 2 * t);
              targetScale = 1.02 + easeT * (1.04 - 1.02);
              targetPosY = 0.02 + easeT * (0.03 - 0.02);
              targetCamZ = 4.38 + easeT * (4.35 - 4.38);
              targetRotX = 0.04;
              targetRotY = -0.02 + easeT * (-0.07 - -0.02);
              targetRotZ = 0.0;
            } else if (p <= 0.72) {
              // Stage 4: Projects Fullscreen Terminal
              targetScale = 1.04;
              targetPosY = 0.03;
              targetCamZ = 4.35;
              targetRotX = 0.04;
              targetRotY = -0.07;
              targetRotZ = 0.0;
            } else if (p <= 0.88) {
              // Stage 5: Journey Fullscreen Terminal
              targetScale = 1.01;
              targetPosY = 0.02;
              targetCamZ = 4.40;
              targetRotX = 0.05;
              targetRotY = 0.04;
              targetRotZ = 0.0;
            } else {
              // Stage 6: Contact & Release down to frame contact cards
              const t = Math.min(1.0, (p - 0.88) / (1.0 - 0.88));
              const easeT = t * t * (3 - 2 * t);
              targetScale = 1.01 - easeT * (1.01 - 0.72);
              targetPosY = 0.02 - easeT * (0.02 - -0.32);
              targetCamZ = 4.40 + easeT * (5.85 - 4.40);
              targetRotX = 0.05 + easeT * (0.08 - 0.05);
              targetRotY = 0.04 - easeT * (0.04 - -0.05);
              targetRotZ = 0.0;
            }
          } else {
            // Portrait Phone Fallback (when not using scrubbed progress)
            targetScale = 0.66;
            targetCamZ = 6.4;
            targetRotX = 0.08;
            targetRotY = -0.06;
            targetRotZ = 0.0;

            if (curSec === 'intro') {
              targetPosY = -0.32;
            } else if (curSec === 'engineering') {
              targetPosY = 0.08;
            } else if (curSec === 'projects') {
              targetPosY = 0.08;
            } else if (curSec === 'journey') {
              targetPosY = 0.08;
            } else if (curSec === 'contact') {
              targetPosY = -0.32;
            }
          }
        }
      }

      // Exponential decay smoothing for 600-900ms smooth settle
      const dampRate = 4.2;
      const rotDampRate = 4.0;
      const camDampRate = 3.6;

      terminalRoot.position.x = THREE.MathUtils.damp(terminalRoot.position.x, targetPosX, dampRate, delta);
      terminalRoot.position.y = THREE.MathUtils.damp(terminalRoot.position.y, targetPosY + idleY, dampRate, delta);
      terminalRoot.position.z = THREE.MathUtils.damp(terminalRoot.position.z, targetPosZ, dampRate, delta);

      terminalRoot.rotation.x = THREE.MathUtils.damp(terminalRoot.rotation.x, targetRotX + manualRotX, rotDampRate, delta);
      terminalRoot.rotation.y = THREE.MathUtils.damp(terminalRoot.rotation.y, targetRotY + manualRotY, rotDampRate, delta);
      terminalRoot.rotation.z = THREE.MathUtils.damp(terminalRoot.rotation.z, targetRotZ + idleRotZ, rotDampRate, delta);

      currentScale = THREE.MathUtils.damp(currentScale, targetScale, dampRate, delta);
      terminalRoot.scale.set(currentScale, currentScale, currentScale);

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, camDampRate, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, camDampRate, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, camDampRate, delta);
      camera.lookAt(targetCamX * 0.4, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isDesktop = width >= 1024;
      const isLandscapeMobile = !isDesktop && width > height && height < 520;
      const isPhone = width < 640;

      camera.aspect = width / height;
      if (isDesktop) {
        camera.fov = 36;
      } else if (isLandscapeMobile) {
        camera.fov = 34;
      } else if (isPhone) {
        camera.fov = 42;
      } else {
        camera.fov = 38;
      }
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      const dprCap = isDesktop ? Math.min(window.devicePixelRatio, 2) : Math.min(window.devicePixelRatio, 1.6);
      renderer.setPixelRatio(dprCap);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(blinkInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, []);

  return (
    <div id="canvas-container" className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} id="webgl-canvas" className="w-full h-full block" />
    </div>
  );
}
