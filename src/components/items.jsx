export let CubeItem = (props)=>{

    return <mesh castShadow {...props}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="indianred" />
  </mesh>
}
export let SphereItem = (props)=>{
    
    return <mesh castShadow {...props}>
    <sphereGeometry></sphereGeometry>
    <meshStandardMaterial color="indianred"></meshStandardMaterial>
  </mesh>
}