const axios = require('axios');
const fs = require('fs');

const API_URL = 'http://localhost:1337/api'; // رابط الـ API المحلي
const ADMIN_JWT = '<YOUR_ADMIN_JWT>'; // ضع التوكن هنا

// ضع أسماء كل الـ Collection Types اللي عندك
const collections = [
  'coursee',
  'anotherCollection', // ضع هنا أي Collection تانية
];

async function exportCollection(name) {
  let page = 1;
  let allData = [];
  let hasMore = true;

  while (hasMore) {
    const res = await axios.get(`${API_URL}/${name}`, {
      params: {
        'pagination[page]': page,
        'pagination[pageSize]': 100, // 100 عنصر لكل صفحة
      },
      headers: {
        Authorization: `Bearer ${ADMIN_JWT}`,
      },
    });

    const data = res.data.data;
    allData = allData.concat(data);

    if (data.length < 100) hasMore = false;
    else page++;
  }

  fs.writeFileSync(`${name}.json`, JSON.stringify(allData, null, 2));
  console.log(`Exported ${name}: ${allData.length} items`);
}

async function exportAll() {
  for (const coll of collections) {
    await exportCollection(coll);
  }
}

exportAll();
