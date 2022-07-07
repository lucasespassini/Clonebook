class Datetime {
  async Build() {
    let date = new Date

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    // 2022-07-05 23:42:24
    day < 10 ? day = '0' + day : day = day
    month < 10 ? month = '0' + month : month = month

    hour < 10 ? hour = '0' + hour : hour = hour
    minute < 10 ? minute = '0' + minute : minute = minute
    second < 10 ? second = '0' + second : second = second

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
}

module.exports = new Datetime()