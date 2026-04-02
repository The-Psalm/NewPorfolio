import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Sphere, Ring } from '@react-three/drei'
import * as THREE from 'three'

// ─── Floating distorted sphere ────────────────────────────
function FloatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.12
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.18
  })

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 128, 128]}>
        <MeshDistortMaterial
          color="#763948"
          distort={0.45}
          speed={1.8}
          roughness={0.15}
          metalness={0.9}
          envMapIntensity={1.2}
        />
      </Sphere>
    </Float>
  )
}

// ─── Orbiting ring ────────────────────────────────────────
function OrbitRing() {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    ringRef.current.rotation.x = Math.PI / 2.8
    ringRef.current.rotation.z = clock.getElapsedTime() * 0.25
  })

  return (
    <Ring args={[1.55, 1.65, 128]}>
      <meshBasicMaterial
        color="#D6CCD0"
        opacity={0.18}
        transparent
        side={THREE.DoubleSide}
      />
    </Ring>
  )
}

// ─── Particle field ───────────────────────────────────────
function Particles({ count = 120 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 8
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4
  }

  useFrame(({ clock }) => {
    if (!points.current) return
    points.current.rotation.y = clock.getElapsedTime() * 0.04
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#D6CCD0"
        opacity={0.55}
        transparent
        sizeAttenuation
      />
    </points>
  )
}

// ─── Scene export ─────────────────────────────────────────
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]}   intensity={2.5} color="#D6CCD0" />
      <pointLight position={[-4, -2, -2]} intensity={1.2} color="#763948" />
      <pointLight position={[0, -4, 2]}   intensity={0.8} color="#46212B" />

      <FloatingMesh />
      <OrbitRing />
      <Particles />
    </Canvas>
  )
}