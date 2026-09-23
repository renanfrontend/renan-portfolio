"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from "@react-three/postprocessing";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import * as THREE from "three";

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uPulse;
uniform float uScroll;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
${noise}
void main(){
  float n = snoise(normal * 1.6 + uTime * 0.35);
  float n2 = snoise(normal * 4.0 - uTime * 0.6) * 0.25;
  float d = (n + n2) * (0.22 + uPulse * 0.25 + uScroll * 0.9);
  vDisp = d;
  vec3 pos = position + normal * d;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const coreFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
void main(){
  float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
  vec3 col = mix(uColorA, uColorB, smoothstep(-0.25, 0.3, vDisp));
  float bands = smoothstep(0.92, 1.0, sin(vDisp * 60.0 + uTime * 2.0) * 0.5 + 0.5);
  vec3 c = col * (0.08 + fres * 1.6) + bands * col * 0.35;
  gl_FragColor = vec4(c, 0.35 + fres * 0.65);
}`;

// Cena de instância única: uniforms e buffers vivem no módulo e são mutados no loop de render.
const coreUniforms = {
  uTime: { value: 0 },
  uPulse: { value: 0 },
  uScroll: { value: 0 },
  uColorA: { value: new THREE.Color("#22d3ee") },
  uColorB: { value: new THREE.Color("#8b5cf6") },
};

function Core({ progress }: { progress?: MotionValue<number> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    coreUniforms.uTime.value += delta;
    const scroll = progress?.get() ?? 0;
    coreUniforms.uScroll.value += (scroll - coreUniforms.uScroll.value) * 0.1;
    particleUniforms.uScroll.value = coreUniforms.uScroll.value;
    const { x, y } = state.pointer;
    const target = Math.min(1, Math.hypot(x, y));
    coreUniforms.uPulse.value += (target - coreUniforms.uPulse.value) * 0.04;
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12;
      mesh.current.rotation.x += (y * 0.4 - mesh.current.rotation.x) * 0.05;
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.06;
      wire.current.rotation.z += delta * 0.03;
    }
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.35, 64]} />
        <shaderMaterial
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          uniforms={coreUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={wire} scale={1.95}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

function Rings() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.children.forEach((c, i) => {
      c.rotation.z += delta * (0.08 + i * 0.05) * (i % 2 ? -1 : 1);
    });
  });
  return (
    <group ref={group} rotation={[1.15, 0.2, 0]}>
      {[2.6, 3.1, 3.7].map((r, i) => (
        <mesh key={r} rotation={[i * 0.25, i * 0.4, 0]}>
          <torusGeometry args={[r, 0.004, 8, 256]} />
          <meshBasicMaterial color={i === 1 ? "#8b5cf6" : "#22d3ee"} transparent opacity={0.35 - i * 0.08} />
        </mesh>
      ))}
    </group>
  );
}

const particleVertex = /* glsl */ `
uniform float uTime;
uniform vec2 uPointer;
uniform float uScroll;
attribute float aScale;
attribute float aSpeed;
varying float vAlpha;
void main(){
  vec3 p = position * (1.0 + uScroll * 1.4);
  float a = uTime * aSpeed * 0.15;
  float s = sin(a), c = cos(a);
  p.xz = mat2(c, -s, s, c) * p.xz;
  p.y += sin(uTime * aSpeed + position.x) * 0.15;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec2 screen = mv.xy / -mv.z;
  float d = distance(screen, uPointer * 0.8);
  mv.xy += normalize(screen - uPointer * 0.8 + 0.0001) * smoothstep(0.35, 0.0, d) * 0.6;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aScale * (26.0 / -mv.z);
  vAlpha = smoothstep(18.0, 3.0, -mv.z);
}`;

const particleFragment = /* glsl */ `
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(mix(vec3(0.55,0.36,0.96), vec3(0.13,0.83,0.93), a), a * vAlpha * 0.9);
}`;

const particleUniforms = { uTime: { value: 0 }, uScroll: { value: 0 }, uPointer: { value: new THREE.Vector2() } };
const aberration = new THREE.Vector2(0.0009, 0.0012);

function makeParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = 3 + Math.pow(Math.random(), 0.6) * 9;
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(p) * Math.cos(t);
    positions[i * 3 + 1] = r * Math.cos(p) * 0.55;
    positions[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
    scales[i] = 0.4 + Math.random() * 1.6;
    speeds[i] = 0.3 + Math.random();
  }
  return { positions, scales, speeds };
}

const particles = makeParticles(2200);

function Particles() {
  const { positions, scales, speeds } = particles;

  useFrame((state, delta) => {
    particleUniforms.uTime.value += delta;
    particleUniforms.uPointer.value.lerp(state.pointer, 0.08);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={particleUniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Desktop: núcleo à direita do texto. Mobile: menor, no canto superior direito, longe do parágrafo. */
function Anchor({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  const wide = viewport.aspect > 1.1;
  return (
    <group
      position={wide ? [viewport.width * 0.2, 0, 0] : [viewport.width * 0.3, viewport.height * 0.26, -1]}
      scale={wide ? 1 : 0.62}
    >
      {children}
    </group>
  );
}

function Rig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ active = true, progress }: { active?: boolean; progress?: MotionValue<number> }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <color attach="background" args={["#05060a"]} />
      <Rig />
      <Anchor>
        <Core progress={progress} />
        <Rings />
      </Anchor>
      <Particles />
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.12} luminanceSmoothing={0.35} />
        <ChromaticAberration offset={aberration} radialModulation={false} modulationOffset={0} />
        <Vignette eskil={false} offset={0.2} darkness={0.75} />
      </EffectComposer>
    </Canvas>
  );
}
