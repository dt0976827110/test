self.addEventListener('install', event => {
  console.log('✅ Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // 不做快取，單純讓它註冊生效
});
