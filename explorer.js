
(function(){
  var D=window.PLAYBOOK, rows=D.projects;
  var q=document.getElementById('q'),tr=document.getElementById('ftr'),df=document.getElementById('fdf'),
      lb=document.getElementById('flb'),sm=document.getElementById('fsm'),cu=document.getElementById('fcu'),so=document.getElementById('fso'),
      out=document.getElementById('rows'),cnt=document.getElementById('cnt');
  var p=new URLSearchParams(location.search);if(p.get('q'))q.value=p.get('q');
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function render(){
    var s=q.value.toLowerCase().trim(),t=tr.value,d=df.value,l=lb.value,m=sm.value,c=cu.value;
    var r=rows.filter(function(x){
      if(t&&x.track!==t)return false; if(d&&x.diff!==d)return false; if(l&&x.label!==l)return false;
      if(m&&String(x.sem)!==m)return false; if(c==='gpu'&&!x.cuda)return false; if(c==='nogpu'&&x.cuda)return false;
      if(s&&x.hay.indexOf(s)<0)return false; return true;});
    var k=so.value;
    r.sort(function(a,b){ if(k==='score')return b.total-a.total||a.id.localeCompare(b.id);
      if(k==='weeks')return a.w0-b.w0||a.id.localeCompare(b.id); return a.ord-b.ord;});
    cnt.textContent=r.length+' of '+rows.length+' projects';
    out.innerHTML=r.map(function(x){
      return '<tr><td><a href="'+x.page+'#'+x.id+'">'+x.id+'</a></td><td>'+esc(x.title)+'</td><td>'+esc(x.course_title)+'</td><td>S'+x.sem+'</td>'+
      '<td><span class="chip t'+x.track+'">'+x.track+'</span></td><td>'+esc(x.diff)+'</td><td>'+esc(x.label)+'</td><td>'+esc(x.wk)+' wk</td><td><b>'+x.total+'</b>/30</td></tr>';}).join('');
  }
  [q,tr,df,lb,sm,cu,so].forEach(function(e){e.addEventListener('input',render);});
  render();
})();
