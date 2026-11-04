import { ArrowRight, BarChart3, ChevronDown, Crown, Gift, Rocket, ShieldCheck, Sparkles, Wallet, Waves } from "lucide-react";
import { membershipTiers } from "@/features/membership/model/tiers";
import { previewQuests } from "@/features/airdrop-arena/model/quests";

const features = [
  { icon: Crown, title: "VIP Cards", description: "Unlock Silver, Gold and Black membership with verified token holdings.", href: "#memberships", detail: "UP TO 2× XP" },
  { icon: Gift, title: "Airdrop Arena", description: "Complete quests, earn XP and discover upcoming community rewards.", href: "#arena", detail: "SEASON 01" },
  { icon: Rocket, title: "Launchpad", description: "A space for discovering Solana community projects.", href: "#roadmap", detail: "COMING SOON" },
  { icon: BarChart3, title: "Your Dashboard", description: "Follow wallet holdings, membership eligibility and rewards.", href: "#roadmap", detail: "IN DEVELOPMENT" },
];

function WhaleMark({ size = 40 }: { size?: number }) {
  return <span className="whale-mark" style={{ width: size, height: size }} aria-hidden="true"><Waves size={size * 0.57} strokeWidth={2.5} /></span>;
}

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a href="#" className="brand"><WhaleMark /> <span>Whale<span className="brand-dot">.co</span></span></a>
          <nav aria-label="Main navigation" className="desktop-nav">
            <a href="#features">Explore</a><a href="#arena">Airdrop Arena</a><a href="#memberships">VIP Cards</a><a href="#roadmap">Launchpad</a><a href="#community">Community <ChevronDown size={14}/></a>
          </nav>
          <a href="#roadmap" className="wallet-button"><Wallet size={17} /> Wallet integration soon</a>
        </div>
      </header>

      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow"><span className="solana-glyph">≋</span> THE SOLANA COMMUNITY PLATFORM</span>
          <h1>Trade. Earn. Participate.<br /><span>Together on Solana.</span></h1>
          <p>Whale.co is a community-first home for Solana explorers. Track your membership, complete quests and discover new opportunities — all in one place.</p>
          <div className="hero-actions"><a href="#features" className="button-primary">Explore Features <ArrowRight size={19}/></a><a href="#memberships" className="button-outline">View VIP Cards</a></div>
          <div className="hero-note"><ShieldCheck size={16}/> Platform preview · No live wallet transactions or rewards</div>
        </div>
        <div className="hero-art" aria-label="Decorative bronze Whale.co emblem">
          <div className="art-glow" /><div className="art-orbit art-orbit-one"/><div className="art-orbit art-orbit-two"/>
          <div className="emblem"><div className="emblem-inner"><Waves size={106} strokeWidth={1.4}/><span>WHALE.CO</span></div></div>
          <div className="pedestal"><div className="pedestal-light"/></div>
        </div>
      </section>

      <section className="container"><div className="status-strip">
        <div><Sparkles/><span><small>PLATFORM STATUS</small><strong>Early access preview</strong></span></div>
        <div><Crown/><span><small>MEMBERSHIP TIERS</small><strong>Silver · Gold · Black</strong></span></div>
        <div><Gift/><span><small>ARENA REWARDS</small><strong>XP system planned</strong></span></div>
        <div><ShieldCheck/><span><small>BLOCKCHAIN</small><strong>Solana integration planned</strong></span></div>
      </div></section>

      <section id="features" className="container content-section">
        <div className="section-heading"><div><span className="section-kicker">EXPLORE THE ECOSYSTEM</span><h2>Everything in one place.</h2></div><p>Built around community, transparency and meaningful participation.</p></div>
        <div className="feature-grid">{features.map(({icon:Icon,title,description,href,detail})=><a className="feature-card" key={title} href={href}><div className="feature-top"><Icon size={30}/><span>{detail}</span></div><h3>{title}</h3><p>{description}</p><span className="feature-arrow"><ArrowRight size={18}/></span></a>)}</div>
      </section>

      <section id="memberships" className="container content-section">
        <div className="section-heading"><div><span className="section-kicker">MEMBERSHIP</span><h2>Find your tier.</h2></div><p>Proposed holding thresholds. Eligibility and approvals will be verified server-side.</p></div>
        <div className="tier-grid">{membershipTiers.map(t=><div className={`tier-card tier-${t.id}`} key={t.id}><div className="tier-top"><Crown size={25}/><span>{t.name.toUpperCase()}</span></div><strong>{t.mult}× <small>XP multiplier</small></strong><p>{t.label}</p><div className="tier-footer">Membership preview <ArrowRight size={16}/></div></div>)}</div>
      </section>

      <section id="arena" className="container content-section">
        <div className="section-heading"><div><span className="section-kicker">QUESTS & REWARDS</span><h2>Enter the Airdrop Arena.</h2></div><p>Complete community tasks to earn points. Token distributions are not active.</p></div>
        <div className="quest-panel">{previewQuests.map(q=><div className="quest" key={q.title}><div className="quest-icon"><Gift size={19}/></div><div><strong>{q.title}</strong><small>{q.category}</small></div><span>+{q.xp} XP</span></div>)}</div>
      </section>

      <section id="roadmap" className="container roadmap"><Rocket size={24}/><div><h2>We're building the next chapter.</h2><p>Wallet sign-in, verified token balances, VIP requests and the Airdrop Arena are on our roadmap. This page is a working design foundation, not a live trading service.</p></div></section>
      <footer id="community" className="footer"><div className="container footer-inner"><a href="#" className="brand"><WhaleMark size={30}/> Whale.co</a><span>© {new Date().getFullYear()} Whale.co · Built for Solana communities</span><a href="https://github.com/GotUrBack-Public/whale.co" target="_blank" rel="noreferrer">Open source ↗</a></div></footer>
    </main>
  );
}
