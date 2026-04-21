function lascii(start, end) {
    const result = [];
    for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
        result.push(String.fromCharCode(i));
    }
    return result;
}

// Tests
console.log(lascii('a', 'd'));  // ['a', 'b', 'c', 'd']
console.log(lascii('c', 'i'));  // ['c', 'd', 'e', 'f', 'g', 'h', 'i']
console.log(lascii('t', 'z'));  // ['t', 'u', 'v', 'w', 'x', 'y', 'z']
