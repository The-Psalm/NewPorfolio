import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function WireframeIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.07
    meshRef.current.rotation.y = t * 0.11
  })

  const scale = viewport.width < 5 ? 1.6 : 2.4

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#C4A882"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </Float>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <WireframeIcosahedron />
    </Canvas>
  )
}