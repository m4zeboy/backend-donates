export default {
    renderTable(donates) {
        const table = (thead, tbody) => `<table>${thead} ${tbody}</table>`
        const thead = `<thead>
            <th>ID</th>
            <th>Família</th>
            <th>Endereço</th>
            <th>Responsável</th>
            <th>Qtd</th>
            <th>Data</th>
        </thead>`
        const tbody = (content) => `<tbody>${content}</tbody>`

        const tr = (tds) => `<tr>${tds}</tr>` 
        const td = (data) => `<td>${data}</td>`

        const rows = (donate) => tr([td(donate.id),td(donate.family), td(donate.address), td(donate.responsible), td(donate.quantity), td(donate.date)].join(""))

        const corpo = tbody(donates.map(donate => rows(donate)).join(""))
        return table(thead, corpo)
    },
    getMonth(monthNumber) {
        if(monthNumber === 1) return "Janeiro";
        if(monthNumber === 2) return "Fevereiro";
        if(monthNumber === 3) return "Março";
        if(monthNumber === 4) return "Abril";
        if(monthNumber === 5) return "Maio";
        if(monthNumber === 6) return "Junho";
        if(monthNumber === 7) return "Julho";
        if(monthNumber === 8) return "Agosto";
        if(monthNumber === 9) return "Setembro";
        if(monthNumber === 10) return "Outubro";
        if(monthNumber === 11) return "Novembro";
        if(monthNumber === 12) return "Dezembro";
    }
}