let date = new Date

let dataAtual = '2022-07-06T23:32:02.000Z'

let data = dataAtual.split('T')[0]
let hora = dataAtual.split('T')[1]

let horaFormatada = hora.split('.')[0]

let year  = data.split('-')[0]
let month = data.split('-')[1]
let day   = data.split('-')[2]

let dataFormatada = `${day}/${month}/${year}`

console.log(dataFormatada)
console.log(horaFormatada)