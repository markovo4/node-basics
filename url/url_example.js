const url_example = 'https://example.com/path?name=Node.js';

const parsedUrl = new URL(url_example);

const ulr_protocol = parsedUrl.protocol
const ulr_pathname = parsedUrl.pathname
const ulr_query_name = parsedUrl.searchParams.get('name')


console.log(ulr_protocol)
console.log(ulr_pathname)
console.log(ulr_query_name)