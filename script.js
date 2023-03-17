'use strict'

class Builder {
  constructor(value) {
    this.value = value
  }

  plus(...n) {
    ;[...n].forEach((el) => {
      this.value += el
    })
    return this
  }

  minus(...n) {
    if (typeof this.value === 'number') {
      ;[...n].forEach((el) => {
        this.value -= el
      })
    } else {
      this.value = this.value.slice(0, this.value.length - n)
    }
    return this
  }

  multiply(n) {
    if (typeof this.value === 'number') {
      this.value *= n
    } else {
      this.value = this.value.repeat(n)
    }
    return this
  }
  divide(n) {
    if (typeof this.value === 'number') {
      this.value = Math.trunc(this.value / n)
    } else {
      this.value = this.value.slice(0, Math.floor(this.value.length / n))
    }
    return this
  }
  get() {
    return this.value
  }
}

//ES6 class IntBuilder:
class IntBuilder extends Builder {
  constructor(value = 0) {
    super(value)
  }

  mod(n) {
    this.value %= n
    return this
  }

  static random(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from)
  }
}

//ES5 class StringBuilder:

function StringBuilder(value) {
  this.value = value
}

StringBuilder.prototype = Object.create(Builder.prototype)
StringBuilder.prototype.constructor = StringBuilder

StringBuilder.prototype.remove = function (str) {
  this.value = this.value
    .split('')
    .filter((s) => s !== str)
    .join('')
  return this
}

StringBuilder.prototype.sub = function (from, n) {
  this.value = this.value.substr(from, n)
  return this
}

// EXAMPLE:
console.log(IntBuilder.random(10, 100))

let intBuilder = new IntBuilder(60)
intBuilder.plus(2, 3, 2).minus(1, 2).multiply(2).divide(4).mod(3)
console.log(intBuilder.get())

// EXAMPLE:
let strBuilder = new StringBuilder('Hello world')

strBuilder
  .plus(' all', '!')
  .minus(2)
  .multiply(4)
  .divide(2)
  .remove('e')
  .sub(0, 5)

console.log(strBuilder.get())
