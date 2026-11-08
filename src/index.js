const html = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>حسابداری بوفه پارسایان</title>
<style>
:root{font-family:Tahoma,Arial,sans-serif;color:#172033;background:#f3f6fb}*{box-sizing:border-box}body{margin:0}.top{background:linear-gradient(120deg,#123c72,#1976c9);color:#fff;padding:22px max(18px,calc((100% - 1100px)/2))}.top h1{margin:0 0 6px;font-size:23px}.wrap{max-width:1100px;margin:22px auto;padding:0 16px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.card,.panel{background:#fff;border:1px solid #e4eaf2;border-radius:16px;padding:16px;box-shadow:0 4px 16px #19365b0a}.stat small{color:#667085}.stat strong{display:block;font-size:23px;margin-top:9px}.tabs{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}.tabs button,.btn{border:0;border-radius:10px;padding:11px 16px;background:#1769aa;color:#fff;cursor:pointer;font-weight:bold}.tabs button{background:#e3edf8;color:#174b7b}.tabs button.active{background:#1769aa;color:white}.grid{display:grid;grid-template-columns:1.1fr .9fr;gap:14px}.panel h2{font-size:18px;margin:0 0 15px}label{display:block;font-size:13px;color:#526174;margin:12px 0 6px}input,select{width:100%;padding:12px;border:1px solid #d5deea;border-radius:9px;background:#fff;font:inherit} .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.total{background:#edf6ff;border-radius:12px;padding:15px;margin:14px 0;display:flex;justify-content:space-between;align-items:center}.total b{font-size:22px;color:#1264a3}.muted{color:#718096;font-size:12px}.notice{padding:11px;border-radius:10px;background:#fff5df;color:#815400;margin:10px 0}.hidden{display:none}table{width:100%;border-collapse:collapse}td,th{text-align:right;padding:10px;border-bottom:1px solid #edf0f5;font-size:13px}.pill{padding:4px 8px;border-radius:20px;background:#edf6ff;color:#155c92;font-size:12px}@media(max-width:760px){.stats{grid-template-columns:1fr 1fr}.grid{grid-template-columns:1fr}.top{padding:18px}.wrap{margin:14px auto}.row{grid-template-columns:1fr}}
</style></head><body>
<header class="top"><h1>پارسایان | حسابداری بوفه</h1><div>مدیریت فروش، کالاها و حساب دانش‌آموزان</div></header>
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
<section id="reports" class="panel hidden"><h2>گزارش و تسویه حساب</h2><p class="muted">گزارش فروش و مانده بدهی بر اساس اطلاعات ثبت‌شده در پایگاه داده.</p><div class="row"><div><label>دانش‌آموز برای تسویه</label><select id="paymentStudent"></select></div><div><label>مبلغ پرداخت (تومان)</label><input id="paymentAmount" type="number" min="1" placeholder="مثلاً ۵۰۰۰۰"></div></div><label>توضیحات پرداخت (اختیاری)</label><input id="paymentNote" placeholder="مثلاً تسویه بخشی از بدهی"><button class="btn" id="submitPayment" style="margin-top:12px">ثبت دریافت و تسویه بدهی</button><p id="paymentMsg" class="muted"></p><div id="reportTable"></div></section>
</main><section id="users" class="panel hidden"><h2>مدیریت کاربران و نقش‌ها</h2><div class="row"><div><label>نام کامل</label><input id="userFullName" placeholder="نام و نام خانوادگی"></div><div><label>نام کاربری</label><input id="userName" placeholder="مثلاً seller01"></div><div><label>گذرواژه اولیه (حداقل ۱۰ نویسه)</label><input id="userPass" type="password"></div><div><label>نقش</label><select id="userRole"><option value="seller">مسئول بوفه / فروشنده</option><option value="accountant">حسابدار</option><option value="manager">مدیر مدرسه</option></select></div></div><button class="btn" id="createUser">ایجاد کاربر</button><div id="usersTable"></div></section>
<div id="loginScreen" style="position:fixed;inset:0;background:#eef3fa;z-index:99;display:flex;align-items:center;justify-content:center;padding:18px"><div class="panel" style="width:min(420px,100%);padding:28px"><h2>ورود به سامانه بوفه پارسایان</h2><p class="muted">نام کاربری و گذرواژه اختصاصی خود را وارد کنید.</p><label>نام کاربری</label><input id="loginUser" autocomplete="username"><label>گذرواژه</label><input id="loginPass" type="password" autocomplete="current-password"><button class="btn" id="loginButton" style="width:100%;margin-top:16px">ورود امن</button><p id="loginError" class="muted"></p></div></div>
<script>
const $=id=>document.getElementById(id), money=n=>Number(n||0).toLocaleString('fa-IR')+' تومان';
let products=[],students=[];
async function api(path,opts={}){const r=await fetch('/api'+path,{headers:{'content-type':'application/json'},...opts});const j=await r.json();if(!r.ok)throw Error(j.error||'خطا در ارتباط با سرور');return j}
async function refresh(){try{const [p,s,sum,sales]=await Promise.all([api('/products'),api('/students'),api('/summary'),api('/sales')]);products=p;students=s;$('productCount').textContent=p.length.toLocaleString('fa-IR');$('todaySales').textContent=money(sum.today_sales);$('cashTotal').textContent=money(sum.cash_total);$('debtTotal').textContent=money(sum.total_debt);$('product').innerHTML=p.map(x=>'<option value="'+x.id+'">'+x.name+' — '+money(x.sale_price)+' (موجودی '+x.stock_qty+')</option>').join('');$('student').innerHTML='<option value="">فروش آزاد / بدون دانش‌آموز</option>'+s.map(x=>'<option value="'+x.id+'">'+x.full_name+' — '+(x.class_name||'بدون کلاس')+'</option>').join('');renderProducts();renderStudents();$('recentSales').innerHTML=sales.slice(0,8).map(x=>'<p>سند '+x.receipt_no+' · '+(x.student_name||'فروش آزاد')+' · '+money(x.total_amount)+' · '+x.payment_method+'</p>').join('')||'هنوز فروشی ثبت نشده است.';renderReport(s)}catch(e){console.error(e);$('saleMsg').textContent=e.message}}
function selected(){return products.find(x=>String(x.id)===$('product').value)}
function calc(){$('unitPrice').value=selected()?money(selected().sale_price):'۰';$('total').textContent=money((selected()?.sale_price||0)*Math.max(1,Number($('qty').value||1)));$('creditNote').classList.toggle('hidden',$('method').value!=='credit')}
function renderProducts(){$('productTable').innerHTML='<table><tr><th>کالا</th><th>قیمت فروش</th><th>موجودی</th></tr>'+products.map(p=>'<tr><td>'+p.name+'</td><td>'+money(p.sale_price)+'</td><td>'+p.stock_qty+'</td></tr>').join('')+'</table>'}
function renderStudents(){$('studentTable').innerHTML='<table><tr><th>دانش‌آموز</th><th>کلاس</th><th>بدهی</th></tr>'+students.map(s=>'<tr><td>'+s.full_name+'</td><td>'+(s.class_name||'-')+'</td><td>'+money(s.balance)+'</td></tr>').join('')+'</table>';if($('paymentStudent'))$('paymentStudent').innerHTML=students.map(s=>'<option value="'+s.id+'">'+s.full_name+' — بدهی '+money(s.balance)+'</option>').join('')||'<option value="">دانش‌آموزی ثبت نشده</option>'}
function renderReport(s){$('reportTable').innerHTML='<table><tr><th>دانش‌آموز</th><th>کلاس</th><th>مانده بدهی</th></tr>'+s.map(x=>'<tr><td>'+x.full_name+'</td><td>'+(x.class_name||'-')+'</td><td>'+money(x.balance)+'</td></tr>').join('')+'</table>'}
$('product').onchange=calc;$('qty').oninput=calc;$('method').onchange=calc;
$('submitSale').onclick=async()=>{try{const p=selected(),qty=Number($('qty').value),method=$('method').value,studentId=$('student').value;if(!p)throw Error('ابتدا کالا ثبت و انتخاب کنید');if(method==='credit'&&!studentId)throw Error('برای ثبت نسیه باید دانش‌آموز انتخاب شود');if(qty<1||qty>p.stock_qty)throw Error('تعداد واردشده بیشتر از موجودی کالا است');const result=await api('/sales',{method:'POST',body:JSON.stringify({product_id:p.id,quantity:qty,student_id:studentId||null,payment_method:method,note:$('note').value})});$('saleMsg').textContent='فروش با شماره '+result.receipt_no+' با موفقیت ثبت شد.';$('qty').value=1;$('note').value='';await refresh();calc()}catch(e){$('saleMsg').textContent=e.message}};
$('addProduct').onclick=async()=>{try{await api('/products',{method:'POST',body:JSON.stringify({name:$('newProduct').value,purchase_price:Number($('buyPrice').value),sale_price:Number($('sellPrice').value),stock_qty:Number($('stock').value)})});$('newProduct').value='';await refresh()}catch(e){alert(e.message)}};
$('addStudent').onclick=async()=>{try{await api('/students',{method:'POST',body:JSON.stringify({full_name:$('newStudent').value,class_name:$('className').value})});$('newStudent').value='';await refresh()}catch(e){alert(e.message)}};
$('submitPayment').onclick=async()=>{try{const studentId=$('paymentStudent').value,amount=Number($('paymentAmount').value);if(!studentId)throw Error('ابتدا دانش‌آموز را انتخاب کنید');if(!Number.isSafeInteger(amount)||amount<1)throw Error('مبلغ پرداخت باید عدد صحیح و بیشتر از صفر باشد');const r=await api('/students/payment',{method:'POST',body:JSON.stringify({student_id:Number(studentId),amount,note:$('paymentNote').value})});$('paymentMsg').textContent='پرداخت '+money(r.paid)+' ثبت شد. کد پیگیری: '+r.reference;$('paymentAmount').value='';$('paymentNote').value='';await refresh()}catch(e){$('paymentMsg').textContent=e.message}};
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===b));['sale','products','students','reports'].forEach(id=>$(id).classList.toggle('hidden',id!==b.dataset.tab))});
refresh().then(calc);

