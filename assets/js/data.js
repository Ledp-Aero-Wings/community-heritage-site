// data.js - Utilities, One UI style

function loadJson(path) {
  return fetch(path + '?_=' + (new Date().getTime())) // cache bust
    .then(res => {
      if (!res.ok) throw new Error(`ไม่พบไฟล์ ${path}`);
      return res.json();
    });
}

function saveJsonClipboard(data, filename) {
  const str = JSON.stringify(data, null, 2);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(str);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = str;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}