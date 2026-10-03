const categoryMeta = [
  { name: "Housing & utilities", tier: "Essentials", monthly: 1980, total: 23760, rule: "Known property, energy and connectivity merchants." },
  { name: "Kids & education", tier: "Family", monthly: 1260, total: 15120, rule: "School, enrichment and childcare merchant rules." },
  { name: "Groceries", tier: "Essentials", monthly: 890, total: 10680, rule: "Supermarkets and household food delivery." },
  { name: "Transport", tier: "Essentials", monthly: 670, total: 8040, rule: "Transit, fuel, parking and ride-hail merchants." },
  { name: "Dining", tier: "Lifestyle", monthly: 590, total: 7080, rule: "Restaurants, cafés and takeaway merchants." },
  { name: "Shopping", tier: "Lifestyle", monthly: 545, total: 6540, rule: "Retail and marketplace purchases." },
  { name: "Personal travel", tier: "Lifestyle", monthly: 490, total: 5880, rule: "Airlines, hotels and travel services." },
  { name: "Healthcare", tier: "Essentials", monthly: 240, total: 2880, rule: "Clinics, pharmacies and healthcare providers." },
  { name: "Uncategorized", tier: "Review", monthly: 25, total: 300, rule: "No deterministic rule matched; kept visible for review." }
];

const transactions = [
  ["2026-03-28","Harbour Energy","Monthly electricity bill","Housing & utilities","Everyday Card",184.62,"everyday-card-2026-03.pdf",3,18],
  ["2026-03-26","Northstar Academy","Term enrichment programme","Kids & education","Rewards Card",680.00,"rewards-card-2026-03.pdf",4,9],
  ["2026-03-23","Fresh Market","Weekly groceries","Groceries","Everyday Card",146.38,"everyday-card-2026-03.pdf",2,31],
  ["2026-03-21","MetroRide","Airport transfer","Transport","Travel Card",42.70,"travel-card-2026-03.pdf",2,12],
  ["2026-03-18","Willow Kitchen","Family dinner","Dining","Rewards Card",128.40,"rewards-card-2026-03.pdf",3,20],
  ["2026-03-16","Cloudline Mobile","Family mobile plan","Housing & utilities","Bank Account",96.00,"bank-account-2026-03.pdf",5,4],
  ["2026-03-14","Paper & Pine","Home supplies","Shopping","Everyday Card",73.80,"everyday-card-2026-03.pdf",2,22],
  ["2026-03-12","Bayview Clinic","Consultation","Healthcare","Everyday Card",85.00,"everyday-card-2026-03.pdf",2,16],
  ["2026-03-09","Island Airways","Return flight","Personal travel","Travel Card",742.10,"travel-card-2026-03.pdf",1,24],
  ["2026-03-06","Central Water","Water service","Housing & utilities","Bank Account",48.25,"bank-account-2026-03.pdf",4,6],
  ["2026-02-27","Little Atlas","Books and materials","Kids & education","Rewards Card",118.90,"rewards-card-2026-02.pdf",4,13],
  ["2026-02-24","Green Basket","Weekly groceries","Groceries","Everyday Card",131.72,"everyday-card-2026-02.pdf",3,8],
  ["2026-02-21","CityRail","Transit reload","Transport","Everyday Card",60.00,"everyday-card-2026-02.pdf",2,29],
  ["2026-02-18","Moss Café","Weekend brunch","Dining","Rewards Card",64.20,"rewards-card-2026-02.pdf",3,17],
  ["2026-02-15","Cedar Department Store","Children's clothing","Shopping","Rewards Card",156.30,"rewards-card-2026-02.pdf",2,11],
  ["2026-02-11","Harbour Pharmacy","Prescription","Healthcare","Everyday Card",37.60,"everyday-card-2026-02.pdf",2,5],
  ["2026-02-08","Seabird Hotel","Weekend stay","Personal travel","Travel Card",386.00,"travel-card-2026-02.pdf",1,19],
  ["2026-02-04","Transfer reference 4821","Unrecognised debit","Uncategorized","Bank Account",24.90,"bank-account-2026-02.pdf",4,2],
  ["2026-01-29","HomeNet Fibre","Broadband service","Housing & utilities","Bank Account",59.90,"bank-account-2026-01.pdf",5,7],
  ["2026-01-25","Bright Steps","Childcare programme","Kids & education","Rewards Card",920.00,"rewards-card-2026-01.pdf",4,6],
  ["2026-01-20","Neighbourhood Grocer","Weekly groceries","Groceries","Everyday Card",164.55,"everyday-card-2026-01.pdf",3,19],
  ["2026-01-17","Park & Go","Parking","Transport","Everyday Card",18.40,"everyday-card-2026-01.pdf",2,25],
  ["2026-01-12","Saffron Table","Dinner","Dining","Rewards Card",92.80,"rewards-card-2026-01.pdf",3,9],
  ["2026-01-06","North Quay Goods","Household purchase","Shopping","Everyday Card",89.00,"everyday-card-2026-01.pdf",2,7]
].map(([date,merchant,description,category,account,amount,source,page,row], index) => ({ id:index+1,date,merchant,description,category,account,amount,source,page,row,fingerprint:`demo-${(48271+index*7919).toString(16)}` }));

