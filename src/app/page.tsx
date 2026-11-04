"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Crown, Gift, Layers3, Menu, Rocket, ShieldCheck, Wallet, X } from "lucide-react";
import { getMembershipPreview, membershipTiers } from "@/features/membership/model/tiers";
import { previewQuests } from "@/features/airdrop-arena/model/quests";

const links = [["Explore", "features"], ["VIP Cards", "memberships"], ["Airdrop Arena", "arena"], ["Launchpad", "launchpad"]] as const;
const categories = ["All quests", "Getting started", "Community", "Education"];
const questDetails: Record<string, string> = {
  "Getting started": "Wallet sign-in is being built. When available, you will be able to connect a supported Solana wallet and verify ownership with a signed message. No wallet connection is requested in this preview.",
  Community: "Your community profile will bring your membership and quest progress together. Profiles and saved progress are not available yet.",
  Education: "Keep your recovery phrase private. Check the website address before connecting a wallet, review every signature request, and never send funds to unlock a reward. This preview does not ask you to sign or pay anything.",
};
const faqs = [
  ["What is Whale.co?", "Whale.co is a Solana community platform in development, bringing together membership tiers, community quests and project discovery. You are exploring the interactive design preview."],
  ["Can I connect my wallet or claim rewards?", "Not yet. Wallet authentication, verified balances and reward distribution are on the roadmap. This preview cannot sign transactions, receive deposits or distribute tokens."],
  ["How will VIP membership work?", "The proposed tiers are Silver (free), Gold (€500 in eligible token holdings) and Black (€2,500). Proposed XP multipliers are 1×, 1.5× and 2×. Eligible tokens, valuation rules and final requirements will be published before launch."],
  ["Is the membership explorer checking my balance?", "No. It only compares the value you enter with the proposed thresholds. It does not connect to a wallet, verify eligibility or save your input."],
];

