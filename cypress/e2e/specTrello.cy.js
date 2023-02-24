let trelloKey = "ea7393ce9f29f50b262a4b873c79392c"
let trelloToken= "5a3f21725364946145ed1818e8e26a0a1e629ed75c943dfbb6616ab58189bcbe"
let boardID = "63f75869b8880b42accb69b2"

describe('Trello API Test', () => {
    it('1', () => {
        
        cy.request({
            method: 'GET',
            url: 'https://api.trello.com/1/members/me/boards',
            qs: {
              key: trelloKey,
              token: trelloToken
            }
          }).then((response) => {
            expect(response.status).to.eq(200)
            const boardID = response.body[0].id
            console.log(boardID)
          })
        })
    

it.only('create a board, list and card', () => {
        
            const boardName = 'new board';
        
    cy.request({
         method: 'POST',
        url: `https://api.trello.com/1/boards`,
        qs: {
            name: boardName,
            key: trelloKey,
            token: trelloToken
              }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq(boardName)
            const newBoardId = response.body.id;
            cy.wrap(newBoardId).as("newboardID")
            console.log(newBoardId);
            
    }) 
    cy.get("@newboardID").then((newBoardId) => {
        cy.request({
            method: 'POST',
            url: 'https://api.trello.com/1/lists',
            qs: {
                name: 'TODO',
                idBoard: newBoardId,
                key: trelloKey,
                token: trelloToken
              }
            }).then((response) => {
              expect(response.status).to.eq(200);
              const newListId = response.body.id
              cy.wrap(newListId).as("newlistID")
              console.log(newListId);
              
            })
    cy.get("@newlistID").then((newListId) => {      
    cy.request({
        method: 'POST',
        url: 'https://api.trello.com/1/cards',
        qs: {
            name: 'Sign-up for Trello',
            key: trelloKey,
            token: trelloToken,
            idList: newListId
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            const newCardId = response.body.id;
            cy.wrap(newCardId).as("newcardID")
            console.log(newCardId);
        })

})
    })
    
            
        
    
    it('3', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.trello.com/1/members/me/boards',
            qs: {
              key: trelloKey,
              token: trelloToken,
              name: 'testowatablica'
            }   
}).then((response) => {
    const boardID = response.body[0].id
    cy.wrap(boardID).as("boardID")
    console.log(boardID)

})
    })
    it('delete a board', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://api.trello.com/1/boards/63f754797bf41cb0e34f9e85',
            qs: {
               
                key: trelloKey,
                token: trelloToken
              
            }
        }).then((response) => {
            expect(response.status).to.eq(200)

    })
})
    

    it('create a list TODO', () => {
        
        cy.get("@newboardID").then((newBoardId) => {
        cy.request({
            method: 'POST',
            url: 'https://api.trello.com/1/lists',
            qs: {
                name: 'TODO',
                idBoard: newBoardId,
                key: trelloKey,
                token: trelloToken
              }
            }).then((response) => {
              expect(response.status).to.eq(200);
              const newListId = response.body.id
              cy.wrap(newListId).as("newlistID")
              console.log(newListId);
              
            })
        })
    })
    it('create a list DONE', () => {

        cy.request({
            method: 'POST',
            url: 'https://api.trello.com/1/lists',
                qs: {
                    name: 'DONE',
                    idBoard: newBoardId,
                    key: trelloKey,
                    token: trelloToken
                      }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    const newListId = response.body.id
                    cy.wrap(newListId).as("newlistID")
                    console.log(newListId);
                      
                    })

                })
    it('create a card in the list', () => {
        cy.request({
         method: 'POST',
        url: 'https://api.trello.com/1/cards',
        qs: {
            name: 'Sign-up for Trello',
            key: trelloKey,
            token: trelloToken,
            idList: newListId
                    }
                  }).then((response) => {
                    expect(response.status).to.eq(200);
                    const newCardId = response.body.id;
                    cy.wrap(newCardId).as("newcardID")
                    console.log(newCardId);
                  })
                  
                 
                  
                  
                })   
      
})
    
})