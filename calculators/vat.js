/* VAT calculator. Embed: <div id="calc-vat" data-practice="fc"></div><script src="/calculators/vat.js" defer></script> */
(function(){
var MOUNT=document.getElementById('calc-vat'); if(!MOUNT) return;
if(!document.getElementById('calc-fonts')){var l=document.createElement('link');l.id='calc-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap';document.head.appendChild(l);}
var R=MOUNT.attachShadow({mode:'open'});
var PRACTICES={
  fc:{name:'Fitzpatrick Co',contact:'https://accountantsbrighton.co.uk/contact',phone:'07534 476727',email:'info@fitzpatrickco.uk'},
  as:{name:'Accounting Solution',contact:'https://acctsolution.co.uk/contact/',phone:'07534 476727',email:'info@acctsolution.co.uk'}
};
var P=MOUNT.getAttribute('data-practice')||'fc', PR=PRACTICES[P]||PRACTICES.fc;
var THRESHOLD=90000, DEREG=88000;
var CSS="/* Layout: inputs in a left column, the answer pinned in a right column; one column on phones. */\n:host{display:block;\n  --bg:#f6f7f7; --surface:#ffffff; --ink:#15211f; --muted:#5a6a67; --line:#d9e0de;\n  --accent:#0d5c57; --accent-ink:#ffffff; --accent-soft:#e1f0ee;\n  --good:#1d6b3a; --good-soft:#e3f2e8; --warn:#8a5a00; --warn-soft:#fbf0d9; --bad:#a3322b;\n  --font-body:'IBM Plex Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;\n  --font-fig:'IBM Plex Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace;\n}\n*{box-sizing:border-box}\n:host{color:var(--ink);font:15px/1.55 var(--font-body)} .root{background:var(--bg);padding:20px 16px 32px;border-radius:6px}\n.wrap{max-width:1040px;margin:0 auto}\nh1{font-size:1.6rem;line-height:1.2;margin:0 0 6px;text-wrap:balance;font-weight:600}\nh2{font-size:1.05rem;margin:0 0 4px;font-weight:600;text-wrap:balance}\np{margin:0}\n.lede{color:var(--muted);max-width:62ch;margin-bottom:20px}\n.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:20px;align-items:start}\n@media (max-width:820px){.grid{grid-template-columns:minmax(0,1fr)}}\n.panel{background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:18px}\n.stack{display:flex;flex-direction:column;gap:16px}\n.field{display:flex;flex-direction:column;gap:4px;min-width:0}\n.field label,.field .lab{font-weight:500}\n.hint{color:var(--muted);font-size:.85rem;line-height:1.4}\n.money{position:relative}\n.money span{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--muted);font-family:var(--font-fig)}\ninput[type=text],select{width:100%;font:inherit;font-family:var(--font-fig);color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:4px;padding:9px 10px;min-height:42px}\n.money input{padding-left:24px}\nselect{font-family:var(--font-body)}\ninput:focus-visible,select:focus-visible,button:focus-visible,a:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}\ninput[type=range]{width:100%;accent-color:var(--accent)}\n.row2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}\n@media (max-width:480px){.row2{grid-template-columns:minmax(0,1fr)}}\n.tag{display:inline-block;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:3px;padding:1px 6px;margin-left:6px;vertical-align:middle}\n.result{position:sticky;top:env(safe-area-inset-top,0px);display:flex;flex-direction:column;gap:14px}\n@media (max-width:820px){.result{position:static}}\n.answer{border-left:4px solid var(--accent);background:var(--accent-soft);padding:14px 16px;border-radius:0 6px 6px 0}\n.answer.good{border-color:var(--good);background:var(--good-soft)}\n.answer.warn{border-color:var(--warn);background:var(--warn-soft)}\n.answer h2{font-size:1.2rem;line-height:1.3}\n.answer p{margin-top:4px;color:var(--ink)}\n.fig{font-family:var(--font-fig);font-variant-numeric:tabular-nums}\n.tablewrap{overflow-x:auto}\ntable{width:100%;border-collapse:collapse;font-size:.92rem}\nth,td{padding:7px 8px;text-align:right;border-bottom:1px solid var(--line);white-space:nowrap}\nth:first-child,td:first-child{text-align:left;white-space:normal}\nth{font-weight:500;color:var(--muted);font-size:.8rem;text-transform:uppercase;letter-spacing:.05em}\ntd.n{font-family:var(--font-fig);font-variant-numeric:tabular-nums}\ntr.total td{font-weight:600;border-top:2px solid var(--ink);border-bottom:0}\ntr.sub td{color:var(--muted)}\n.cta{display:flex;flex-direction:column;gap:10px}\n.btn{display:inline-block;background:var(--accent);color:var(--accent-ink);text-decoration:none;font-weight:600;padding:11px 18px;border-radius:4px;text-align:center}\n.btn.ghost{background:transparent;color:var(--accent);border:1px solid var(--accent)}\n.btns{display:flex;flex-wrap:wrap;gap:10px}\ndetails{border-top:1px solid var(--line);padding-top:10px}\nsummary{cursor:pointer;font-weight:500}\ndetails ul{margin:8px 0 0;padding-left:18px;color:var(--muted)}\ndetails li+li{margin-top:4px}\n.small{font-size:.82rem;color:var(--muted)}\nsvg text{fill:var(--muted);font-family:var(--font-fig);font-size:11px}\nsvg .axis{stroke:var(--line);fill:none}\nsvg .zero{stroke:var(--ink);stroke-width:1}\nsvg .line{stroke:var(--accent);stroke-width:2;fill:none}\nsvg .you{stroke:var(--warn);stroke-width:1.5;stroke-dasharray:4 3}\nsvg .dot{fill:var(--warn)}\n.group{border-top:1px solid var(--line);padding-top:14px}\n.group:first-child{border-top:0;padding-top:0}\n.seg{display:flex;gap:0;border:1px solid var(--line);border-radius:4px;overflow:hidden}\n.seg label{flex:1;text-align:center;padding:9px 6px;cursor:pointer;font-weight:500;background:var(--bg);min-width:0}\n.seg input{position:absolute;opacity:0;pointer-events:none}\n.seg input:checked+span{color:var(--accent-ink)}\n.seg label:has(input:checked){background:var(--accent);color:var(--accent-ink)}\n.seg label:has(input:focus-visible){outline:2px solid var(--accent);outline-offset:-2px}\n.legalnote{margin-top:18px;max-width:80ch}\n[hidden]{display:none!important}\n.items{display:flex;flex-direction:column;gap:16px}\n\n\n.item{display:grid;grid-template-columns:minmax(0,1fr) 9.5rem;gap:4px 12px;align-items:start}\n@media (max-width:480px){.item{grid-template-columns:minmax(0,1fr)}}\n.item .what{min-width:0}\n.item .what b{font-weight:500;display:block}\n.gh{font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);font-weight:600;margin-bottom:10px}\n.no{background:var(--warn-soft);border-radius:4px;padding:10px 12px;font-size:.88rem}\n\ntable{width:100%;border-collapse:collapse}\nth,td{padding:.45rem 0;border-bottom:1px solid var(--line);text-align:right}\nth{text-align:left;font-weight:500}\n.tablewrap{overflow-x:auto}";
R.innerHTML='<style>'+CSS+'</style>'+
'<div class="root"><div class="wrap">'+
'<div class="grid">'+
 '<div class="stack">'+
  '<div class="panel stack">'+
   '<h2>1. Add or remove VAT</h2>'+
   '<div class="seg" role="radiogroup" aria-label="Direction"><label><input type="radio" name="dir" value="add" checked><span>Add VAT</span></label><label><input type="radio" name="dir" value="remove"><span>Remove VAT</span></label></div>'+
   '<div class="field"><label for="amt" id="amtlab">Amount excluding VAT</label><div class="money"><span>£</span><input type="text" inputmode="decimal" autocomplete="off" id="amt" value="1000" placeholder="0"></div></div>'+
   '<div class="field"><label for="rate">VAT rate</label><select id="rate"><option value="20">Standard rate, 20%</option><option value="5">Reduced rate, 5%</option><option value="0">Zero rate, 0%</option></select><p class="hint">Most goods and services are 20%. Domestic fuel and power and some energy-saving installations are 5%. Most food, books and children\'s clothes are zero-rated.</p></div>'+
  '</div>'+
  '<div class="panel stack">'+
   '<h2>2. Do I need to register for VAT?</h2>'+
   '<div class="field"><label for="t12">Taxable turnover in the last 12 months</label><div class="money"><span>£</span><input type="text" inputmode="decimal" autocomplete="off" id="t12" value="" placeholder="0"></div><p class="hint">Sales that are standard, reduced or zero rated. Leave out exempt sales and anything outside the scope of VAT.</p></div>'+
   '<div class="field"><label for="t30">Expected taxable turnover in the next 30 days</label><div class="money"><span>£</span><input type="text" inputmode="decimal" autocomplete="off" id="t30" value="" placeholder="0"></div><p class="hint">Only matters if one large job or contract could take you over the threshold on its own.</p></div>'+
   '<div class="field"><label for="reg">Are you already VAT registered?</label><select id="reg"><option value="no">No</option><option value="yes">Yes</option></select></div>'+
  '</div>'+
 '</div>'+
 '<div class="result">'+
  '<div class="answer" id="a1"></div>'+
  '<div class="panel" id="tbl"></div>'+
  '<div class="answer" id="a2"></div>'+
  '<div class="panel cta" id="cta"></div>'+
 '</div>'+
'</div>'+
'<details class="legalnote"><summary>What this estimate leaves out</summary><ul>'+
'<li>The threshold test is on VAT-taxable turnover only. It does not cover exempt supplies, such as most insurance, finance and education, or sales outside the scope of VAT.</li>'+
'<li>It does not cover registering because you take over a business, registering for overseas sales, or the special rules for distance sellers and non-UK businesses.</li>'+
'<li>Figures are the 2026/27 UK rates and the registration threshold of &pound;90,000 (deregistration &pound;88,000). Check GOV.UK before relying on them.</li>'+
'<li>Rounded to the nearest penny. Your invoices must show the VAT calculated on the total of each rate, so a line-by-line total can differ by a penny.</li>'+
'<li>General guidance only, not personal tax advice.</li></ul></details>'+
'</div></div>';
function $(id){return R.getElementById(id);}
function num(id){var v=($(id).value||'').replace(/[£,\s]/g,'');var x=parseFloat(v);return isFinite(x)&&x>0?x:0;}
function gbp(n){return '£'+n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2});}
function gbp0(n){return '£'+Math.round(n).toLocaleString('en-GB');}
function dir(){return R.querySelector('input[name=dir]:checked').value;}
function ctaHtml(lead){
  return '<h2>'+lead+'</h2><p class="small">We will check it against your real figures and tell you what we would do. No obligation.</p><div class="btns"><a class="btn" href="'+PR.contact+'" target="_blank" rel="noopener">Talk to '+PR.name+'</a></div><p class="small">Or call <span class="fig">'+PR.phone+'</span> or email <span class="fig">'+PR.email+'</span></p>';
}
function calc(){
  var d=dir(), a=num('amt'), r=parseFloat($('rate').value)/100, net, vat, gross;
  $('amtlab').textContent=d==='add'?'Amount excluding VAT':'Amount including VAT';
  if(d==='add'){net=a;vat=Math.round(a*r*100)/100;gross=Math.round((net+vat)*100)/100;}
  else{gross=a;net=Math.round(a/(1+r)*100)/100;vat=Math.round((gross-net)*100)/100;}
  if(a<=0){$('a1').className='answer';$('a1').innerHTML='<h2>Enter an amount</h2>';$('tbl').innerHTML='';}
  else{
    $('a1').className='answer';
    $('a1').innerHTML='<h2>'+(d==='add'?'Total with VAT: ':'Net price: ')+'<span class="fig">'+gbp(d==='add'?gross:net)+'</span></h2><p>VAT is <span class="fig">'+gbp(vat)+'</span> at '+(r*100)+'%.</p>';
    $('tbl').innerHTML='<div class="tablewrap"><table><tbody><tr><th scope="row">Net (excluding VAT)</th><td class="fig">'+gbp(net)+'</td></tr><tr><th scope="row">VAT at '+(r*100)+'%</th><td class="fig">'+gbp(vat)+'</td></tr><tr><th scope="row">Gross (including VAT)</th><td class="fig">'+gbp(gross)+'</td></tr></tbody></table></div>'+
      (d==='remove'&&r>0?'<p class="small">To remove VAT, divide the gross by '+(1+r).toFixed(2)+'. Taking '+(r*100)+'% off the gross gives the wrong answer, because VAT is charged on the net.</p>':'');
  }
  var t12=num('t12'), t30=num('t30'), reg=$('reg').value==='yes', cls='answer', h, p;
  if(reg){
    if(t12<=0){h='Already registered';p='Enter your last 12 months\' taxable turnover to check whether you could deregister.';}
    else if(t12<=DEREG){cls='answer good';h='You may be able to deregister';p='Taxable turnover of '+gbp0(t12)+' is at or below '+gbp0(DEREG)+'. You can apply to deregister if you expect it to stay at or below that figure over the next 12 months. Deregistering also means you stop reclaiming VAT on costs, so check it first.';}
    else{h='Stay registered';p='Taxable turnover of '+gbp0(t12)+' is above the '+gbp0(DEREG)+' deregistration threshold.';}
  } else if(t12<=0&&t30<=0){h='Enter your turnover';p='Add your taxable turnover for the last 12 months to check whether you need to register.';}
  else if(t12>THRESHOLD){cls='answer warn';h='You must register for VAT';p='Taxable turnover of '+gbp0(t12)+' is over '+gbp0(THRESHOLD)+'. You must tell HMRC within 30 days of the end of the month in which you went over. VAT is then due from the first day of the second month after you went over, or an earlier date agreed with HMRC. Late registration brings a penalty.';}
  else if(t30>THRESHOLD){cls='answer warn';h='You must register for VAT';p='You expect '+gbp0(t30)+' of taxable turnover in the next 30 days alone, which is over '+gbp0(THRESHOLD)+'. You must register by the end of that 30-day period, and VAT is due from the date you realised.';}
  else{cls='answer good';var head=THRESHOLD-t12;h='Registration not required';p='Taxable turnover of '+gbp0(t12)+' is '+gbp0(head)+' below the '+gbp0(THRESHOLD)+' threshold. Check again each month, because the test uses any rolling 12 months, not the tax year. You can still register voluntarily, which often helps if your customers are VAT-registered businesses that can reclaim the VAT you charge.';}
  $('a2').className=cls;$('a2').innerHTML='<h2>'+h+'</h2><p>'+p+'</p>';
  $('cta').innerHTML=ctaHtml(cls.indexOf('warn')>-1?'Need to register? We can do it for you.':'Not sure which VAT scheme suits you?');
}
['amt','rate','t12','t30','reg'].forEach(function(id){$(id).addEventListener('input',calc);$(id).addEventListener('change',calc);});
R.querySelectorAll('input[name=dir]').forEach(function(e){e.addEventListener('change',calc);});
calc();
})();
