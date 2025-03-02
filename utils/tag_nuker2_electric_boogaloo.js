### V2

let allText = Array.from(document.querySelectorAll('.message-text, .chat-line, .message-body, span, div')).map(el => el.innerText).filter(text => text.trim() && !text.includes('script')).join('\n');
console.log(allText);

### V2.1
### fixes duplication issue for user input - no fix for Grok output (big sad; better than no data :/)

let allText = Array.from(document.querySelectorAll('.message-text, .chat-line, .message-body, span, div'))
  .map(el => el.innerText)
  .filter(text => text.trim() && !text.includes('script'))  // Trim and skip code junk
  .reduce((unique, line) => unique.includes(line) ? unique : [...unique, line], [])  // Dedupe
  .join('\n');
console.log(allText);

### v2.2
### should fix grok dedupe as well
### no dice; evals empty string FML
let allText = Array.from(document.querySelectorAll('.message-text, .chat-line, .message-body'))
  .map(el => el.innerText)
  .filter(text => text.trim() && !text.includes('script') && text.length > 2)  // Skip short junk
  .reduce((unique, line) => {
    // Dedupe with a twist: check if line’s a repeat or substring of last unique
    let last = unique[unique.length - 1] || '';
    return (unique.includes(line) || last.includes(line)) ? unique : [...unique, line];
  }, [])
  .join('\n');
console.log(allText);

### v2.2.1
### widens selectors
let allText = Array.from(document.querySelectorAll('[class*=message], [class*=chat], [class*=text]'))
  .map(el => el.innerText)
  .filter(text => text.trim() && !text.includes('script') && text.length > 2)
  .reduce((unique, line) => {
    let last = unique[unique.length - 1] || '';
    return (unique.includes(line) || last.includes(line)) ? unique : [...unique, line];
  }, [])
  .join('\n');
console.log(allText);
