const html = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>حسابداری بوفه پارسیان</title>
<style>
:root{font-family:Tahoma,Arial,sans-serif;color:#172033;background:#f3f6fb}*{box-sizing:border-box}body{margin:0}.top{background:linear-gradient(120deg,#123c72,#1976c9);color:#fff;padding:22px max(18px,calc((100% - 1100px)/2))}.top h1{margin:0 0 6px;font-size:23px}.wrap{max-width:1100px;margin:22px auto;padding:0 16px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.card,.panel{background:#fff;border:1px solid #e4eaf2;border-radius:16px;padding:16px;box-shadow:0 4px 16px #19365b0a}.stat small{color:#667085}.stat strong{display:block;font-size:23px;margin-top:9px}.tabs{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}.tabs button,.btn{border:0;border-radius:10px;padding:11px 16px;background:#1769aa;color:#fff;cursor:pointer;font-weight:bold}.tabs button{background:#e3edf8;color:#174b7b}.tabs button.active{background:#1769aa;color:white}.grid{display:grid;grid-template-columns:1.1fr .9fr;gap:14px}.panel h2{font-size:18px;margin:0 0 15px}label{display:block;font-size:13px;color:#526174;margin:12px 0 6px}input,select{width:100%;padding:12px;border:1px solid #d5deea;border-radius:9px;background:#fff;font:inherit} .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.total{background:#edf6ff;border-radius:12px;padding:15px;margin:14px 0;display:flex;justify-content:space-between;align-items:center}.total b{font-size:22px;color:#1264a3}.muted{color:#718096;font-size:12px}.notice{padding:11px;border-radius:10px;background:#fff5df;color:#815400;margin:10px 0}.hidden{display:none}table{width:100%;border-collapse:collapse}td,th{text-align:right;padding:10px;border-bottom:1px solid #edf0f5;font-size:13px}.pill{padding:4px 8px;border-radius:20px;background:#edf6ff;color:#155c92;font-size:12px}@media(max-width:760px){.stats{grid-template-columns:1fr 1fr}.grid{grid-template-columns:1fr}.top{padding:18px}.wrap{margin:14px auto}.row{grid-template-columns:1fr}}
</style></head><body>
<header class="top"><h1>پارسیان | حسابداری بوفه</h1><div>مدیریت فروش، کالاها و حساب دانش‌آموزان</div></header>
<main class="wrap">
<section class="stats">
<div class="card stat"><small>فروش امروز</small><strong id="todaySales">۰ تومان</strong></div>
<div class="card stat"><small>دریافتی صندوق</small><strong id="cashTotal">۰ تومان</strong></div>
<div class="card stat"><small>بدهی دانش‌آموزان</small><strong id="debtTotal">۰ تومان</strong></div>
<div class="card stat"><small>تعداد کالا</small><strong id="productCount">۰</strong></div>
</section>
<nav class="tabs"><button class="active" data-tab="sale">ثبت فروش</button><button data-tab="products">کالاها</button><button data-tab="students">دانش‌آموزان</button><button data-tab="reports">گزارش‌ها</button></nav>
<section id="sale" class="grid">
<div class="panel"><h2>ثبت فروش جدید</h2>
<label>انتخاب دانش‌آموز (برای نسیه الزامی است)</label><select id="student"><option value="">فروش آزاد / بدون دانش‌آموز</option></select>
<label>انتخاب کالا</label><select id="product"></select>
<div class="row"><div><label>تعداد</label><input id="qty" type="number" min="1" value="1"></div><div><label>قیمت واحد</label><input id="unitPrice" disabled value="۰"></div></div>
<div class="total"><span>مبلغ قابل پرداخت</span><b id="total">۰ تومان</b></div>
<label>روش پرداخت</label><select id="method"><option value="cash">نقدی</option><option value="card">کارت‌خوان</option><option value="credit">نسیه (قرض)</option></select>
<div id="creditNote" class="notice hidden">مبلغ فروش به بدهی دانش‌آموز انتخاب‌شده اضافه می‌شود.</div>
<label>توضیحات (اختیاری)</label><input id="note" placeholder="توضیحات فروش">
<button class="btn" id="submitSale" style="width:100%;margin-top:14px">ثبت نهایی فروش</button><p id="saleMsg" class="muted"></p>
</div>
<div class="panel"><h2>آخرین فروش‌ها</h2><div id="recentSales" class="muted">هنوز فروشی ثبت نشده است.</div></div>
</section>
<section id="products" class="panel hidden"><h2>افزودن کالا</h2><div class="row"><div><label>نام کالا</label><input id="newProduct" placeholder="مثلاً ساندویچ"></div><div><label>قیمت خرید (تومان)</label><input id="buyPrice" type="number" min="0"></div><div><label>قیمت فروش (تومان)</label><input id="sellPrice" type="number" min="0"></div><div><label>موجودی اولیه</label><input id="stock" type="number" min="0" value="0"></div></div><button class="btn" id="addProduct">ذخیره کالا</button><div id="productTable"></div></section>
<section id="students" class="panel hidden"><h2>افزودن دانش‌آموز</h2><div class="row"><div><label>نام و نام خانوادگی</label><input id="newStudent" placeholder="نام دانش‌آموز"></div><div><label>پایه و کلاس</label><input id="className" placeholder="مثلاً هشتم ۲"></div></div><button class="btn" id="addStudent">ذخیره دانش‌آموز</button><div id="studentTable"></div></section>
<section id="reports" class="panel hidden"><h2>گزارش و تسویه حساب</h2><p class="muted">گزارش فروش و مانده بدهی بر اساس اطلاعات ثبت‌شده در پایگاه داده.</p><div id="reportTable"></div></section>
</main>
<script>
const $=id=>document.getElementById(id), money=n=>Number(n||0).toLocaleString('fa-IR')+' تومان';
let products=[],students=[];
async function api(path,opts={}){const r=await fetch('/api'+path,{headers:{'content-type':'application/json'},...opts});const j=await r.json();if(!r.ok)throw Error(j.error||'خطا در ارتباط با سرور');return j}
async function refresh(){try{const [p,s,sum,sales]=await Promise.all([api('/products'),api('/students'),api('/summary'),api('/sales')]);products=p;students=s;$('productCount').textContent=p.length.toLocaleString('fa-IR');$('todaySales').textContent=money(sum.today_sales);$('cashTotal').textContent=money(sum.cash_total);$('debtTotal').textContent=money(sum.total_debt);$('product').innerHTML=p.map(x=>'<option value="'+x.id+'">'+x.name+' — '+money(x.sale_price)+' (موجودی '+x.stock_qty+')</option>').join('');$('student').innerHTML='<option value="">فروش آزاد / بدون دانش‌آموز</option>'+s.map(x=>'<option value="'+x.id+'">'+x.full_name+' — '+(x.class_name||'بدون کلاس')+'</option>').join('');renderProducts();renderStudents();$('recentSales').innerHTML=sales.slice(0,8).map(x=>'<p>سند '+x.receipt_no+' · '+(x.student_name||'فروش آزاد')+' · '+money(x.total_amount)+' · '+x.payment_method+'</p>').join('')||'هنوز فروشی ثبت نشده است.';renderReport(s)}catch(e){console.error(e);$('saleMsg').textContent=e.message}}
function selected(){return products.find(x=>String(x.id)===$('product').value)}
function calc(){$('unitPrice').value=selected()?money(selected().sale_price):'۰';$('total').textContent=money((selected()?.sale_price||0)*Math.max(1,Number($('qty').value||1)));$('creditNote').classList.toggle('hidden',$('method').value!=='credit')}
function renderProducts(){$('productTable').innerHTML='<table><tr><th>کالا</th><th>قیمت فروش</th><th>موجودی</th></tr>'+products.map(p=>'<tr><td>'+p.name+'</td><td>'+money(p.sale_price)+'</td><td>'+p.stock_qty+'</td></tr>').join('')+'</table>'}
function renderStudents(){$('studentTable').innerHTML='<table><tr><th>دانش‌آموز</th><th>کلاس</th><th>بدهی</th></tr>'+students.map(s=>'<tr><td>'+s.full_name+'</td><td>'+(s.class_name||'-')+'</td><td>'+money(s.balance)+'</td></tr>').join('')+'</table>'}
function renderReport(s){$('reportTable').innerHTML='<table><tr><th>دانش‌آموز</th><th>کلاس</th><th>مانده بدهی</th></tr>'+s.map(x=>'<tr><td>'+x.full_name+'</td><td>'+(x.class_name||'-')+'</td><td>'+money(x.balance)+'</td></tr>').join('')+'</table>'}
$('product').onchange=calc;$('qty').oninput=calc;$('method').onchange=calc;
$('submitSale').onclick=async()=>{try{const p=selected(),qty=Number($('qty').value),method=$('method').value,studentId=$('student').value;if(!p)throw Error('ابتدا کالا ثبت و انتخاب کنید');if(method==='credit'&&!studentId)throw Error('برای ثبت نسیه باید دانش‌آموز انتخاب شود');if(qty<1||qty>p.stock_qty)throw Error('تعداد واردشده بیشتر از موجودی کالا است');const result=await api('/sales',{method:'POST',body:JSON.stringify({product_id:p.id,quantity:qty,student_id:studentId||null,payment_method:method,note:$('note').value})});$('saleMsg').textContent='فروش با شماره '+result.receipt_no+' با موفقیت ثبت شد.';$('qty').value=1;$('note').value='';await refresh();calc()}catch(e){$('saleMsg').textContent=e.message}};
$('addProduct').onclick=async()=>{try{await api('/products',{method:'POST',body:JSON.stringify({name:$('newProduct').value,purchase_price:Number($('buyPrice').value),sale_price:Number($('sellPrice').value),stock_qty:Number($('stock').value)})});$('newProduct').value='';await refresh()}catch(e){alert(e.message)}};
$('addStudent').onclick=async()=>{try{await api('/students',{method:'POST',body:JSON.stringify({full_name:$('newStudent').value,class_name:$('className').value})});$('newStudent').value='';await refresh()}catch(e){alert(e.message)}};
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===b));['sale','products','students','reports'].forEach(id=>$(id).classList.toggle('hidden',id!==b.dataset.tab))});
refresh().then(calc);
</script></body></html>`;

const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*'}});
export default {
 async fetch(request,env){
  if(!env.ADMIN_PASSWORD)return new Response('سامانه هنوز پیکربندی امنیتی نشده است.',{status:503,headers:{'content-type':'text/plain; charset=utf-8'}});
  const expected='Basic '+btoa('admin:'+env.ADMIN_PASSWORD);
  if(request.headers.get('Authorization')!==expected)return new Response('ورود مدیر الزامی است.',{status:401,headers:{'WWW-Authenticate':'Basic realm="Parsayan Canteen", charset="UTF-8"','content-type':'text/plain; charset=utf-8'}});
  const url=new URL(request.url),path=url.pathname;
  if(request.method==='OPTIONS')return new Response(null,{headers:{'access-control-allow-origin':'*','access-control-allow-methods':'GET,POST,OPTIONS','access-control-allow-headers':'content-type'}});
  if(path.startsWith('/api/')){
   try{
    if(path==='/api/products'&&request.method==='GET')return json(await env.DB.prepare('SELECT * FROM products WHERE active=1 ORDER BY name').all().then(x=>x.results));
    if(path==='/api/students'&&request.method==='GET')return json(await env.DB.prepare("SELECT s.*, COALESCE((SELECT SUM(CASE WHEN entry_type='debt' THEN amount WHEN entry_type='payment' THEN -amount ELSE amount END) FROM student_ledger l WHERE l.student_id=s.id),0) AS balance FROM students s WHERE s.active=1 ORDER BY s.full_name").all().then(x=>x.results));
    if(path==='/api/summary'&&request.method==='GET'){
     const [today,cash,debt,count]=await Promise.all([
      env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) n FROM sales WHERE date(created_at)=date('now')").first(),
      env.DB.prepare("SELECT COALESCE(SUM(CASE WHEN transaction_type IN ('cash_sale','card_sale','student_payment') THEN amount ELSE -amount END),0) n FROM cash_transactions").first(),
      env.DB.prepare("SELECT COALESCE(SUM(CASE WHEN entry_type='debt' THEN amount WHEN entry_type='payment' THEN -amount ELSE amount END),0) n FROM student_ledger").first(),
      env.DB.prepare("SELECT COUNT(*) n FROM products WHERE active=1").first()
     ]);return json({today_sales:today.n,cash_total:cash.n,total_debt:debt.n,product_count:count.n});
    }
    if(path==='/api/sales'&&request.method==='GET')return json(await env.DB.prepare("SELECT s.*,st.full_name student_name FROM sales s LEFT JOIN students st ON st.id=s.student_id ORDER BY s.id DESC LIMIT 100").all().then(x=>x.results));
    if(path==='/api/products'&&request.method==='POST'){
     const b=await request.json();if(!b.name||Number(b.sale_price)<0||Number(b.stock_qty)<0)throw Error('اطلاعات کالا معتبر نیست');
     const r=await env.DB.prepare('INSERT INTO products(name,purchase_price,sale_price,stock_qty) VALUES(?,?,?,?)').bind(b.name,Number(b.purchase_price||0),Number(b.sale_price),Number(b.stock_qty||0)).run();return json({id:r.meta.last_row_id},201);
    }
    if(path==='/api/students'&&request.method==='POST'){
     const b=await request.json();if(!b.full_name)throw Error('نام دانش‌آموز الزامی است');
     const r=await env.DB.prepare('INSERT INTO students(full_name,class_name) VALUES(?,?)').bind(b.full_name,b.class_name||'').run();return json({id:r.meta.last_row_id},201);
    }
    if(path==='/api/sales'&&request.method==='POST'){
     const b=await request.json(),qty=Number(b.quantity),method=b.payment_method;
     if(!Number.isInteger(qty)||qty<1||!['cash','card','credit'].includes(method))throw Error('اطلاعات فروش معتبر نیست');
     if(method==='credit'&&!b.student_id)throw Error('برای فروش نسیه باید دانش‌آموز انتخاب شود');
     const p=await env.DB.prepare('SELECT * FROM products WHERE id=? AND active=1').bind(b.product_id).first();
     if(!p||p.stock_qty<qty)throw Error('کالا وجود ندارد یا موجودی کافی نیست');
     if(b.student_id){const st=await env.DB.prepare('SELECT id FROM students WHERE id=? AND active=1').bind(b.student_id).first();if(!st)throw Error('دانش‌آموز انتخاب‌شده معتبر نیست')}
     const total=p.sale_price*qty,receipt='P-'+Date.now();
     const statements=[
      env.DB.prepare('INSERT INTO sales(receipt_no,student_id,payment_method,total_amount,note) VALUES(?,?,?,?,?)').bind(receipt,b.student_id||null,method,total,b.note||''),
      env.DB.prepare('UPDATE products SET stock_qty=stock_qty-? WHERE id=? AND stock_qty>=?').bind(qty,p.id,qty)
     ];
     const result=await env.DB.batch(statements),saleId=result[0].meta.last_row_id;
     await env.DB.prepare('INSERT INTO sale_items(sale_id,product_id,product_name,quantity,unit_price,line_total) VALUES(?,?,?,?,?,?)').bind(saleId,p.id,p.name,qty,p.sale_price,total).run();
     if(method==='credit')await env.DB.prepare("INSERT INTO student_ledger(student_id,sale_id,entry_type,amount,description) VALUES(?,?,'debt',?,?)").bind(b.student_id,saleId,total,'خرید نسیه - '+receipt).run();
     else await env.DB.prepare('INSERT INTO cash_transactions(sale_id,transaction_type,amount,description) VALUES(?,?,?,?)').bind(saleId,method==='cash'?'cash_sale':'card_sale',total,'فروش '+receipt).run();
     return json({sale_id:saleId,receipt_no:receipt,total_amount:total},201);
    }
    return json({error:'مسیر درخواست پیدا نشد'},404);
   }catch(e){return json({error:e.message||'خطای داخلی'},400)}
  }
  if(path==='/'||path==='/index.html')return new Response(html,{headers:{'content-type':'text/html; charset=utf-8'}});
  return new Response('Not found',{status:404});
 }
};
