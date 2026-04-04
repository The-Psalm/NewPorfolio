import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Sphere, Ring } from '@react-three/drei'
import * as THREE from 'three'

// ─── Floating distorted sphere ────────────────────────────
function FloatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    // Subtle pulse to avoid a "robotic" constant rotation.
    const pulse = 1 + Math.sin(t * 0.6) * 0.08
    meshRef.current.rotation.x = t * 0.12 * pulse
    meshRef.current.rotation.y = t * 0.18 * pulse
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
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null)

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.x = Math.PI / 2.8
    ringRef.current.rotation.z = t * 0.25

    // Gentle opacity breathing so the background feels more alive.
    if (materialRef.current) {
      materialRef.current.opacity = 0.14 + Math.sin(t * 0.7) * 0.04
    }
  })

  return (
    <Ring args={[1.55, 1.65, 128]}>
      <meshBasicMaterial
        ref={materialRef}
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
    const t = clock.getElapsedTime()
    points.current.rotation.y = t * 0.04
    points.current.rotation.x = Math.sin(t * 0.18) * 0.07
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