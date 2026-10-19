
(function(){
  var root=document.documentElement;
  try{var t=localStorage.getItem('theme');if(t)root.setAttribute('data-theme',t);}catch(e){}
  window.toggleTheme=function(){var cur=root.getAttribute('data-theme');
    var dark=cur?cur==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
    var n=dark?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n);}catch(e){}};

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
