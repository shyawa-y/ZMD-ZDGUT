### V2

let allText = Array.from(document.querySelectorAll('.message-text, .chat-line, .message-body, span, div')).map(el => el.innerText).filter(text => text.trim() && !text.includes('script')).join('\n');
console.log(allText);

### V2.1
### fixes duplication issue

let allText = Array.from(document.querySelectorAll('.message-text, .chat-line, .message-body, span, div'))
  .map(el => el.innerText)
  .filter(text => text.trim() && !text.includes('script'))  // Trim and skip code junk
  .reduce((unique, line) => unique.includes(line) ? unique : [...unique, line], [])  // Dedupe
  .join('\n');
console.log(allText);
