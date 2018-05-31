const dragonEvents = [
    {type: 'attack', value: 12, target: 'player01'},
    {type: 'yawn', value: 40},
    {type: 'eat', target: 'horse'},
    {type: 'attack', value: 23, target: 'player02'},
    {type: 'attack', value: 12, target: 'player01'},
]

const totalDamagePlayer01 = dragonEvents
    .filter(function(event){
        return event.type === 'attack'
    })
    .filter(function(event){
        return event.target === 'player01'
    })
    .map(function(event){
        return event.value
    })
    .reduce(function(prev, value){
        return (prev || 0) + value
    })

// console.log('damage on player one\n', totalDamagePlayer01)

const totalDamagePlayer01Arrow = dragonEvents
    .filter(event => event.type === 'attack')
    .filter(event => event.target === 'player01')
    .map(event => event.value)
    .reduce((prev, value) => (prev || 0) + value)

    console.log('damage on player one\n', totalDamagePlayer01Arrow)