import { generateSearchData } from '../utils/generateSearchData.js';

export async function GET() {
  const searchData = await generateSearchData();
  
  return new Response(
    JSON.stringify(searchData),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}