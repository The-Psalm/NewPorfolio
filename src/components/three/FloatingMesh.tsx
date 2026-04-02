import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FloatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => new THREE.TorusKnotGeometry(1, 0.28, 120, 16), [])
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#763948',
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      }),
    [],
  )

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.12
    meshRef.current.rotation.y = t * 0.08
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.3
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[3, 0, -3]}
      scale={1.2}
    />
  )
}