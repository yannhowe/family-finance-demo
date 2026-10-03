const months=[48,55,43,64,51,76,58,62,46,69,53,60];
const labels=["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const categories=[
  {name:"Housing & utilities",amount:"S$25,480",share:30,rule:"Fixed household commitments and utility merchants",rows:38},
  {name:"Groceries",amount:"S$14,920",share:18,rule:"Verified grocery and household-supply merchants",rows:214},
  {name:"Transport",amount:"S$11,760",share:14,rule:"Transit, ride hailing, fuel and parking",rows:176},
  {name:"Kids & education",amount:"S$9,640",share:11,rule:"School, books, lessons and child activities",rows:82},
  {name:"Dining",amount:"S$8,310",share:10,rule:"Restaurants, cafés and takeaway",rows:263},
  {name:"Other",amount:"S$14,150",share:17,rule:"Travel, healthcare and reviewed personal spend",rows:147},
];
const documents=[
  ["2026-03-demo-bank-a.pdf","Bank A v3","68","9f2a…c41e","included"],
  ["2026-03-demo-card-b.pdf","Card B v2","94","4e7c…a2d0","included"],
  ["2026-02-demo-bank-a-copy.pdf","Bank A v3","0","b891…911c","duplicate"],
  ["2026-02-demo-card-b.pdf","Card B v2","87","8ac1…61e2","included"],
  ["2026-01-demo-wallet.pdf","Wallet v1","23","112d…b7a4","review"],
  ["2026-01-demo-bank-a.pdf","Bank A v3","72","a6fc…f821","included"],
];
const checks=[
  ["Imported rows are immutable","1,108 attempt rows retained","Pass"],
  ["Document fingerprints are unique","1 duplicate excluded from totals","Pass"],
  ["Credits never inflate spend","43 refunds classified separately","Pass"],
  ["Evidence pools do not overlap","64 budget lines reconciled once","Pass"],
];
const budgets=[["Core living","S$4,320 / month",88],["Travel sinking fund","S$720 / month",64],["Insurance & tax","S$1,180 / month",97],["Flexible spending","S$1,040 / month",73]];

document.querySelector('#monthly-chart').innerHTML=months.map((value,i)=>`<div class="month-bar"><i style="height:${value/76*100}%" title="${labels[i]}: synthetic index ${value}"></i><span>${labels[i]}</span></div>`).join('');
document.querySelector('#category-list').innerHTML=categories.map((item,i)=>`<button class="category-row" data-category="${i}"><span class="row-head"><strong>${item.name}</strong><b>${item.amount}</b></span><small>${item.share}% of net spend · ${item.rows} rows</small><span class="bar"><i style="width:${item.share/30*100}%"></i></span></button>`).join('');
document.querySelector('#document-rows').innerHTML=documents.map(d=>`<tr><td><strong>${d[0]}</strong></td><td>${d[1]}</td><td>${d[2]}</td><td><code>${d[3]}</code></td><td><span class="status ${d[4]}">${d[4]}</span></td></tr>`).join('');
document.querySelector('#checks').innerHTML=checks.map(c=>`<div class="check"><b>✓</b><span><b>${c[0]}</b><small>${c[1]}</small></span><strong>${c[2]}</strong></div>`).join('');
document.querySelector('#budget-rows').innerHTML=budgets.map(b=>`<div class="budget-row"><div><span><b>${b[0]}</b><small> · ${b[2]}% evidence coverage</small></span><strong>${b[1]}</strong></div><span class="bar"><i style="width:${b[2]}%"></i></span></div>`).join('');

document.querySelectorAll('.tabs button').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.tabs button').forEach(item=>item.classList.toggle('active',item===button));
  document.querySelectorAll('.view').forEach(view=>view.classList.toggle('active',view.id===button.dataset.view));
}));

const drawer=document.querySelector('#drawer');
const backdrop=document.querySelector('#backdrop');
function openTrace(item){
  document.querySelector('#drawer-title').textContent=item.name;
  document.querySelector('#drawer-content').innerHTML=`<div class="trail"><div class="trail-step"><b>Dashboard aggregate</b><small>${item.amount} across ${item.rows} included synthetic rows.</small></div><div class="trail-step"><b>Classification rule</b><small>${item.rule}.</small><div class="source-box">reporting_category = ${item.name.toLowerCase().replaceAll(' ','_').replace('&','and')}</div></div><div class="trail-step"><b>Canonical transaction</b><small>2026-03-14 · DEMO MARKET · S$84.20 · included</small><div class="source-box">txn_demo_01JQ8B4K2Y7M</div></div><div class="trail-step"><b>Source statement</b><small>Parsed deterministically from an invented document. The private system links this step to the original local PDF.</small><div class="source-box">2026-03-demo-bank-a.pdf · page 2 · row 18</div></div></div>`;
  drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');backdrop.hidden=false;
}
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>openTrace(categories[Number(button.dataset.category)])));
document.querySelector('#trace-demo').addEventListener('click',()=>openTrace(categories[1]));
function closeDrawer(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');backdrop.hidden=true;}
document.querySelector('.drawer-close').addEventListener('click',closeDrawer);
backdrop.addEventListener('click',closeDrawer);
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeDrawer();});
