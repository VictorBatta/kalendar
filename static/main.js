function getChinaStandard(date, streamline) {
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = `${month < 10 ? '0' : ''}${month}`
  day = `${day < 10 ? '0' : ''}${day}`
  const arr = streamline ? [date.getFullYear(), month] : [date.getFullYear(), month, day]
  return arr.join('-')
}

var unifiedMount = {
  total: 1000,
  price: 550,
  bg: 'info'
}

var date = new Date()
var mount = {}
var monthTable = {}
var monthText = document.getElementById('month-text')

function render() {

  var testKey = getChinaStandard(date, true)
  var testConf = { flow: 'high', price: 750 }
  var rand = 0
  var i = 0
  for (; i < 5; i++) {
    rand = Math.floor(Math.random() * 27 + 1);
    mount[`${testKey}-${rand < 10 ? '0' : ''}${rand}`] = testConf
  }

  testConf = { total: 0 }
  for (i = 0; i < 3; i++) {
    rand = Math.floor(Math.random() * 27 + 1);
    mount[`${testKey}-${rand < 10 ? '0' : ''}${rand}`] = testConf
  }
  monthTable = Kalendar.monthly({ date: date, mount: mount, unifiedMount: unifiedMount })
  monthText.innerHTML = getChinaStandard(date, true)
  var html = []
  monthTable.forEach(week => {
    html.push('<tr align="center">')
    week.forEach(date => {
      let css = []
      const prefix = 'table-'
      if (date) {
        if (date.bg) css.push(`${prefix}${date.bg}`)
        if ([0, 6].indexOf(date.day) >= 0) css.push('bg-warning')
        if (date.flow === 'high') css.push('bg-danger')
        if (date.total === 0) css.push(`sold-out`)
      }
      html.push(`<td class="${css.join(' ')}"${date ? ` onclick="clickDate('${date.dateText}')"` : ''}>${date ? (`${date.date}<br />￥${date.price}`) : ''}</td>`)
    })
    html.push('</tr>')
  })
  document.getElementById('main-body').innerHTML = html.join('')
}

render()

document.getElementById('previous').onclick = function () {
  var month = date.getMonth() - 1
  date.setMonth(month, 1)
  render()
}

document.getElementById('next').onclick = function () {
  var month = date.getMonth() + 1
  date.setMonth(month, 1)
  render()
}

function clickDate(dateText) {
  $('.modal-content').html(dateText)
  $('#myModal').modal('show')
}

var kalendar2 = new Kalendar()
var html2 = []
for (var dateText in kalendar2) {
  html2.push('<tr align="center" class="table-success">')
  html2.push(`<td colspan="7">${dateText}</td>`)
  html2.push('</tr>')
  kalendar2[dateText].forEach(week => {
    html2.push('<tr align="center">')
    week.forEach(day => {
      html2.push(`<td>${day ? day.date : ''}</td>`)
    })
    if (week.length < 7) {
      for (var i = 0; i < 7 - week.length; i++) {
        html2.push('<td></td>')
      }
    }
    html2.push('</tr>')
  })
}
$('#main-body2').html(html2.join(''))
