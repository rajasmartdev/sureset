// Load HTML fragments into placeholders and run inline scripts
async function loadFragment(url, containerId){
  try{
    const res = await fetch(url);
    if(!res.ok) throw new Error('Failed to load '+url);
    const text = await res.text();
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = text;
    // Execute scripts inside fragment
    const temp = document.createElement('div'); temp.innerHTML = text;
    const scripts = temp.querySelectorAll('script');
    scripts.forEach(s => {
      const ns = document.createElement('script');
      if(s.src){ ns.src = s.src; ns.async = false; }
      else ns.textContent = s.textContent;
      document.body.appendChild(ns);
    });
  }catch(e){ console.error(e); }
}

function loadFragments(){
  loadFragment('header.html','site-header');
  loadFragment('footer.html','site-footer');
}

if(typeof window !== 'undefined') window.loadFragments = loadFragments;
