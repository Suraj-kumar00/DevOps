import type { LoaderPlugin } from 'fumadocs-core/source';
import { createElement, type ReactNode } from 'react';
import { isTrackIconName, trackIcons } from '@/components/icons/track-icons';

/**
 * Turns the `icon` names in `meta.json` files into the site's own track icons.
 * An unknown name fails the build, so a typo never ships as a missing icon.
 */
export function trackIconsPlugin(): LoaderPlugin {
  function replaceIcon<T extends { icon?: ReactNode }>(node: T): T {
    if (typeof node.icon !== 'string') return node;
    if (!isTrackIconName(node.icon)) {
      throw new Error(
        `Unknown icon "${node.icon}" in content/docs. Use one of: ${Object.keys(trackIcons).join(', ')}.`,
      );
    }
    node.icon = createElement(trackIcons[node.icon]);
    return node;
  }

  return {
    name: 'devops-hub:track-icons',
    transformPageTree: { file: replaceIcon, folder: replaceIcon, separator: replaceIcon },
  };
}
