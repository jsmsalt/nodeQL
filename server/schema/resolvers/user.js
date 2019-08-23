import userModel from 'models/user'
export default {
    Query: {
        user: () => {

            // const user = new userModel({
            //     email: 'jsmssocial@gmail.com',
            //     username: 'jsmssocial',
            //     password: '12345',
            //     profile: {
            //         birthdate: new Date('1987-11-10')
            //     }
            // })
            // user.save()


            // userModel.findById('5d5a1739e45400011ac775a7', function (err, item) {
            //     console.log(item)
            // });

            console.log('eeeeeeeeeeeeeeeeeeee')

            return {
                id: 2222,
                username: 'jsmsalt',
                age: 31
            }
        },
    },
    // Mutation: {
    //     addUser: () => {},
    // },
    User: {
        token: (user) => {
            return {
                token: '12345',
                expire: 6
            }
        },
    },
}