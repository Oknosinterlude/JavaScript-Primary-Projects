# JavaScript-Primary-Projets
https://pig-game-oknos.netlify.app/
https://bankist-oknos.netlify.app/

## 1. Guess my number

1. 取得输入的值

```js
let guess = Number(document.querySelector(".guess").value);
```

2. 取得 1-20 间的随机数字

```js
let secretNumber = Math.trunc(Math.random() * 20) + 1;
```

3. 操作 CSS 样式

```js
document.querySelector("body").style.backgroundColor = "#60b347";
```

4. 重构函数，减少重复

```js
function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}
```

```js
if (!guess) {
  displayMessage("No number");
} else if (guess != secretNumber) {
  score--;
  if (score > 0) {
    document.querySelector(".score").textContent = score;
    displayMessage(guess > secretNumber ? "Too high!" : "Too low!");
  } else {
    score = 0;
    document.querySelector(".score").textContent = 0;
    displayMessage("You lost the game...");
  }
}
```

## 2. Modal

1. 选取多个类并逐一进行操作

```js
const btnOpenModal = document.querySelectorAll(".show-modal");

for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener("click", openModal);
}
```

2. 增加/删除/确认类

```js
modal.classList.add("hidden");
modal.classList.remove("hidden");
modal.classList.contains("hidden");
//注意无需在类名前添加dot
```

3. 用键盘操作

```js
// 向函数中传入一个对象作为parameter
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
```

## 3. Pig Game

1. 如果有该类则删除该类，如果没有该类则添加该类

```js
player0El.classList.toggle("player--active");
```

2. 用一个状态变量(如项目中的 `activePlayer` 和 `playing` 来实现不同状态的切换)

3. 改变图片来源

```js
diceEl.src = `dice-${dice}.png`;
```

4. 初始化与重新开始总可以构造一个 `init()` 函数

5. 对 ID selector 进行选择

```js
const score0El = document.getElementById("score--0");
const score0El = document.querySelector("#score--0");
```
