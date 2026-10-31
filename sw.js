const C="drago-v6";
const F=["./","index.html","manifest.webmanifest","btn_parcs.webp","fond.webp","btn_accouplement.webp","btn_accouchement.webp","icon-192.png","icon-512.png","icon-maskable-192.png","icon-maskable-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>0)))).then(()=>self.skipWaiting()))});
// ne supprime que les anciens caches de CETTE appli (préfixe "drago-")
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("drago-")&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;const u=new URL(e.request.url).pathname;const pg=e.request.mode==="navigate"||/\.(html|webmanifest|js)$/.test(u)||u.endsWith("/");e.respondWith(fetch(e.request,pg?{cache:"no-cache"}:undefined).then(r=>{if(r&&r.ok){const y=r.clone();caches.open(C).then(c=>c.put(e.request,y))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./"))))});
