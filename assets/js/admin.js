// admin.js - One UI 6.0 inspired, clean & accessible

function initAdminPanel() {
 showAdminTab('history');
 document.getElementById('btn-history').addEventListener('keydown', e => {
  if (e.key === "ArrowRight") document.getElementById('btn-about').focus();
 });
 document.getElementById('btn-about').addEventListener('keydown', e => {
  if (e.key === "ArrowLeft") document.getElementById('btn-history').focus();
 });
}

function showAdminTab(tab) {
 document.getElementById('admin-history').style.display = tab === 'history' ? 'block' : 'none';
 document.getElementById('admin-about').style.display = tab === 'about' ? 'block' : 'none';
 
 document.getElementById('btn-history').classList.toggle('active', tab === 'history');
 document.getElementById('btn-about').classList.toggle('active', tab === 'about');
 
 if (tab === 'history') loadAdminHistory();
 if (tab === 'about') loadAdminAbout();
}

function loadAdminHistory() {
 loadJson('data/history.json')
  .then(data => {
   document.getElementById('admin-history').innerHTML = `
        <h3>แก้ไขข้อมูลประวัติหมู่บ้าน <small style="font-weight:normal;font-size:1em;">(โปรดระบุวันที่และฉบับให้ถูกต้อง)</small></h3>
        <textarea id="history-json" rows="20" spellcheck="false" aria-label="แก้ไขข้อมูลประวัติหมู่บ้าน">${JSON.stringify(data, null, 2)}</textarea>
        <div>
          <button onclick="copyAndAlert('history')">คัดลอกข้อมูลเพื่อบันทึกไฟล์ <b>history.json</b></button>
        </div>
        <div id="history-save-status" style="color:green;margin-top:1em;"></div>
        <div class="info-alert" style="margin-top:1em;">
          <b>หมายเหตุ:</b> GitHub Pages ไม่รองรับการบันทึกไฟล์อัตโนมัติ กรุณานำข้อมูล JSON ที่คัดลอกไปวางแทนไฟล์ <b>data/history.json</b> ด้วยตัวเอง
        </div>
      `;
  });
}

function loadAdminAbout() {
 loadJson('data/about.json')
  .then(data => {
   document.getElementById('admin-about').innerHTML = `
        <h3>แก้ไขข้อมูลผู้จัดทำ/เอกสาร</h3>
        <textarea id="about-json" rows="13" spellcheck="false" aria-label="แก้ไขข้อมูลผู้จัดทำ">${JSON.stringify(data, null, 2)}</textarea>
        <div>
          <button onclick="copyAndAlert('about')">คัดลอกข้อมูลเพื่อบันทึกไฟล์ <b>about.json</b></button>
        </div>
        <div id="about-save-status" style="color:green;margin-top:1em;"></div>
        <div class="info-alert" style="margin-top:1em;">
          <b>หมายเหตุ:</b> GitHub Pages ไม่รองรับการบันทึกไฟล์อัตโนมัติ กรุณานำข้อมูล JSON ที่คัดลอกไปวางแทนไฟล์ <b>data/about.json</b> ด้วยตัวเอง
        </div>
      `;
  });
}

function copyAndAlert(type) {
 let textarea = document.getElementById(type + '-json');
 let val = textarea.value;
 try {
  let obj = JSON.parse(val);
  saveJsonClipboard(obj, type + '.json');
  document.getElementById(type + '-save-status').textContent = 'คัดลอกข้อมูลสำเร็จ!';
  document.getElementById(type + '-save-status').style.color = 'green';
 } catch (e) {
  document.getElementById(type + '-save-status').textContent = 'ข้อมูล JSON ไม่ถูกต้อง';
  document.getElementById(type + '-save-status').style.color = 'red';
 }
}