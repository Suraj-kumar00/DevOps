import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

/**
 * One search index for the whole app, shared by the search API and the MCP server,
 * so the index is built once per server instance instead of once per request.
 */
export const searchServer = createFromSource(source);
