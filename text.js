let data = [
    [
      {
        id: 16,
        username: 'Alex Caruana',
        email: 'zapien1201@gmail.com',
        email_verified: false,
        user_id: 16,
        beer: 1,
        wine: 0,
        shots: 0,
        cocktail: 0,
        seltzer: 5,
        craft_beer: 1
      },
      {
        id: 17,
        username: 'Jeff Watson',
        email: 'zapien12@gmail.com',
        email_verified: false,
        user_id: 17,
        beer: 2,
        wine: 0,
        shots: 0,
        cocktail: 0,
        seltzer: 2,
        craft_beer: 0
      },
      {
        id: 18,
        username: 'Luis Jaime',
        email: 'zapien123@gmail.com',
        email_verified: false,
        user_id: 18,
        beer: 0,
        wine: 0,
        shots: 0,
        cocktail: 0,
        seltzer: 0,
        craft_beer: 0
      },
      {
        id: 19,
        username: 'Santiago Jaime',
        email: 'zapien1234@gmail.com',
        email_verified: false,
        user_id: 19,
        beer: 0,
        wine: 0,
        shots: 0,
        cocktail: 0,
        seltzer: 0,
        craft_beer: 0
      },
      {
        id: 20,
        username: 'Brad Tokarz',
        email: 'zapien12345@gmail.com',
        email_verified: false,
        user_id: 20,
        beer: 0,
        wine: 0,
        shots: 0,
        cocktail: 0,
        seltzer: 0,
        craft_beer: 0
      }
    ],
    [
      { user_id: 16, date: "2020-09-12T17:36:28.000Z" },
      { user_id: 17, date: "2020-09-06T16:02:03.000Z" }
    ]
  ]

  let friends = data[0]
  let entries = data[1]

  let testObj = {}

  for(let prop of entries){
      console.log('prop',prop)

        let found = friends.find(friend => friend.id === prop.user_id)
       console.log(found)
        if(found.id === prop.user_id){
            testObj.id = found.id
            testObj.username = found.username
            testObj.date = prop.date
        }
        console.log('found',found)
  }

  console.log('obj',testObj)