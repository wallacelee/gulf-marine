(function(){
  var LOGO = (document.querySelector('.logo img')||{}).src || '';
  var acts = [
    {t:"Enquiry", full:"Enquiries from every channel", who:"Customers, CS agent and salesman", vt:"Speed",
     tools:["Outlook","CCQ","Monday"],
     doc:["Shared mailbox: Quote request, Pacific Explorer in dry dock","RE: Pacific Explorer quote, please confirm","Which are answered? Open each one to find out."],
     pain:"Email is the only way in, from the largest key account to the smallest buyer. The quote left after 3h 22m of a 4-hour SLA, and nothing warned anyone as the clock ran.",
     head:"More ways in, the same relationship for key accounts",
     vl:["Key accounts keep email, their named CS officer and their salesman","Smaller customers order for themselves in a portal, and CS sees it in the same queue","Every channel feeds one queue with a visible SLA clock"],
     kpi:["Enquiry to quote time","Share of enquiries from the portal","CS touches per small order","Key-account response time, kept or better"],
     ev:[["3h 22m","enquiry to quote, against a 4-hour SLA"],["1 channel","email, for every size of customer today"]]},
    {t:"Vessel 360", full:"The vessel is known", who:"CS agent and sales rep", vt:"Control",
     tools:["SAP","Locus","Personal notes"],
     doc:["SAP: Pacific Explorer (inactive)","SAP: Pacific Explorer (linked to a second customer)","Customer used the old vessel name: no match"],
     pain:"Vessel records are duplicated, deactivated and renamed, so matching fails and an earlier AI classification project failed with it.",
     head:"One view of who owns, buys and receives",
     vl:["Owner, operator, trader, agent and shipyard on one vessel page","Ownership and name changes are tracked, so old names resolve to the right vessel","The dry-dock window becomes a visible trigger, not a line in an email"],
     kpi:["Vessel match rate on enquiries","Duplicate vessel records","Time to prepare a customer call"],
     ev:[["5 roles","around one vessel in a single order"],["Agent changed","part-way through the email thread"]]},
    {t:"Quote", full:"A guided quote", who:"CS agent", vt:"Speed",
     tools:["CCQ","Monday","SAP","Email"],
     doc:["CCQ: quote built, sanctions checked","Monday: stock asked of Supply Chain","Email: HVI 15, only 16 drums, please confirm fast","Quote note: stock is not held for an enquiry"],
     pain:"A quote touches CCQ, Monday and email. One line moved from 20 to 16 drums once stock was checked, and nothing holds that stock for the customer.",
     head:"Price from SAP, stock held for a set time",
     vl:["Price arrives live from SAP and is checked against the agreement, with no re-keying","Availability is requested and held until a stated time","Sanctions check and PDF reading sit inside the same flow"],
     kpi:["Quote turnaround","Lines changed after quoting","Quote to order conversion"],
     ev:[["20 to 16","drums on one line once stock was checked"],["No hold","stock is not reserved for a quote"]]},
    {t:"Discount", full:"A one-tap decision", who:"Salesman and Asia leader", vt:"Control",
     tools:["Excel table","Email","Email again"],
     doc:["To the salesman: waive the discount? (pasted table)","Reply after 4 minutes: please go ahead","Later, to the Asia leader: same table. Reply: Approved"],
     pain:"The decision was fast but made from a pasted table, with no vessel history, no visible policy and an approval trail split across mailboxes.",
     head:"Margin in view at the moment of decision",
     vl:["Margin after the waiver is shown next to vessel history","Small waivers approve themselves within policy","Every decision is logged on the quote"],
     kpi:["Time to approve","Share auto-approved","Discount leakage against policy"],
     ev:[["4 min","for the salesman’s reply"],["2 threads","hold the approval trail"]]},
    {t:"Order", full:"One order record", who:"CS, Supply Chain and Finance", vt:"Capacity",
     tools:["SAP","Monday","Chat"],
     doc:["SAP order created","Monday item created and chat starts","Line changed: tracked as version 1","Customs and pumping added in comments"],
     pain:"The order is re-posted into Monday and discussed in chat. Changes and extra charges live in comments, and the team works partly from memory.",
     head:"No re-posting, one status for everyone",
     vl:["The order record is the hand-over, with no second board","Customs, pumping and changes are order lines","Monday.com can be retired once the flow is proven"],
     kpi:["Re-key steps removed","Order to confirmation time","Monday licence retired"],
     ev:[["3 places","SAP, Monday and chat for one order"],["Yearly","Monday subscription planned for replacement"]]},
    {t:"Delivery and invoice", full:"Delivered, proven and invoiced", who:"Operations, CS, partners, agent and customer", vt:"Protection",
     tools:["Paper receipt","Scan","Monday","SAP"],
     doc:["Receipt signed and stamped on the vessel","Scanned and attached to the order","Monday still says: No Billing Request","OTIF field left on: Please Select"],
     pain:"The invoice went out on delivery day, yet Monday still says “No Billing Request”. Delivery is proven by a paper receipt, and the agent, the barge and the customer are chased by phone and chat.",
     head:"Delivery proven by three sources, with everyone in one thread",
     vl:["Delivery notes arrive from the SCM system, with no scanning or re-keying","Agents, barge operators and the customer join a controlled shared Slack channel, while margin and notes stay internal","Agentforce reconciles ordered, shipped and received, chases what is missing and drafts the customer update"],
     kpi:["Delivery to invoice time","OTIF","Unconfirmed deliveries over 24 hours","Quantity disputes"],
     ev:[["Paper","the delivery receipt, signed and stamped"],["Out of sync","Monday status against the SAP invoice"]]},
    {t:"Growth", full:"The growth payoff", who:"Sales lead, regional leaders and CEO", vt:"Growth",
     tools:["Personal notes","Excel","Word of mouth"],
     doc:["Pipeline: kept in personal notes","Monthly CEO report on new vessels, built by hand","Dry-dock news arrives by word of mouth","Contract price and volume tracked outside any system"],
     pain:"A dry-dock refill is a big event, yet nobody records it as an opportunity. The CEO’s monthly new-vessel view is assembled by hand, and contract pricing and volume commitments are not visible to the people selling.",
     head:"Growth you can see coming, and contracts that renew from facts",
     vl:["The quote created the opportunity and the order closed it, with no typing","Dry-dock and ownership alerts create the next opportunities and lift the forecast","Sales Agreements track contract price and volume against SAP, and renewals start from real usage"],
     kpi:["Opportunities created","Volume against contract","Renewals on time","Price leakage against agreement"],
     ev:[["1 email","was sales’ only touchpoint on the order, so visibility was limited"],["Monthly","CEO report, built manually"],["SAP","stays the master for price, with no logic replicated"]]},
    {t:"Look ahead", full:"Agentforce and Tableau Next", who:"CS, sales, Supply Chain and executives", vt:"Capacity",
     tools:["Manual triage","Excel","Monthly report"],
     doc:["Enquiries read and classified by hand","Vessel records cleaned by hand, if at all","CEO report built by hand each month"],
     pain:"Every classification, quote draft and report depends on a person. An earlier classification project failed on messy vessel data, so master data has to come first.",
     head:"A family of agents, switched on in the right order",
     vl:["Each agent has one job, a named human in charge and a clear prerequisite","A vessel data steward agent cleans master data first, so triage and quote agents can follow","Tableau Next gives executives one view across service, delivery, margin and contracts, with questions answered in plain language"],
     kpi:["Duplicate vessel records","Share auto-classified","Draft acceptance rate","Executive questions answered without a report request"],
     ev:[["Chinese","the language the example enquiry arrived in"],["Master data","the gating item before AI switches on"]]}
  ];

  var themes = [
    {n:"Speed", h:"Faster response, with quotes inside the SLA", ev:"3h 22m of a 4-hour SLA was used with no alert, and email was the only way in.", m:"Enquiry to quote time, SLA breaches, key-account response time", q:"Enquiries per day, minutes saved per enquiry"},
    {n:"Control", h:"Every discount and price decided with margin and contract in view", ev:"A 4-minute reply from a pasted table, with the trail split across mailboxes.", m:"Time to approve, share auto-approved, leakage against policy and agreement", q:"Value of discounts outside policy"},
    {n:"Capacity", h:"More volume without more swivel chair", ev:"Three systems per order, a yearly Monday subscription, and 2–3 lost hours a day reported in discovery. A portal moves smaller orders off the CS desk.", m:"Touches per order, share of enquiries via the portal, hours returned, licence retired", q:"People, hours and loaded cost"},
    {n:"Protection", h:"Delivery proven, invoices released on time", ev:"A paper receipt, a Monday status out of sync with the SAP invoice, and OTIF left unrecorded.", m:"Delivery to invoice time, OTIF, unconfirmed deliveries over 24 hours, quantity disputes", q:"Disputed volume and days between delivery and invoice"},
    {n:"Growth", h:"Opportunities and contracts that grow from the same data", ev:"A monthly new-vessel report built by hand, dry-dock refills unrecorded, and contract price and volume outside any system.", m:"Opportunities created, volume against contract, renewals on time, executive questions answered without a report request", q:"Volume won from vessels that were previously missed, renewal retention"}
  ];


  var i = 0, mode = "today";
  var stops = document.getElementById("stops"), grid = document.getElementById("stageGrid");

  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}

  function buildStops(){
    stops.innerHTML = acts.map(function(a,k){
      return '<button class="stop" role="tab" type="button" data-k="'+k+'" id="tab'+k+'"><span class="dot">'+(k+1)+'</span><span class="t">'+esc(a.t)+'</span></button>';
    }).join("");
  }

  var SLCH = ["cs-quotes","supply-chain","approvals","order-pacific-explorer","sales-agreements","delivery-pacific-explorer","ext-pacific-explorer-delivery"];
  function wf9(){return '<span class="wf9"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';}

  /* ---------- Salesforce Lightning ---------- */
  function sf(app,letter,color,tabs,active,body,util){
    var th = tabs.map(function(t,k){
      var rec = t.charAt(0)==="#", label = rec ? t.slice(1) : t;
      return '<span class="tab'+(k===active?' on':'')+'">'+esc(label)+'<em>'+(rec?'✕':'▾')+'</em></span>';
    }).join('');
    return '<section class="sf" aria-label="Mock-up of the Salesforce '+esc(app)+' app">'+
      '<div class="sfg">'+wf9()+'<div class="sfs">Search…</div><div class="sfi"><i>★</i><i>+</i><i>?</i><i class="av">MT</i></div></div>'+
      '<div class="sfn"><div class="app"><span class="appi" style="background:'+color+'">'+letter+'</span><b>'+esc(app)+'</b></div>'+th+'</div>'+
      '<div class="sfb">'+body+'</div>'+
      (util?'<div class="sfu">'+util.map(function(u){return '<span>'+(u==="Omni-Channel"?'<i class="dot"></i>':'')+esc(u)+'</span>';}).join('')+'</div>':'')+
      '</section>';
  }
  function rh(color,letter,kind,name,fields,btns,dark){
    return '<div class="sfr"><div class="rt"><span class="oi" style="background:'+color+(dark?';color:#3E3E3C':'')+'">'+letter+'</span><div class="rn"><small>'+esc(kind)+'</small><h5>'+esc(name)+'</h5></div>'+
      '<div class="rb">'+(btns||[]).map(function(b){return '<span class="sfbtn">'+esc(b)+'</span>';}).join('')+'</div></div>'+
      '<dl class="rf">'+fields.map(function(f){return '<div><dt>'+esc(f[0])+'</dt><dd>'+f[1]+'</dd></div>';}).join('')+'</dl></div>';
  }
  function pth(steps,cur,btn){
    return '<div class="sfp"><div class="chev">'+steps.map(function(s,k){return '<span class="'+(k<cur?'done':(k===cur?'cur':''))+'">'+(k<cur?'✓ ':'')+esc(s)+'</span>';}).join('')+'</div>'+(btn?'<span class="sfbtn brand">'+esc(btn)+'</span>':'')+'</div>';
  }
  function rtabs(list,active){
    return '<div class="sfrt">'+list.map(function(t,k){return '<span class="'+(k===active?'on':'')+'">'+esc(t)+'</span>';}).join('')+'</div>';
  }
  function lc(title,inner,o){
    o=o||{};
    return '<div class="sfc"><div class="sfch">'+(o.letter?'<span class="ci" style="background:'+(o.color||'#0176D3')+'">'+o.letter+'</span>':'')+'<b>'+esc(title)+(o.count!=null?' ('+o.count+')':'')+'</b>'+
      '<span class="rt2">'+(o.html||'')+(o.btn?'<span class="sfbtn">'+esc(o.btn)+'</span>':'')+'</span></div><div class="sfcb">'+inner+'</div></div>';
  }

  /* ---------- Slack ---------- */
  function slack(channel,msgs,topic){
    var pre = function(c){ return c.indexOf("ext-")===0 ? "◆ " : "# "; };
    var ch = SLCH.map(function(c){return '<div class="it'+(c===channel?' on':'')+'">'+pre(c)+esc(c)+'</div>';}).join('');
    return '<section class="sk" aria-label="Mock-up of the Slack workspace"><div class="sksb"><div class="ws">Gulf Marine ▾</div><div class="grp">▾ Channels</div>'+ch+
      '<div class="grp" style="margin-top:8px">▾ Apps</div><div class="it">◼ Salesforce</div></div>'+
      '<div class="skm"><div class="skhd">'+pre(channel)+esc(channel)+'<small>'+esc(topic||'18 members')+'</small></div><div class="skbd">'+
      msgs.map(function(m){
        return '<div class="skmsg"><div class="skav" style="background:'+(m.c||'#E01E5A')+'">'+m.av+'</div><div style="flex:1;min-width:0"><div class="skn">'+esc(m.name)+(m.app?'<span class="app">APP</span>':'')+(m.ext?'<span class="ext">'+esc(m.ext)+'</span>':'')+'<span class="tm">'+esc(m.time||'now')+'</span></div><div>'+m.html+'</div></div></div>';
      }).join('')+
      '</div><div class="skcomp">Message '+pre(channel)+esc(channel)+'</div></div></section>';
  }
  function phone(inner){return '<div class="phone"><div class="notch"></div><div class="ph" style="padding:0">'+inner+'</div></div>';}
  function cap(t){return '<p class="cap">'+esc(t)+'</p>';}

  function apprFields(){
    return '<div class="skf"><div><small>Customer</small>Harbourline Marine Trading</div><div><small>Vessel</small>Pacific Explorer</div><div><small>Margin after waiver</small>Above policy floor</div><div><small>History</small>Repeat vessel, 7 orders in 12 months</div></div>';
  }
  function approvalSlack(){
    return '<b>Approval needed: waiver on quote Q-26-10533</b><div class="small" style="color:#616061">Requested by Mei Tan. Auto-approve applies below the policy limit.</div>'+apprFields()+
      '<div class="apBtns" style="display:flex;gap:8px"><button class="skbtn go" type="button" data-do="approve">Approve</button><button class="skbtn" type="button" data-do="decline">Decline</button><button class="skbtn" type="button">View quote</button></div><p class="apOut" style="margin-top:8px;color:#007A5A;font-weight:700"></p>';
  }
  function approvalMobile(){
    return '<div class="sfm"><div class="mh">Approval Request</div><div class="mb"><div class="mcard"><b>Waiver on quote Q-26-10533</b><div class="mrow"><span>Customer</span><span>Harbourline Marine Trading</span></div><div class="mrow"><span>Vessel</span><span>Pacific Explorer</span></div><div class="mrow"><span>Margin after waiver</span><span>Above floor</span></div><div class="mrow"><span>History</span><span>7 orders in 12 months</span></div></div>'+
      '<div class="apBtns mbtns"><button class="mbtn" type="button" data-do="decline">Reject</button><button class="mbtn brand" type="button" data-do="approve">Approve</button></div><p class="apOut" style="color:#2E844A;font-weight:700;font-size:12.5px"></p></div></div>';
  }
  function approvalSlackMobile(){
    return '<div class="skm2"><div class="m2h"><span class="m2b0">‹</span><b># approvals</b><span class="m2s">Search</span></div>'+
      '<div class="m2b"><div class="skmsg"><div class="skav" style="background:#0176D3">S</div><div style="flex:1;min-width:0"><div class="skn">Salesforce<span class="app">APP</span><span class="tm">now</span></div>'+
      '<div><b>Approval needed: waiver on quote Q-26-10533</b><div style="color:#616061;font-size:12.5px;margin-top:2px">Requested by Mei Tan</div>'+
      '<div class="m2f"><div><small>Customer</small>Harbourline Marine Trading</div><div><small>Vessel</small>Pacific Explorer</div><div><small>Margin after waiver</small>Above policy floor</div><div><small>History</small>7 orders in 12 months</div></div>'+
      '<div class="apBtns" style="display:flex;gap:6px;flex-wrap:wrap"><button class="skbtn go" type="button" data-do="approve">Approve</button><button class="skbtn" type="button" data-do="decline">Decline</button></div>'+
      '<p class="apOut" style="margin-top:6px;color:#007A5A;font-weight:700;font-size:12.5px"></p></div></div></div></div>'+
      '<div class="m2c">Message # approvals</div>'+
      '<div class="m2t"><span class="on">Home</span><span>DMs</span><span>Activity</span><span>You</span></div></div>';
  }
  var UTIL_SVC = ["Omni-Channel","History","Notes","Macros"];

  function caseDetails(){
    return lc('Case Details','<dl class="dl"><div><dt>Subject</dt><dd>Refill for Pacific Explorer, dry dock in 3 days</dd></div><div><dt>Vessel</dt><dd><span class="lkx">Pacific Explorer</span><small>Matched from old name Ocean Pioneer</small></dd></div><div><dt>Account</dt><dd class="lkx">Harbourline Marine Trading</dd></div><div><dt>Language</dt><dd>Chinese</dd></div></dl>',{letter:'C',color:'#F2CF5B'});
  }
  function caseConsole(){
    var left = caseDetails()+
      lc('Milestones','<div class="ms"><b>Quote within 4 hours</b><div class="mt">01:02:00</div><div class="small">remaining</div><div class="meter warn"><b style="width:74%"></b></div></div>',{letter:'⚑',color:'#EA001E'})+
      lc('Contact','<div class="lkx" style="font-weight:700">Henry Wu</div><div class="small">Harbourline Marine Trading</div>',{letter:'U',color:'#A094ED'});
    var feed = '<div class="sfc">'+rtabs(['Details','Activity','Chatter'],1)+'<div class="sfcb"><div class="pub"><span class="on">Email</span><span>Log a Call</span><span>New Task</span><span>New Event</span></div>'+
      '<div class="comp">Write an email or pick a quick text…</div>'+
      '<div class="fi"><span class="fic" style="background:#95AEC5">✉</span><div class="fib"><b>Email received</b><span class="small"> from Harbourline Marine Trading, today 12:15</span>'+
      '<p id="mailTxt" lang="zh">Pacific Explorer 目前在船厂修船，预计3天后出坞，请尽快报价以下油品。</p><button class="lnk" type="button" data-do="translate">Translate</button></div></div>'+
      '<div class="fi"><span class="fic" style="background:#F2CF5B;color:#3E3E3C">C</span><div class="fib"><b>Case created from Email-to-Case</b><span class="small"> today 12:15</span><div class="small">Routed to the Quotes queue. Vessel matched to Pacific Explorer.</div></div></div>'+
      '</div></div>';
    return rh('#F2CF5B','C','Case','00048213',[['Status','<span class="pill warn">New</span>'],['Priority','High'],['Origin','Email'],['Case Owner','Quotes queue']],['Follow','New Case','Edit','Close Case'],true)+
      pth(['New','Triaged','Quote sent','Closed'],0,'Mark Status as Complete')+
      '<div class="cols2"><div>'+left+'</div>'+feed+'</div>';
  }
  function queueView(){
    var row=function(s,v,sla,own,cls){return '<tr><td><span class="chk"></span></td><td>'+s+'</td><td>'+v+'</td><td><span class="pill '+cls+'">'+sla+'</span></td><td>'+own+'</td></tr>';};
    return rh('#F2CF5B','C','Cases','Quotes queue',[],['New','Change Owner']).replace('<dl class="rf"></dl>','<div class="small">3 items, sorted by time left</div>')+
      '<div class="sfc"><div class="sfcb" style="padding:0"><table class="t"><tr><th></th><th>Case</th><th>Vessel</th><th>Time left</th><th>Owner</th></tr>'+
      row('00048213','Pacific Explorer','1h 02m','Unassigned','warn')+row('00048207','MV Coral Voyager','3h 10m','Arjun Rao','')+row('00048201','MV Star Aurora','Answered','Lena Ho','ok')+'</table></div></div>';
  }
  function msBox(label,val,w){return '';}

  function dashboard(){
    var bar=function(l,w,v){return '<div class="hb"><span>'+l+'</span><div><i style="width:'+w+'%"></i></div><b>'+v+'</b></div>';};
    return '<div class="dh"><b>New-vessel pipeline</b><span class="small">As of today, 08:00 · illustrative data</span><span class="rt2"><span class="sfbtn">Refresh</span><span class="sfbtn">Subscribe</span></span></div>'+
      '<div class="dgrid"><div class="sfc dm"><small>Opportunities from quotes</small><b>14</b></div><div class="sfc dm"><small>Dry docks in 30 days</small><b>6</b></div><div class="sfc dm"><small>Open pipeline, Asia</small><b>USD 2.4M</b></div></div>'+
      '<div class="cols2b">'+lc('Pipeline by region','<div class="hbs">'+bar('Asia',78,'2.4M')+bar('Middle East',52,'1.6M')+bar('India',38,'1.2M')+bar('Europe',61,'1.9M')+'</div>')+
      lc('Vessels entering dry dock','<table class="t"><tr><th>Vessel</th><th>Dry dock in</th><th></th></tr><tr><td>MV Star Aurora</td><td>12 days</td><td><button class="action" type="button" data-do="opp">Create opportunity</button></td></tr><tr><td>MV Nordic Pearl</td><td>20 days</td><td><span class="pill">Watching</span></td></tr><tr><td>MV Jade Navigator</td><td>26 days</td><td><span class="pill">Watching</span></td></tr></table><p class="small" id="oppOut" style="margin-top:6px">From the vessel registry and dry-dock schedule.</p>')+'</div>';
  }
  function channels(){
    return '<div class="chan"><div class="chcol"><div class="chbox k"><b>Key accounts</b><span>Email or phone to a named CS officer, with their salesman alongside. The model you have today.</span></div><div class="chbox s"><b>Smaller customers</b><span>Self-service portal: request a quote or place an order, and track it.</span></div></div><div class="brk" aria-hidden="true"></div><div class="chbox q"><b>One queue</b><span>Same case, same SLA clock, same vessel match, whichever way the enquiry came in.</span></div></div>';
  }
  var cartItems = [];
  var PRODUCTS = [
    {n:"GULFSEA CYLCARE 5040", cat:"Cylinder oil", pack:"IBC 1,000 L or drum 208 L", av:"ok", avt:"Available in Singapore", art:"ibc", p:"USD 172.40"},
    {n:"GULFSEA HYDRAULIC HVI PLUS 32", cat:"Hydraulic oil", pack:"Drum 208 L or pail 20 L", av:"ok", avt:"Available in Singapore", art:"drum", p:"USD 253.10"},
    {n:"GULFSEA HYDRAULIC HVI PLUS 15", cat:"Hydraulic oil", pack:"Drum 208 L", av:"warn", avt:"16 drums left, held when you order", art:"drum", p:"USD 268.90"},
    {n:"GULFSEA POWER 3030", cat:"Engine oil", pack:"Drum 208 L", av:"ok", avt:"Available in Singapore", art:"drum", p:"USD 181.60"}
  ];
  function gpArt(t){
    if(t==="ibc") return '<svg width="64" height="56" viewBox="0 0 64 56" aria-hidden="true"><rect x="6" y="4" width="52" height="40" rx="5" fill="#fff" stroke="#00468B" stroke-width="3"/><path d="M6 16h52M6 30h52M22 4v40M42 4v40" stroke="#00468B" stroke-width="2"/><rect x="2" y="44" width="60" height="8" rx="2" fill="#F58220"/></svg>';
    return '<svg width="48" height="56" viewBox="0 0 48 56" aria-hidden="true"><rect x="6" y="4" width="36" height="48" rx="7" fill="#00468B"/><rect x="6" y="16" width="36" height="6" fill="#F58220"/><rect x="6" y="34" width="36" height="6" fill="#F58220"/><rect x="14" y="1" width="20" height="5" rx="2" fill="#5b6f94"/></svg>';
  }
  function renderCart(){
    var l = document.getElementById("gpCartList"), c = document.getElementById("gpCount"); if(!l) return;
    var n = 0;
    l.innerHTML = cartItems.length ? cartItems.map(function(it){ n += it.q; return '<div class="gp-row" style="padding:4px 0"><span>'+esc(PRODUCTS[it.i].n.replace("GULFSEA ",""))+'</span><b>x'+it.q+'</b></div>'; }).join('') : '<p style="color:#5b6f94;font-size:13.5px">Your order is empty. Add a product to start.</p>';
    c.textContent = n;
  }
  function portal(){
    cartItems = [];
    var cards = PRODUCTS.map(function(p,i){
      return '<div class="gp-card"><div class="gp-art">'+gpArt(p.art)+'</div><b class="n">'+esc(p.n)+'</b><span class="cat">'+esc(p.cat)+', '+esc(p.pack)+'</span>'+
        '<span class="gp-av '+p.av+'">'+esc(p.avt)+'</span><div class="gp-row"><span style="font-size:13.5px"><b>'+esc(p.p)+'</b> / 100 L</span>'+
        '<div class="gp-qty"><button type="button" data-do="qty" data-i="'+i+'" data-d="-1" aria-label="Fewer">−</button><span id="gpq'+i+'">1</span><button type="button" data-do="qty" data-i="'+i+'" data-d="1" aria-label="More">+</button></div></div>'+
        '<button class="gp-add" type="button" data-do="add" data-i="'+i+'">Add to order</button></div>';
    }).join('');
    return '<section class="gp" aria-label="Mock-up of the Gulf Marine self-service ordering and enquiry portal">'+
      '<div class="gp-top"><img src="'+LOGO+'" alt="Gulf Marine"><div class="gp-nav"><button type="button" class="on" data-do="ptab" data-v="shop">Shop</button><button type="button" data-do="ptab" data-v="orders">My orders</button><button type="button" data-do="ptab" data-v="enq">Send an enquiry</button></div><span class="gp-cartbtn">Order: <span id="gpCount">0</span></span></div>'+
      '<div class="gp-hero"><h5>Order marine lubricants for your vessel</h5><div class="gp-sel"><div><small>Vessel</small><b>MV Orient Harmony (formerly Blue Horizon)</b></div><div><small>Delivery port</small><b>Singapore</b></div><div><small>ETA</small><b>Tue 24 Nov</b></div><div><small>Account</small><b>Sunrise Ship Supplies</b></div></div></div>'+
      '<div class="gp-pane on" data-pane="shop"><div class="gp-body"><div><div class="gp-chips"><span class="on">All grades</span><span>Cylinder oil</span><span>Hydraulic oil</span><span>Engine oil</span><span>Specialty</span></div><div class="gp-grid">'+cards+'</div><p style="color:#5b6f94;font-size:12.5px;margin-top:10px">Illustrative catalogue. The final range, packs and prices come from the SAP product master.</p></div>'+
      '<div class="gp-side"><div class="gp-box"><h6>Your order</h6><div id="gpCartList"><p style="color:#5b6f94;font-size:13.5px">Your order is empty. Add a product to start.</p></div>'+
      '<div class="gp-row" style="margin-top:8px;font-size:13.5px;border-top:1px solid #D9E2F0;padding-top:8px"><span>Delivery and customs</span><b>USD 930</b></div>'+
      '<div class="gp-row" style="font-size:13.5px"><span>Total</span><b>At checkout</b></div>'+
      '<button class="gp-btn" type="button" data-do="pplace">Place order</button><button class="gp-btn alt" type="button" data-do="pquote">Request a quote</button><p class="gp-msg" id="gpMsg"></p></div>'+
      '<div class="gp-box"><h6>Your Gulf Marine team</h6><div class="gp-row" style="font-size:13.5px"><span>Mei Tan</span><span style="color:#5b6f94">Customer service</span></div><div class="gp-row" style="font-size:13.5px;margin-top:6px"><span>Daniel Koh</span><span style="color:#5b6f94">Your salesman</span></div><p style="color:#5b6f94;font-size:12.5px;margin-top:8px">Key accounts keep their named team here too.</p></div></div></div></div>'+
      '<div class="gp-pane" data-pane="orders"><div class="gp-body" style="grid-template-columns:1fr"><div class="gp-box"><h6>My orders</h6><table class="gp-t"><tr><th>Order</th><th>Vessel</th><th>Status</th><th></th></tr>'+
      '<tr><td>SO-26-04902</td><td>MV Jade Navigator</td><td><span class="gp-st w">Quoted, waiting for you</span></td><td><button class="gp-add" type="button">Confirm</button></td></tr>'+
      '<tr><td>SO-26-04880</td><td>MV Orient Harmony</td><td><span class="gp-st">Confirmed, delivery Fri 20 Nov</span></td><td></td></tr>'+
      '<tr><td>SO-26-04755</td><td>MV Nordic Pearl</td><td><span class="gp-st ok">Delivered, invoice INV-26-90021</span></td><td><button class="gp-add alt" type="button">Reorder</button></td></tr></table></div></div></div>'+
      '<div class="gp-pane" data-pane="enq"><div class="gp-body" style="grid-template-columns:1fr"><div class="gp-box"><h6>Send an enquiry</h6><div class="gp-form"><div><small>Topic</small><b>Dry-dock refill</b></div><div><small>Vessel</small><b>MV Orient Harmony</b></div></div>'+
      '<div class="gp-text">We need hydraulic and engine oils during our dry dock. Please quote and confirm availability in Singapore.</div>'+
      '<div class="gp-row" style="margin-top:10px;flex-wrap:wrap"><span class="gp-st">Attach a PDF or email</span><button class="gp-add" type="button" data-do="penq">Send enquiry</button></div><p class="gp-msg" id="gpEnqMsg"></p></div></div></div>'+
      '</section>';
  }

  var IC = {
    anchor:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="12" cy="5" r="2.5" fill="none" stroke="#54698D" stroke-width="2"/><path d="M12 7.5V21M6 12H18M5 15c0 3 3 6 7 6s7-3 7-6" fill="none" stroke="#54698D" stroke-width="2" stroke-linecap="round"/></svg>',
    chart:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="#54698D"/><path d="M8 17v-6M12 17V7M16 17v-4" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
    gear:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="#54698D" stroke-width="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="#54698D" stroke-width="2.5" stroke-linecap="round"/></svg>',
    cal:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" fill="#54698D"/><path d="M8 3v4M16 3v4" stroke="#54698D" stroke-width="2"/><circle cx="12" cy="14" r="4.2" fill="#fff"/><path d="M12 12v2.2l1.5 1" stroke="#54698D" stroke-width="1.5" fill="none"/></svg>',
    globe:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="#54698D" stroke-width="2"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke="#54698D" stroke-width="1.6" fill="none"/></svg>',
    vol:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z" fill="#54698D"/><path d="M16 8c2 2 2 6 0 8M18.5 6c3.5 3.5 3.5 8.5 0 12" stroke="#54698D" stroke-width="1.6" fill="none"/></svg>',
    layout:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" fill="#54698D"/><path d="M3 9h18M9 9v11" stroke="#fff" stroke-width="2"/></svg>',
    ship:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="12" cy="5" r="2.2" fill="none" stroke="#fff" stroke-width="2"/><path d="M12 7.2V20M7 11.5H17M5.5 14.5c0 3 3 5.5 6.5 5.5s6.5-2.5 6.5-5.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
    people:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="9" cy="8" r="3.2" fill="#54698D"/><path d="M3 20c0-4 3-6 6-6s6 2 6 6" fill="#54698D"/><circle cx="17" cy="9" r="2.5" fill="#54698D"/><path d="M16 14c3 0 5 2 5 5h-5" fill="#54698D"/></svg>',
    pin:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M12 21s-6-5.5-6-11a6 6 0 1 1 12 0c0 5.500-6 11-6 11z" fill="#54698D"/><circle cx="12" cy="10" r="2.3" fill="#fff"/></svg>'
  };
  function vk(icon,label,value){return '<div class="vk"><div class="vki">'+(icon||'')+'</div><small>'+label+'</small><b>'+value+'</b></div>';}
  function vfield(l,v){return '<div class="vfl"><b>'+l+'</b><div class="vfv"><span>'+v+'</span><span class="pen">✎</span></div></div>';}
  function tli(cls,bg,inner,title,sub,badge,date){
    return '<div class="tl '+cls+'"><span class="tlc" style="background:'+bg+'">'+inner+'</span><div class="tlb"><div><b>'+title+'</b><div class="tls">'+sub+'</div></div><div class="tlr">'+(badge?'<span class="tbd">'+badge+'</span>':'')+'<b>'+date+'</b></div></div></div>';
  }
  function vpath(steps,cur){
    return '<div class="vpath">'+steps.map(function(s,k){return '<span class="'+(k===cur?'cur':'')+'">'+s+'</span>';}).join('')+'</div>';
  }
  function vesselPage(){
    var dot = function(c,g){return '<i style="background:'+c+'">'+g+'</i>';};
    var ov = '<div class="vsub"><span class="vst">Bulk Carrier</span><span class="vbd">In Dry Dock</span></div>'+
      vpath(['Active','In Dry Dock','Laid Up','Sold','Scrapped'],1)+
      '<div class="vkg">'+vk(IC.anchor,'Home port','Singapore')+vk(IC.chart,'Deadweight','82,000 MT')+vk(IC.gear,'Engine','2-Stroke Slow Speed')+vk(IC.cal,'Built / age','2017 (9 years)')+
      vk(IC.globe,'Flag state','Singapore')+vk(IC.vol,'Annual volume','220,000 L')+vk('','Next service','24 Mar 2027')+vk(IC.layout,'Dry dock','Until 20 Nov 2026')+'</div>'+
      '<div class="vfg">'+vfield('Vessel Name','Pacific Explorer')+vfield('Flag State','Singapore')+vfield('Account','Meridian Bulk Carriers')+vfield('Deadweight Tonnage (DWT)','82,000')+'</div>';
    var tl = '<div class="vth"><span class="vtc">'+IC.cal.replace(/#54698D/g,'#fff')+'</span><h5>Vessel Timeline</h5></div><div class="vtl">'+
      tli('hl','#0B7D75','<i class="g">▣</i>','Dry Dock in progress','Bayview Dry Dock, Zhoushan','IN PROGRESS','Until 20 Nov 2026')+
      tli('hl','#0B7D75','<i class="g">▣</i>','Next Service Due','24 Mar 2027','UPCOMING','24 Mar 2027')+
      tli('','#0B5CFF','<i class="g">≡</i>','Last Lubricant Order','22 Sep 2026','','22 Sep 2026')+
      tli('','#0B5CFF',dot('#2E9D4B','✓'),'Last Inspection','16 Aug 2026','','16 Aug 2026')+
      tli('','#0B5CFF',dot('#FF4F8B','✕'),'Vessel Built','Year 2017','','01 Jan 2017')+'</div>';
    var oh = '<div class="vth"><span class="vtc">'+IC.people.replace(/#54698D/g,'#fff')+'</span><h5>Ownership History</h5></div>'+
      '<div class="vkg three">'+vk(IC.people,'Owner','Meridian Bulk Carriers')+vk(IC.gear,'Operator','Eastgate Ship Management')+vk(IC.chart,'Buyer (trader)','Harbourline Marine Trading')+vk(IC.anchor,'Ship agent','Seaward Port Agency')+vk(IC.pin,'Location','Bayview Dry Dock, Zhoushan')+'</div>'+
      '<div class="vtl">'+
      tli('hl','#0B7D75','<i class="g">★</i>','Meridian Bulk Carriers','Current owner. Acquired from Coastal Ventures Ltd','CURRENT','03 Mar 2022')+
      tli('','#0B5CFF','<i class="g">↻</i>','Name change: Ocean Pioneer to Pacific Explorer','Recorded from the vessel registry. Old name still matches enquiries','','03 Mar 2022')+
      tli('','#0B5CFF','<i class="g">⚙</i>','Eastgate Ship Management','Technical manager since the purchase','','03 Mar 2022')+
      tli('','#0B5CFF','<i class="g">⚓</i>','Coastal Ventures Ltd','Original owner until the sale','','01 Jan 2017')+'</div>'+
      '<p class="vnote">Tracked automatically by Data Cloud from SAP master data, Locus and the vessel registry.</p>';
    var ac = '<div class="vth"><span class="vtc">'+IC.layout.replace(/#54698D/g,'#fff')+'</span><h5>Recent activity</h5></div><div class="vtl">'+
      tli('hl','#0B7D75','<i class="g">C</i>','Case 00048213: refill, dry dock','Quotes queue. SLA 1h 02m left','NEW','Today')+
      tli('','#0B5CFF','<i class="g">Q</i>','Quote Q-26-10533','Draft, availability held until 18:30','','Today')+
      tli('','#0B5CFF','<i class="g">O</i>','Order SO-26-04817','Created when the customer confirms','','Pending')+'</div>';
    return '<div class="vp"><div class="vh"><span class="vic">'+IC.ship+'</span><div><small>Vessel</small><h5>Pacific Explorer</h5></div></div>'+
      '<div class="vcard"><div class="vtabs"><button type="button" class="on" data-do="vtab" data-v="ov">Overview</button><button type="button" data-do="vtab" data-v="tl">Timeline</button><button type="button" data-do="vtab" data-v="oh">Ownership History</button><button type="button" data-do="vtab" data-v="ac">Activity</button></div>'+
      '<div class="vpane on" data-vp="ov">'+ov+'</div><div class="vpane" data-vp="tl">'+tl+'</div><div class="vpane" data-vp="oh">'+oh+'</div><div class="vpane" data-vp="ac">'+ac+'</div></div></div>';
  }

  function chain(){
    var c=[['Plan','Delivery note issued','SAP, from the SCM system'],['Dispatch','Partner loads and sends the barge','Partner depot, barge operator'],['Arrive','Vessel and berth confirmed','Ship agent'],['Deliver','Pumping times and quantities','Gulf Marine operations'],['Confirm','Chief Engineer e-signs','Vessel and customer']];
    return '<div class="chain5">'+c.map(function(x,i){return '<div class="cp"><span class="cn">'+(i+1)+'</span><b>'+x[0]+'</b><div>'+x[1]+'</div><small>'+x[2]+'</small></div>';}).join('')+'</div>'+
      '<p class="small" style="color:var(--ink2)">The invoice is released only when three sources agree: ordered in Salesforce, shipped in SAP, received by the Chief Engineer.</p>';
  }
  function esignPhone(){
    return '<div class="esg"><div class="esh"><img src="'+LOGO+'" alt="Gulf Marine"></div><div class="esb"><b class="est">Confirm delivery</b><div class="ess">Pacific Explorer, Zhoushan</div>'+
      '<div class="esr"><span>HVI PLUS 15</span><b>16 drums</b></div><div class="esr"><span>CYLCARE 5040</span><b>15 IBC</b></div><div class="esr"><span>Pumping</span><b>14:05 to 15:10</b></div>'+
      '<div class="sig"><svg viewBox="0 0 120 40" width="110" height="36" aria-label="Signature"><path d="M5 28c8-22 14-22 12-4s6 6 14-6 8 8 16 2 10-10 18-4 12 6 20-2" fill="none" stroke="#00468B" stroke-width="2" stroke-linecap="round"/></svg></div>'+
      '<div class="ess">Chief Engineer R. Santos</div>'+
      '<button class="gp-btn" type="button" data-do="esign">Confirm delivery</button><p class="gp-msg" id="esOut"></p></div></div>';
  }
  function qbar(label,plan,del,fc,note){
    return '<div class="qb"><span>'+label+'</span><div class="qt"><i class="d" style="width:'+del+'%"></i><i class="f" style="width:'+fc+'%"></i></div><b>'+note+'</b></div>';
  }
  function agreementPage(){
    var atab=function(v,t,on){return '<span class="'+(on?'on':'')+'" data-do="atab" data-v="'+v+'">'+t+'</span>';};
    var dt = '<div class="cols2c"><div>'+
      lc('Agreement terms','<dl class="dl"><div><dt>Term</dt><dd>1 Jan 2026 to 31 Dec 2026</dd></div><div><dt>Price basis</dt><dd>SAP price list and conditions, port differentials apply</dd></div><div><dt>Payment terms</dt><dd>30 days from invoice</dd></div><div><dt>Owner</dt><dd class="lkx">Daniel Koh</dd></div></dl>',{letter:'A',color:'#7F8DE1'})+
      lc('Renewal','<p style="margin:0 0 8px">Renewal due 31 Dec 2026. Draft the next term from this year’s usage.</p><span class="sfbtn brand" data-do="renew" style="cursor:pointer">Draft renewal</span><p class="small" id="renewOut" style="margin-top:8px"></p>',{letter:'R',color:'#2E844A'})+
      '</div><div>'+
      lc('Covered vessels','<table class="t"><tr><th>Vessel</th><th>Dry dock</th></tr><tr><td>Pacific Explorer</td><td><span class="pill warn">In dock until 20 Nov</span></td></tr><tr><td>Coral Voyager</td><td>10 Mar 2027</td></tr><tr><td>Star Aurora</td><td>29 Nov 2026</td></tr></table>',{letter:'V',color:'#1B96FF',count:3,btn:'Add vessel'})+
      '</div></div>';
    var pp = '<div class="sfbanner"><span class="pill ok">In sync with SAP</span> Prices are read from SAP. A change is requested here, approved, and only then written to SAP.</div>'+
      lc('Agreement prices per 100 litres','<table class="t"><tr><th>Product</th><th>Basis</th><th>Base</th><th>Port</th><th>Pack</th><th>Net</th><th>Committed</th></tr>'+
      '<tr><td>GULFSEA HYDRAULIC HVI PLUS 15</td><td>List, 82% off</td><td>212.40</td><td>24.50</td><td>32.00</td><td><b>268.90</b></td><td>120,000 L</td></tr>'+
      '<tr><td>GULFSEA HYDRAULIC HVI PLUS 32</td><td>List, 82% off</td><td>192.60</td><td>24.50</td><td>36.00</td><td><b>253.10</b></td><td>80,000 L</td></tr>'+
      '<tr><td>GULFSEA CYLCARE 5040</td><td>Fixed price</td><td>148.00</td><td>24.40</td><td>0.00</td><td><b>172.40</b></td><td>260,000 L</td></tr>'+
      '<tr><td>GULFSEA POWER 3030</td><td>Fixed price</td><td>157.10</td><td>24.50</td><td>0.00</td><td><b>181.60</b></td><td>140,000 L</td></tr></table>',{letter:'$',color:'#FCB95B',count:4,html:'<span class="small">Illustrative prices, port: Singapore</span>',btn:'Request price change'})+
      '<div class="cols2c"><div>'+lc('Quote against agreement','<div class="line small" style="display:flex;justify-content:space-between"><span>Quote Q-26-10533, HVI PLUS 15</span><span class="pill ok">At agreement price</span></div><div class="line small" style="display:flex;justify-content:space-between;margin-top:8px"><span>Quote Q-26-10497, POWER 3030</span><span class="pill warn">3% below: needs approval</span></div>',{letter:'Q',color:'#F88962'})+'</div><div>'+
      lc('Price change request','<p style="margin:0 0 8px">Change the CYLCARE 5040 fixed price from 172.40 to 169.90 for the rest of the term?</p><span class="sfbtn brand" data-do="pchg" style="cursor:pointer">Submit for approval</span><p class="small" id="pchgOut" style="margin-top:8px"></p>',{letter:'C',color:'#2E844A'})+'</div></div>';
    var vo = lc('Volume against commitment','<div class="qbs">'+qbar('Q1',100,100,0,'160k of 150k')+qbar('Q2',100,93,0,'140k of 150k')+qbar('Q3',100,48,0,'72k of 150k')+qbar('Q4',100,0,56,'forecast 85k of 150k')+'</div><div class="legend" style="margin-top:8px"><span><i style="background:#0176D3"></i>Delivered</span><span><i style="background:#90D0FE"></i>Forecast</span></div>',{letter:'L',color:'#769ED9',html:'<span class="small">372,000 L of 600,000 L (62%)</span>'})+
      '<div class="cols2c"><div>'+lc('By product','<div class="qbs">'+qbar('HVI 15',100,70,0,'84k of 120k')+qbar('HVI 32',100,55,0,'44k of 80k')+qbar('CYLCARE',100,68,0,'177k of 260k')+qbar('POWER',100,48,0,'67k of 140k')+'</div>')+'</div><div>'+
      lc('Agentforce','<p style="margin:0 0 8px">Pacific Explorer’s dry dock adds about 40,000 L this month, which closes most of the Q4 gap. Two more vessels enter dry dock before year end.</p><span class="pill">Phase 2 preview</span>',{letter:'✦',color:'#0176D3'})+'</div></div>';
    return rh('#7F8DE1','A','Sales Agreement','Harbourline Marine Trading 2026',[['Account','<span class="lkx">Harbourline Marine Trading</span>'],['Term','1 Jan to 31 Dec 2026'],['Status','<span class="pill ok">Active</span>'],['Committed','600,000 L'],['Delivered','372,000 L (62%)']],['Follow','Edit','Draft renewal'])+
      pth(['Draft','In Approval','Active','Renewal','Expired'],2,'Mark Status as Complete')+
      '<div class="sfc"><div class="sfrt atabs">'+atab('dt','Details',1)+atab('pp','Products and prices',0)+atab('vo','Volume',0)+'</div><div class="sfcb"><div class="apane on" data-ap="dt">'+dt+'</div><div class="apane" data-ap="pp">'+pp+'</div><div class="apane" data-ap="vo">'+vo+'</div></div></div>';
  }
  function forecastPage(){
    return rh('#7F8DE1','A','Account forecast','Harbourline Marine Trading',[['Plan, next 12 months','600,000 L'],['Forecast','640,000 L'],['Basis','Dry-dock schedule, past orders, open quotes']],['Refresh'])+
      '<div class="cols2c"><div>'+
      lc('Forecast by vessel','<table class="t"><tr><th>Vessel</th><th>Next dry dock</th><th>Expected</th><th>Confidence</th></tr><tr><td>Pacific Explorer</td><td>In dock now</td><td>40,000 L</td><td><span class="pill ok">High</span></td></tr><tr><td>Star Aurora</td><td>29 Nov 2026</td><td>30,000 L</td><td><span class="pill warn">Medium</span></td></tr><tr><td>Coral Voyager</td><td>10 Mar 2027</td><td>55,000 L</td><td><span class="pill warn">Medium</span></td></tr></table>',{letter:'V',color:'#1B96FF',count:3})+
      '</div><div>'+
      lc('Next four quarters','<div class="qbs">'+qbar('Q4 2026',100,60,35,'plan 150k')+qbar('Q1 2027',100,0,92,'plan 150k')+qbar('Q2 2027',100,0,100,'plan 150k')+qbar('Q3 2027',100,0,84,'plan 150k')+'</div><div class="legend" style="margin-top:8px"><span><i style="background:#0176D3"></i>Delivered</span><span><i style="background:#90D0FE"></i>Forecast</span></div>',{letter:'F',color:'#769ED9',html:'<span class="small">Illustrative data</span>'})+
      '</div></div>';
  }
  function useCases(){
    var u=[
      [1,'Enquiry triage','Reads email in Chinese or English, classifies it, matches the vessel and drafts the reply.','CS validates','After clean vessel data','b'],
      [1,'Portal assistant','Turns a message from a smaller customer into a ready order or quote request.','CS sees every request','After clean vessel data','b'],
      [2,'Vessel data steward','Finds duplicate, renamed and inactive vessel records and proposes merges.','Data owner approves','Start here','t'],
      [3,'Quote assistant','Reads a PDF or email request, builds the lines and checks price and availability.','CS reviews the quote','After SAP price link','b'],
      [4,'Margin guardian','Explains margin after a waiver, recommends a decision and auto-approves within policy.','Salesman decides','After approval matrix','b'],
      [5,'Order coordinator','Chases Supply Chain and partners, and answers “where is my order?” in Slack.','Team lead oversees','After order record','b'],
      [6,'Delivery assurance','Watches milestones, chases the agent and customer, and reconciles ordered, shipped and received.','CS sends external messages','After SCM feed','b'],
      [7,'Growth and renewal','Turns dry-dock alerts into opportunities and drafts renewals from real usage.','Salesman reviews','Phase 2','g'],
      [8,'Executive insights','Answers questions about the Tableau Next dashboard in plain language.','Read only','With Phase 1 data','t']
    ];
    var chip={t:'pill ok',b:'pill',g:'pill warn'};
    return '<div class="ucg">'+u.map(function(x){
      return '<div class="uc"><div class="ucn"><span class="cn2">'+x[0]+'</span><b>'+x[1]+'</b></div><p>'+x[2]+'</p><small>Human in charge: '+x[3]+'</small><span class="'+chip[x[5]]+'" style="justify-self:start">'+x[4]+'</span></div>';
    }).join('')+'</div>'+
    '<div class="waves"><div><b>Wave 1, with Phase 1</b><span>Vessel data steward, Executive insights</span></div><div><b>Wave 2, once master data is clean</b><span>Enquiry triage, Quote assistant, Delivery assurance</span></div><div><b>Wave 3</b><span>Margin guardian, Order coordinator, Portal assistant, Growth and renewal</span></div></div>'+
    '<p class="small" style="color:var(--ink2)">Suggested sequence for discussion. Each agent has one job, a named human in charge and a clear prerequisite.</p>';
  }
  function stewardScreen(){
    return lc('Proposed merges','<table class="t"><tr><th>Vessel</th><th>Why</th><th>Confidence</th></tr>'+
      '<tr><td>Pacific Explorer (2 records)</td><td>Same IMO 9412345, linked to two customers</td><td><span class="pill ok">High</span></td></tr>'+
      '<tr><td>Ocean Pioneer</td><td>Former name found in the vessel registry</td><td><span class="pill ok">High</span></td></tr>'+
      '<tr><td>Coral Voyager (inactive)</td><td>Recent enquiry on a deactivated record</td><td><span class="pill warn">Medium</span></td></tr></table>',{letter:'V',color:'#1B96FF',count:3,html:'<span class="small">Illustrative</span>'})+
      '<div class="agent"><div class="agh"><span class="spark">✦</span><b>Agentforce, vessel data steward</b></div><div class="bub">I found 3 groups of vessel records to clean. Nothing changes until a data owner approves, and approved merges are applied in SAP.</div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="action" type="button" data-do="merge">Approve high-confidence merges</button><button class="action alt" type="button">Review each</button></div><p class="ok-msg" id="mergeOut" style="margin-top:8px"></p></div>';
  }
  function quoteAgent(){
    return '<div class="cols2c"><div>'+lc('Customer request (PDF)','<div class="pdf"><div class="pl"></div><div class="pl"></div><div class="pl short"></div><div class="pl"></div><div class="pl short"></div><div class="small" style="margin-top:6px">Request for Pacific Explorer: hydraulic oils, cylinder oil, 7 grades in total</div></div>',{letter:'P',color:'#BA0517'})+'</div><div>'+
      lc('Lines read by Agentforce','<table class="t"><tr><th>Product</th><th>Qty</th><th>Check</th></tr><tr><td>HVI PLUS 15</td><td>20 drums</td><td><span class="pill warn">16 available</span></td></tr><tr><td>CYLCARE 5040</td><td>15 IBC</td><td><span class="pill ok">Agreement price</span></td></tr><tr><td>SUPERBEAR 3006</td><td>8 IBC</td><td><span class="pill ok">Agreement price</span></td></tr></table><div style="margin-top:8px"><button class="action" type="button" data-do="qagent">Create draft quote</button></div><p class="ok-msg" id="qaOut" style="margin-top:6px"></p>',{letter:'✦',color:'#0176D3'})+'</div></div>';
  }
  function tableauScreen(){
    var spark=function(pts){return '<svg viewBox="0 0 100 28" width="100%" height="28" aria-hidden="true"><polyline points="'+pts+'" fill="none" stroke="#0176D3" stroke-width="2"/></svg>';};
    return '<div class="tnf"><span class="tnp">Last 30 days</span><span class="tnp">All regions</span><span class="tnp">All key accounts</span><span class="small" style="margin-left:auto">Illustrative data</span></div>'+
      '<div class="tng"><div class="tnk"><small>Quote turnaround</small><b>2h 41m</b><em>target 4h</em>'+spark('0,20 20,16 40,18 60,12 80,14 100,9')+'</div>'+
      '<div class="tnk"><small>On time, in full</small><b>94%</b><em>up from 91%</em>'+spark('0,18 20,20 40,14 60,16 80,10 100,8')+'</div>'+
      '<div class="tnk"><small>SLA breaches</small><b>3</b><em>down from 7</em>'+spark('0,6 20,10 40,8 60,14 80,18 100,22')+'</div>'+
      '<div class="tnk"><small>Volume against contract</small><b>62%</b><em>forecast 98%</em>'+spark('0,22 20,20 40,17 60,14 80,11 100,8')+'</div></div>'+
      '<div class="cols2d"><div class="tnc">'+
      lc('OTIF by region','<div class="qbs">'+qbar('Asia',100,96,0,'96%')+qbar('Mid East',100,91,0,'91%')+qbar('India',100,94,0,'94%')+qbar('Europe',100,95,0,'95%')+'</div>',{html:'<span class="small">Source: SAP delivery notes, Slack milestones</span>'})+
      lc('Discount against policy','<div class="qbs">'+qbar('Asia',100,12,0,'12 waivers')+qbar('Mid East',100,28,0,'28 waivers')+qbar('India',100,9,0,'9 waivers')+qbar('Europe',100,15,0,'15 waivers')+'</div>')+
      '</div><div class="agent"><div class="agh"><span class="spark">✦</span><b>Ask about this dashboard</b></div>'+
      '<div class="tqs"><button class="tqb" type="button" data-do="tq" data-q="0">Which region had the lowest OTIF?</button><button class="tqb" type="button" data-do="tq" data-q="1">Where are waivers highest?</button></div>'+
      '<div class="bub" id="tqOut" style="margin-top:10px">Pick a question. Answers come from the same governed data as the dashboard.</div>'+
      '<div class="chips" style="margin-top:8px"><span class="pill">Salesforce</span><span class="pill">SAP via MuleSoft</span><span class="pill">Snowflake, in flight</span></div></div></div>';
  }
  function mock(k){
    var s;
    switch(k){
      case 0:
        return '<div class="shots">'+cap('Three ways in, one queue')+channels()+
          cap('Service Console: the Quotes queue everyone can see')+sf('Service','S','#E8628C',['Home','Cases','#Case 00048213'],1,queueView(),UTIL_SVC)+
          cap('Key accounts, by email: the case in Service Console')+sf('Service','S','#E8628C',['Home','Cases','#Case 00048213'],2,caseConsole(),UTIL_SVC)+
          cap('Smaller customers, self-service: the Gulf Marine ordering and enquiry portal')+portal()+
          cap('Slack: the same moment, for the team')+
          slack('cs-quotes',[
            {av:'S',c:'#0176D3',name:'Salesforce',app:1,html:'<b>SLA at risk in 1 hour</b>: Case 00048213, refill for Pacific Explorer<div class="skatt"><b>Case 00048213</b><div class="skf"><div><small>Status</small>New</div><div><small>Owner</small>Quotes queue</div></div></div><div style="display:flex;gap:8px"><button class="skbtn go" type="button" data-do="claim">Claim case</button><button class="skbtn" type="button">Open in Salesforce</button></div><p id="claimOut" style="margin-top:6px;color:#616061">Unclaimed in the Quotes queue.</p>'},
            {av:'DK',c:'#007A5A',name:'Daniel Koh',time:'2 min ago',html:'Heads-up: this customer’s vessel is in dry dock. Expect a large refill.'}
          ])+'</div>';
      case 1:
        s = sf('Fleet Sales','F','#1B96FF',['Home','Vessels','#Pacific Explorer'],2,vesselPage(),null);
        return '<div class="shots">'+cap('Vessel 360: one record page for CS and the sales rep. Click the tabs to explore.')+s+'</div>';
      case 2:
        s = sf('Service','S','#E8628C',['Home','Cases','#Quote Q-26-10533'],2,
          rh('#F88962','Q','Quote','Q-26-10533',[['Account','<span class="lkx">Harbourline Marine Trading</span>'],['Vessel','<span class="lkx">Pacific Explorer</span>'],['Price source','<span class="pill ok">Live from SAP</span>'],['Sanctions check','<span class="pill ok">Passed</span>'],['Expires','Today 18:30'],['Total','USD 46,820']],['Follow','Edit','Submit for Approval'])+
          pth(['Draft','Availability held','Approval','Sent'],1,'Mark Status as Complete')+
          lc('Quote Line Items','<table class="t"><tr><th>Product</th><th>Asked</th><th>Available</th><th>Hold until</th></tr>'+
            '<tr><td>GULFSEA HYDRAULIC HVI PLUS 15</td><td>20 drums</td><td><span class="pill warn">16 drums</span></td><td>18:30 today</td></tr>'+
            '<tr><td>GULFSEA CYLCARE 5040</td><td>15 IBC</td><td><span class="pill ok">15 IBC</span></td><td>18:30 today</td></tr>'+
            '<tr><td>GULFSEA SUPERBEAR 3006</td><td>8 IBC</td><td><span class="pill ok">8 IBC</span></td><td>18:30 today</td></tr></table>',{letter:'L',color:'#F88962',count:3,btn:'Create from PDF or email'})+
          lc('Price per 100 litres, line 1','<div class="wf" role="img" aria-label="Price waterfall from list price to net price"><span style="width:34%;background:#032D60"></span><span style="width:20%;background:#2E844A"></span><span style="width:10%;background:#0176D3"></span><span style="width:8%;background:#90D0FE"></span><span style="width:28%;background:#FE9339"></span></div>'+
            '<div class="legend"><span><i style="background:#032D60"></i>List</span><span><i style="background:#2E844A"></i>Discount</span><span><i style="background:#0176D3"></i>Port</span><span><i style="background:#90D0FE"></i>Packing</span><span><i style="background:#FE9339"></i>Net price</span></div>',{html:'<span class="small">Illustrative proportions</span>'}),null);
        return '<div class="shots">'+cap('Quote record: SAP price, availability and sanctions in one place')+s+cap('Slack: the availability request to Supply Chain')+
          slack('supply-chain',[
            {av:'MT',c:'#E01E5A',name:'Mei Tan',time:'12:40',html:'Please confirm availability for Pacific Explorer. The customer needs it inside the dry-dock window.<div class="skatt"><b>Quote Q-26-10533</b><div class="skf"><div><small>Lines</small>3</div><div><small>Hold requested</small>Until 18:30</div></div></div>'},
            {av:'PN',c:'#007A5A',name:'Priya Nair',time:'12:52',html:'Confirmed for 16 of 20 drums on one line. Partner PO will follow on order.'}
          ])+'</div>';
      case 3:
        return '<div class="shots">'+cap('Slack on a desktop, and the same decision in Slack on a phone')+
          '<div class="split sideR"><div class="col">'+slack('approvals',[{av:'S',c:'#0176D3',name:'Salesforce',app:1,html:approvalSlack()}])+'</div>'+
          '<div class="col phones">'+phone(approvalSlackMobile())+'</div></div>'+
          cap('Salesforce: the approval history on the quote')+
          sf('Service','S','#E8628C',['Home','Cases','#Quote Q-26-10533'],2,
            lc('Approval History','<table class="t"><tr><th>Step</th><th>Assigned to</th><th>Status</th></tr>'+
              '<tr><td>Submitted</td><td>Mei Tan</td><td><span class="pill ok">Done</span></td></tr>'+
              '<tr><td>Policy check</td><td>System</td><td><span class="pill ok">Margin above floor</span></td></tr>'+
              '<tr><td>Decision</td><td>Daniel Koh</td><td><span class="pill warn">Pending</span></td></tr>'+
              '<tr><td>Escalation</td><td>Asia leader</td><td><span class="small">Only above the policy limit</span></td></tr></table>',{letter:'A',color:'#2E844A',count:4,btn:'Submit for Approval'}),null)+'</div>';
      case 4:
        s = sf('Service','S','#E8628C',['Home','Orders','#Order SO-26-04817'],2,
          rh('#769ED9','O','Order','SO-26-04817',[['Account','<span class="lkx">Harbourline Marine Trading</span>'],['Vessel','<span class="lkx">Pacific Explorer</span>'],['SAP order','4601182'],['Status','<span class="pill ok">Firm order</span>'],['Delivery','Fri 20 Nov, Zhoushan']],['Follow','Edit','Add Task'])+
          pth(['Quoted','Availability confirmed','Firm order','Delivered','Invoiced'],2,'Mark Status as Complete')+
          '<div class="cols2c"><div>'+lc('Order Products','<table class="t"><tr><th>Product</th><th>Qty</th></tr><tr><td>GULFSEA HYDRAULIC HVI PLUS 15</td><td>16 drums</td></tr><tr><td>GULFSEA CYLCARE 5040</td><td>15 IBC</td></tr><tr><td>Customs charge</td><td>1</td></tr><tr><td>Pumping charge</td><td>1</td></tr></table>',{letter:'P',color:'#769ED9',count:4,btn:'Add Products'})+'</div><div>'+
          lc('Next Steps','<table class="t"><tr><td>Confirm availability</td><td><span class="pill ok">Done</span></td></tr><tr><td>Raise partner PO</td><td><span class="pill ok">Done</span></td></tr><tr><td>Arrange delivery slot</td><td><span class="pill warn">Due Thu 19 Nov</span></td></tr><tr><td>Prepare delivery receipt</td><td><span class="pill">Open</span></td></tr></table>',{letter:'T',color:'#4BC076',count:4,btn:'New Task'})+'</div></div>',UTIL_SVC);
        return '<div class="shots">'+cap('Order record: one status, tasks for every team')+s+cap('Slack: the order channel, tied to the record')+
          slack('order-pacific-explorer',[
            {av:'PN',c:'#007A5A',name:'Priya Nair',time:'14:05',html:'Availability confirmed. Partner PO raised.'},
            {av:'MT',c:'#E01E5A',name:'Mei Tan',time:'14:20',html:'Customer confirmed by email. SAP order number written back.<div class="skatt"><b>Order SO-26-04817</b><div class="skf"><div><small>Status</small>Firm order</div><div><small>SAP order</small>4601182</div></div></div>'},
            {av:'JL',c:'#8A5A00',name:'Jun Wei Lim',time:'14:31',html:'Customs and pumping added as order lines.'}
          ],'Order channel, tied to the record')+'</div>';
      case 5:
        s = sf('Service','S','#E8628C',['Home','Orders','#Delivery DL-26-0312'],2,
          rh('#769ED9','D','Delivery','DL-26-0312',[['Order','<span class="lkx">SO-26-04817</span>'],['Delivery note','DN-4601182-01 (SAP)'],['Carrier','Harbour Barge Services'],['Agent','Seaward Port Agency'],['Status','<span class="pill ok">Delivered, confirmed</span>']],['Follow','Edit','Message customer'])+
          pth(['Planned','Dispatched','At port','Delivered','Invoiced'],3,'Mark Status as Complete')+
          '<div class="cols2c"><div>'+
          lc('Delivery milestones','<table class="t"><tr><th>Event</th><th>From</th><th>Time</th></tr><tr><td>Delivery note issued</td><td>SAP</td><td>07:05</td></tr><tr><td>Loaded at partner depot</td><td>Partner</td><td>08:20</td></tr><tr><td>Barge dispatched</td><td>Barge operator</td><td>09:00</td></tr><tr><td>Alongside vessel</td><td>Ship agent</td><td>13:40</td></tr><tr><td>Pumping complete</td><td>Operations</td><td>15:10</td></tr><tr><td>Receipt e-signed</td><td>Chief Engineer</td><td>15:25</td></tr></table>',{letter:'M',color:'#769ED9',count:6,html:'<span class="small">Fed by SAP and Slack</span>'})+
          '</div><div>'+
          lc('Proof of delivery','<table class="t"><tr><th>Source</th><th>HVI 15</th></tr><tr><td>Ordered (Salesforce)</td><td>16 drums</td></tr><tr><td>Shipped (SAP note)</td><td>16 drums</td></tr><tr><td>Received (e-signed)</td><td>16 drums</td></tr><tr><td>Result</td><td><span class="pill ok">All three match</span></td></tr></table>',{letter:'P',color:'#2E844A'})+
          lc('Agentforce','<p style="margin:0 0 6px">All three sources agree. Invoice request raised. OTIF: on time, in full.</p><span class="pill">Checked automatically</span>',{letter:'✦',color:'#0176D3'})+
          '</div></div>',UTIL_SVC);
        return '<div class="shots">'+cap('Delivery assurance: five checkpoints, each with a named source')+chain()+
          cap('Salesforce: the delivery record, fed by the SCM system')+s+
          cap('Slack Connect: one shared channel with the agent, the barge operator and the customer')+
          slack('ext-pacific-explorer-delivery',[
            {av:'S',c:'#0176D3',name:'Salesforce',app:1,time:'07:10',html:'<b>Delivery DL-26-0312 planned for Fri 20 Nov, Zhoushan anchorage</b><div class="skf"><div><small>Delivery note</small>DN-4601182-01, issued from SAP</div><div><small>Window</small>13:00 to 17:00</div><div><small>Items</small>16 drums HVI 15, 15 IBC cylinder oil</div><div><small>Vessel</small>Pacific Explorer</div></div>'},
            {av:'CW',c:'#8A4B00',name:'Chen Wei',ext:'Seaward Port Agency',time:'12:10',html:'Vessel is at the anchorage. Gangway and crane are ready. Customs clearance is done.'},
            {av:'RM',c:'#5B2A86',name:'Ravi Menon',ext:'Harbour Barge Services',time:'13:05',html:'Barge loaded at the partner depot. ETA alongside 13:40.'},
            {av:'✦',c:'#0176D3',name:'Agentforce',app:1,time:'13:41',html:'Barge is alongside, inside the window. I will ask the Chief Engineer to confirm receipt once pumping is complete.'},
            {av:'HW',c:'#2E844A',name:'Henry Wu',ext:'Harbourline Marine Trading',time:'15:30',html:'Received, thank you. The Chief Engineer has signed.'}
          ],'Shared with 3 external organisations. Margin and internal notes stay in the internal channel.')+
          cap('The Chief Engineer confirms on a phone link, with no paper')+
          '<div class="col phones">'+phone(esignPhone())+'</div>'+
          cap('Slack, internal: Agentforce reconciles and the team validates')+
          slack('delivery-pacific-explorer',[
            {av:'DK',c:'#007A5A',name:'Daniel Koh',time:'15:32',html:'<span style="color:#1264A3">@Agentforce</span> where is the Pacific Explorer delivery?'},
            {av:'✦',c:'#0176D3',name:'Agentforce',app:1,time:'15:32',html:'Delivered at 15:10 and confirmed by the Chief Engineer at 15:25. Ordered 16, shipped 16, received 16. Invoice request raised. OTIF: on time, in full.<div class="skatt">A draft update to Harbourline Marine Trading is ready, in Chinese with an English preview.</div><div class="apBtns2" style="display:flex;gap:8px"><button class="skbtn go" type="button" data-do="sendcust">Send to customer</button><button class="skbtn" type="button">Edit draft</button></div><p id="sendOut" style="margin-top:6px;color:#007A5A;font-weight:700"></p>'},
            {av:'GL',c:'#8A5A00',name:'Grace Lim',time:'15:34',html:'Invoice INV-26-90021 is queued for release.'}
          ],'Internal only')+'</div>';
      case 6:
        s = sf('Sales','S','#2E844A',['Home','Opportunities','Dashboards','#New-vessel pipeline'],3,
          dashboard()+
          lc('Opportunity created from the quote','<div style="margin-bottom:8px">'+pth(['Prospecting','Quoted','Won'],2,null)+'</div><div class="small">Name: Pacific Explorer refill. Source: quote Q-26-10533. Closed automatically by SAP order SO-26-04817.</div>',{letter:'$',color:'#FCB95B'}),["Notes","History"]);
        return '<div class="shots">'+cap('Sales: the sales lead’s morning view (Phase 2 preview, illustrative data)')+s+
          cap('Sales Agreement: the contract record, with live prices from SAP. Click the tabs.')+
          sf('Sales','S','#2E844A',['Home','Agreements','#Harbourline 2026'],2,agreementPage(),["Notes","History"])+
          cap('Advanced Account Forecasting: expected volume from the dry-dock schedule')+
          sf('Sales','S','#2E844A',['Home','Accounts','#Harbourline Marine Trading'],2,forecastPage(),null)+
          cap('Slack: the salesman hears first, with the numbers')+
          slack('sales-agreements',[
            {av:'S',c:'#0176D3',name:'Salesforce',app:1,time:'08:00',html:'<b>Harbourline Marine Trading is at 62% of committed volume</b>, 6 weeks before the agreement ends.<div class="skf"><div><small>Delivered</small>372,000 of 600,000 L</div><div><small>Forecast to year end</small>about 98%</div><div><small>Renewal due</small>31 Dec 2026</div><div><small>Vessels in dry dock soon</small>2</div></div><div style="display:flex;gap:8px"><button class="skbtn go" type="button" data-do="renew2">Draft renewal</button><button class="skbtn" type="button">Open agreement</button></div><p id="renew2Out" style="margin-top:6px;color:#007A5A;font-weight:700"></p>'},
            {av:'✦',c:'#0176D3',name:'Agentforce',app:1,time:'08:00',html:'Pacific Explorer’s dry dock should close most of the gap. I can prepare the renewal from this year’s usage.'}
          ],'Sales team')+'</div>';
      default:
        s = sf('Service','S','#E8628C',['Home','Cases','#Case 00048213'],2,
          '<div class="cols2d"><div>'+
          rh('#F2CF5B','C','Case','00048213',[['Status','<span class="pill warn">New</span>'],['Vessel','<span class="lkx">Pacific Explorer</span>'],['Language','Chinese']],['Follow','Edit'],true)+
          lc('Draft quote','<table class="t"><tr><th>Product</th><th>Qty</th></tr><tr><td>7 grades</td><td>Price from SAP</td></tr><tr><td>Availability</td><td><span class="pill ok">Held</span></td></tr></table>',{letter:'Q',color:'#F88962',html:'<span class="pill">Draft</span>'})+
          '</div><div class="agent"><div class="agh"><span class="spark">✦</span><b>Agentforce, enquiry triage</b></div>'+
          '<div class="bub">I classified this as a refill during a dry dock and matched the vessel from its old name, Ocean Pioneer.</div>'+
          '<div class="bub">A draft quote is ready, with a reply in Chinese and an English preview.</div>'+
          '<div class="bub neutral">Nothing sends until a person validates it.</div>'+
          '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button class="action" type="button" data-do="validate">Validate and send</button><button class="action alt" type="button">Edit draft</button></div>'+
          '<p class="ok-msg" id="vOut" style="margin-top:8px"></p></div></div>',UTIL_SVC);
        return '<div class="shots">'+cap('Agentforce use cases across the journey, and a suggested order')+useCases()+
          cap('Use case 1, enquiry triage: the agent drafts, CS validates')+s+
          cap('Use case 2, vessel data steward: the agent that fixes master data first')+
          sf('Fleet Sales','F','#1B96FF',['Home','Vessels','#Data quality'],2,stewardScreen(),null)+
          cap('Use case 3, quote assistant: from a customer PDF to a draft quote')+
          sf('Service','S','#E8628C',['Home','Cases','#Case 00048213'],2,quoteAgent(),null)+
          cap('Tableau Next: one executive view across service, delivery, margin and contracts')+
          sf('Analytics','A','#1B96FF',['Home','Dashboards','#Executive view'],2,tableauScreen(),null)+'</div>';
    }
  }

  function render(){
    var a = acts[i];
    var today = mode === "today";
    var left = '<div class="panel swap"><div class="phead"><h3>'+esc(a.full)+'</h3><span class="tag '+(today?'today':'future')+'">'+(today?'Today':'With Salesforce and Slack')+'</span><span class="who">'+esc(a.who)+'</span></div><div class="pbody">';
    if(today){
      left += '<div class="chain" aria-label="Tools involved">'+a.tools.map(function(t){return '<span class="tool">'+esc(t)+'</span>'}).join('<i>swivel chair</i>')+'</div>';
      left += '<div class="doc">'+a.doc.map(function(d){return '<div>'+esc(d)+'</div>'}).join('')+'</div>';
      left += '<div class="pain">'+esc(a.pain)+'</div>';
    } else {
      left += mock(i);
    }
    left += '</div></div>';
    var right = '<div class="panel swap"><div class="phead"><h3>Business value</h3><span class="tag val">'+esc(a.vt)+'</span></div><div class="pbody vb">'+
      '<h4 class="vtitle">'+esc(a.head)+'</h4>'+
      '<ul class="vlist">'+a.vl.map(function(v){return '<li>'+esc(v)+'</li>'}).join('')+'</ul>'+
      '<div><p class="lbl">Seen in a recent order</p><div class="ev">'+a.ev.map(function(e){return '<div><b>'+esc(e[0])+'</b><span>'+esc(e[1])+'</span></div>'}).join('')+'</div></div>'+
      '<div><p class="lbl">Measure it with</p><div class="kpis">'+a.kpi.map(function(k){return '<span class="pill">'+esc(k)+'</span>'}).join('')+'</div></div>'+
      '</div></div>';
    grid.innerHTML = left + right;

    var tabs = stops.querySelectorAll(".stop");
    for(var k=0;k<tabs.length;k++){
      tabs[k].setAttribute("aria-selected", k===i ? "true":"false");
      tabs[k].setAttribute("tabindex", k===i ? "0":"-1");
      tabs[k].classList.toggle("done", k<i);
    }
    var pct = i/(acts.length-1);
    var span = stops.getBoundingClientRect().width - 56;
    document.getElementById("fill").style.width = (pct*100)+"%";
    document.getElementById("ship").style.left = (pct*100)+"%";
    document.getElementById("prev").disabled = i===0;
    document.getElementById("next").disabled = i===acts.length-1;
    document.getElementById("mToday").setAttribute("aria-pressed", today?"true":"false");
    document.getElementById("mFuture").setAttribute("aria-pressed", today?"false":"true");
  }

  function go(k, fromHash){
    i = Math.max(0, Math.min(acts.length-1, k));
    render();
    if(!fromHash){ try{ history.replaceState(null,"","#act-"+(i+1)); }catch(e){} }
  }

  stops.addEventListener("click", function(e){
    var b = e.target.closest(".stop"); if(b) go(+b.getAttribute("data-k"));
  });
  stops.addEventListener("keydown", function(e){
    if(e.key==="ArrowRight"){ go(i+1); var t=document.getElementById("tab"+i); if(t) t.focus(); }
    if(e.key==="ArrowLeft"){ go(i-1); var t2=document.getElementById("tab"+i); if(t2) t2.focus(); }
  });
  document.getElementById("prev").addEventListener("click", function(){ go(i-1); });
  document.getElementById("next").addEventListener("click", function(){ go(i+1); });
  document.getElementById("mToday").addEventListener("click", function(){ mode="today"; render(); });
  document.getElementById("mFuture").addEventListener("click", function(){ mode="future"; render(); });

  grid.addEventListener("click", function(e){
    var b = e.target.closest("[data-do]"); if(!b) return;
    var d = b.getAttribute("data-do");
    function all(sel,fn){ Array.prototype.forEach.call(grid.querySelectorAll(sel),fn); }
    if(d==="ptab"){
      var v=b.getAttribute("data-v");
      all(".gp-nav button",function(n){ n.classList.toggle("on", n===b); });
      all(".gp-pane",function(n){ n.classList.toggle("on", n.getAttribute("data-pane")===v); });
    }
    if(d==="vtab"){
      var vv=b.getAttribute("data-v");
      all(".vtabs button",function(n){ n.classList.toggle("on", n===b); });
      all(".vpane",function(n){ n.classList.toggle("on", n.getAttribute("data-vp")===vv); });
    }
    if(d==="esign"){ document.getElementById("esOut").textContent="Delivery confirmed. Thank you. Gulf Marine has been notified."; b.disabled=true; b.textContent="Confirmed"; }
    if(d==="sendcust"){ document.getElementById("sendOut").textContent="Sent after validation by Mei Tan."; b.disabled=true; var ab=document.querySelector(".apBtns2"); }
    if(d==="atab"){
      var av=b.getAttribute("data-v");
      all(".atabs span",function(n){ n.classList.toggle("on", n===b); });
      all(".apane",function(n){ n.classList.toggle("on", n.getAttribute("data-ap")===av); });
    }
    if(d==="pchg"){ document.getElementById("pchgOut").textContent="Request sent to the Asia leader. After approval it is written to SAP, so SAP stays the master."; }
    if(d==="renew"){ document.getElementById("renewOut").textContent="Renewal drafted from this year’s usage and current prices, for Daniel Koh to review."; }
    if(d==="renew2"){ document.getElementById("renew2Out").textContent="Renewal draft created for Daniel Koh to review."; b.disabled=true; }
    if(d==="merge"){ document.getElementById("mergeOut").textContent="2 merges approved by Priya Nair. Applied in SAP through MuleSoft, and Salesforce updates from SAP."; b.disabled=true; }
    if(d==="qagent"){ document.getElementById("qaOut").textContent="Draft quote created for Mei Tan to review. The 16-of-20 drum shortfall is flagged on the line."; b.disabled=true; }
    if(d==="tq"){ var tqa=["Middle East, at 91% last month. Three late barge confirmations explain most of the gap.","Middle East, with 28 waivers. Two key accounts account for most of them."]; var qq=document.getElementById("tqOut"); qq.textContent=tqa[+b.getAttribute("data-q")]+" (illustrative)"; }
    if(d==="qty"){ var qi=b.getAttribute("data-i"), qe=document.getElementById("gpq"+qi); qe.textContent=Math.max(1,(+qe.textContent)+(+b.getAttribute("data-d"))); }
    if(d==="add"){
      var ai=+b.getAttribute("data-i"), aq=+document.getElementById("gpq"+ai).textContent, hit=null;
      cartItems.forEach(function(it){ if(it.i===ai) hit=it; });
      if(hit){ hit.q=aq; } else { cartItems.push({i:ai,q:aq}); }
      document.getElementById("gpMsg").textContent=""; renderCart(); b.textContent="Added";
      setTimeout(function(){ b.textContent="Add to order"; },900);
    }
    if(d==="pplace"||d==="pquote"){
      var pm=document.getElementById("gpMsg");
      if(!cartItems.length){ pm.style.color="#a05a00"; pm.textContent="Add at least one product first."; }
      else { pm.style.color="#1d7a46"; pm.textContent = d==="pplace" ? "Order received. It is within your agreed threshold at your price, so it confirms straight away and the SAP order number is written back." : "Quote request received as a case. Mei Tan sees it in the queue with the vessel matched. Price and availability follow."; }
    }
    if(d==="penq"){ document.getElementById("gpEnqMsg").textContent="Enquiry received as a case. Mei Tan sees it in the same queue as email enquiries, with the SLA clock running."; b.disabled=true; b.textContent="Sent"; }
    if(d==="claim"){ document.getElementById("claimOut").textContent="Claimed by Mei Tan. The clock keeps running, now with an owner."; b.disabled=true; b.textContent="Claimed"; }
    if(d==="translate"){ var m=document.getElementById("mailTxt"); if(m.getAttribute("data-en")){ m.textContent=m.getAttribute("data-zh"); m.removeAttribute("data-en"); b.textContent="Translate"; } else { m.setAttribute("data-zh", m.textContent); m.setAttribute("data-en","1"); m.removeAttribute("lang"); m.textContent="Pacific Explorer is in the shipyard for repairs and leaves dock in about 3 days. Please quote the oils below as soon as possible."; b.textContent="Show original"; } }
    if(d==="approve"||d==="decline"){
      var txt = d==="approve" ? "Approved by Daniel Koh. Quote updated and logged. Asia leader informed only if above threshold." : "Declined. Mei Tan is asked to go back to the customer with the standard price.";
      all(".apOut",function(n){ n.textContent=txt; }); all(".apBtns",function(n){ n.style.display="none"; });
    }
    if(d==="portal"){ document.getElementById("portalOut").textContent="Received as a case. Arjun Rao sees it in the queue now, with the vessel matched. Price and availability follow."; b.disabled=true; b.textContent="Submitted"; }
    if(d==="opp"){ document.getElementById("oppOut").textContent="Opportunity created and pre-filled for the regional owner. No typing."; b.disabled=true; b.textContent="Created"; }
    if(d==="validate"){ document.getElementById("vOut").textContent="Sent after validation by Mei Tan."; b.disabled=true; }
  });

  /* business case */
  document.getElementById("themes").innerHTML = themes.map(function(t){
    return '<article class="theme"><span class="tag val" style="justify-self:start">'+esc(t.n)+'</span><h3>'+esc(t.h)+'</h3><p class="small">'+esc(t.ev)+'</p><div><p class="lbl">Measure it with</p><p class="small">'+esc(t.m)+'</p></div><div class="gap">To quantify in the workshop: '+esc(t.q)+'</div></article>';
  }).join("");

  /* value by step and proof plan */
  var srcs=["Salesforce case timestamps","Vessel records from SAP and Locus","Salesforce quote and SAP price","Approval history in Salesforce","Salesforce order and SAP","SAP delivery note and e-signature","Opportunities and agreements","Agent logs and Tableau Next"];
  document.getElementById("vbs").innerHTML='<tr><th>Step</th><th>Value</th><th>First number to baseline</th><th>Where it comes from</th></tr>'+acts.map(function(a,k){
    return '<tr><td>'+(k+1)+'. '+esc(a.t)+'</td><td>'+esc(a.vt)+'</td><td>'+esc(a.kpi[0])+'</td><td>'+esc(srcs[k])+'</td></tr>';
  }).join('');
  document.getElementById("prove").innerHTML=[["Baseline","Agree what to measure and record where we are today."],["Pilot","Try the approach in a focused scope, agreed together with Gulf Marine."],["Review","Compare with the baseline and agree the next steps and targets."]].map(function(x,i){
    return '<div class="pv"><span class="cn2">'+(i+1)+'</span><b>'+x[0]+'</b><p>'+x[1]+'</p></div>';
  }).join('');

  document.getElementById("themebtn").addEventListener("click", function(){
    var r = document.documentElement, dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var cur = r.getAttribute("data-theme") || (dark ? "dark" : "light");
    r.setAttribute("data-theme", cur === "dark" ? "light" : "dark");
  });

  function fromHash(){
    var m = /^#act-([1-8])$/.exec(location.hash);
    if(m){ go(+m[1]-1, true); } else { go(0, true); }
  }
  window.addEventListener("hashchange", fromHash);
  buildStops(); fromHash();
})();
