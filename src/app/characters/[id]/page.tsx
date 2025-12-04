import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CHARACTERS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import CharacterPageClient from "./CharacterPageClient";

interface Props {
  params: Promise<{ id: string }>;
}

// Generate static paths for all characters
export async function generateStaticParams() {
  return CHARACTERS.map((character) => ({
    id: character.id,
  }));
}

// Generate metadata for each character
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const character = CHARACTERS.find((c) => c.id === id);

  if (!character) {
    return {
      title: "Character Not Found",
    };
  }

  return {
    title: `${character.name} - ${character.role} | ${SITE_CONFIG.name}`,
    description: character.teaser,
    openGraph: {
      title: `${character.name} - ${SITE_CONFIG.name}`,
      description: character.teaser,
    },
  };
}

export default async function CharacterPage({ params }: Props) {
  const { id } = await params;
  const character = CHARACTERS.find((c) => c.id === id);

  if (!character) {
    notFound();
  }

  // Find adjacent characters for navigation
  const currentIndex = CHARACTERS.findIndex((c) => c.id === id);
  const prevCharacter = currentIndex > 0 ? CHARACTERS[currentIndex - 1] : null;
  const nextCharacter = currentIndex < CHARACTERS.length - 1 ? CHARACTERS[currentIndex + 1] : null;

  return (
    <CharacterPageClient
      character={character}
      prevCharacter={prevCharacter}
      nextCharacter={nextCharacter}
      patreonUrl={SOCIAL_LINKS.patreon.url}
      itchioUrl={SOCIAL_LINKS.itchio.url}
    />
  );
}
