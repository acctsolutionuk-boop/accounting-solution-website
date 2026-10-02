/* landlord. Embed: <div id="calc-landlord-tax" data-practice="fc"></div><script src="/calculators/landlord-tax.js" defer></script> */
(function(){
var MOUNT=document.getElementById('calc-landlord-tax'); if(!MOUNT) return;
if(!document.getElementById('calc-fonts')){var l=document.createElement('link');l.id='calc-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap';document.head.appendChild(l);}
var R=MOUNT.attachShadow({mode:'open'});
R.innerHTML="<style>/* Layout: inputs in a left column, the answer pinned in a right column; one column on phones. */\n:host{display:block;\n  --bg:#f6f7f7; --surface:#ffffff; --ink:#15211f; --muted:#5a6a67; --line:#d9e0de;\n  --accent:#0d5c57; --accent-ink:#ffffff; --accent-soft:#e1f0ee;\n  --good:#1d6b3a; --good-soft:#e3f2e8; --warn:#8a5a00; --warn-soft:#fbf0d9; --bad:#a3322b;\n  --font-body:'IBM Plex Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;\n  --font-fig:'IBM Plex Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace;\n}\n*{box-sizing:border-box}\n:host{color:var(--ink);font:15px/1.55 var(--font-body)} .root{background:var(--bg);padding:20px 16px 32px;border-radius:6px}\n.wrap{max-width:1040px;margin:0 auto}\nh1{font-size:1.6rem;line-height:1.2;margin:0 0 6px;text-wrap:balance;font-weight:600}\nh2{font-size:1.05rem;margin:0 0 4px;font-weight:600;text-wrap:balance}\np{margin:0}\n.lede{color:var(--muted);max-width:62ch;margin-bottom:20px}\n.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:20px;align-items:start}\n@media (max-width:820px){.grid{grid-template-columns:minmax(0,1fr)}}\n.panel{background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:18px}\n.stack{display:flex;flex-direction:column;gap:16px}\n.field{display:flex;flex-direction:column;gap:4px;min-width:0}\n.field label,.field .lab{font-weight:500}\n.hint{color:var(--muted);font-size:.85rem;line-height:1.4}\n.money{position:relative}\n.money span{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--muted);font-family:var(--font-fig)}\ninput[type=text],select{width:100%;font:inherit;font-family:var(--font-fig);color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:4px;padding:9px 10px;min-height:42px}\n.money input{padding-left:24px}\nselect{font-family:var(--font-body)}\ninput:focus-visible,select:focus-visible,button:focus-visible,a:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}\ninput[type=range]{width:100%;accent-color:var(--accent)}\n.row2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}\n@media (max-width:480px){.row2{grid-template-columns:minmax(0,1fr)}}\n.tag{display:inline-block;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:3px;padding:1px 6px;margin-left:6px;vertical-align:middle}\n.result{position:sticky;top:env(safe-area-inset-top,0px);display:flex;flex-direction:column;gap:14px}\n@media (max-width:820px){.result{position:static}}\n.answer{border-left:4px solid var(--accent);background:var(--accent-soft);padding:14px 16px;border-radius:0 6px 6px 0}\n.answer.good{border-color:var(--good);background:var(--good-soft)}\n.answer.warn{border-color:var(--warn);background:var(--warn-soft)}\n.answer h2{font-size:1.2rem;line-height:1.3}\n.answer p{margin-top:4px;color:var(--ink)}\n.fig{font-family:var(--font-fig);font-variant-numeric:tabular-nums}\n.tablewrap{overflow-x:auto}\ntable{width:100%;border-collapse:collapse;font-size:.92rem}\nth,td{padding:7px 8px;text-align:right;border-bottom:1px solid var(--line);white-space:nowrap}\nth:first-child,td:first-child{text-align:left;white-space:normal}\nth{font-weight:500;color:var(--muted);font-size:.8rem;text-transform:uppercase;letter-spacing:.05em}\ntd.n{font-family:var(--font-fig);font-variant-numeric:tabular-nums}\ntr.total td{font-weight:600;border-top:2px solid var(--ink);border-bottom:0}\ntr.sub td{color:var(--muted)}\n.cta{display:flex;flex-direction:column;gap:10px}\n.btn{display:inline-block;background:var(--accent);color:var(--accent-ink);text-decoration:none;font-weight:600;padding:11px 18px;border-radius:4px;text-align:center}\n.btn.ghost{background:transparent;color:var(--accent);border:1px solid var(--accent)}\n.btns{display:flex;flex-wrap:wrap;gap:10px}\ndetails{border-top:1px solid var(--line);padding-top:10px}\nsummary{cursor:pointer;font-weight:500}\ndetails ul{margin:8px 0 0;padding-left:18px;color:var(--muted)}\ndetails li+li{margin-top:4px}\n.small{font-size:.82rem;color:var(--muted)}\nsvg text{fill:var(--muted);font-family:var(--font-fig);font-size:11px}\nsvg .axis{stroke:var(--line);fill:none}\nsvg .zero{stroke:var(--ink);stroke-width:1}\nsvg .line{stroke:var(--accent);stroke-width:2;fill:none}\nsvg .you{stroke:var(--warn);stroke-width:1.5;stroke-dasharray:4 3}\nsvg .dot{fill:var(--warn)}\n.group{border-top:1px solid var(--line);padding-top:14px}\n.group:first-child{border-top:0;padding-top:0}\n.seg{display:flex;gap:0;border:1px solid var(--line);border-radius:4px;overflow:hidden}\n.seg label{flex:1;text-align:center;padding:9px 6px;cursor:pointer;font-weight:500;background:var(--bg);min-width:0}\n.seg input{position:absolute;opacity:0;pointer-events:none}\n.seg input:checked+span{color:var(--accent-ink)}\n.seg label:has(input:checked){background:var(--accent);color:var(--accent-ink)}\n.seg label:has(input:focus-visible){outline:2px solid var(--accent);outline-offset:-2px}\n.legalnote{margin-top:18px;max-width:80ch}\n[hidden]{display:none!important}\n.items{display:flex;flex-direction:column;gap:16px}\n\n\n.item{display:grid;grid-template-columns:minmax(0,1fr) 9.5rem;gap:4px 12px;align-items:start}\n@media (max-width:480px){.item{grid-template-columns:minmax(0,1fr)}}\n.item .what{min-width:0}\n.item .what b{font-weight:500;display:block}\n.gh{font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);font-weight:600;margin-bottom:10px}\n.no{background:var(--warn-soft);border-radius:4px;padding:10px 12px;font-size:.88rem}\n</style><div class=\"root\"><div class=\"wrap\">\n  <h1>How much tax will your rental income cost you?</h1>\n  <p class=\"lede\">List what you receive and what you spend on your let properties. You get your estimated tax bill, the mortgage interest rules applied, and what changes from April 2027. The figures below are an example. Replace them with yours.</p>\n  <div class=\"grid\">\n    <div class=\"stack\">\n      <div class=\"panel stack\">\n        <div class=\"gh\">About you</div>\n        <div class=\"field\"><span class=\"lab\">Tax year</span>\n          <div class=\"seg\" role=\"radiogroup\" aria-label=\"Tax year\">\n            <label><input type=\"radio\" name=\"ty\" value=\"2026/27\" checked><span>2026/27 (now)</span></label>\n            <label><input type=\"radio\" name=\"ty\" value=\"2027/28\"><span>2027/28 (from April 2027)</span></label>\n          </div></div>\n        <div class=\"row2\">\n          <div class=\"field\"><label for=\"own\">Who owns the properties?</label>\n            <select id=\"own\"><option value=\"100\">Just me</option><option value=\"50\">Me and my spouse or civil partner (50/50)</option><option value=\"custom\">Jointly, different split</option></select></div>\n          <div class=\"field\" id=\"shareBox\" hidden><label for=\"share\">Your share (%)</label><input type=\"text\" inputmode=\"decimal\" id=\"share\" value=\"50\"></div>\n        </div>\n        <div class=\"field\"><label for=\"other\">Your other income per year <span class=\"tag\">example</span></label><div id=\"otherBox\"></div>\n          <p class=\"hint\">Salary, self-employed profit or pension, before tax. Your rental profit is taxed on top of this.</p></div>\n        <p class=\"small\">Enter total figures for the properties. The calculator takes your share. Each person who owns a share files their own return.</p>\n      </div>\n\n      <div class=\"panel stack\">\n        <div class=\"gh\">Money coming in (whole year)</div>\n        <div id=\"inc\"></div>\n      </div>\n      <div class=\"panel stack\">\n        <div class=\"gh\">Costs you can claim (whole year)</div>\n        <div id=\"exp\"></div>\n      </div>\n      <div class=\"panel stack\">\n        <div class=\"gh\">Mortgage and loan costs</div>\n        <div id=\"fin\"></div>\n      </div>\n      <div class=\"no\"><b>Do not enter these.</b> They are not claimable against rent: buying a property, building work that improves it (extension, first-time double glazing, new central heating where there was none), capital repayments of your mortgage, stamp duty, your own time, and fines or penalties.</div>\n    </div>\n\n    <div class=\"result\" aria-live=\"polite\">\n      <div id=\"answer\" class=\"answer\"></div>\n      <div class=\"panel\">\n        <h2>The working</h2>\n        <div class=\"tablewrap\"><table id=\"tbl\"></table></div>\n        <p class=\"small\" id=\"notes\" style=\"margin-top:10px\"></p>\n      </div>\n      <div class=\"panel\" id=\"next\"></div>\n      <div class=\"panel cta\" id=\"cta\"></div>\n    </div>\n  </div>\n  <details class=\"legalnote\">\n    <summary>What this estimate leaves out</summary>\n    <ul>\n      <li>For homes let on ordinary tenancies by individuals. Not for holiday lets, Rent a Room, commercial property, or properties held in a company.</li>\n      <li>Capital gains when you sell, stamp duty, losses brought forward and the High Income Child Benefit Charge.</li>\n      <li>Dividends and savings interest. Other income is treated as ordinary income taxed at normal rates.</li>\n      <li>2027/28 figures use today's tax bands, which are frozen. They will change if the government changes them.</li>\n      <li>Replacing furniture and appliances is claimable only for like-for-like replacements, not the first time you furnish a property.</li>\n    </ul>\n  </details>\n  <p class=\"small legalnote\">General information only, not personal tax advice. Rates are England, Wales and Northern Ireland. Scottish taxpayers: ask us.</p>\n</div></div>";

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
  var INC=[
    ['rent','Rent received','Rent from tenants, including any paid late or in advance for the year.','18000'],
    ['svc','Service charges and ground rent you recharge','Amounts you collect from tenants to cover costs you pay.',''],
    ['park','Parking, garages and storage','Separate lets of garages, parking spaces and similar.',''],
    ['ins','Insurance payouts for lost rent','Rent guarantee or landlord insurance claims.',''],
    ['oth','Other property income','Laundry or vending income, tenant payments for damage, lease premiums.','']];
  var EXP=[
    ['e1','Rent, rates, insurance and ground rent','Buildings and contents insurance, ground rent, and rent you pay if you sublet.','650'],
    ['e2','Repairs and maintenance','Fixing what is broken, redecorating, like-for-like replacements. Not improvements.','1800'],
    ['e3','Agent, legal and accountancy fees','Letting and management fees, tenancy agreements, rent-collection and accounting costs.','1900'],
    ['e4','Services and bills you pay','Cleaning, gardening, utilities and council tax during voids, TV licence for communal areas.','400'],
    ['e5','Replacing furniture and appliances','Like-for-like replacement of items you supply: fridge, sofa, carpets. Not the first fit-out.',''],
    ['e6','Other costs of letting','Advertising, gas and electrical safety certificates, phone and software for the lettings, stationery, referencing.','350']];
  var FIN=[['f1','Mortgage interest','Interest only, not the capital you repay.','6000'],['f2','Loan interest and arrangement fees','Fees to set up or change a buy-to-let mortgage, interest on loans used for the properties.','']];
  function item(r){return '<div class="item"><div class="what"><label for="'+r[0]+'"><b>'+r[1]+'</b></label><span class="hint">'+r[2]+'</span></div>'+moneyInput(r[0],r[3])+'</div>';}
  $('otherBox').innerHTML=moneyInput('other','35000');
  $('inc').innerHTML='<div class="items">'+INC.map(item).join('')+'</div>';
  $('exp').innerHTML='<div class="items">'+EXP.map(item).join('')+'<div class="item"><div class="what"><label for="miles"><b>Business miles driven</b></label><span class="hint">Miles in your own car to visit, inspect and repair the properties. Claimed at 55p a mile for the first 10,000, then 25p.</span></div><div class="money"><input type="text" inputmode="decimal" id="miles" value="" placeholder="0 miles"></div></div></div>';
  $('fin').innerHTML='<div class="items">'+FIN.map(item).join('')+'</div>'+'<p class="hint">Mortgage interest is not deducted from your rent. You get a tax credit instead, worth 20% (22% from April 2027) of the interest, and the credit cannot exceed your tax on rental profit.</p>';

  function sum(list){return list.reduce(function(a,r){return a+num(r[0]);},0);}
  function row(l,v,cls){return '<tr class="'+(cls||'')+'"><td>'+l+'</td><td class="n">'+v+'</td></tr>';}
  function inputs(){
    var own=$('own').value, share=own==='custom'?Math.min(100,Math.max(0,parseFloat($('share').value)||0)):+own;
    $('shareBox').hidden=own!=='custom';
    var k=share/100, mi=num('miles'), mileage=Math.min(mi,10000)*0.55+Math.max(0,mi-10000)*0.25;
    return {share:share,income:sum(INC)*k,expenses:(sum(EXP)+mileage)*k,finance:sum(FIN)*k,other:num('other'),mileage:mileage*k};
  }
  function run(){
    var ty=R.querySelector('input[name=ty]:checked').value, other=ty==='2026/27'?'2027/28':'2026/27', i=inputs();
    if(i.income<=0){$('answer').className='answer';$('answer').innerHTML='<h2>Enter your rent to see your tax</h2>';$('tbl').innerHTML='';$('next').innerHTML='';$('notes').textContent='';$('cta').innerHTML=ctaHtml('Not sure what counts as rental income?');return;}
    var a=landlord(i,ty), b=landlord(i,other), nowL=ty==='2026/27'?a:b, nextL=ty==='2026/27'?b:a;
    var pct=a.income>0?a.due/a.income*100:0, mo=a.due/12;
    var cls=a.due===0?'good':'';
    $('answer').className='answer '+cls;
    $('answer').innerHTML='<h2>Your estimated tax on rental income is '+gbp(a.due)+' for '+ty+'</h2><p>'+(a.due===0?'Your claimable costs and the mortgage interest credit wipe out the tax.':'That is '+pct.toFixed(0)+'% of your rent, or about '+gbp(mo)+' a month to set aside. After costs, mortgage interest and tax you keep '+gbp(a.cashAfter)+'.')+'</p>';
    var t='';
    t+=row('Rent and other property income',gbp(a.income));
    if(a.useAllowance){t+=row('Less £1,000 property allowance (instead of your costs)',gbp(-Math.min(1000,a.income)),'sub');t+=row('Taxable rental profit',gbp(a.allowanceTaxable));}
    else{t+=row('Less claimable costs',gbp(-a.expenses),'sub');t+=row('Taxable rental profit',gbp(a.taxableProfit));}
    t+=row('Tax on that profit at your rates',gbp(a.useAllowance?a.dueAllowance:a.taxBeforeCredit),'sub');
    if(!a.useAllowance)t+=row('Less mortgage interest credit',gbp(-a.credit),'sub');
    t+=row('Tax due',gbp(a.due),'total');
    t+=row('Mortgage interest paid',gbp(a.finance),'sub');
    t+=row('Cash left after costs, interest and tax',gbp(a.cashAfter),'sub');
    $('tbl').innerHTML=t;
    var notes=[];
    if(a.useAllowance)notes.push('The £1,000 property allowance gives a lower bill than claiming your actual costs, so it is used here. You cannot claim both.');
    else if(a.income>1000&&a.expenses<1000)notes.push('Your costs are under £1,000, so check the property allowance. This estimate already picks whichever gives the lower tax.');
    if(a.carriedForward>0)notes.push('Your mortgage interest credit is capped by your rental profit and other income. '+gbp(a.carriedForward)+' of interest carries forward to a later year.');
    if(a.profit<0)notes.push('Your costs are higher than your rent. The loss of '+gbp(-a.profit)+' carries forward against future rental profit.');
    if(a.due>1000)notes.push('A bill over £1,000 usually means payments on account: next year\'s tax is paid in two instalments, in January and July, on top of the balance.');
    var gross=(i.income/Math.max(i.share,1)*100);
    if(gross>30000)notes.push('Rental income over £30,000 brings you into Making Tax Digital for Income Tax from April '+(gross>50000?'2026':'2027')+': digital records and quarterly updates to HMRC.');
    $('notes').innerHTML=notes.join('<br><br>');
    var d=nextL.due-nowL.due;
    $('next').innerHTML='<h2>From April 2027, property income is taxed at higher rates</h2><p class="hint">Rates on rent go up by 2 points to 22%, 42% and 47%. The mortgage interest credit rises to 22%.</p>'+
      '<div class="tablewrap"><table><tr><th></th><th>2026/27</th><th>2027/28</th></tr>'+row2('Estimated tax',gbp(a===nowL?nowL.due:nowL.due),gbp(nextL.due))+'</table></div>'+
      '<p style="margin-top:8px">'+(d>0?'On the same figures, the bill rises by about <b class="fig">'+gbp(d)+'</b>.':d<0?'On the same figures, the bill falls by about <b class="fig">'+gbp(-d)+'</b>.':'On the same figures, the bill does not change.')+'</p>';
    $('cta').innerHTML=ctaHtml(a.due>0?'Paying more than you should?':'Want this checked against your real records?');
  }
  function row2(l,a,b){return '<tr><td>'+l+'</td><td class="n">'+a+'</td><td class="n">'+b+'</td></tr>';}
  R.querySelectorAll('input,select').forEach(function(el){el.addEventListener('input',run);el.addEventListener('change',run);});
  run();
})();

})();