const documents = [
  { file:"everyday-card-2026-03.pdf", account:"Everyday Card", rows:47, status:"Accepted", fingerprint:"9c1d…7a42" },
  { file:"rewards-card-2026-03.pdf", account:"Rewards Card", rows:31, status:"Accepted", fingerprint:"4f82…9b16" },
  { file:"travel-card-2026-03.pdf", account:"Travel Card", rows:12, status:"Accepted", fingerprint:"a72e…114c" },
  { file:"bank-account-2026-03.pdf", account:"Bank Account", rows:24, status:"Accepted", fingerprint:"31d6…c087" },
  { file:"travel-card-2026-02.pdf", account:"Travel Card", rows:9, status:"Review", fingerprint:"f4ab…2290" }
];

const months = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const accounts = [
  { name:"Everyday Card", counts:[38,42,41,39,44,46,43,40,51,48,45,47] },
  { name:"Rewards Card", counts:[25,28,29,26,30,27,32,31,38,34,29,31] },
  { name:"Travel Card", counts:[3,1,4,0,8,2,1,6,12,4,9,12] },
  { name:"Bank Account", counts:[19,20,21,20,22,21,20,22,25,23,22,24] }
];

const formatMoney = value => new Intl.NumberFormat("en-SG", { style:"currency", currency:"SGD" }).format(value);
const categoryList = document.querySelector("#categoryList");
const transactionRows = document.querySelector("#transactionRows");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const accountFilter = document.querySelector("#accountFilter");

function renderCategories() {
  const max = Math.max(...categoryMeta.map(item => item.total));
  categoryList.innerHTML = categoryMeta.map(item => `
    <button class="category-row" data-category="${item.name}">
      <span><strong>${item.name}</strong><small>${item.tier}</small></span>
      <span class="category-bar"><i style="width:${Math.max(4, item.total / max * 100)}%"></i></span>
      <span><strong>${formatMoney(item.total)}</strong><small>${formatMoney(item.monthly)} / mo</small></span>
    </button>`).join("");
  document.querySelectorAll(".category-row").forEach(button => button.addEventListener("click", () => {
    categoryFilter.value = button.dataset.category;
    showView("transactions");
    renderTransactions();
  }));
}

function filteredTransactions() {
  const query = searchInput.value.trim().toLowerCase();
  return transactions.filter(item => (!query || `${item.merchant} ${item.description}`.toLowerCase().includes(query)) &&
    (!categoryFilter.value || item.category === categoryFilter.value) &&
    (!accountFilter.value || item.account === accountFilter.value));
}

function renderTransactions() {
  const rows = filteredTransactions();
  transactionRows.innerHTML = rows.map(item => `
    <tr tabindex="0" data-id="${item.id}"><td>${new Date(`${item.date}T12:00:00`).toLocaleDateString("en-SG", {day:"2-digit",month:"short",year:"numeric"})}</td>
    <td><strong>${item.merchant}</strong><small>${item.description}</small></td><td><span class="tag">${item.category}</span></td><td>${item.account}</td><td class="amount">${formatMoney(item.amount)}</td></tr>`).join("");
  document.querySelector("#transactionSummary").textContent = `Showing ${rows.length} of ${transactions.length} representative synthetic rows.`;
  document.querySelector("#emptyTransactions").hidden = rows.length !== 0;
  document.querySelectorAll("#transactionRows tr").forEach(row => {
    row.addEventListener("click", () => openTransaction(Number(row.dataset.id)));
    row.addEventListener("keydown", event => { if (event.key === "Enter") openTransaction(Number(row.dataset.id)); });
  });
}

function renderAccounts() {
  document.querySelector("#coverageGrid").innerHTML = `<div class="coverage-head"><span>Account</span>${months.map(m => `<span>${m}</span>`).join("")}</div>` + accounts.map(account => `
    <div class="coverage-row"><strong>${account.name}</strong>${account.counts.map(count => `<span class="coverage-cell" title="${count} extracted rows">${count}</span>`).join("")}</div>`).join("");
  document.querySelector("#documentList").innerHTML = documents.map(doc => `
    <article><span class="file-icon">PDF</span><div><strong>${doc.file}</strong><small>${doc.account} · ${doc.rows} rows · fingerprint ${doc.fingerprint}</small></div><span class="status ${doc.status.toLowerCase()}">${doc.status}</span></article>`).join("");
}

