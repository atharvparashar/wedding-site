import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const categories = [
  "wedding",
  "haldi",
  "mehndi",
  "birthday",
  "engagement",
  "baby-shoot",
  "events",
] as const;
const labels: Record<(typeof categories)[number], string> = {
  wedding: "Wedding",
  haldi: "Haldi",
  mehndi: "Mehndi",
  birthday: "Birthday",
  engagement: "Engagement",
  "baby-shoot": "Baby Shoot",
  events: "Events",
};

const imageFile = /\.(avif|gif|jpe?g|png|webp)$/i;

async function imagesFromFolder(category: (typeof categories)[number]) {
  const directory = path.join(process.cwd(), "public", "images", category);
  try {
    const files = await readdir(directory, { withFileTypes: true });
    return files
      .filter((file) => file.isFile() && imageFile.test(file.name))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
      .map((file) => `/images/${category}/${encodeURIComponent(file.name)}`);
  } catch {
    return [];
  }
}

export async function GET() {
  const entries = await Promise.all(
    categories.map(async (category) => {
      const images = await imagesFromFolder(category);
      return images.map((src, index) => ({
        id: `${category}-${index}-${src}`,
        src,
        category: labels[category],
        title: `${labels[category]} story ${index + 1}`,
      }));
    }),
  );
  return NextResponse.json(entries.flat());
}