function Brand() {
  return <a href="#top" className="brand" aria-label="Whale.co home"><span className="brand-art"><Image src="/assets/optimized/whale-logo.webp" alt="" width={90} height={51} /></span><span>Whale<span className="brand-dot">.co</span></span></a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("All quests");
  const [holding, setHolding] = useState("");
  const walletDialog = useRef<HTMLDialogElement>(null);
  const tier = getMembershipPreview(holding);
  const quests = previewQuests.filter(q => category === "All quests" || q.category === category);

  return <div id="top" className="site-shell">
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header"><div className="container header-inner">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <div className="header-actions"><button className="wallet-button" onClick={() => walletDialog.current?.showModal()}><Wallet size={16}/><span>Wallet preview</span></button><button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </div>{menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links.map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={16}/></a>)}</nav>}</header>

    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <Image className="hero-image" src="/assets/optimized/hero-background.webp" alt="Bronze whale coin on a softly illuminated landscape" fill priority sizes="100vw" />
        <div className="hero-shade"/>
        <div className="container hero-content"><div className="hero-copy">
          <span className="eyebrow"><span className="status-dot"/> BUILT AROUND YOU. BUILT ON SOLANA.</span>
          <h1 id="hero-title">A bigger world.<br/><span>Your next wave.</span></h1>
          <p>A home for the curious. A community for the ambitious. Discover your membership, explore quests and find what’s next on Solana.</p>
          <div className="hero-actions"><a href="#memberships" className="button-primary">Explore memberships <ArrowUpRight size={18}/></a><a href="#arena" className="button-ghost">Discover the Arena <ArrowRight size={17}/></a></div>
          <div className="hero-note"><ShieldCheck size={15}/> Early preview · Wallets and rewards are not live</div>
        </div><div className="hero-caption"><span>01 / THE WHALE ECOSYSTEM</span><a href="#features" aria-label="Explore the ecosystem"><ArrowDown size={19}/></a></div></div>
      </section>

      <div className="ecosystem-bar"><div className="container ecosystem-inner"><span>A COMMUNITY. <strong>MORE POSSIBILITIES.</strong></span><span><Crown size={18}/> Three VIP tiers</span><span><Gift size={18}/> Community quests</span><span><Layers3 size={18}/> Built for Solana</span></div></div>

      <section id="features" className="container content-section"><span id="ecosystem"/>
        <div className="section-heading"><div><span className="section-kicker">01 — THE ECOSYSTEM</span><h2>Find your place.<br/>Make your next move.</h2></div><p>One connected experience.<br/>Designed for every stage of your journey.</p></div>
        <div className="feature-grid">
          {[{Icon:Crown,title:"Make it yours.",text:"Three membership tiers. A new way to belong.",href:"memberships",tag:"VIP MEMBERSHIPS"},{Icon:Gift,title:"Stay curious.",text:"Explore community tasks and the planned XP system.",href:"arena",tag:"AIRDROP ARENA"},{Icon:Rocket,title:"Look ahead.",text:"Discover the next chapter of the Solana ecosystem.",href:"launchpad",tag:"LAUNCHPAD · PLANNED"}].map(({Icon,title,text,href,tag}) => <a className="feature-card" href={`#${href}`} key={href}><div className="feature-top"><Icon size={24}/><ArrowUpRight size={19}/></div><span className="micro-label">{tag}</span><h3>{title}</h3><p>{text}</p></a>)}
        </div>
      </section>

      <section id="memberships" className="container content-section">
        <div className="section-heading"><div><span className="section-kicker">02 — YOUR MEMBERSHIP</span><h2>Not just a card.<br/><span>A place in the pod.</span></h2></div><p>Start with Silver. Explore Gold and Black.<br/>Find the proposed tier that fits your journey.</p></div>
        <div className="tier-grid">{membershipTiers.map((t,i) => <article className={`tier-card tier-${t.id}`} key={t.id}>
          <div className="tier-title"><h3>{t.name}</h3><span>{["THE BEGINNING", "THE NEXT LEVEL", "THE FULL EXPERIENCE"][i]}</span></div>
          <div className="card-art"><Image src={`/assets/optimized/vip-${t.id}.webp`} alt={`Whale.co ${t.name} VIP membership card`} width={1000} height={563} sizes="(max-width: 700px) 90vw, 30vw"/></div>
          <div className="tier-body"><div className="tier-rate"><strong>{t.multiplier}×</strong><span>proposed XP<br/>multiplier</span></div><p className="holding-label">{t.label}<small>{t.minimumEur === 0 ? "Your starting point" : "Proposed eligible token value"}</small></p><ul><li><Check size={15}/> Community membership</li><li><Check size={15}/> Planned quest participation</li><li><Check size={15}/> {t.multiplier === 1 ? "Base XP rate" : `${t.multiplier}× planned quest XP`}</li></ul><a className="tier-link" href="#tier-explorer">Explore {t.name}<ArrowUpRight size={17}/></a></div>
        </article>)}</div>
        <div id="tier-explorer" className="tier-explorer"><div><span className="section-kicker">TRY THE MEMBERSHIP EXPLORER</span><h3>Where could you fit in?</h3><p>Compare an example holding value with the proposed tiers.</p></div><div className="explorer-control"><label htmlFor="holding">Example token value in EUR</label><div className="input-wrap"><span>€</span><input id="holding" type="number" min="0" step="any" inputMode="decimal" placeholder="e.g. 500" value={holding} onChange={e => setHolding(e.target.value)} aria-describedby="tier-result"/></div><p id="tier-result" aria-live="polite">{tier ? <><strong>{tier.name}</strong> · {tier.multiplier}× proposed XP multiplier</> : holding ? "Enter a valid amount of zero or more." : "Enter a value to explore your tier."}</p></div></div>
        <p className="section-note">Illustrative only. No wallet check or purchase. Thresholds and benefits may change before launch.</p>
      </section>

      <section id="arena" className="arena-section content-section"><div className="container"><div className="section-heading"><div><span className="section-kicker">03 — AIRDROP ARENA</span><h2>Small steps.<br/><span>New possibilities.</span></h2></div><p>Get a first look at the quest experience.<br/>Explore the tasks. Learn how it will work.</p></div>
        <div className="arena-layout"><div className="arena-visual"><Image src="/assets/optimized/airdrop-arena.webp" alt="Whale.co reward crates descending into a bronze arena" width={1000} height={563} sizes="(max-width: 900px) 90vw, 45vw"/><div className="arena-visual-copy"><span className="badge">ARENA PREVIEW</span><h3>Your journey starts here.</h3><p>Participation is the plan. Community is the point.</p></div></div><div className="quests"><div className="quest-heading"><h3>Explore the quests</h3><span>{quests.length} tasks</span></div><div className="quest-filters" aria-label="Filter quests">{categories.map(c => <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="quest-list">{quests.map((q) => <details className="quest" key={q.title}><summary><span className="quest-icon"><Gift size={19}/></span><span className="quest-name"><strong>{q.title}</strong><small>{q.category}</small></span><span className="quest-xp">{q.xp} XP<small>planned</small></span><ChevronDown size={16} className="details-chevron"/></summary><div className="quest-description">{questDetails[q.category]}</div></details>)}</div><p className="quest-note"><ShieldCheck size={16}/> Preview tasks only. No XP is earned or stored.</p></div></div>
      </div></section>

      <section id="launchpad" className="container content-section"><div className="launchpad"><div className="launchpad-copy"><span className="section-kicker">04 — ON THE HORIZON</span><h2>The next wave<br/>starts with an idea.</h2><p>A dedicated space for discovering Solana community projects. The Whale.co Launchpad is part of our next chapter.</p><span className="badge">IN DEVELOPMENT</span><a className="text-link" href="#roadmap">See what we’re building <ArrowRight size={18}/></a></div><div className="launchpad-art"><Image src="/assets/optimized/launchpad.webp" alt="Bronze Whale.co rocket on a futuristic launch platform" fill sizes="(max-width: 700px) 90vw, 50vw"/></div></div></section>

      <section id="wallet" className="container content-section"><div className="dashboard-section"><div><span className="section-kicker">YOUR PERSONAL HUB</span><h2>Your community.<br/><span>All in view.</span></h2><p>A future home for your wallet holdings, membership and quest progress. Everything connected, in one place.</p><button className="button-primary" onClick={() => walletDialog.current?.showModal()}>Explore the wallet preview <ArrowUpRight size={17}/></button></div><div className="dashboard-preview" aria-label="Dashboard concept with no connected account"><div className="dashboard-heading"><span><Wallet size={17}/> Your overview</span><span className="badge">CONCEPT</span></div><div className="dashboard-empty"><ShieldCheck size={25}/><strong>No wallet connected</strong><span>Wallet sign-in is in development</span></div><div className="dashboard-metrics"><div><small>MEMBERSHIP</small><strong>Not verified</strong></div><div><small>QUEST XP</small><strong>Not active</strong></div></div><a href="#tier-explorer">Explore proposed tiers <ArrowRight size={15}/></a></div></div></section>

      <section id="roadmap" className="container content-section"><div className="section-heading"><div><span className="section-kicker">THE ROAD AHEAD</span><h2>Built step by step.</h2></div><p>A clear view of where we are<br/>and what comes next.</p></div><ol className="roadmap-grid">{[["01","The foundation","Design, membership explorer and quest previews.","CURRENT"],["02","Your identity","Wallet sign-in, profiles and verified token balances.","PLANNED"],["03","Participation","VIP requests, quest tracking and community roles.","PLANNED"],["04","The next wave","Project discovery and reviewed reward mechanics.","PLANNED"]].map(([number,title,text,status]) => <li key={number}><div><span className="roadmap-number">{number}</span><span className={`roadmap-status ${status === "CURRENT" ? "current" : ""}`}>{status}</span></div><h3>{title}</h3><p>{text}</p></li>)}</ol></section>

      <section id="faq" className="container content-section faq-section"><div><span className="section-kicker">A LITTLE MORE CLARITY</span><h2>Good questions.<br/>Clear answers.</h2><p>Get to know Whale.co.</p></div><div className="faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown size={18} className="details-chevron"/></summary><p>{a}</p></details>)}</div></section>
    </main>
    <footer id="community" className="footer"><div className="container"><div className="footer-top"><div><Brand/><p>A community-first home on Solana.</p></div><div className="footer-links"><a href="#memberships">Memberships</a><a href="#faq">FAQ</a><a href="https://github.com/GotUrBack-Public/whale.co" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Whale.co</span><span>Made for the next wave.</span><span className="footer-preview"><span className="status-dot"/> Platform preview</span></div></div></footer>

    <dialog ref={walletDialog} className="wallet-dialog" aria-labelledby="wallet-title" onClick={e => { if (e.target === e.currentTarget) walletDialog.current?.close(); }}><div className="dialog-inner"><button className="dialog-close" aria-label="Close wallet preview" onClick={() => walletDialog.current?.close()}><X size={22}/></button><span className="dialog-icon"><Wallet size={29}/></span><span className="section-kicker">COMING IN THE NEXT CHAPTER</span><h2 id="wallet-title">Your wallet.<br/>Your place in the pod.</h2><p>Solana wallet sign-in is in development. Once it’s ready, you’ll be able to verify your holdings and explore your membership.</p><div className="dialog-note"><ShieldCheck size={20}/><span>This preview does not connect wallets, request signatures or move funds.</span></div><button className="button-primary" onClick={() => { walletDialog.current?.close(); document.getElementById("tier-explorer")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); document.getElementById("holding")?.focus({ preventScroll: true }); }}>Try the membership explorer <ArrowRight size={17}/></button></div></dialog>
  </div>;
}
