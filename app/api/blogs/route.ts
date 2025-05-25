import { NextResponse } from 'next/server';

const HASHNODE_API = 'https://gql.hashnode.com/';

const HASHNODE_QUERY = `
  query GetUserArticles($username: String!, $page: Int!) {
    user(username: $username) {
      posts(page: $page, pageSize: 6) {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            title
            brief
            slug
            publishedAt
            coverImage {
              url
            }
            tags {
              name
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');

    console.log('Fetching blogs for page:', page);

    const response = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: HASHNODE_QUERY,
        variables: {
          username: 'surajkumar00',
          page,
        },
      }),
    });

    const data = await response.json();
    console.log('Hashnode API response:', JSON.stringify(data, null, 2));

    if (data.errors) {
      console.error('Hashnode API errors:', data.errors);
      return NextResponse.json({ error: data.errors[0].message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
} 