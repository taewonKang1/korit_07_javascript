// DOM 요소 가져오기 위한 변수 선언 및 초기화
const todoInput = document.getElementById('todo-input');  // 메서드 결과값을 변수에 대입
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 처음 페이지에 들어갔을 때 localStorage를 참조해서 기존 todo 데이터가 있다면 가지고 와야곘네요.
let todos = JSON.parse(localStorage.getItem('todos')) || [];
// 값이 있으면 true고 없으면 false 입니다.
// localStorage.getItem('todos')에 데이터가 있으면 true이기 때문에 JSON으로 바꿔주고,
// 아무런 데이터가 없으면 빈 배열을 꺼내라는 의미입니다.
console.log(todos); // JS 객체가 아니라 배열이라는 점에 주목할 필요 -> 맨 처음에 localStorage를 뒤지면 빈 ㅂ배열이 저장 되겠죠. 이 후에 내부에 element를 추가했습니다.

// Todo 리스트를 불러오는 과정이 필요합니다.
function renderTodos() {
  // 기존 todo list를 초기화 -> 추가했을 떄 누적 안되게
  todoList.innerHTML = '';

  // todos 배열을 반복 돌려서 목록을 생성
  todos.forEach((todo, index) => {
    // todos의 반복을 돌면 내부 element가 있을건데, 그때마다
    // li 태그를 생성한다는 의미
    // 웬만하면 forEach() / map() method에는 두 개 이상의 argument가 요구된다고 알아야함
    // 보통은 첫 번째가 반복문 돌 때의 element의 이름을 선언합니다.
    // 두 번째가 index 관련이라고 생각하면 됨.

    // 각 todo는 JS 객체에 해당하는 거고, 이걸 페이지 상에서 보여주기 위해서는
    // ul 태그의 지식인 li 태그가 필요합니다.

    // 그럼 얘도 지역변수겠네요.
    const li = document.createElement('li');
    // li 태그만 만들었지 클래스 이름 안정했으니까
    li.className = 'todo-item';
    if (todo.completed) {
      li.classList.add('completed');
    }

    // 체크 박스 - input 태그니까
    const checkbox = document.createElement('input');
    // 근데 얘는 type이 text가 아니라 checkbox니까
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    // 텍스트 내용 생성 - span태그
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;

    // 삭제 버튼 - button 태그
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times';   // x 기호

    // 요소들을  li 변수에 추가해야 합니다. 왜? li 내부에 체크박스 / 스팬 / 버튼
    li.append(checkbox);
    li.append(span);
    li.append(deleteBtn);

    // 그리고 이 li를 <ul> 태그에 추가해야합니다.
    todoList.appendChild(li);

    // 이벤트리스너 추가
    // 체크박스 변경 이벤트
    checkbox.addEventListener('change', () => {
      todos[index].completed = checkbox.checked;  // checkbox가 type이고, checked는 속성에 해당했습니다.
      // 완료 상태에 따라 CSS 클래스를 토글
      li.classList.toggle('completed', checkbox.checked);
      saveTodos();
    });

    // 삭제 버튼 클릭 이벤트
    deleteBtn.addEventListener('click', () => {
      // 삭제할 항목의 텍스트를 이용해서 배열 내에서 정확한 인덱스를 찾아낼겁니다.
      // 보통은 index로 내용을 확인하지만 계속 삭제를 하면 index 넘버가 바뀌겠죠
      // 그래서 input에 입력했던 내용을 근거로 index를 역으로 찾아낼 예정입니다.
      const itemText = span.textContent;  // 얘를 쓰는 이유는 저희가 .trim() 쓰는 바랍에 공백을 날렸기 때문입니다.

      // 배열 내에서의 내용과 span 태그 내에서의 내용이 같은 index를 뽑아내서 itemIndex 변수에 저장
      const itemIndex = todos.findIndex(item => item.text === itemText);

      if (itemIndex !== -1) { // 일치하는 인덱스가 없으면 -1입니다.
        todos.splice(itemIndex, 1); // itemIndex에 해당하는 거 element 하나를 삭제
        li.remove();
        saveTodos();
      }
    });
  });
}

// 시험 
function saveTodos() {
  // localStorage에 저장한다는 의미였으니까,
  localStorage.setItem('todos', JSON.stringify(todos));
  localStorage.setItem('temp', '안녕');
}

function addTodo() {
  const todoText = todoInput.value.trim();  // trim() 공백 제거 method 였습니다.
  if(todoText === '') {
    alert('내용을 입력하세요 !');
    return;
  }

  // input 창에 내용이 있다면 내용이 들어갈 JS 객체 선언
  const newTodo = {
    text: todoText,
    completed: false,
  };
  
  // todos 배열에 새로운 todo를 추가
  todos.push(newTodo);

  // 추가한 이후에 input 태그 내의 내용을 비우는 역할
  todoInput.value = '';
  
  renderTodos();  // 추가 버튼 누르고 나서 다시 (갱신된) 리스트 가지고 와야 하니까 renderTodos() 함수 호출
  saveTodos();  // 그리고 localStorage에도 저장해줘야 하니까 saveTodos() 함수 호출

  // 그러면 이제 의문이 생길 수 있는게 아니 어차피 renderTodos() 할때 saveTodos()가 필수인 것 같은데 할께 묶어서 쓰면 안되나요

  // method는 method 하나 당 기능 하나라고 생각해야함.
  // 모듈화
}

// '추가' 버튼 클릭 이벤트
addBtn.addEventListener('click', addTodo);

// 엔터 키 입력 이벤트
todoInput.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    addTodo();  // input 태그에 Enter키 입력을 감지하면 addTodo(); 함수를 호출할 것.
  }
});

// 새로고침헀을 때 renderTodos()가 호출 되어야 함.
window.onload = renderTodos();