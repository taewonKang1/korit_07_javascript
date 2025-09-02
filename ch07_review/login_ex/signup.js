function getUsers() {
  try { return JSON.parse(localStorage.getItem('users') || '{}'); }
  catch { return {}; }
}
function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

const form   = document.getElementById('signup-form');
const uid    = document.getElementById('uname-input');
const pw1    = document.getElementById('psw-input');
const pw2    = document.getElementById('psw2-input');
const back   = document.querySelector('.back');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = (uid.value || '').trim();
  const password = pw1.value || '';
  const password2 = pw2.value || '';

  if (!username) { alert('아이디를 입력해주세요.'); return; }
  if (!password) { alert('비밀번호를 입력해주세요.'); return; }
  if (password !== password2) { alert('비밀번호가 일치하지 않습니다.'); return; }

  const users = getUsers();
  if (users[username]) { alert('이미 존재하는 아이디입니다.'); return; }

  users[username] = { password };
  setUsers(users);

  alert('회원가입 완료! 이제 로그인 해주세요.');
  // 로그인 페이지로 이동
  window.location.href = './login.html';
});

// 돌아가기
back.addEventListener('click', () => {
  window.location.href = './login.html';
});
