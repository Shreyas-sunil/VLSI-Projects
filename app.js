
(function(){
  var root=document.documentElement;
  try{var t=localStorage.getItem('theme');if(t)root.setAttribute('data-theme',t);}catch(e){}
  window.toggleTheme=function(){var cur=root.getAttribute('data-theme');
    var dark=cur?cur==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
    var n=dark?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n);}catch(e){}};

  // header: primary links + "More" menu on desktop, collapsible panel on small screens
  (function(){var hdr=document.querySelector('header.top'),nav=hdr&&hdr.querySelector('nav.main');if(!nav)return;
    var links=[].slice.call(nav.querySelectorAll(':scope > a'));if(links.length<9)return;
    var more=document.createElement('details');more.className='more';
    var sum=document.createElement('summary');sum.textContent='More';more.appendChild(sum);
    var box=document.createElement('div');box.className='more-menu';more.appendChild(box);
    links.slice(8).forEach(function(a){if(a.classList.contains('on'))more.classList.add('on');box.appendChild(a);});
    nav.appendChild(more);
    document.addEventListener('click',function(e){if(more.open&&!hdr.classList.contains('open')&&!more.contains(e.target))more.open=false;});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){more.open=false;hdr.classList.remove('open');}});
    var tb=hdr.querySelector('.search button');
    if(tb){tb.className='icon-btn';tb.setAttribute('aria-label','Toggle light or dark theme');tb.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/></svg>';}
    var mb=document.createElement('button');mb.type='button';mb.className='icon-btn menu-btn';mb.setAttribute('aria-label','Open menu');mb.setAttribute('aria-expanded','false');
    mb.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    mb.addEventListener('click',function(){var o=hdr.classList.toggle('open');more.open=o;mb.setAttribute('aria-expanded',o?'true':'false');mb.setAttribute('aria-label',o?'Close menu':'Open menu');});
    hdr.querySelector('.bar').insertBefore(mb,nav);
    hdr.classList.add('js');})();

  (function(){var box=document.getElementById('medal');if(!box)return;
    function rd(k){try{return JSON.parse(localStorage.getItem(k)||'null');}catch(e){return null;}}
    window.renderMedal=function(){var m=rd('vlsi_medal_v1')||{},cg=rd('vlsi_cg_v1')||{};
      var t=parseFloat(m.target),c=parseFloat(cg.cg);var h='<div class="in"><span class="star" aria-hidden="true">&#9733;</span>';
      if(!isFinite(t)){h+='<span><b>Gold medal goal:</b> no target yet. Set one on the <a href="gpa.html">calculator</a>.</span>';}
      else{var pct=isFinite(c)?Math.max(0,Math.min(100,c/t*100)):0;
        h+='<span><b>Gold medal goal:</b> target CGPA '+t.toFixed(2)+(isFinite(c)?' &middot; now '+c.toFixed(2)+(c>=t?' &middot; at or above target':' &middot; gap '+(t-c).toFixed(2)):' &middot; no grades entered yet')+'</span><span class="mbar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+Math.round(pct)+'"><i style="width:'+pct+'%"></i></span>';}
      h+='<a href="gpa.html">Update</a></div>';box.innerHTML=h;};
    window.renderMedal();})();
  window.setAll=function(open){document.querySelectorAll('details.proj').forEach(function(d){d.open=open;});};
  var f=document.getElementById('gs');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();var q=document.getElementById('gq').value.trim();
    location.href=(window.__root||'')+'explorer.html'+(q?'?q='+encodeURIComponent(q):'');});}
  // open project from hash
  function openHash(){var h=location.hash.slice(1);if(!h)return;var el=document.getElementById(h);
    if(el){var d=el.tagName==='DETAILS'?el:el.closest('details');if(d)d.open=true;setTimeout(function(){el.scrollIntoView();},0);}}
  window.addEventListener('hashchange',openHash);openHash();
})();
