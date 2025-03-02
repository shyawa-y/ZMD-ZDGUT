let chat = Array.from(document.querySelectorAll('.message-text, .chat-line, span')).map(el => el.innerText).join('\n');
console.log(chat);
