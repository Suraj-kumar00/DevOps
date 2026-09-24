/** Liveness probe for containers and load balancers. Does no I/O on purpose. */
export const dynamic = 'force-static';

export function GET() {
  return Response.json({ status: 'ok' });
}
