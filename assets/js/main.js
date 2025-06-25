// main.js - One UI 6.0 inspired, clean & accessible

function loadLayout() {
  // Navigation bar
  const page = window.location.pathname.split('/').pop();
  document.getElementById("main-header").innerHTML =
    `<nav aria-label="เมนูนำทาง">
      <a href="index.html"${page === 'index.html' || page === '' ? ' class="active" aria-current="page"' : ''}>หน้าหลัก</a>
      <a href="about.html"${page === 'about.html' ? ' class="active" aria-current="page"' : ''}>เกี่ยวกับผู้จัดทำ</a>
    </nav>`;
  // Footer
  document.getElementById("main-footer").innerHTML =
    `<small>
      &copy; 2025 หมู่บ้านสมสวัสดิ์ &nbsp;|&nbsp; เว็บไซต์นี้จัดทำเพื่อเผยแพร่ข้อมูลประวัติหมู่บ้านสมสวัสดิ์<br>
      <span style="color:#a7b0bd;font-size:0.97em;">Powered by GitHub Pages</span>
    </small>`;
}

function loadHistoryPage() {
  loadJson('data/history.json')
    .then(data => {
      // Hero & meta
      document.getElementById("village-title").textContent = data.title ?? '';
      document.getElementById("village-location").textContent = data.location ?? '';
      document.getElementById("document-meta").innerHTML =
        `<b>ฉบับ:</b> ${data.version ?? '-'} &nbsp;|&nbsp; <b>ข้อมูลรวบรวม ณ วันที่:</b> ${data.updated_at ?? '-'}`;
      document.getElementById("meta-alert").innerHTML =
        `ข้อมูลที่แสดงนี้เป็นข้อมูล ณ วันจัดทำล่าสุด กรุณาตรวจสอบกับเจ้าหน้าที่ในพื้นที่หากต้องการข้อมูลปัจจุบันหรือยืนยันความถูกต้อง`;
      // Content sections
      document.getElementById("history-section").innerHTML =
        `<h2>ประวัติการก่อตั้งหมู่บ้าน</h2>
         <p>${toParagraphs(data.founding_history)}</p>`;
      document.getElementById("leader-section").innerHTML =
        `<h2>ลำดับผู้ใหญ่บ้าน</h2>
         <ol>
           ${data.leaders.map(l =>
              `<li>
                 <span>${l.period}</span>: 
                 <b>${l.name}</b> ${l.note ? `<span class="leader-note">(${l.note})</span>` : ""}
               </li>`
           ).join('')}
         </ol>`;
      document.getElementById("current-section").innerHTML =
        `<h2>สภาพปัจจุบันของหมู่บ้าน</h2>
         <p>${data.current_status}</p>`;
      document.getElementById("note-section").innerHTML =
        `<div class="document-meta"><small>${data.note}</small></div>`;
    })
    .catch(e => {
      document.getElementById("history-section").innerHTML =
        `<div class="status-message">ไม่สามารถโหลดข้อมูลประวัติได้: ${e.message}</div>`;
    });
}

function loadAboutPage() {
  loadJson('data/about.json')
    .then(data => {
      document.getElementById("about-detail").innerHTML = `
        <li><b>ชื่อผู้จัดทำ:</b> ${data.name}</li>
        <li><b>ระดับชั้น:</b> ${data.level}</li>
        <li><b>โรงเรียน:</b> ${data.school}</li>
      `;
      document.getElementById("about-version").textContent = data.version ?? '-';
      document.getElementById("about-created").textContent = data.created_at ?? '-';
      document.getElementById("about-updated").textContent = data.updated_at ?? '-';
    })
    .catch(e => {
      document.getElementById("about-detail").innerHTML =
        `<div class="status-message">ไม่สามารถโหลดข้อมูลผู้จัดทำได้: ${e.message}</div>`;
    });
}

function toParagraphs(text) {
  // Split by \n\n for paragraphs, \n for line breaks
  if (!text) return "";
  return text.split('\n\n').map(para =>
    `<p>${para.replace(/\n/g, '<br>')}</p>`
  ).join('');
}

/* Scroll to Top Button Setup (One UI 6.0 style) */
function setupScrollBtn() {
  const scrollBtn = document.getElementById('scrolltop-btn');
  function toggleBtn() {
    if(window.scrollY > 180) scrollBtn.classList.add('visible');
    else scrollBtn.classList.remove('visible');
  }
  toggleBtn();
  window.addEventListener('scroll', toggleBtn);
  scrollBtn.addEventListener('click', () =>
    window.scrollTo({top:0,behavior:'smooth'}));
}