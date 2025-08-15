import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
  ],
  afterBody: [
    Component.Flex({
      components: [
        { Component: Component.RecentNotes({ limit: 3 }), grow: true },
      ],
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/sulimninkaev",
      "Discord Community": "https://discord.gg/s6uUjQ3Ymz",
    },
    additionalContent: "<p>&copy; 2025 Sulim's Archive. All rights reserved.</p>",
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
      direction: "row",
    }),
    Component.Explorer({
      sortFn: (a, b) => a.displayName.localeCompare(b.displayName),
      folderDefaultState: "collapsed",
    }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.ConditionalRender({
      component: Component.Graph(),
      condition: () => false,
    }),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
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
  right: [],
}