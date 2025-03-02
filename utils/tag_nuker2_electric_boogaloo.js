let allText = Array.from(document.querySelectorAll('.message-text, .chat-line, .message-body, span, div')).map(el => el.innerText).filter(text => text.trim() && !text.includes('script')).join('\n');
console.log(allText);
