import Image from "next/image";
import { existsSync, readdirSync } from "node:fs";
import { join, extname, basename } from "node:path";

type AssetImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  unoptimized?: boolean;
};

const supported = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg"]);
const aliases: Record<string, string[]> = {
  "whale-logo": ["whale", "logo"],
  "hero-background": ["hero", "background"],
  "vip-silver": ["silver"],
  "vip-gold": ["gold"],
  "vip-black": ["black"],
  "airdrop-arena": ["airdrop", "arena"],
  "launchpad": ["launchpad"],
  "wallet-dashboard": ["wallet", "dashboard"],
};

function resolveAsset(requested: string): string | null {
  if (!requested.startsWith("/assets/")) return null;
  const parts = requested.split("/");
  const filename = parts.pop();
  if (!filename) return null;
  const folder = join(process.cwd(), "public", ...parts.filter(Boolean));
  if (!existsSync(folder)) return null;
  const files = readdirSync(folder).filter((file) => supported.has(extname(file).toLowerCase()));
  const exact = files.find((file) => file.toLowerCase() === filename.toLowerCase());
  if (exact) return `${parts.join("/")}/${exact}`;
  const stem = basename(filename, extname(filename)).toLowerCase();
  const sameStem = files.find((file) => basename(file, extname(file)).toLowerCase() === stem);
  if (sameStem) return `${parts.join("/")}/${sameStem}`;
  const keywords = aliases[stem] ?? stem.split("-");
  const matching = files
    .map((file) => ({ file, name: basename(file, extname(file)).toLowerCase() }))
    .filter(({ name }) => keywords.every((word) => name.includes(word)));
  if (matching.length === 1) return `${parts.join("/")}/${matching[0].file}`;
  return null;
}

export function AssetImage({ src, alt, fill, sizes, className, unoptimized }: AssetImageProps) {
  const resolved = resolveAsset(src);
  if (!resolved) {
    return <div role="img" aria-label={alt} className={`asset-fallback ${className ?? ""}`}><span>WHALE.CO</span></div>;
  }
  return <Image src={resolved} alt={alt} fill={fill} sizes={sizes} className={className} unoptimized={unoptimized} />;
}
