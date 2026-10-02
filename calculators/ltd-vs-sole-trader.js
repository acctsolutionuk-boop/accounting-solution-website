/* ltd. Embed: <div id="calc-ltd-vs-sole-trader" data-practice="fc"></div><script src="/calculators/ltd-vs-sole-trader.js" defer></script> */
(function(){
var MOUNT=document.getElementById('calc-ltd-vs-sole-trader'); if(!MOUNT) return;
if(!document.getElementById('calc-fonts')){var l=document.createElement('link');l.id='calc-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap';document.head.appendChild(l);}
var R=MOUNT.attachShadow({mode:'open'});
R.innerHTML="<style>/* Layout: inputs in a left column, the answer pinned in a right column; one column on phones. */\n:host{display:block;\n  --bg:#f6f7f7; --surface:#ffffff; --ink:#15211f; --muted:#5a6a67; --line:#d9e0de;\n  --accent:#0d5c57; --accent-ink:#ffffff; --accent-soft:#e1f0ee;\n  --good:#1d6b3a; --good-soft:#e3f2e8; --warn:#8a5a00; --warn-soft:#fbf0d9; --bad:#a3322b;\n  --font-body:'IBM Plex Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;\n  --font-fig:'IBM Plex Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace;\n}\n*{box-sizing:border-box}\n:host{color:var(--ink);font:15px/1.55 var(--font-body)} .root{background:var(--bg);padding:20px 16px 32px;border-radius:6px}\n.wrap{max-width:1040px;margin:0 auto}\nh1{font-size:1.6rem;line-height:1.2;margin:0 0 6px;text-wrap:balance;font-weight:600}\nh2{font-size:1.05rem;margin:0 0 4px;font-weight:600;text-wrap:balance}\np{margin:0}\n.lede{color:var(--muted);max-width:62ch;margin-bottom:20px}\n.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:20px;align-items:start}\n@media (max-width:820px){.grid{grid-template-columns:minmax(0,1fr)}}\n.panel{background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:18px}\n.stack{display:flex;flex-direction:column;gap:16px}\n.field{display:flex;flex-direction:column;gap:4px;min-width:0}\n.field label,.field .lab{font-weight:500}\n.hint{color:var(--muted);font-size:.85rem;line-height:1.4}\n.money{position:relative}\n.money span{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--muted);font-family:var(--font-fig)}\ninput[type=text],select{width:100%;font:inherit;font-family:var(--font-fig);color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:4px;padding:9px 10px;min-height:42px}\n.money input{padding-left:24px}\nselect{font-family:var(--font-body)}\ninput:focus-visible,select:focus-visible,button:focus-visible,a:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}\ninput[type=range]{width:100%;accent-color:var(--accent)}\n.row2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}\n@media (max-width:480px){.row2{grid-template-columns:minmax(0,1fr)}}\n.tag{display:inline-block;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:3px;padding:1px 6px;margin-left:6px;vertical-align:middle}\n.result{position:sticky;top:env(safe-area-inset-top,0px);display:flex;flex-direction:column;gap:14px}\n@media (max-width:820px){.result{position:static}}\n.answer{border-left:4px solid var(--accent);background:var(--accent-soft);padding:14px 16px;border-radius:0 6px 6px 0}\n.answer.good{border-color:var(--good);background:var(--good-soft)}\n.answer.warn{border-color:var(--warn);background:var(--warn-soft)}\n.answer h2{font-size:1.2rem;line-height:1.3}\n.answer p{margin-top:4px;color:var(--ink)}\n.fig{font-family:var(--font-fig);font-variant-numeric:tabular-nums}\n.tablewrap{overflow-x:auto}\ntable{width:100%;border-collapse:collapse;font-size:.92rem}\nth,td{padding:7px 8px;text-align:right;border-bottom:1px solid var(--line);white-space:nowrap}\nth:first-child,td:first-child{text-align:left;white-space:normal}\nth{font-weight:500;color:var(--muted);font-size:.8rem;text-transform:uppercase;letter-spacing:.05em}\ntd.n{font-family:var(--font-fig);font-variant-numeric:tabular-nums}\ntr.total td{font-weight:600;border-top:2px solid var(--ink);border-bottom:0}\ntr.sub td{color:var(--muted)}\n.cta{display:flex;flex-direction:column;gap:10px}\n.btn{display:inline-block;background:var(--accent);color:var(--accent-ink);text-decoration:none;font-weight:600;padding:11px 18px;border-radius:4px;text-align:center}\n.btn.ghost{background:transparent;color:var(--accent);border:1px solid var(--accent)}\n.btns{display:flex;flex-wrap:wrap;gap:10px}\ndetails{border-top:1px solid var(--line);padding-top:10px}\nsummary{cursor:pointer;font-weight:500}\ndetails ul{margin:8px 0 0;padding-left:18px;color:var(--muted)}\ndetails li+li{margin-top:4px}\n.small{font-size:.82rem;color:var(--muted)}\nsvg text{fill:var(--muted);font-family:var(--font-fig);font-size:11px}\nsvg .axis{stroke:var(--line);fill:none}\nsvg .zero{stroke:var(--ink);stroke-width:1}\nsvg .line{stroke:var(--accent);stroke-width:2;fill:none}\nsvg .you{stroke:var(--warn);stroke-width:1.5;stroke-dasharray:4 3}\nsvg .dot{fill:var(--warn)}\n.group{border-top:1px solid var(--line);padding-top:14px}\n.group:first-child{border-top:0;padding-top:0}\n.seg{display:flex;gap:0;border:1px solid var(--line);border-radius:4px;overflow:hidden}\n.seg label{flex:1;text-align:center;padding:9px 6px;cursor:pointer;font-weight:500;background:var(--bg);min-width:0}\n.seg input{position:absolute;opacity:0;pointer-events:none}\n.seg input:checked+span{color:var(--accent-ink)}\n.seg label:has(input:checked){background:var(--accent);color:var(--accent-ink)}\n.seg label:has(input:focus-visible){outline:2px solid var(--accent);outline-offset:-2px}\n.legalnote{margin-top:18px;max-width:80ch}\n[hidden]{display:none!important}\n.items{display:flex;flex-direction:column;gap:16px}\n\n\n\n.linkbtn{font:inherit;color:var(--accent);background:none;border:0;padding:6px 0;cursor:pointer;text-decoration:underline;text-underline-offset:3px;font-weight:600;text-align:left}\n.benefits{margin-top:28px;background:var(--accent-soft);border:1px solid var(--line);border-radius:6px;padding:26px 22px}\n.benefits h2{font-size:1.45rem;line-height:1.25;margin-bottom:8px;max-width:30ch}\n.benefits .intro{max-width:64ch;margin-bottom:20px}\n.bgrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}\n@media (max-width:900px){.bgrid{grid-template-columns:repeat(2,minmax(0,1fr))}}\n@media (max-width:560px){.bgrid{grid-template-columns:minmax(0,1fr)}.benefits{padding:20px 16px}}\n.bcard{background:var(--surface);border:1px solid var(--line);border-radius:4px;padding:16px;min-width:0}\n.bcard .cat{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);font-weight:600}\n.bcard h3{font-size:1.05rem;line-height:1.3;margin:4px 0 6px;font-weight:600;text-wrap:balance}\n.bcard p{font-size:.93rem;color:var(--ink)}\n.bcard .fine{margin-top:8px;font-size:.82rem;color:var(--muted)}\n.tradeoffs{margin-top:16px;border-top:1px solid var(--line);padding-top:12px}\n.bcta{margin-top:18px;display:flex;flex-wrap:wrap;gap:12px;align-items:center}\n</style><div class=\"root\"><div class=\"wrap\">\n  <h1>Limited company or sole trader: which leaves you with more?</h1>\n  <p class=\"lede\">Enter what your business makes in a year. You get a straight answer on tax and National Insurance for 2026/27, with the working underneath. The figures below are an example. Replace them with yours.</p>\n  <div class=\"grid\">\n    <div class=\"panel stack\" aria-label=\"Your figures\">\n      <div class=\"field\">\n        <label for=\"profit\">What the business makes in a year <span class=\"tag\">example</span></label>\n        <div id=\"profitBox\"></div>\n        <p class=\"hint\">Sales minus business costs, before you pay yourself anything. This is your profit.</p>\n      </div>\n      <div class=\"field\">\n        <label for=\"other\">Other income you already have</label>\n        <div id=\"otherBox\"></div>\n        <p class=\"hint\">A job, pension or rental profit, per year. Leave blank if none. It pushes your business profit into higher tax bands.</p>\n      </div>\n      <div class=\"field\">\n        <label for=\"extra\">Extra yearly cost of running a company</label>\n        <div id=\"extraBox\"></div>\n        <p class=\"hint\">Company accounts, Companies House filing and payroll cost more than sole trader accounts. Enter the extra amount, or leave blank to ignore it.</p>\n      </div>\n      <div class=\"field\">\n        <label for=\"retain\">How much of the company's profit do you leave in the company? <b class=\"fig\" id=\"retainOut\">0%</b></label>\n        <input type=\"range\" id=\"retain\" min=\"0\" max=\"100\" step=\"10\" value=\"0\">\n        <p class=\"hint\">0% means you take everything out as pay and dividends, to spend. Profit left in the company is taxed at company rates now and taxed again when you take it out.</p>\n      </div>\n      <p class=\"small\">England, Wales and Northern Ireland tax rates. Scottish taxpayers: ask us.</p>\n    </div>\n\n    <div class=\"result\" aria-live=\"polite\">\n      <div id=\"answer\" class=\"answer\"></div>\n      <div class=\"panel\">\n        <h2>The working</h2>\n        <div class=\"tablewrap\"><table id=\"tbl\"></table></div>\n        <p class=\"small\" id=\"how\" style=\"margin-top:10px\"></p>\n      </div>\n      <div class=\"panel\">\n        <h2>Where the answer changes as profit grows</h2>\n        <p class=\"hint\">Money kept with a company, minus money kept as a sole trader, at each profit level. Above the line favours a company.</p>\n        <div id=\"chart\"></div>\n      </div>\n      <div class=\"panel cta\" id=\"cta\"></div>\n    </div>\n  </div>\n  <section class=\"benefits\" id=\"benefits\" aria-labelledby=\"bh\">\n    <h2 id=\"bh\">What a limited company gives you that a tax figure cannot show</h2>\n    <p class=\"intro\">The comparison above counts tax only. Most people who run a company would say tax was never the main reason. Here is what the extra cost buys.</p>\n    <div class=\"bgrid\">\n      <article class=\"bcard\"><span class=\"cat\">Protection</span><h3>Your home and savings stay out of it</h3>\n        <p>A company is its own legal person. If the business owes money it cannot pay, creditors go after the company, not your house or your savings.</p>\n        <p class=\"fine\">Exceptions: personal guarantees you sign for loans or leases, and directors who keep trading while insolvent or break the rules.</p></article>\n      <article class=\"bcard\"><span class=\"cat\">Profit</span><h3>Keep profit in the business at 19%</h3>\n        <p>Profit you leave in the company is taxed at 19% on the first \u00a350,000, and up to 25% above that. A sole trader pays 20% to 45% income tax plus National Insurance on every pound, spent or not.</p>\n        <p class=\"fine\">Money you take out later is taxed again, so this is about timing and flexibility. Use the slider above to see it.</p></article>\n      <article class=\"bcard\"><span class=\"cat\">Flexibility</span><h3>You choose when to take the money</h3>\n        <p>Pay yourself a steady salary and draw dividends when it suits you. A strong year does not have to push you into the 40% band, and a quiet year does not stop your pay.</p>\n        <p class=\"fine\">Dividends can only be paid from profit the company has already made.</p></article>\n      <article class=\"bcard\"><span class=\"cat\">Pensions</span><h3>Pay into a pension from the company</h3>\n        <p>Employer pension contributions come out of profit before corporation tax, and they are not limited by your salary. The cap is your annual allowance, \u00a360,000 for most people.</p></article>\n      <article class=\"bcard\"><span class=\"cat\">Credibility</span><h3>Look like the bigger business</h3>\n        <p>Many larger clients, agencies and councils prefer or insist on a limited company as a supplier. Banks and landlords tend to treat it as an established business.</p></article>\n      <article class=\"bcard\"><span class=\"cat\">Growth</span><h3>Built to grow, share and sell</h3>\n        <p>Bring in a partner or key staff with shares, raise money from investors (including through EIS and SEIS), or sell by selling the shares. The company carries on if you are ill or step back, and contracts stay in its name.</p></article>\n    </div>\n    <details class=\"tradeoffs\">\n      <summary>The trade-offs, so you decide with open eyes</summary>\n      <ul>\n        <li>A company costs more to run: annual accounts, a confirmation statement, a corporation tax return and payroll for your salary.</li>\n        <li>Accounts and director details go on the public Companies House record.</li>\n        <li>Company money is not your money. You take it out as salary, dividends or a properly recorded director's loan.</li>\n        <li>Directors carry legal duties, and late filing brings penalties.</li>\n      </ul>\n    </details>\n    <div class=\"bcta\" id=\"bcta\"></div>\n  </section>\n  <details class=\"legalnote\">\n    <summary>What this estimate leaves out</summary>\n    <ul>\n      <li>VAT, student loan repayments, pension contributions, capital allowances and the High Income Child Benefit Charge.</li>\n      <li>Other income is treated as already taxed through PAYE or elsewhere. Only the extra tax caused by this business is counted.</li>\n      <li>A company with other employees may qualify for the Employment Allowance, which this ignores. Companies with associated companies share the corporation tax limits.</li>\n      <li>Non-tax reasons for choosing a company: limited liability, how clients see you, mortgage applications, and the extra paperwork. A sole trader files one return. A company files accounts, a corporation tax return and a confirmation statement, and the director also files a personal return.</li>\n      <li>Contractors working through their own company should check IR35 before relying on any figure here.</li>\n    </ul>\n  </details>\n  <p class=\"small legalnote\">General information only, not personal tax advice. Rates are the published 2026/27 figures. Your own result depends on your full circumstances.</p>\n</div></div>";

/* Tax engine. Rates: England, Wales and Northern Ireland. Sources: gov.uk rates and thresholds 2026/27; Finance Act 2026 (property rates from 6 April 2027). */
var TY = {
  '2026/27': { pa:12570, taperAt:100000, basicBand:37700, addl:125140,
    nonDiv:[.20,.40,.45], prop:[.20,.40,.45], div:[.1075,.3575,.3935], divAllow:500, s24:.20,
    ni:{pt:12570, uel:50270, st:5000, ee:.08, eeUp:.02, er:.15}, c4:{lpl:12570, upl:50270, main:.06, up:.02},
    ct:{small:.19, main:.25, lo:50000, hi:250000} },
  '2027/28': { pa:12570, taperAt:100000, basicBand:37700, addl:125140,
    nonDiv:[.20,.40,.45], prop:[.22,.42,.47], div:[.1075,.3575,.3935], divAllow:500, s24:.22,
    ni:{pt:12570, uel:50270, st:5000, ee:.08, eeUp:.02, er:.15}, c4:{lpl:12570, upl:50270, main:.06, up:.02},
    ct:{small:.19, main:.25, lo:50000, hi:250000} }
};
function bandSplit(start, len, t){
  var edges=[0,t.basicBand,t.addl,Infinity], out=[0,0,0], end=start+len;
  for(var i=0;i<3;i++){ out[i]=Math.max(0, Math.min(end,edges[i+1])-Math.max(start,edges[i])); }
  return out;
}
function dot(a,r){ return a[0]*r[0]+a[1]*r[1]+a[2]*r[2]; }
function incomeTax(i, ty){
  var t=TY[ty], nd=Math.max(0,i.nd||0), pr=Math.max(0,i.prop||0), dv=Math.max(0,i.div||0);
  var ani=nd+pr+dv, pa=Math.max(0, t.pa-Math.max(0,(ani-t.taperAt)/2));
  var left=pa, ndT=Math.max(0,nd-left); left=Math.max(0,left-nd);
  var prT=Math.max(0,pr-left); left=Math.max(0,left-pr);
  var dvT=Math.max(0,dv-left), pos=0;
  var tNd=dot(bandSplit(pos,ndT,t),t.nonDiv); pos+=ndT;
  var tPr=dot(bandSplit(pos,prT,t),t.prop); pos+=prT;
  var free=Math.min(dvT,t.divAllow); pos+=free;
  var tDv=dot(bandSplit(pos,dvT-free,t),t.div);
  return {tax:tNd+tPr+tDv, nd:tNd, prop:tPr, div:tDv, pa:pa};
}
function class4(p, ty){
  var c=TY[ty].c4; if(p<=c.lpl) return 0;
  return (Math.min(p,c.upl)-c.lpl)*c.main + Math.max(0,p-c.upl)*c.up;
}
function class1Employee(s, ty){
  var n=TY[ty].ni; if(s<=n.pt) return 0;
  return (Math.min(s,n.uel)-n.pt)*n.ee + Math.max(0,s-n.uel)*n.eeUp;
}
function employerNI(s, ty){ var n=TY[ty].ni; return Math.max(0,s-n.st)*n.er; }
function corpTax(p, ty){
  var c=TY[ty].ct; if(p<=0) return 0;
  if(p<=c.lo) return p*c.small;
  if(p>=c.hi) return p*c.main;
  return p*c.main - (3/200)*(c.hi-p);
}
function soleTrader(P, other, ty){
  var base=incomeTax({nd:other},ty).tax, full=incomeTax({nd:other+P},ty);
  var it=full.tax-base, ni=class4(P,ty);
  return {incomeTax:it, ni:ni, totalTax:it+ni, net:P-it-ni};
}
function ltdScenario(P, extra, other, S, ty, retain){
  retain=Math.min(1,Math.max(0,retain||0));
  var er=employerNI(S,ty), cp=P-extra-S-er;
  if(cp<0) return null;
  var ct=corpTax(cp,ty), Dall=cp-ct, D=Dall*(1-retain), kept=Dall*retain, ee=class1Employee(S,ty);
  var base=incomeTax({nd:other},ty).tax, full=incomeTax({nd:other+S,div:D},ty);
  var itSalary=(full.nd)-incomeTax({nd:other},ty).nd, itDiv=full.div;
  var personal=full.tax-base;
  var total=ct+er+ee+personal;
  return {salary:S, dividends:D, employerNI:er, corpTax:ct, employeeNI:ee, incomeTax:itSalary, divTax:itDiv,
    totalTax:total, net:S+D-personal-ee, retained:kept, keep:S+D-personal-ee+kept, companyProfit:cp};
}
function ltdBest(P, extra, other, ty, retain){
  var best=null, cands={0:1,5000:1,12570:1}, s;
  for(s=0;s<=Math.min(P,60000);s+=50) cands[s]=1;
  Object.keys(cands).forEach(function(k){
    var r=ltdScenario(P,extra,other,+k,ty,retain);
    if(r && (!best || r.keep>best.keep+0.005 || (Math.abs(r.keep-best.keep)<=0.005 && r.salary<best.salary))) best=r;
  });
  return best;
}
/* Landlord (individual, residential lets, non-FHL). All inputs are the user's own share, per year. */
function landlord(inp, ty){
  var t=TY[ty], other=Math.max(0,inp.other||0), inc=inp.income, exp=inp.expenses, fin=inp.finance;
  function routeTax(profit){ return incomeTax({nd:other,prop:profit},ty).tax - incomeTax({nd:other},ty).tax; }
  var profitA=inc-exp, taxableA=Math.max(0,profitA), taxA=routeTax(taxableA);
  var headroom=Math.max(0, other+taxableA-t.pa);
  var creditBase=Math.min(fin, taxableA, headroom), credit=t.s24*creditBase;
  var dueA=Math.max(0,taxA-credit);
  var taxableB=Math.max(0,inc-1000), taxB=inc>0?routeTax(taxableB):0;
  var useAllowance = inc>0 && taxB < dueA - 0.005;
  return {income:inc, expenses:exp, finance:fin, profit:profitA, taxableProfit:taxableA,
    taxBeforeCredit:taxA, credit:credit, dueActual:dueA, dueAllowance:taxB, useAllowance:useAllowance,
    due: useAllowance?taxB:dueA, carriedForward:Math.max(0,fin-creditBase),
    cashAfter: inc-exp-fin-(useAllowance?taxB:dueA), allowanceTaxable:taxableB};
}

var PRACTICES={
  fc:{name:'Fitzpatrick Co',contact:'https://accountantsbrighton.co.uk/contact',phone:'07534 476727',email:'info@fitzpatrickco.uk',onboard:'https://onboarding.acctsolution.co.uk/'},
  as:{name:'Accounting Solution',contact:'https://acctsolution.co.uk/contact/',phone:'07534 476727',email:'info@acctsolution.co.uk',onboard:'https://onboarding.acctsolution.co.uk/'}
};
var P=MOUNT.getAttribute('data-practice')||'as', PR=PRACTICES[P];
function gbp(n){var r=Math.round(n);return (r<0?'-':'')+'£'+Math.abs(r).toLocaleString('en-GB');}
function num(id){var v=(R.getElementById(id).value||'').replace(/[£,\s]/g,'');var x=parseFloat(v);return isFinite(x)&&x>0?x:0;}
function $(id){return R.getElementById(id);}
function ctaHtml(lead){
  var contact='<div class="btns"><a class="btn" href="'+PR.contact+'" target="_blank" rel="noopener">Talk to '+PR.name+'</a></div>';
  var det=(PR.phone?'<p class="small">Or call <span class="fig">'+PR.phone+'</span>':'')+(PR.email?(PR.phone?' or email ':'<p class="small">Email ')+'<span class="fig">'+PR.email+'</span>':'')+(PR.phone||PR.email?'</p>':'');
  return '<h2>'+lead+'</h2><p class="small">We will run this on your real figures and tell you what we would do. No obligation.</p>'+contact+det;
}
function moneyInput(id,val){return '<div class="money"><span>£</span><input type="text" inputmode="decimal" autocomplete="off" id="'+id+'" value="'+(val||'')+'" placeholder="0"></div>';}

(function(){
  var TYR='2026/27';
  $('profitBox').innerHTML=moneyInput('profit','55000');
  $('otherBox').innerHTML=moneyInput('other','');
  $('extraBox').innerHTML=moneyInput('extra','');
  function ltdBestSafe(p,x,o,r){return ltdBest(p,x,o,TYR,r);}
  function row(label,a,b,cls){return '<tr class="'+(cls||'')+'"><td>'+label+'</td><td class="n">'+a+'</td><td class="n">'+b+'</td></tr>';}
  function chart(p,x,o,r){
    var W=640,H=230,ml=62,mr=14,mt=14,mb=34;
    var maxP=Math.max(120000,Math.ceil(p*1.25/10000)*10000), minP=15000, pts=[], i, step=Math.max(2000,Math.round((maxP-minP)/36/1000)*1000);
    for(var v=minP;v<=maxP;v+=step){var a=ltdBestSafe(v,x,o,r), s=soleTrader(v,o,TYR); pts.push([v,a?a.keep-x*0-s.net:null]);}
    pts=pts.filter(function(q){return q[1]!==null;});
    var lo=Math.min.apply(null,pts.map(function(q){return q[1];}).concat([0])), hi=Math.max.apply(null,pts.map(function(q){return q[1];}).concat([0]));
    var span=hi-lo||1000, nice=Math.pow(10,Math.floor(Math.log10(span/4))), unit=[1,2,5,10].map(function(m){return m*nice;}).filter(function(u){return span/u<=6;})[0]||nice*10;
    lo=Math.floor(lo/unit)*unit; hi=Math.ceil(hi/unit)*unit; if(hi===lo)hi=lo+unit;
    function X(v){return ml+(v-minP)/(maxP-minP)*(W-ml-mr);} function Y(v){return mt+(hi-v)/(hi-lo)*(H-mt-mb);}
    var g='';
    for(var t=lo;t<=hi+1e-6;t+=unit){g+='<line class="axis" x1="'+ml+'" x2="'+(W-mr)+'" y1="'+Y(t)+'" y2="'+Y(t)+'"/><text x="'+(ml-6)+'" y="'+(Y(t)+4)+'" text-anchor="end">'+gbp(t)+'</text>';}
    for(var xv=20000;xv<=maxP;xv+=20000){g+='<text x="'+X(xv)+'" y="'+(H-12)+'" text-anchor="middle">'+(xv/1000)+'k</text>';}
    g+='<line class="zero" x1="'+ml+'" x2="'+(W-mr)+'" y1="'+Y(0)+'" y2="'+Y(0)+'"/>';
    g+='<polyline class="line" points="'+pts.map(function(q){return X(q[0]).toFixed(1)+','+Y(q[1]).toFixed(1);}).join(' ')+'"/>';
    var mine=ltdBestSafe(p,x,o,r), sole=soleTrader(p,o,TYR);
    if(mine&&p>=minP&&p<=maxP){var d=mine.keep-sole.net; g+='<line class="you" x1="'+X(p)+'" x2="'+X(p)+'" y1="'+mt+'" y2="'+(H-mb)+'"/><circle class="dot" cx="'+X(p)+'" cy="'+Y(d)+'" r="4.5" fill="currentColor"/>';}
    $('chart').innerHTML='<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="Difference in money kept, company minus sole trader, by profit level">'+g+'</svg><p class="small">Dashed line marks your profit. Profit shown along the bottom, £ per year.</p>';
  }
  function run(){
    var p=num('profit'), o=num('other'), x=num('extra'), r=+$('retain').value/100;
    $('retainOut').textContent=Math.round(r*100)+'%';
    if(p<=0){$('answer').className='answer';$('answer').innerHTML='<h2>Enter your yearly profit to see the answer</h2>';$('tbl').innerHTML='';$('chart').innerHTML='';$('how').textContent='';$('cta').innerHTML=ctaHtml('Not sure what your profit is?');$('bcta').innerHTML='';return;}
    var s=soleTrader(p,o,TYR), l=ltdBestSafe(p,x,o,r);
    if(!l){$('answer').innerHTML='<h2>The extra running cost is higher than the profit</h2>';return;}
    var sKeep=s.net, lKeep=l.keep-0, diff=lKeep-sKeep, cls, head, sub;
    if(Math.abs(diff)<300){cls='warn';head='Too close to call: within '+gbp(300)+' either way';sub='At this level the tax difference is smaller than the extra admin of a company. Other reasons should decide it.';}
    else if(diff<0){cls='';head='Staying a sole trader leaves you about '+gbp(-diff)+' a year better off';sub='A company would keep '+gbp(lKeep)+' against '+gbp(sKeep)+' as a sole trader.'+(r===0?' The saving from lower National Insurance is outweighed by corporation tax, higher dividend tax and employer National Insurance.':'');}
    else{cls='good';head='A limited company leaves you about '+gbp(diff)+' a year better off';sub='A company would keep '+gbp(lKeep)+' against '+gbp(sKeep)+' as a sole trader.'+(r>0?' Part of that is profit left in the company, which is taxed again when you take it out. Treat it as a delay in tax, not a permanent saving.':'');}
    $('answer').className='answer '+cls;
    var price=diff<300?('<p style="margin-top:8px">'+(diff<0?'That works out at about <b class="fig">'+gbp(-diff/12)+' a month</b> for the protections and options of a company. ':'')+'Tax is only part of this decision. <button type="button" class="linkbtn" id="seeBenefits">See what else a limited company gives you</button></p>'):'<p style="margin-top:8px"><button type="button" class="linkbtn" id="seeBenefits">See what else a limited company gives you</button></p>';
    $('answer').innerHTML='<h2>'+head+'</h2><p>'+sub+'</p>'+price;
    $('seeBenefits').addEventListener('click',function(){var e=$('benefits');if(e&&e.scrollIntoView)e.scrollIntoView({behavior:'smooth',block:'start'});});
    var t='<tr><th></th><th>Sole trader</th><th>Limited company</th></tr>';
    t+=row('Business profit',gbp(p),gbp(p));
    if(x>0)t+=row('Extra company running cost','',gbp(-x),'sub');
    t+=row('Corporation tax','',gbp(-l.corpTax),'sub');
    t+=row('Income tax',gbp(-s.incomeTax),gbp(-l.incomeTax),'sub');
    t+=row('Dividend tax','',gbp(-l.divTax),'sub');
    t+=row('National Insurance (you)',gbp(-s.ni),gbp(-l.employeeNI),'sub');
    t+=row('National Insurance (company)','',gbp(-l.employerNI),'sub');
    t+=row('Total tax and National Insurance',gbp(s.totalTax),gbp(l.totalTax),'');
    if(r>0)t+=row('Left in the company','',gbp(l.retained),'sub');
    t+=row('You keep'+(r>0?' (including company cash)':''),gbp(sKeep),gbp(lKeep),'total');
    $('tbl').innerHTML=t;
    $('how').textContent='Company set-up assumed: you pay yourself a salary of '+gbp(l.salary)+' (chosen to give the best result) and take '+(r>0?'part of ':'')+'the remaining profit as dividends of '+gbp(l.dividends)+'. Dividends over £500 are taxed at 10.75% or 35.75%.';
    chart(p,x,o,r);
    $('cta').innerHTML=ctaHtml(diff>=300?'Thinking of incorporating?':'Want this checked against your real accounts?');
    $('bcta').innerHTML='<a class="btn" href="'+PR.contact+'" target="_blank" rel="noopener">Talk to '+PR.name+' about a limited company</a><span class="small">We will compare both routes on your real numbers.</span>';
  }
  ['profit','other','extra'].forEach(function(id){$(id).addEventListener('input',run);});
  $('retain').addEventListener('input',run);
  run();
})();

})();
