function getUsers() {
  try { return JSON.parse(localStorage.getItem('users') || '{}'); }
  catch { return {}; }
}
function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

const form = document.getElementById('signup-form');
const uid = document.getElementById('uname-input');
const pw = document.getElementById('psw-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = (uid.value || '').trim();
  const password = pw.value || '';

  if (!username) { alert('아이디를 입력해주세요.'); return; }
  if (!password) { alert('비밀번호를 입력해주세요.'); return; }

  const users = getUsers();
  if (users[username]) { alert('이미 존재하는 아이디입니다.'); return; }

  users[username] = { password };
  setUsers(users);

  alert('회원가입 완료! 이제 로그인 해주세요.');

  window.location.href = './signIn.html';
});