function renderReconciliation() {
  const gates = [
    ["No duplicate fingerprints","PASS","All 48 documents are unique."],
    ["Statement periods continuous","PASS","No unexplained coverage gaps."],
    ["Opening and closing balances","PASS","Balances roll forward within tolerance."],
    ["Uncategorised spend below 2%","PASS","Current period: 0.36%."],
    ["Travel statement totals","REVIEW","One February statement needs confirmation."]
  ];
  document.querySelector("#gateList").innerHTML = gates.map(([name,status,note]) => `<article><span class="gate-icon ${status.toLowerCase()}">${status === "PASS" ? "✓" : "!"}</span><div><strong>${name}</strong><small>${note}</small></div><span class="status ${status.toLowerCase()}">${status}</span></article>`).join("");
  const values = [5.8,6.1,6.5,6.0,7.2,6.8,6.4,7.0,8.9,7.1,6.7,7.8];
  const max = Math.max(...values);
  document.querySelector("#waterfall").innerHTML = values.map((value,index) => `<span><i style="height:${value/max*100}%"></i><small>${months[index]}</small></span>`).join("");
}

function renderFees() {
  const fees = [
    ["Travel Card","S$196.20","Posted 08 Mar 2026","Review waiver eligibility","review"],
    ["Rewards Card","S$0.00","Waived 12 Jan 2026","No action needed","accepted"],
    ["Everyday Card","S$98.10","Expected 20 May 2026","Set reminder before posting","upcoming"]
  ];
  document.querySelector("#feeList").innerHTML = fees.map(([card,amount,date,action,status]) => `<article><div><p class="eyebrow">${date}</p><h3>${card}</h3><p>${action}</p></div><strong>${amount}</strong><span class="status ${status}">${status}</span></article>`).join("");
}

function showView(name) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.toggle("active", tab.dataset.view === name));
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("active", view.id === `${name}View`));
}

function openTransaction(id) {
  const item = transactions.find(row => row.id === id);
  const meta = categoryMeta.find(category => category.name === item.category);
  document.querySelector("#drawerMerchant").textContent = item.merchant;
  document.querySelector("#drawerDescription").textContent = item.description;
  document.querySelector("#drawerDetails").innerHTML = `
    <div><dt>Amount</dt><dd>${formatMoney(item.amount)}</dd></div><div><dt>Date</dt><dd>${item.date}</dd></div>
    <div><dt>Account</dt><dd>${item.account}</dd></div><div><dt>Category</dt><dd>${item.category}</dd></div>
    <div class="wide"><dt>Source</dt><dd>${item.source}, page ${item.page}, row ${item.row}</dd></div><div class="wide"><dt>Fingerprint</dt><dd>${item.fingerprint}</dd></div>`;
  document.querySelector("#drawerRule").textContent = meta.rule;
  document.querySelector("#transactionDrawer").classList.add("open");
  document.querySelector("#transactionDrawer").setAttribute("aria-hidden", "false");
  document.querySelector("#scrim").classList.add("open");
}

function closeDrawer() {
  document.querySelector("#transactionDrawer").classList.remove("open");
  document.querySelector("#transactionDrawer").setAttribute("aria-hidden", "true");
  document.querySelector("#scrim").classList.remove("open");
}

[...new Set(categoryMeta.map(item => item.name))].forEach(name => categoryFilter.add(new Option(name,name)));
[...new Set(transactions.map(item => item.account))].forEach(name => accountFilter.add(new Option(name,name)));
document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => showView(tab.dataset.view)));
document.querySelectorAll(".chip").forEach(chip => chip.addEventListener("click", () => { document.querySelectorAll(".chip").forEach(item => item.classList.remove("active")); chip.classList.add("active"); }));
[searchInput, categoryFilter, accountFilter].forEach(input => input.addEventListener("input", renderTransactions));
document.querySelector("#resetDemo").addEventListener("click", () => { searchInput.value = ""; categoryFilter.value = ""; accountFilter.value = ""; document.querySelector('[data-range="12m"]').click(); showView("categories"); renderTransactions(); closeDrawer(); });
document.querySelector("#drawerClose").addEventListener("click", closeDrawer);
document.querySelector("#scrim").addEventListener("click", closeDrawer);
document.addEventListener("keydown", event => { if (event.key === "Escape") closeDrawer(); });

renderCategories(); renderTransactions(); renderAccounts(); renderReconciliation(); renderFees();
