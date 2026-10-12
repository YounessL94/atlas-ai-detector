'use client';
import { motion, useReducedMotion } from 'motion/react';
import { Fingerprint, ScanEye, ShieldCheck, Sparkles } from 'lucide-react';
export default function AISignalVisual({locale}:{locale:'en'|'fr'}) {
 const reduced=useReducedMotion();
 return <div className="ai-signal-visual" aria-label={locale==='fr'?'Visualisation des signaux IA':'AI signal visualization'}>
  <motion.div className="visual-orbit visual-orbit-one" animate={reduced?{}:{rotate:360}} transition={{duration:34,repeat:Infinity,ease:'linear'}} />
  <motion.div className="visual-orbit visual-orbit-two" animate={reduced?{}:{rotate:-360}} transition={{duration:45,repeat:Infinity,ease:'linear'}} />
  <motion.div className="visual-core" animate={reduced?{}:{scale:[1,1.07,1]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut'}}><ScanEye size={48} strokeWidth={1.3}/><span>ATLAS / SCAN</span></motion.div>
  <motion.div className="visual-chip visual-chip-one" initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.2}}><Fingerprint size={17}/>{locale==='fr'?'Analyse des signaux':'Signal analysis'}</motion.div>
  <motion.div className="visual-chip visual-chip-two" initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.4}}><ShieldCheck size={17}/>C2PA / PROVENANCE</motion.div>
  <motion.div className="visual-chip visual-chip-three" initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.6}}><Sparkles size={17}/>{locale==='fr'?'Résultats nuancés':'Evidence, not certainty'}</motion.div>
 </div>
}
