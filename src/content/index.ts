import type { Locale } from "@/i18n/config";
import { en } from "./en";
import { pt } from "./pt";
import type { Content } from "./types";

const contents: Record<Locale, Content> = { pt, en };

export const getContent = (locale: Locale): Content => contents[locale];

export { person } from "./shared";
export type { Content, LevelKey, Project, Role } from "./types";
