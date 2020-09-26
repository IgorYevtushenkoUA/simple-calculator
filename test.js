function countNumbersAfterDot(num) {
    let count = 0;
    while (num.includes(".")) {
        num = num.slice(0, num.length - 1)
        count++
    }
    return count - 1
}

console.log(countNumbersAfterDot("123")
)
