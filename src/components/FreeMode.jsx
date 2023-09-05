import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { MapControls, Environment } from '@react-three/drei'
import { TransformControls } from '@react-three/drei'
import { v4 as uuid } from 'uuid'
import { CubeItem ,SphereItem} from './items'

let array = [
  {object:'cube',position:[0,2,0]},{object:'cube',position:[2,0,0]},{object:'sphere',position:[0,1,2]}
]
let global = {}
export default function FreeMode() {
    let [ItemList,setItemList] = useState([])
    global.setItemList = setItemList
    global.ItemList = ItemList
  return(
    <>
    <ItemBoard></ItemBoard>
  <Canvas shadows camera={{ fov: 75, position: [0, 5, 20] }} eventSource={document.getElementById('root')} eventPrefix="client">
          <Environment preset='city'></Environment>
    <color attach={'background'} args={['goldenrod']} ></color>
            {
              ItemList.map(e=>{
                if(e.object === 'cube')
                return <CubeItem castShadow onPointerMissed={()=> global.setSnap(undefined)} name={`id-${e.id}`} onClick={()=> global.setSnap(`id-${e.id}`)} receiveShadow position={e.position}></CubeItem>
                else if(e.object === 'sphere')
                return <SphereItem castShadow onPointerMissed={()=> global.setSnap(undefined)} name={`id-${e.id}`} onClick={()=> global.setSnap(`id-${e.id}`)} receiveShadow position={e.position} ></SphereItem>
              })
            }
            <Setup></Setup>
  </Canvas>
  </>
)}
function ItemBoard (){
    return <div style={{position:'absolute',left:'5%',top:'10%',zIndex:100}}>
        <h1 style={{cursor:'pointer'}} onClick={()=>AddItem('cube')}>add Cube</h1>
        <h1 style={{cursor:'pointer'}} onClick={()=>AddItem('sphere')}>add Sphere</h1>
    </div>
}
function AddItem (item){
    let Item = {object:item,position:[Math.random()*5,1,Math.random()*5],id:uuid()}
    global.setItemList([...global.ItemList,Item])
}
let Setup = ()=>{
  let [snap,setSnap] = useState()
  global.snap = snap
  global.setSnap = setSnap
  return(
      <> 
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[1000, 1000]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
        <TransControls snap={snap}  showY={false}/>
        <Controls enable={snap?true:false} />
        <directionalLight castShadow position={[2, 5, -5]} shadow-mapSize={[1024, 1024]}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight>
        </>
  )
}
const TransControls = ({snap}) => {
  const { camera,scene } = useThree()
  const transcontrolsRef = useRef(null)    
  return (
    <>
    { snap && <TransformControls 
    size={0.8}
    onChange={()=>{
          let object = scene.getObjectByName(snap)
          console.log(snap,object)
          let objectscale = object.scale.y/4
          var minPan = new THREE.Vector3( - 10, 1, - 10 );
          var maxPan = new THREE.Vector3( 10, 10, 10 );
          var _v = new THREE.Vector3();
          object.position.clamp( minPan, maxPan );
    }} onClick={()=>{console.log('ds')}} object={scene.getObjectByName(snap)} ref={transcontrolsRef}  />}
    </>
    )
}
const Controls = ({enable}) => {
  const { camera } = useThree()
  const controlsRef = useRef()    

  useEffect(() => {
    var minPan = new THREE.Vector3( - 20, - 20, - 20 );
    var maxPan = new THREE.Vector3( 20, 20, 20 );
    var _v = new THREE.Vector3();
    
    controlsRef.current.addEventListener("change", function() {
        _v.copy(this.target);
        this.target.clamp(minPan, maxPan);
        _v.sub(this.target);
        camera.position.sub(_v);
    })
  }, [])

  return (
    <MapControls maxPolarAngle={Math.PI/2.2} minPolarAngle={1} enabled={!enable} ref={controlsRef} enableZoom={false} enableRotate={true} />
  )
}