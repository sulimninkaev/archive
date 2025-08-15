import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Sulim's Archive",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter", // Moderne, geometrische Schriftart
        body: "Inter", // Einheitliche Schriftart für Konsistenz
        code: "Fira Code", // Moderne Monospace-Schrift mit Ligaturen
      },
      colors: {
        lightMode: {
          light: "#ffffff", // Reinweiß für klaren Hintergrund
          lightgray: "#f1f3f5", // Weicher Grauton für Akzente
          gray: "#6b7280", // Neutrales Grau für Texte
          darkgray: "#374151", // Dunkleres Grau für Kontrast
          dark: "#111827", // Tiefes Dunkelgrau für Überschriften
          secondary: "#3b82f6", // Lebendiges Blau für Links und Akzente
          tertiary: "#10b981", // Frisches Grün für sekundäre Akzente
          highlight: "rgba(59, 130, 246, 0.1)", // Subtiles Blau für Hervorhebungen
          textHighlight: "#fef08a", // Sanftes Gelb für Text-Hervorhebungen
        },
        darkMode: {
          light: "#1f2937", // Dunkler Hintergrund für Dark Mode
          lightgray: "#374151", // Leichtes Grau für Akzente
          gray: "#9ca3af", // Helles Grau für Texte
          darkgray: "#d1d5db", // Hellere Akzente
          dark: "#f3f4f6", // Helles Grau für Überschriften
          secondary: "#60a5fa", // Weicheres Blau für Links
          tertiary: "#34d399", // Grün für Akzente
          highlight: "rgba(59, 130, 246, 0.2)", // Subtiles Blau für Dark Mode
          textHighlight: "#fef08a", // Konsistentes Gelb für Text-Hervorhebungen
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: false,
        enableRSS: false,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config