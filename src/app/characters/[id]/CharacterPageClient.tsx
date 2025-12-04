"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Icon, Icons } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui";

interface CharacterPalette {
  top: string;
  bottom: string;
  hair: string;
  skin: string;
}

interface Character {
  id: string;
  name: string;
  role: string;
  age: string;
  status: string;
  image?: string;
  imageType?: "thigh-up" | "waist-up";
  isSilhouette?: boolean;
  palette?: CharacterPalette;
  themeColor: string;
  accentColor: string;
  traits: {
    positive: string[];
    dark: string[];
  };
  teaser: string;
  personality: string;
  roleInStory: string;
  voiceManner: string;
  quote: string;
}

interface CharacterPageClientProps {
  character: Character;
  prevCharacter: Character | null;
  nextCharacter: Character | null;
  patreonUrl: string;
  itchioUrl: string;
}

// Trait icon mapping
const traitIcons: Record<string, keyof typeof Icons> = {
  Curious: "search",
  Caring: "people",
  Innocent: "star",
  Headstrong: "shield",
  "Self-Sacrificing": "crossroads",
  "Hard-Working": "paintbrush",
  Jealous: "warning",
  "Slow to Trust": "key",
  Adventurous: "map",
  Passionate: "animation",
  Tomboyish: "dagger",
  Loyal: "shield",
  "Seeks Distraction": "animation",
  "Foul-Mouthed": "warning",
  Callous: "warning",
  Affectionate: "star",
  Traditional: "book",
  Strict: "shield",
  Proud: "star",
  Protective: "shield",
  Stubborn: "warning",
  "Image-Conscious": "warning",
  "Heart of Gold": "star",
  Naive: "warning",
  Noble: "shield",
  Idealistic: "star",
  Spoiled: "warning",
  "Blind to Others' Ways": "warning",
};

