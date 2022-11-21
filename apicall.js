let fetch = require('node-fetch');


async function main(){
  const responce = await fetch('https://api.apilayer.com/currency_data/convert?to='+"CNY"+'&from='+"INR"+'&amount='+1, {
    method: 'GET',
    headers: {'apikey': 'a4qWjuD51IwDFO3mBIbEEixSK4B0ndh0'}
  })
  console.log(await responce.json())
}
main()

