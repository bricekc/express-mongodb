function ucfirst(str) {
    return str[0].toUpperCase() + str.slice(1);
}
console.log("ucfirst : ", ucfirst("hello world"))

function capitalize(str) {
    let strArray = str.split(' ')
    strArray = strArray.map(s => {
        return s[0].toUpperCase() + s.slice(1)
    })
    return strArray.join(' ')
}
console.log("capitalize : ", capitalize("hello world"))

function camelCase(str) {
    let strArray = str.split(' ')
    strArray = strArray.map(s => {
        return s[0].toUpperCase() + s.slice(1)
    })
    return strArray.join('')
}

console.log("camelCase : ", camelCase("hello world"))

function snake_case(str) {
    let strArray = str.split(' ')
    strArray = strArray.map(s => {
        return s.toLowerCase()
    })
    return strArray.join('-')
}

console.log("snake_case : ", snake_case("hello world"))

function leet(str) {
    const voyellesArray = {A: 4, E: 3, I: 1, O: 0, Y: 7}
    return str.split('').map((s) => {
        if (voyellesArray[s.toUpperCase()]) {
            return voyellesArray[s.toUpperCase()]
        }
        return s
    }).join('')
}
console.log("leet : ", leet("aeioyAEIOY"))

function verlan(str) {
    return str.split(' ').map(s => {
        return s.split('').reverse('').join('')
    }).join(' ')
}
console.log("verlan : ", verlan("Hello World"))

function yoda(str) {
    return str.split(' ').reverse('').join(' ')
}
console.log("yoda : ", yoda("Hello World"))

function type_check_v1(str, type) {
    return typeof str === type
}
console.log("type_check_v1 : ", type_check_v1(0, "number"))