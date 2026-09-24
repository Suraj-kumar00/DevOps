import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import { registerSearchTool, registerSourceTools } from 'fumadocs-core/mcp';
import { searchServer } from '@/lib/search';
import { siteConfig } from '@/lib/site';
import { docsLlms } from '@/lib/llms';
import { source } from '@/lib/source';

/**
 * Read-only MCP server (streamable HTTP) exposing three tools:
 * `list_pages`, `get_page` and `search`. See fumadocs-core/mcp.
 */
const handler = createMcpHandler(() => {
  const mcp = new McpServer({
    name: siteConfig.name,
    version: '1.0.0',
  });

  registerSourceTools(mcp, source, docsLlms);
  registerSearchTool(mcp, searchServer);

  return mcp;
});

export async function GET(request: Request) {
  return handler.fetch(request);
}

export async function POST(request: Request) {
  return handler.fetch(request);
}

export async function DELETE(request: Request) {
  return handler.fetch(request);
}
