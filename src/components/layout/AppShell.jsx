import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import GrainOverlay from '../common/GrainOverlay';
import GlowOrb from '../common/GlowOrb';
import styles from './AppShell.module.css';

export default function AppShell() {
  return (
    <div className={styles.shell}>
      <GlowOrb color="rgba(58, 111, 160, 0.12)" size={400} top="-100px" right="-100px" />
      <GlowOrb color="rgba(199, 90, 58, 0.08)" size={350} bottom="100px" left="-80px" delay={5} />
      <GrainOverlay />

      <main className={styles.main}>
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