export default function CharacterPageClient({
  character,
  prevCharacter,
  nextCharacter,
  patreonUrl,
  itchioUrl,
}: CharacterPageClientProps) {
  const palette = character.palette;

  return (
    <div
      className="min-h-screen"
      style={{
        // Dark base with subtle color tint
        backgroundColor: "#0a0908",
        ["--character-theme" as string]: character.themeColor,
        ["--character-accent" as string]: character.accentColor,
      }}
    >
      {/* Full page gradient background - much darker with subtle color hints */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg,
                ${palette?.hair || character.accentColor}15 0%,
                #0F0E0D 25%,
                #0a0908 50%,
                #0a0908 100%
              )
            `,
          }}
        />
        {/* Subtle radial accents - reduced opacity */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, ${character.themeColor}30 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, ${character.accentColor}20 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/#characters"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <Icon name="chevronLeft" size={20} />
              <span className="font-ui text-sm uppercase tracking-wider">Back to Characters</span>
            </Link>

            {/* Character nav */}
            <div className="flex items-center gap-4">
              {prevCharacter && (
                <Link
                  href={`/characters/${prevCharacter.id}`}
                  className="text-white/60 hover:text-white transition-colors"
                  title={prevCharacter.name}
                >
                  <Icon name="chevronLeft" size={24} />
                </Link>
              )}
              <span
                className="font-display text-lg tracking-wider"
                style={{ color: character.themeColor }}
              >
                {character.name}
              </span>
              {nextCharacter && (
                <Link
                  href={`/characters/${nextCharacter.id}`}
                  className="text-white/60 hover:text-white transition-colors"
                  title={nextCharacter.name}
                >
                  <Icon name="chevronRight" size={24} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section - Character Portrait & Basic Info */}
          <section className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
            {/* Portrait Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Character portrait */}
              <div
                className="relative rounded-2xl overflow-hidden border-2"
                style={{
                  borderColor: `${character.themeColor}50`,
                  aspectRatio: character.imageType === "waist-up" ? "3/4" : "3/5",
                }}
              >
                {/* Background gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg,
                      ${palette?.hair || character.accentColor}30 0%,
                      ${palette?.skin || character.themeColor}20 30%,
                      ${palette?.top || character.themeColor}30 60%,
                      ${palette?.bottom || character.accentColor}40 100%
                    )`,
                  }}
                />

                {/* Character Image */}
                {character.image ? (
                  <div className={`absolute inset-0 flex items-end justify-center ${character.isSilhouette ? 'opacity-60' : ''}`}>
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      className={`object-contain object-bottom ${character.imageType === "waist-up" ? "scale-110 translate-y-[5%]" : ""}`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-9xl font-display opacity-20"
                      style={{ color: character.themeColor }}
                    >
                      {character.name[0]}
                    </span>
                  </div>
                )}

                {/* Silhouette overlay tint */}
                {character.isSilhouette && (
                  <div
                    className="absolute inset-0 mix-blend-overlay"
                    style={{
                      background: `linear-gradient(180deg, ${character.themeColor}40 0%, ${character.accentColor}60 100%)`,
                    }}
                  />
                )}

                {/* Bottom gradient fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{
                    background: `linear-gradient(to top, ${palette?.bottom || '#0F0E0D'}, transparent)`,
                  }}
                />
              </div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 p-6 rounded-xl border"
                style={{
                  backgroundColor: `${palette?.bottom || '#0F0E0D'}80`,
                  borderColor: `${character.themeColor}30`,
                }}
              >
                <div className="flex gap-3">
                  <Icon name="quote" size={24} style={{ color: `${character.themeColor}50` }} className="flex-shrink-0" />
                  <p className="text-white/90 italic text-lg leading-relaxed">
                    "{character.quote}"
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Name & Title */}
              <h1
                className="font-display text-5xl md:text-6xl tracking-wider mb-2"
                style={{ color: character.themeColor }}
              >
                {character.name}
              </h1>
              <p className="text-white/60 text-xl mb-6">{character.role}</p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span
                  className="px-3 py-1.5 rounded-lg text-sm"
                  style={{
                    backgroundColor: `${character.themeColor}20`,
                    color: character.themeColor,
                  }}
                >
                  Age: {character.age}
                </span>
                <span
                  className="px-3 py-1.5 rounded-lg text-sm"
                  style={{
                    backgroundColor: `${character.accentColor}20`,
                    color: "white",
                  }}
                >
                  {character.status}
                </span>
              </div>

              {/* Teaser */}
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {character.teaser}
              </p>

              {/* Traits */}
              <div className="mb-8">
                <h3 className="font-display text-sm uppercase tracking-wider text-white/40 mb-4">
                  Character Traits
                </h3>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {character.traits.positive.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1.5 bg-forest-green/20 border border-forest-green/40 rounded-lg text-forest-green text-sm flex items-center gap-1.5"
                      >
                        <Icon name={traitIcons[trait] || "star"} size={14} />
                        {trait}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.traits.dark.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1.5 bg-blood-red/20 border border-blood-red/40 rounded-lg text-blood-red text-sm flex items-center gap-1.5"
                      >
                        <Icon name={traitIcons[trait] || "warning"} size={14} />
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA - Support Development */}
              <div
                className="p-6 rounded-xl border"
                style={{
                  borderColor: `${character.themeColor}40`,
                  background: `linear-gradient(135deg, ${character.themeColor}15 0%, transparent 100%)`,
                }}
              >
                <p className="text-white font-display tracking-wide mb-3">
                  Want to see {character.name} animated?
                </p>
                <p className="text-white/60 text-sm mb-4">
                  Support development on Patreon for exclusive previews and behind-the-scenes content.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink
                    href={patreonUrl}
                    variant="cta"
                    size="md"
                    icon={<Icon name="patreon" size={18} />}
                    external
                  >
                    Support on Patreon
                  </ButtonLink>
                  <ButtonLink
                    href={itchioUrl}
                    variant="outline"
                    size="md"
                    icon={<Icon name="itchio" size={18} />}
                    external
                  >
                    View Animations
                  </ButtonLink>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Detailed Sections */}
          <section className="grid md:grid-cols-2 gap-8">
            {/* Personality */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: `${palette?.bottom || '#0F0E0D'}60`,
                borderColor: `${character.themeColor}20`,
              }}
            >
              <h2
                className="font-display text-xl tracking-wider mb-4 flex items-center gap-2"
                style={{ color: character.themeColor }}
              >
                <Icon name="people" size={20} />
                Personality
              </h2>
              <p className="text-white/70 leading-relaxed">
                {character.personality}
              </p>
            </motion.div>

            {/* Role in Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: `${palette?.bottom || '#0F0E0D'}60`,
                borderColor: `${character.themeColor}20`,
              }}
            >
              <h2
                className="font-display text-xl tracking-wider mb-4 flex items-center gap-2"
                style={{ color: character.themeColor }}
              >
                <Icon name="scroll" size={20} />
                Role in Story
              </h2>
              <p className="text-white/70 leading-relaxed">
                {character.roleInStory}
              </p>
            </motion.div>

            {/* Voice & Manner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded-xl border md:col-span-2"
              style={{
                backgroundColor: `${palette?.bottom || '#0F0E0D'}60`,
                borderColor: `${character.themeColor}20`,
              }}
            >
              <h2
                className="font-display text-xl tracking-wider mb-4 flex items-center gap-2"
                style={{ color: character.themeColor }}
              >
                <Icon name="animation" size={20} />
                Voice & Manner
              </h2>
              <p className="text-white/70 leading-relaxed">
                {character.voiceManner}
              </p>
            </motion.div>
          </section>

          {/* Character Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 gap-4"
          >
            {prevCharacter ? (
              <Link
                href={`/characters/${prevCharacter.id}`}
                className="group p-4 rounded-xl border hover:border-white/30 transition-colors"
                style={{
                  backgroundColor: `${palette?.bottom || '#0F0E0D'}60`,
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon name="chevronLeft" size={20} className="text-white/40 group-hover:text-white transition-colors" />
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">Previous</p>
                    <p
                      className="font-display tracking-wide"
                      style={{ color: prevCharacter.themeColor }}
                    >
                      {prevCharacter.name}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextCharacter ? (
              <Link
                href={`/characters/${nextCharacter.id}`}
                className="group p-4 rounded-xl border hover:border-white/30 transition-colors text-right"
                style={{
                  backgroundColor: `${palette?.bottom || '#0F0E0D'}60`,
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                <div className="flex items-center justify-end gap-3">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">Next</p>
                    <p
                      className="font-display tracking-wide"
                      style={{ color: nextCharacter.themeColor }}
                    >
                      {nextCharacter.name}
                    </p>
                  </div>
                  <Icon name="chevronRight" size={20} className="text-white/40 group-hover:text-white transition-colors" />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>

          {/* Back to main site */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors"
            >
              <Icon name="home" size={16} />
              <span className="font-ui text-sm uppercase tracking-wider">Return to Main Site</span>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
