function getUsers() {
  try { return JSON.parse(localStorage.getItem('users') || '{}'); }
  catch { return {}; }
}

const form = document.getElementById('login-form'); 
const uid = document.getElementById('uname-input'); 
const pw = document.getElementById('psw-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = (uid.value || '').trim();
  const password = pw.value || '';

  if (!username) { alert('아이디를 입력해주세요.'); return; }
  if (!password) { alert('비밀번호를 입력해주세요.'); return; }

  const users = getUsers();
  const rec = users[username];
  if (!rec) { alert('존재하지 않는 아이디입니다.'); return; }
  if (rec.password !== password) { alert('비밀번호가 올바르지 않습니다.'); return; }

  alert(username + '님, 로그인 성공!');
  window.location.href = '../01_review01.html';
});