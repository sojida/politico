const parties = document.getElementsByName('party-section')[0]
const partyTable = document.querySelector('.party-info')

parties.addEventListener('click', (e) => {
    fetchFunc.getData(`${url}/parties`)
    .then((res) => {
        partyTable.innerHTML = res.data.map((party) => {
            return `<tr key=${party.id}>
                    <td>${party.name}</td>
                    <td>${party.hqaddress}</td>
                    <td>${partylogo(party.logourl)}</td>
                    </tr>
                `
        }).join(' ')
    })
    .catch(err => err);
})

const partylogo = (logoUrl) => {
   if (logoUrl === 'logo123'){
       return 'No logo'
   }

   return `<img src="${url}/images/${logoUrl}"></img>`
}