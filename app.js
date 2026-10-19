
(function(){
  var root=document.documentElement;
  try{var t=localStorage.getItem('theme');if(t)root.setAttribute('data-theme',t);}catch(e){}
  window.toggleTheme=function(){var cur=root.getAttribute('data-theme');
    var dark=cur?cur==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
    var n=dark?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n);}catch(e){}};
  window.setAll=function(open){document.querySelectorAll('details.proj').forEach(function(d){d.open=open;});};
  var f=document.getElementById('gs');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();var q=document.getElementById('gq').value.trim();
    location.href=(window.__root||'')+'explorer.html'+(q?'?q='+encodeURIComponent(q):'');});}
  // open project from hash
  function openHash(){var h=location.hash.slice(1);if(!h)return;var el=document.getElementById(h);
    if(el){var d=el.tagName==='DETAILS'?el:el.closest('details');if(d)d.open=true;setTimeout(function(){el.scrollIntoView();},0);}}
  window.addEventListener('hashchange',openHash);openHash();
})();
