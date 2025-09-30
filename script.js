// script.js (updated)
// Shortcuts
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);

// Theme
function setTheme(m){
  if(m==="dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  localStorage.setItem("theme",m);
  const btn = $("#themeToggle"); if(btn) btn.textContent = m==="dark" ? "☀️" : "🌙";
}
(function(){ setTheme(localStorage.getItem("theme") || "light"); })();
$("#themeToggle")?.addEventListener("click", () => setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark"));

// Cursor
document.addEventListener("mousemove", e => { const c = $("#cursor"); if (c) c.style.transform = `translate3d(${e.clientX-12}px,${e.clientY-12}px,0)`; });

// Drawer
$("#menuBtn")?.addEventListener("click", () => $("#drawer")?.classList.add("open"));
$("#closeDrawer")?.addEventListener("click", () => $("#drawer")?.classList.remove("open"));

// WhatsApp number
const WA_NUMBER = "923066235036";

// Products (images updated; AntiCrack uses the link you provided)
const products = [
  // Services
  {id:"s1",name:"Apple ID Create",brand:"Apple",price:200,rating:4.8,category:"services",specs:["Fast","All devices"],img:"images/apple-id.webp"},
  {id:"s2",name:"Infinix/Tecno/Itel AntiCrack",brand:"Multi",price:0,rating:4.6,category:"services",specs:["Low price","Latest patch"],
    img:"https://i.ytimg.com/vi/9kXPMB-OJYk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCyWT1iJRZTPXQVcuoYVJr8ijtIEQ"
  },
  {id:"s3",name:"Android 15 FRP Clear",brand:"Multi",price:0,rating:4.7,category:"services",specs:["Fix Playstore","Clear bugs"],img:"images/android-15-frp.jpg"},
  {id:"s4",name:"Samsung FRP Worldwide",brand:"Samsung",price:0,rating:4.7,category:"services",specs:["Wholesale","Android 14/15"],img:"images/samsung-frp.png"},
  {id:"s5",name:"iPhone Bypass 6s-16 Pro Max",brand:"Apple",price:0,rating:4.5,category:"services",specs:["Passcode/MEID"],img:"images/iphone-bypass."},
  {id:"s6",name:"Mi Account Remove",brand:"Xiaomi",price:0,rating:4.5,category:"services",specs:["Permanent","Worldwide"],img:"images/mi-account-remove.jpg"},

  // Activations
  {id:"a1",name:"Pandora on Z3X (1yr)",brand:"Pandora",price:9000,rating:4.8,category:"activations",specs:["Special offer"],img:"images/Pandora-Online-Activation.jpg"},
  {id:"a2",name:"All Tools Activations",brand:"Various",price:0,rating:4.6,category:"activations",specs:["Wholesale"],img:"images/tools-activation.webp"},
  {id:"a3",name:"Dongle Activations",brand:"Various",price:0,rating:4.6,category:"activations",specs:["Low price"],img:"images/dongle-activation.png"},
  {id:"a4",name:"Chimera Pro Activation",brand:"Chimera",price:0,rating:4.7,category:"activations",specs:["Pro features"],img:"images/chimera-tool-samsung-license-activation-1year-500x500.webp"},
  {id:"a5",name:"TR Tools / Cheetah / CF Tool",brand:"Multi",price:0,rating:4.6,category:"activations",specs:["Bundle"],img:"images/multi-tools.webp"},

  // Rentals (priority)
  {id:"r1",name:"UnlockTool (Rent)",brand:"UnlockTool",price:130,rating:4.7,category:"rentals",specs:["Instant use"],img:"images/utool.jpg"},
  {id:"r2",name:"AMT Tool (Rent)",brand:"AMT",price:100,rating:4.6,category:"rentals",specs:["Cheap"],img:"images/amt.png"},
  {id:"r3",name:"DFT Pro (Rent)",brand:"DFT",price:330,rating:4.7,category:"rentals",specs:["Updated"],img:"images/dft.webp"},
  {id:"r4",name:"Hydra Tool (Rent)",brand:"Hydra",price:300,rating:4.7,category:"rentals",specs:["Multi-brand"],img:"images/hydra-tool-rent.webp"},
  {id:"r5",name:"TSM Tool (Rent)",brand:"TSM",price:250,rating:4.5,category:"rentals",specs:["Budget"],img:"images/tsm.jpg"},
  {id:"r6",name:"TFM Tool (Rent)",brand:"TFM",price:150,rating:4.5,category:"rentals",specs:["Low cost"],img:"images/tfm.png"},
  {id:"r7",name:"MDM Fix (Rent)",brand:"MDM",price:300,rating:4.6,category:"rentals",specs:["MDM Remove"],img:"images/mdm fix tool.jpg"},
  {id:"r8",name:"Android Win Tool (Rent)",brand:"AndroidWin",price:450,rating:4.6,category:"rentals",specs:["Pro features"],img:"images/android win tool rent.jpg"},
];

// Helpers
function formatCurrency(n){ return n > 0 ? "Rs " + n : "On Request"; }
function waLinkFor(productName){
  const text = `Hi, I want to buy / rent: ${productName} - please provide details.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Toast (optional)
function showToast(msg){
  const t = $("#toast"); if(!t) return;
  t.textContent = msg; t.classList.remove("hidden");
  clearTimeout(showToast._t); showToast._t = setTimeout(()=> t.classList.add("hidden"), 2000);
}

// Product HTML with image onerror fallback
function productHTML(p){
  const wa = waLinkFor(p.name);
  // ensure safe alt
  const alt = (p.name || "product").replace(/"/g,"");
  return `<div class="lift rounded-2xl bg-white dark:bg-zinc-900 border p-4">
    <img src="${p.img}" alt="${alt}" onerror="this.onerror=null;this.src='https://placehold.co/300x200?text=Image+Not+Found'" class="w-full h-40 object-cover rounded-lg mb-3"/>
    <div class="flex justify-between">
      <span class="font-semibold">${p.brand}</span>
      <button onclick="toggleWish(this)" class="wish">♡</button>
    </div>
    <h3 class="font-bold text-lg mt-1">${p.name}</h3>
    <div class="flex mt-1">${"★".repeat(Math.round(p.rating))}${"☆".repeat(5-Math.round(p.rating))}</div>
    <div class="font-bold mt-1">${formatCurrency(p.price)}</div>
    <div class="flex gap-1 mt-2">${p.specs.map(s=>`<span class="text-xs border px-1 rounded">${s}</span>`).join("")}</div>
    <div class="mt-3 flex gap-2">
      <a href="${wa}" target="_blank" rel="noopener" class="btn-glow flex-1 bg-green-600 text-white px-3 py-1 rounded text-center">WhatsApp</a>
      <button onclick="openQuick('${p.id}')" class="flex-1 border rounded px-3 py-1">View</button>
    </div>
  </div>`;
}
function render(list){ $("#productGrid").innerHTML = list.map(productHTML).join(""); }

// Filtering / sorting with rentals priority
let category = "all", sort = "featured", query = "";
function categoryPriority(cat){
  if(cat === "rentals") return 0;
  if(cat === "activations") return 1;
  if(cat === "services") return 2;
  return 3;
}
function apply(){
  $("#spinner")?.classList.remove("hidden");
  setTimeout(()=>{
    let list = products.filter(p =>
      (category === "all" || p.category === category) &&
      (p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query))
    );

    // rentals first, then sort option
    list.sort((a,b) => {
      const p = categoryPriority(a.category) - categoryPriority(b.category);
      if(p !== 0) return p;
      if(sort === "price-asc") return (a.price || 0) - (b.price || 0);
      if(sort === "price-desc") return (b.price || 0) - (a.price || 0);
      if(sort === "rating") return b.rating - a.rating;
      return 0;
    });

    render(list);
    $("#spinner")?.classList.add("hidden");
    // attach reveal observer to newly rendered cards
    $$(".reveal").forEach(el => io.observe(el));
  }, 200);
}

// Bind controls
$$(".cat-btn").forEach(btn => btn.addEventListener("click", () => { category = btn.dataset.cat; apply(); }));
$("#sort")?.addEventListener("change", e => { sort = e.target.value; apply(); });
$("#search")?.addEventListener("input", e => { query = e.target.value.toLowerCase(); apply(); });
document.addEventListener("keydown", e => { if(e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)){ e.preventDefault(); $("#search")?.focus(); } });

// IntersectionObserver for reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add("revealed"); io.unobserve(e.target); }
  });
}, { threshold: .15 });

// initial render
apply();

// Quick view
function openQuick(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  $("#quickImg").src = p.img;
  $("#quickTitle").textContent = p.name;
  $("#quickPrice").textContent = formatCurrency(p.price);
  $("#quickRating").innerHTML = "★".repeat(Math.round(p.rating)) + "☆".repeat(5 - Math.round(p.rating));
  $("#quickSpecs").innerHTML = p.specs.map(s => `<span class="border px-2 rounded">${s}</span>`).join("");
  $("#addQuickWA").href = waLinkFor(p.name);
  $("#quickModal").classList.remove("hidden"); $("#quickModal").classList.add("flex");
  requestAnimationFrame(() => $("#quickBox").classList.remove("scale-95","opacity-0"));
}
function closeQuick(){ $("#quickBox").classList.add("scale-95","opacity-0"); setTimeout(()=> $("#quickModal").classList.add("hidden"), 300); }
window.openQuick = openQuick; window.closeQuick = closeQuick;

// wishlist
function toggleWish(btn){ btn.textContent = btn.textContent === "♡" ? "♥" : "♡"; }
window.toggleWish = toggleWish;

// Footer year
$("#year").textContent = new Date().getFullYear();
