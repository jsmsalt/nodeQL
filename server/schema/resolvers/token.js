export default {
    Query: {
        token: () => {
            return {
                token: '12345',
                expire: 6
            }
        },
    },
    // Mutation: {
    //     addToken: () => {},
    // },
    Token: {
        user: (token) => {
            return {
                id: 2222,
                username: 'jsmsalt',
                age: 31
            }
        },
    },
}