// ورود و کنترل پنل‌ها بر اساس نقش
const roleNames={seller:'مسئول بوفه / فروشنده',accountant:'حسابدار',manager:'مدیر مدرسه'};
async function roleSetup(){try{const r=await fetch('/api/me');if(!r.ok)throw Error();const d=await r.json();const role=d.user.role;$('loginScreen').style.display='none';document.querySelector('.top').insertAdjacentHTML('beforeend','<div style="margin-top:8px;font-size:13px">کاربر: '+d.user.full_name+' · '+roleNames[role]+' <button id="logoutBtn" class="btn" style="padding:5px 10px;margin-right:8px">خروج</button></div>');$('logoutBtn').onclick=async()=>{await fetch('/api/logout',{method:'POST'});location.reload()};const visible=role==='seller'?['sale']:role==='accountant'?['sale','products','students','reports']:['sale','products','students','reports','users'];document.querySelectorAll('[data-tab]').forEach(b=>b.style.display=visible.includes(b.dataset.tab)?'':'none');['sale','products','students','reports','users'].forEach(id=>$(id).classList.toggle('hidden',id!==visible[0]));if(role==='manager')loadUsers();if(role==='seller'){document.querySelector('#sale .panel:nth-child(2)').style.display='none';document.querySelector('#sale .panel h2').textContent='ثبت فروش سریع'} }catch{$('loginScreen').style.display='flex'}}
$('loginButton').onclick=async()=>{try{const r=await fetch('/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({username:$('loginUser').value,password:$('loginPass').value})});const d=await r.json();if(!r.ok)throw Error(d.error);location.reload()}catch(e){$('loginError').textContent=e.message}};
async function loadUsers(){try{const r=await fetch('/api/users');const d=await r.json();$('usersTable').innerHTML='<table><tr><th>نام</th><th>نام کاربری</th><th>نقش</th><th>وضعیت</th></tr>'+d.map(u=>'<tr><td>'+u.full_name+'</td><td>'+u.username+'</td><td>'+roleNames[u.role]+'</td><td>'+(u.active?'فعال':'غیرفعال')+'</td></tr>').join('')+'</table>'}catch{}}
$('createUser').onclick=async()=>{try{const r=await fetch('/api/users',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({full_name:$('userFullName').value,username:$('userName').value,password:$('userPass').value,role:$('userRole').value})});const d=await r.json();if(!r.ok)throw Error(d.error);$('userPass').value='';$('userName').value='';$('userFullName').value='';await loadUsers();alert('کاربر با موفقیت ساخته شد')}catch(e){alert(e.message)}};
roleSetup();

</script></body></html>`;

const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*'}});
export default {
 async fetch(request,env){
  const url=new URL(request.url),path=url.pathname;
  const enc=new TextEncoder();
  const b64u=b=>btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=+$/,'');
  const digest=async s=>b64u(await crypto.subtle.digest('SHA-256',enc.encode(s)));
  const hashPassword=async password=>{const salt=crypto.getRandomValues(new Uint8Array(16));const key=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveBits']);const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:210000,hash:'SHA-256'},key,256);return 'pbkdf2$210000
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
    if(path==='/api/students/payment'&&request.method==='POST'){
     const b=await request.json(),studentId=Number(b.student_id),amount=Number(b.amount);
     if(!Number.isInteger(studentId)||studentId<1||!Number.isSafeInteger(amount)||amount<1)throw Error('دانش‌آموز و مبلغ پرداخت را درست وارد کنید');
     const st=await env.DB.prepare('SELECT id FROM students WHERE id=? AND active=1').bind(studentId).first();
     if(!st)throw Error('دانش‌آموز انتخاب‌شده معتبر نیست');
     const reference='PAY-'+crypto.randomUUID(),description=(b.note||'تسویه بدهی دانش‌آموز')+' · '+reference;
     const result=await env.DB.batch([
      env.DB.prepare("INSERT INTO student_ledger(student_id,entry_type,amount,description) SELECT ?, 'payment', ?, ? WHERE ? <= COALESCE((SELECT SUM(CASE WHEN entry_type='debt' THEN amount WHEN entry_type='payment' THEN -amount ELSE amount END) FROM student_ledger WHERE student_id=?),0)").bind(studentId,amount,description,amount,studentId),
      env.DB.prepare("INSERT INTO cash_transactions(transaction_type,amount,description) SELECT 'student_payment',amount,description FROM student_ledger WHERE description=? AND student_id=? AND entry_type='payment'").bind(description,studentId)
     ]);
     if(result[0].meta.changes!==1)throw Error('مبلغ پرداخت از مانده بدهی دانش‌آموز بیشتر است یا بدهی ندارد؛ پرداخت ثبت نشد');
     if(result[1].meta.changes!==1)throw Error('ثبت دریافت صندوق انجام نشد؛ عملیات لغو شد');
     return json({paid:amount,reference},201);
    }
    if(path==='/api/sales'&&request.method==='POST'){
     const b=await request.json(),qty=Number(b.quantity),method=b.payment_method;
     if(!Number.isInteger(qty)||qty<1||!['cash','card','credit'].includes(method))throw Error('اطلاعات فروش معتبر نیست');
     if(method==='credit'&&!b.student_id)throw Error('برای فروش نسیه باید دانش‌آموز انتخاب شود');
     const p=await env.DB.prepare('SELECT * FROM products WHERE id=? AND active=1').bind(b.product_id).first();
     if(!p||p.stock_qty<qty)throw Error('کالا وجود ندارد یا موجودی کافی نیست');
     if(b.student_id){const st=await env.DB.prepare('SELECT id FROM students WHERE id=? AND active=1').bind(b.student_id).first();if(!st)throw Error('دانش‌آموز انتخاب‌شده معتبر نیست')}
     const total=p.sale_price*qty,receipt='P-'+crypto.randomUUID();
     const statements=[
      env.DB.prepare('UPDATE products SET stock_qty=stock_qty-? WHERE id=? AND stock_qty>=?').bind(qty,p.id,qty),
      env.DB.prepare("INSERT INTO sales(receipt_no,student_id,payment_method,total_amount,note) SELECT ?,?,?,?,? WHERE changes()=1").bind(receipt,b.student_id||null,method,total,b.note||''),
      env.DB.prepare('INSERT INTO sale_items(sale_id,product_id,product_name,quantity,unit_price,line_total) SELECT id,?,?,?,?,? FROM sales WHERE receipt_no=?').bind(p.id,p.name,qty,p.sale_price,total,receipt),
      method==='credit'
       ? env.DB.prepare("INSERT INTO student_ledger(student_id,sale_id,entry_type,amount,description) SELECT ?,id,'debt',?,? FROM sales WHERE receipt_no=?").bind(b.student_id,total,'خرید نسیه - '+receipt,receipt)
       : env.DB.prepare('INSERT INTO cash_transactions(sale_id,transaction_type,amount,description) SELECT id,?,?,? FROM sales WHERE receipt_no=?').bind(method==='cash'?'cash_sale':'card_sale',total,'فروش '+receipt,receipt)
     ];
     const result=await env.DB.batch(statements);
     if(result[0].meta.changes!==1||result[1].meta.changes!==1)throw Error('موجودی کالا تغییر کرده یا کافی نیست؛ فروش ثبت نشد');
     const saleId=result[1].meta.last_row_id;
     if(result.some((r,i)=>i>=2&&r.meta.changes!==1))throw Error('ثبت کامل فروش انجام نشد؛ عملیات لغو شد');
     return json({sale_id:saleId,receipt_no:receipt,total_amount:total},201);
    }
    return json({error:'مسیر درخواست پیدا نشد'},404);
   }catch(e){return json({error:e.message||'خطای داخلی'},400)}
  }
  if(path==='/'||path==='/index.html')return new Response(html,{headers:{'content-type':'text/html; charset=utf-8'}});
  return new Response('Not found',{status:404});
 }
};
+b64u(salt)+'
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
    if(path==='/api/students/payment'&&request.method==='POST'){
     const b=await request.json(),studentId=Number(b.student_id),amount=Number(b.amount);
     if(!Number.isInteger(studentId)||studentId<1||!Number.isSafeInteger(amount)||amount<1)throw Error('دانش‌آموز و مبلغ پرداخت را درست وارد کنید');
     const st=await env.DB.prepare('SELECT id FROM students WHERE id=? AND active=1').bind(studentId).first();
     if(!st)throw Error('دانش‌آموز انتخاب‌شده معتبر نیست');
     const reference='PAY-'+crypto.randomUUID(),description=(b.note||'تسویه بدهی دانش‌آموز')+' · '+reference;
     const result=await env.DB.batch([
      env.DB.prepare("INSERT INTO student_ledger(student_id,entry_type,amount,description) SELECT ?, 'payment', ?, ? WHERE ? <= COALESCE((SELECT SUM(CASE WHEN entry_type='debt' THEN amount WHEN entry_type='payment' THEN -amount ELSE amount END) FROM student_ledger WHERE student_id=?),0)").bind(studentId,amount,description,amount,studentId),
      env.DB.prepare("INSERT INTO cash_transactions(transaction_type,amount,description) SELECT 'student_payment',amount,description FROM student_ledger WHERE description=? AND student_id=? AND entry_type='payment'").bind(description,studentId)
     ]);
     if(result[0].meta.changes!==1)throw Error('مبلغ پرداخت از مانده بدهی دانش‌آموز بیشتر است یا بدهی ندارد؛ پرداخت ثبت نشد');
     if(result[1].meta.changes!==1)throw Error('ثبت دریافت صندوق انجام نشد؛ عملیات لغو شد');
     return json({paid:amount,reference},201);
    }
    if(path==='/api/sales'&&request.method==='POST'){
     const b=await request.json(),qty=Number(b.quantity),method=b.payment_method;
     if(!Number.isInteger(qty)||qty<1||!['cash','card','credit'].includes(method))throw Error('اطلاعات فروش معتبر نیست');
     if(method==='credit'&&!b.student_id)throw Error('برای فروش نسیه باید دانش‌آموز انتخاب شود');
     const p=await env.DB.prepare('SELECT * FROM products WHERE id=? AND active=1').bind(b.product_id).first();
     if(!p||p.stock_qty<qty)throw Error('کالا وجود ندارد یا موجودی کافی نیست');
     if(b.student_id){const st=await env.DB.prepare('SELECT id FROM students WHERE id=? AND active=1').bind(b.student_id).first();if(!st)throw Error('دانش‌آموز انتخاب‌شده معتبر نیست')}
     const total=p.sale_price*qty,receipt='P-'+crypto.randomUUID();
     const statements=[
      env.DB.prepare('UPDATE products SET stock_qty=stock_qty-? WHERE id=? AND stock_qty>=?').bind(qty,p.id,qty),
      env.DB.prepare("INSERT INTO sales(receipt_no,student_id,payment_method,total_amount,note) SELECT ?,?,?,?,? WHERE changes()=1").bind(receipt,b.student_id||null,method,total,b.note||''),
      env.DB.prepare('INSERT INTO sale_items(sale_id,product_id,product_name,quantity,unit_price,line_total) SELECT id,?,?,?,?,? FROM sales WHERE receipt_no=?').bind(p.id,p.name,qty,p.sale_price,total,receipt),
      method==='credit'
       ? env.DB.prepare("INSERT INTO student_ledger(student_id,sale_id,entry_type,amount,description) SELECT ?,id,'debt',?,? FROM sales WHERE receipt_no=?").bind(b.student_id,total,'خرید نسیه - '+receipt,receipt)
       : env.DB.prepare('INSERT INTO cash_transactions(sale_id,transaction_type,amount,description) SELECT id,?,?,? FROM sales WHERE receipt_no=?').bind(method==='cash'?'cash_sale':'card_sale',total,'فروش '+receipt,receipt)
     ];
     const result=await env.DB.batch(statements);
     if(result[0].meta.changes!==1||result[1].meta.changes!==1)throw Error('موجودی کالا تغییر کرده یا کافی نیست؛ فروش ثبت نشد');
     const saleId=result[1].meta.last_row_id;
     if(result.some((r,i)=>i>=2&&r.meta.changes!==1))throw Error('ثبت کامل فروش انجام نشد؛ عملیات لغو شد');
     return json({sale_id:saleId,receipt_no:receipt,total_amount:total},201);
    }
    return json({error:'مسیر درخواست پیدا نشد'},404);
   }catch(e){return json({error:e.message||'خطای داخلی'},400)}
  }
  if(path==='/'||path==='/index.html')return new Response(html,{headers:{'content-type':'text/html; charset=utf-8'}});
  return new Response('Not found',{status:404});
 }
};
+b64u(bits)};
  const verifyPassword=async(password,stored)=>{try{const[,it,salt,expected]=stored.split('
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
    if(path==='/api/students/payment'&&request.method==='POST'){
     const b=await request.json(),studentId=Number(b.student_id),amount=Number(b.amount);
     if(!Number.isInteger(studentId)||studentId<1||!Number.isSafeInteger(amount)||amount<1)throw Error('دانش‌آموز و مبلغ پرداخت را درست وارد کنید');
     const st=await env.DB.prepare('SELECT id FROM students WHERE id=? AND active=1').bind(studentId).first();
     if(!st)throw Error('دانش‌آموز انتخاب‌شده معتبر نیست');
     const reference='PAY-'+crypto.randomUUID(),description=(b.note||'تسویه بدهی دانش‌آموز')+' · '+reference;
     const result=await env.DB.batch([
      env.DB.prepare("INSERT INTO student_ledger(student_id,entry_type,amount,description) SELECT ?, 'payment', ?, ? WHERE ? <= COALESCE((SELECT SUM(CASE WHEN entry_type='debt' THEN amount WHEN entry_type='payment' THEN -amount ELSE amount END) FROM student_ledger WHERE student_id=?),0)").bind(studentId,amount,description,amount,studentId),
      env.DB.prepare("INSERT INTO cash_transactions(transaction_type,amount,description) SELECT 'student_payment',amount,description FROM student_ledger WHERE description=? AND student_id=? AND entry_type='payment'").bind(description,studentId)
     ]);
     if(result[0].meta.changes!==1)throw Error('مبلغ پرداخت از مانده بدهی دانش‌آموز بیشتر است یا بدهی ندارد؛ پرداخت ثبت نشد');
     if(result[1].meta.changes!==1)throw Error('ثبت دریافت صندوق انجام نشد؛ عملیات لغو شد');
     return json({paid:amount,reference},201);
    }
    if(path==='/api/sales'&&request.method==='POST'){
     const b=await request.json(),qty=Number(b.quantity),method=b.payment_method;
     if(!Number.isInteger(qty)||qty<1||!['cash','card','credit'].includes(method))throw Error('اطلاعات فروش معتبر نیست');
     if(method==='credit'&&!b.student_id)throw Error('برای فروش نسیه باید دانش‌آموز انتخاب شود');
     const p=await env.DB.prepare('SELECT * FROM products WHERE id=? AND active=1').bind(b.product_id).first();
     if(!p||p.stock_qty<qty)throw Error('کالا وجود ندارد یا موجودی کافی نیست');
     if(b.student_id){const st=await env.DB.prepare('SELECT id FROM students WHERE id=? AND active=1').bind(b.student_id).first();if(!st)throw Error('دانش‌آموز انتخاب‌شده معتبر نیست')}
     const total=p.sale_price*qty,receipt='P-'+crypto.randomUUID();
     const statements=[
      env.DB.prepare('UPDATE products SET stock_qty=stock_qty-? WHERE id=? AND stock_qty>=?').bind(qty,p.id,qty),
      env.DB.prepare("INSERT INTO sales(receipt_no,student_id,payment_method,total_amount,note) SELECT ?,?,?,?,? WHERE changes()=1").bind(receipt,b.student_id||null,method,total,b.note||''),
      env.DB.prepare('INSERT INTO sale_items(sale_id,product_id,product_name,quantity,unit_price,line_total) SELECT id,?,?,?,?,? FROM sales WHERE receipt_no=?').bind(p.id,p.name,qty,p.sale_price,total,receipt),
      method==='credit'
       ? env.DB.prepare("INSERT INTO student_ledger(student_id,sale_id,entry_type,amount,description) SELECT ?,id,'debt',?,? FROM sales WHERE receipt_no=?").bind(b.student_id,total,'خرید نسیه - '+receipt,receipt)
       : env.DB.prepare('INSERT INTO cash_transactions(sale_id,transaction_type,amount,description) SELECT id,?,?,? FROM sales WHERE receipt_no=?').bind(method==='cash'?'cash_sale':'card_sale',total,'فروش '+receipt,receipt)
     ];
     const result=await env.DB.batch(statements);
     if(result[0].meta.changes!==1||result[1].meta.changes!==1)throw Error('موجودی کالا تغییر کرده یا کافی نیست؛ فروش ثبت نشد');
     const saleId=result[1].meta.last_row_id;
     if(result.some((r,i)=>i>=2&&r.meta.changes!==1))throw Error('ثبت کامل فروش انجام نشد؛ عملیات لغو شد');
     return json({sale_id:saleId,receipt_no:receipt,total_amount:total},201);
    }
    return json({error:'مسیر درخواست پیدا نشد'},404);
   }catch(e){return json({error:e.message||'خطای داخلی'},400)}
  }
  if(path==='/'||path==='/index.html')return new Response(html,{headers:{'content-type':'text/html; charset=utf-8'}});
  return new Response('Not found',{status:404});
 }
};
);const raw=Uint8Array.from(atob(salt.replace(/-/g,'+').replace(/_/g,'/')),x=>x.charCodeAt(0));const key=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveBits']);const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:raw,iterations:Number(it),hash:'SHA-256'},key,256);return b64u(bits)===expected}catch{return false}};
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT NOT NULL UNIQUE,full_name TEXT NOT NULL,password_hash TEXT NOT NULL,role TEXT NOT NULL CHECK(role IN ('seller','accountant','manager')),active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)").run();
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS user_sessions(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL REFERENCES users(id),token_hash TEXT NOT NULL UNIQUE,expires_at TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)").run();
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS audit_logs(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER,action TEXT NOT NULL,details TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)").run();
  if(env.ADMIN_PASSWORD){const exists=await env.DB.prepare("SELECT id FROM users WHERE role='manager' LIMIT 1").first();if(!exists){const ph=await hashPassword(env.ADMIN_PASSWORD);await env.DB.prepare("INSERT OR IGNORE INTO users(username,full_name,password_hash,role) VALUES('admin','مدیر مدرسه',?,'manager')").bind(ph).run()}}
  const cookie=(request.headers.get('Cookie')||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('pc_session='))?.slice(11);
  let currentUser=null;
  if(cookie){const tokenHash=await digest(cookie);currentUser=await env.DB.prepare("SELECT u.id,u.username,u.full_name,u.role FROM user_sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>datetime('now') AND u.active=1").bind(tokenHash).first()}
  if(path==='/api/login'&&request.method==='POST'){try{const b=await request.json();const u=await env.DB.prepare('SELECT * FROM users WHERE username=? AND active=1').bind(String(b.username||'').trim()).first();if(!u||!await verifyPassword(String(b.password||''),u.password_hash))return json({error:'نام کاربری یا گذرواژه نادرست است'},401);const token=b64u(crypto.getRandomValues(new Uint8Array(32)));await env.DB.prepare("INSERT INTO user_sessions(user_id,token_hash,expires_at) VALUES(?,?,datetime('now','+12 hours'))").bind(u.id,await digest(token)).run();return new Response(JSON.stringify({user:{username:u.username,full_name:u.full_name,role:u.role}}),{headers:{'content-type':'application/json; charset=utf-8','set-cookie':'pc_session='+token+'; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=43200'}})}catch(e){return json({error:'ورود انجام نشد'},400)}}
  if(path==='/api/logout'&&request.method==='POST'){if(cookie)await env.DB.prepare('DELETE FROM user_sessions WHERE token_hash=?').bind(await digest(cookie)).run();return new Response(JSON.stringify({ok:true}),{headers:{'content-type':'application/json; charset=utf-8','set-cookie':'pc_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'}})}
  if(path==='/'||path==='/index.html')return new Response(html,{headers:{'content-type':'text/html; charset=utf-8'}});
  if(path.startsWith('/api/')&&!currentUser)return json({error:'برای ورود ابتدا نام کاربری و گذرواژه را وارد کنید'},401);
  if(path.startsWith('/api/')&&currentUser){const role=currentUser.role;const permissions={'/api/summary':['accountant','manager'],'/api/sales':['seller','accountant','manager'],'/api/products':['seller','accountant','manager'],'/api/students':['seller','accountant','manager'],'/api/students/payment':['accountant','manager']};const allowed=permissions[path];if(allowed&&!allowed.includes(role))return json({error:'شما مجوز انجام این عملیات را ندارید'},403);if(['/api/products','/api/students','/api/students/payment'].includes(path)&&request.method==='POST'&&role==='seller')return json({error:'این عملیات فقط برای حسابدار و مدیر مجاز است'},403)}
  if(path==='/api/me'&&currentUser)return json({user:currentUser});
  if(path==='/api/users'&&request.method==='GET'&&currentUser?.role==='manager')return json(await env.DB.prepare('SELECT id,username,full_name,role,active,created_at FROM users ORDER BY id').all().then(x=>x.results));
  if(path==='/api/users'&&request.method==='POST'&&currentUser?.role==='manager'){try{const b=await request.json();if(!/^[a-zA-Z0-9._-]{3,32}$/.test(b.username||''))throw Error('نام کاربری باید ۳ تا ۳۲ نویسه لاتین باشد');if(String(b.password||'').length<10)throw Error('گذرواژه باید حداقل ۱۰ نویسه باشد');if(!['seller','accountant','manager'].includes(b.role))throw Error('نقش انتخاب‌شده معتبر نیست');const ph=await hashPassword(b.password);await env.DB.prepare('INSERT INTO users(username,full_name,password_hash,role) VALUES(?,?,?,?)').bind(b.username,b.full_name||b.username,ph,b.role).run();await env.DB.prepare('INSERT INTO audit_logs(user_id,action,details) VALUES(?,?,?)').bind(currentUser.id,'create_user',b.username+' / '+b.role).run();return json({ok:true},201)}catch(e){return json({error:e.message||'ساخت کاربر انجام نشد'},400)}}
  if(path==='/api/users'&&request.method==='GET'&&currentUser?.role!=='manager')return json({error:'دسترسی غیرمجاز'},403);
  if(path.startsWith('/api/')){const url=new URL(request.url);
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
    if(path==='/api/students/payment'&&request.method==='POST'){
     const b=await request.json(),studentId=Number(b.student_id),amount=Number(b.amount);
     if(!Number.isInteger(studentId)||studentId<1||!Number.isSafeInteger(amount)||amount<1)throw Error('دانش‌آموز و مبلغ پرداخت را درست وارد کنید');
     const st=await env.DB.prepare('SELECT id FROM students WHERE id=? AND active=1').bind(studentId).first();
     if(!st)throw Error('دانش‌آموز انتخاب‌شده معتبر نیست');
     const reference='PAY-'+crypto.randomUUID(),description=(b.note||'تسویه بدهی دانش‌آموز')+' · '+reference;
     const result=await env.DB.batch([
      env.DB.prepare("INSERT INTO student_ledger(student_id,entry_type,amount,description) SELECT ?, 'payment', ?, ? WHERE ? <= COALESCE((SELECT SUM(CASE WHEN entry_type='debt' THEN amount WHEN entry_type='payment' THEN -amount ELSE amount END) FROM student_ledger WHERE student_id=?),0)").bind(studentId,amount,description,amount,studentId),
      env.DB.prepare("INSERT INTO cash_transactions(transaction_type,amount,description) SELECT 'student_payment',amount,description FROM student_ledger WHERE description=? AND student_id=? AND entry_type='payment'").bind(description,studentId)
     ]);
     if(result[0].meta.changes!==1)throw Error('مبلغ پرداخت از مانده بدهی دانش‌آموز بیشتر است یا بدهی ندارد؛ پرداخت ثبت نشد');
     if(result[1].meta.changes!==1)throw Error('ثبت دریافت صندوق انجام نشد؛ عملیات لغو شد');
     return json({paid:amount,reference},201);
    }
    if(path==='/api/sales'&&request.method==='POST'){
     const b=await request.json(),qty=Number(b.quantity),method=b.payment_method;
     if(!Number.isInteger(qty)||qty<1||!['cash','card','credit'].includes(method))throw Error('اطلاعات فروش معتبر نیست');
     if(method==='credit'&&!b.student_id)throw Error('برای فروش نسیه باید دانش‌آموز انتخاب شود');
     const p=await env.DB.prepare('SELECT * FROM products WHERE id=? AND active=1').bind(b.product_id).first();
     if(!p||p.stock_qty<qty)throw Error('کالا وجود ندارد یا موجودی کافی نیست');
     if(b.student_id){const st=await env.DB.prepare('SELECT id FROM students WHERE id=? AND active=1').bind(b.student_id).first();if(!st)throw Error('دانش‌آموز انتخاب‌شده معتبر نیست')}
     const total=p.sale_price*qty,receipt='P-'+crypto.randomUUID();
     const statements=[
      env.DB.prepare('UPDATE products SET stock_qty=stock_qty-? WHERE id=? AND stock_qty>=?').bind(qty,p.id,qty),
      env.DB.prepare("INSERT INTO sales(receipt_no,student_id,payment_method,total_amount,note) SELECT ?,?,?,?,? WHERE changes()=1").bind(receipt,b.student_id||null,method,total,b.note||''),
      env.DB.prepare('INSERT INTO sale_items(sale_id,product_id,product_name,quantity,unit_price,line_total) SELECT id,?,?,?,?,? FROM sales WHERE receipt_no=?').bind(p.id,p.name,qty,p.sale_price,total,receipt),
      method==='credit'
       ? env.DB.prepare("INSERT INTO student_ledger(student_id,sale_id,entry_type,amount,description) SELECT ?,id,'debt',?,? FROM sales WHERE receipt_no=?").bind(b.student_id,total,'خرید نسیه - '+receipt,receipt)
       : env.DB.prepare('INSERT INTO cash_transactions(sale_id,transaction_type,amount,description) SELECT id,?,?,? FROM sales WHERE receipt_no=?').bind(method==='cash'?'cash_sale':'card_sale',total,'فروش '+receipt,receipt)
     ];
     const result=await env.DB.batch(statements);
     if(result[0].meta.changes!==1||result[1].meta.changes!==1)throw Error('موجودی کالا تغییر کرده یا کافی نیست؛ فروش ثبت نشد');
     const saleId=result[1].meta.last_row_id;
     if(result.some((r,i)=>i>=2&&r.meta.changes!==1))throw Error('ثبت کامل فروش انجام نشد؛ عملیات لغو شد');
     return json({sale_id:saleId,receipt_no:receipt,total_amount:total},201);
    }
    return json({error:'مسیر درخواست پیدا نشد'},404);
   }catch(e){return json({error:e.message||'خطای داخلی'},400)}
  }
  if(path==='/'||path==='/index.html')return new Response(html,{headers:{'content-type':'text/html; charset=utf-8'}});
  return new Response('Not found',{status:404});
 }
};
