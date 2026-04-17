export async function fetchDatasets(params = {}, options = {}) {
  const url = new URL('https://api.datakeep.civicdays.in/api/search/dataset/');
  const queryParams = new URLSearchParams();

  if (params.query) queryParams.set('query', params.query);
  if (params.sectors?.length) queryParams.set('sectors', params.sectors.join(','));
  if (params.formats?.length) queryParams.set('formats', params.formats.join(','));
  if (params.tags?.length) queryParams.set('tags', params.tags.join(','));
  if (params.geographies?.length) queryParams.set('geographies', params.geographies.join(','));
  if (params.page) queryParams.set('page', String(params.page));
  if (params.size) queryParams.set('size', String(params.size));
  if (params.sort) queryParams.set('sort', params.sort);
  if (params.order) queryParams.set('order', params.order);

  url.search = queryParams.toString();

  const response = await fetch(url.toString(), { ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return {
    results: data.results || [],
    total: typeof data.total === 'number' ? data.total : data.count || 0,
    aggregations: data.aggregations || {},
  };
}
