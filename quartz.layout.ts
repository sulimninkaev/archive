import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(), // Zeigt den Seitentitel „Sulim's Archive“ in der Kopfzeile
  ],
  afterBody: [
    Component.Flex({
      components: [
        { Component: Component.RecentNotes({ limit: 3 }), grow: true }, // Zeigt die letzten 3 Notizen
      ],
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/sulimninkaev",
      "Discord Community": "https://discord.gg/s6uUjQ3Ymz",
    },
    additionalContent: "<p>&copy; 2025 Sulim's Archive. All rights reserved.</p>", // Moderner Copyright-Hinweis
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
      direction: "row", // Horizontale Anordnung für kompakteres Design
    }),
    Component.Explorer({
      sortFn: (a, b) => a.displayName.localeCompare(b.displayName), // Alphabetische Sortierung
      folderDefaultState: "collapsed", // Ordner standardmäßig eingeklappt
    }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()), // Inhaltsverzeichnis nur auf Desktop
    Component.Backlinks(),
    Component.ConditionalRender({
      component: Component.Graph(),
      condition: () => false, // Graph deaktiviert, um Überladung zu vermeiden (optional aktivierbar)
    }),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
      direction: "row",
    }),
    Component.Explorer({
      sortFn: (a, b) => a.displayName.localeCompare(b.displayName),
      folderDefaultState: "collapsed",
    }),
  ],
  right: [], // Rechte Seitenleiste leer für Listen-Seiten, um Fokus auf Inhalt zu legen
}