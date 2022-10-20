## Описание

Небольшая страничка с несложной логикой, написана на **чистом JS**, с использованием **SCSS**.

1. Проверка полей на пустоту при нажатии на "Login".
2. Проверка на валидность email.
3. Проверка на то, что длина пароля не менее 6 символов.
4. Если чекбокс "Remember me" включен и при нажатии на "Login" нет ошибок, то сохранять email и логин пользователя в LocalStorage. После перезагрузки страницы заполнять соответствующие поля из LocalStorage
после успешного логина сообщить об авторизации пользователю по средством нотификации.
5. Адаптив

## Что было сделано

1. В **localStorage** устанавливаются значения. 

```
document.addEventListener("DOMContentLoaded", () => {
  inputEmail.value = localStorage.getItem("email");
  inputPassword.value = localStorage.getItem("password");
});
```
**inputEmail.value** - значение полученное из input c емайлом.

**inputPassword.value** - значение полученное из input с паролем.

Событие **DOMContentLoaded** срабатывает тогда, когда произошло построение DOM. Использую именно его, а не **load**, потому что мне не важно загрузились
ли например картинки. 

**script** загружается с атрибутом **defer**, поэтому *script* загружается раньше, чем срабатывает событие **DOMContentLoaded**. 

Функция **rememeberMe** устанавливает значение в **localStorage**. 

```
function rememberMe() {
  if (inputRadio.checked) {
    localStorage.setItem("email", inputEmail.value);
    localStorage.setItem("password", inputPassword.value);
  }
}
``` 

**inputRadio.checked** - проверяю, если нажата ли кнопка *Remember me*, если да, то сохраняю значение. 

2. Валидация email.

В функцию **validationEmail** поступает какое-то значение (email) и проверяется через регулярное выражение. 

```
function validationEmail(value) {
  return regEx.test(value);
}
``` 

**regEx = /\S+@\S+\.\S+/** Этой проверки хватает для того, чтобы проверить email на валидность. 

Из функции возвращается **true** или **false**. 

3. Универсальная функция, которая вызывается при разных ошибках. 

```
function inputError(error, textElement) {
  let text = textElement || document.createElement("p");
  text.classList.add("text");
  text.textContent = error;
  btnLoginNow.before(text);
  input.forEach((item) => {
    item.style.border = "1px solid red";
  });
}
```

**error** - текст ошибки. 

**textElement** - тег ``<p></p>``, который создается динамически, он и будет содержать ошибку.

``let text = textElement || document.createElement("p")`` - использую эту проверку для того, чтобы исключить добавление еще одного тега,
если он уже есть на странице. 

``btnLoginNow.before(text)`` - помещаю элемент text (тег p) перед кнопкой. 

```
  input.forEach((item) => {
    item.style.border = "1px solid red";
  });
 ```
 
 Если есть какая-то ошибка, то все input будут иметь border красный. 
 
 4. Если ошибок никаких нет, то вызывается функция **inputSuccessfully**.

Данная функция также принимает в себя **textElement** (тег p, который создовался при ошибках), для того, чтобы
его убрать со страницы.

```
function inputSuccessfully(textElement) {
  textElement ? textElement.remove() : null;
  input.forEach((item) => {
    item.style.border = "1px solid #e8e8e8";
  });
  alert("Everything went well");
}
```

Прохожусь по всем input для того, чтобы убрать красный border, который возникал при ошибках.

```
input.forEach((item) => {
    item.style.border = "1px solid #e8e8e8";
  });
``` 

5. Адаптив через **mixins**. 

## Как запустить 

Можно посмотреть тут: https://irinrer.github.io/FoxMalder_exercises/

Или можете запустить у себя. 

1. Клонируете репозиторий

``git clone https://github.com/IrinRer/FoxMalder_exercises.git``

Запускаете на вашем устройстве, например с помощью Live server
