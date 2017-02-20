module.exports = [
  { range: 'Under $1,000', increment: '$50' }
  { range: '$1,000 – $1,999', increment: '$100' }
  { range: '$2,000 – $4,999', increment: '$250' }
  { range: '$5,000 – $9,999', increment: '$500' }
  { range: '$10,000 – $19,999', increment: '$1,000' }
  { range: '$20,000 – $49,999', increment: '$2,000' }
  { range: '$50,000 – $99,999', increment: '$5,000' }
  { range: 'At or above $100,000', increment: '$10,000' }
]
