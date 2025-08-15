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
        header: "Inter",
        body: "Inter",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#e5e7eb", // Helles Grau für Hintergrund
          lightgray: "#d1d5db", // Mittleres Grau für Akzente
          gray: "#6b7280", // Dunkleres Grau für Texte
          darkgray: "#374151", // Sehr dunkles Grau für Kontraste
          dark: "#111827", // Nahezu Schwarz für Überschriften
          secondary: "#dc2626", // Lebendiges Rot für Links und Akzente
          tertiary: "#b91c1c", // Dunkleres Rot für sekundäre Akzente
          highlight: "rgba(220, 38, 38, 0.1)", // Subtiles Rot für Hervorhebungen
          textHighlight: "#f87171", // Helles Rot für Text-Hervorhebungen
        },
        darkMode: {
          light: "#1f2937", // Dunkles Grau für Hintergrund
          lightgray: "#374151", // Mittleres Grau für Akzente
          gray: "#9ca3af", // Helles Grau für Texte
          darkgray: "#d1d5db", // Hellgrau für Kontraste
          dark: "#f3f4f6", // Nahezu Weiß für Überschriften (Kontrast zu Schwarz)
          secondary: "#f87171", // Helles Rot für Links
          tertiary: "#ef4444", // Mittleres Rot für Akzente
          highlight: "rgba(220, 38, 38, 0.2)", // Subtiles Rot für Dark Mode
          textHighlight: "#f87171", // Helles Rot für Text-Hervorhebungen
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
      Plugin.CustomOgImages(),
    ],
  },
}

export default config