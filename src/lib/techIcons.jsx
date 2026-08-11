import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiExpress,
  SiMongodb, SiPhp, SiMysql, SiPostgresql, SiTailwindcss, SiBootstrap, SiGit,
  SiGithub, SiVite, SiNpm, SiVercel, SiSupabase, SiMui, SiRedux, SiNextdotjs,
  SiPython, SiFirebase, SiGraphql, SiDocker, SiJest, SiJquery, SiFigma,
} from 'react-icons/si';
import {
  FaBolt, FaRocket, FaCode, FaServer, FaDatabase, FaMobileAlt, FaPaintBrush,
  FaCube, FaCloud, FaLock, FaLayerGroup, FaWrench, FaAtom, FaPalette,
} from 'react-icons/fa';

export const TECH_ICONS = [
  { key: 'SiHtml5', label: 'HTML5', Icon: SiHtml5 },
  { key: 'SiCss', label: 'CSS3', Icon: SiCss },
  { key: 'SiJavascript', label: 'JavaScript', Icon: SiJavascript },
  { key: 'SiTypescript', label: 'TypeScript', Icon: SiTypescript },
  { key: 'SiReact', label: 'React', Icon: SiReact },
  { key: 'SiNodedotjs', label: 'Node.js', Icon: SiNodedotjs },
  { key: 'SiExpress', label: 'Express', Icon: SiExpress },
  { key: 'SiMongodb', label: 'MongoDB', Icon: SiMongodb },
  { key: 'SiPhp', label: 'PHP', Icon: SiPhp },
  { key: 'SiMysql', label: 'MySQL', Icon: SiMysql },
  { key: 'SiPostgresql', label: 'PostgreSQL', Icon: SiPostgresql },
  { key: 'SiTailwindcss', label: 'Tailwind CSS', Icon: SiTailwindcss },
  { key: 'SiBootstrap', label: 'Bootstrap', Icon: SiBootstrap },
  { key: 'SiGit', label: 'Git', Icon: SiGit },
  { key: 'SiGithub', label: 'GitHub', Icon: SiGithub },
  { key: 'SiVite', label: 'Vite', Icon: SiVite },
  { key: 'SiNpm', label: 'npm', Icon: SiNpm },
  { key: 'SiVercel', label: 'Vercel', Icon: SiVercel },
  { key: 'SiSupabase', label: 'Supabase', Icon: SiSupabase },
  { key: 'SiMui', label: 'Material UI', Icon: SiMui },
  { key: 'SiRedux', label: 'Redux', Icon: SiRedux },
  { key: 'SiNextdotjs', label: 'Next.js', Icon: SiNextdotjs },
  { key: 'SiPython', label: 'Python', Icon: SiPython },
  { key: 'SiFirebase', label: 'Firebase', Icon: SiFirebase },
  { key: 'SiGraphql', label: 'GraphQL', Icon: SiGraphql },
  { key: 'SiDocker', label: 'Docker', Icon: SiDocker },
  { key: 'SiJest', label: 'Jest', Icon: SiJest },
  { key: 'SiJquery', label: 'jQuery', Icon: SiJquery },
  { key: 'SiFigma', label: 'Figma', Icon: SiFigma },
  { key: 'FaBolt', label: 'Performance', Icon: FaBolt },
  { key: 'FaRocket', label: 'Launch', Icon: FaRocket },
  { key: 'FaCode', label: 'Code', Icon: FaCode },
  { key: 'FaServer', label: 'Server', Icon: FaServer },
  { key: 'FaDatabase', label: 'Database', Icon: FaDatabase },
  { key: 'FaMobileAlt', label: 'Mobile', Icon: FaMobileAlt },
  { key: 'FaPaintBrush', label: 'Design', Icon: FaPaintBrush },
  { key: 'FaPalette', label: 'Palette', Icon: FaPalette },
  { key: 'FaCube', label: '3D', Icon: FaCube },
  { key: 'FaCloud', label: 'Cloud', Icon: FaCloud },
  { key: 'FaLock', label: 'Security', Icon: FaLock },
  { key: 'FaLayerGroup', label: 'Layers', Icon: FaLayerGroup },
  { key: 'FaWrench', label: 'Tools', Icon: FaWrench },
  { key: 'FaAtom', label: 'Science', Icon: FaAtom },
];

const ICON_MAP = Object.fromEntries(TECH_ICONS.map(({ key, Icon }) => [key, Icon]));

export function getTechIcon(key) {
  if (!key) return null;
  const Icon = ICON_MAP[key];
  return Icon ? { Icon } : null;
}
