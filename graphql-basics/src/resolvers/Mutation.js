import uuidv4 from 'uuid/v4';

const Mutation = {
    createUser(parent, args, { db }, info){
        const { posts, users, comments } = db
        const { data: { name, email, age} } = args
        const emailTaken = users.some((user) => user.email === email)
        
  

        if (emailTaken){
            throw new Error('Email taken.')
        }

        const user = {
            id: uuidv4(),
            ...args
        }

        users.push(user)

        return user

    },
    deleteUser(parent, args, { db }, info){
        const { posts, users, comments } = db
        const { id } = args
        const userIndex = users.findIndex((user) => user.id === id)

        if(userIndex === -1){
            throw new Error('User not found.')
        }

        
        const deletedUsers = users.splice(userIndex, 1)

        posts = posts.filter((post) => {
            const match = post.author === id

                if(match){
                    comments = comments.filter((comment) => comment.post !== post.id )
                }

            return !match

        })

        comments = comments.filter((comment) => comment.author !== args.id)

        return deletedUsers[0]
    },
    updateUser(parent, args, { db }, info){
        const { posts, users, comments } = db
        const { id, data: { name, email, age } } = args
        const user = users.find((user) => user.id === id )

        if (!user){
            throw new Error('User not found')
        }

        if (typeof email === "string" ){
            const emailTaken = users.some((user) => user.email === email)

            if(emailTaken){
                throw new Error('Email Taken')
            }

            user.email = email
        }

        if (typeof name === 'string'){
            user.name = name
        }

        if (typeof age !== 'undefined'){
            user.age = age
        }

    },
    createPost(parent, args, { db }, info){
        const userExists = db.users.some((user) => user.id === args.data.author )

        if (!userExists){
            throw new Error('User does not exist.')
        }

        const post = {
            id: uuidv4(),
            ...args.data,
        }

        db.posts.push(post)

        return post

    },
    deletePost(parent, args, { db } , info){
        const { posts, users, comments } = db
        const postIndex = posts.findIndex((post) => post.id === args.id)

            if(postIndex === -1){
                throw new Error('Post does not exist.')
            }

            const deletedPost = db.posts.splice(postIndex, 1)

            comments = comments.filter((comment) => {
                comment.post !== args.id
            })

            return deletedPost[0]

    },
    updatePost(parent, args, { db } , info){
        const { posts, users, comments } = db
        const { id, data: {title, body, published}} = args
        const post = posts.find((post) => post.id === id)

        if (!post){
            throw new('Post does not exist.')
        }

        if (typeof data.title === 'string'){
            post.title === title
        }
        if (typeof data.body === 'string'){
            post.body === body
        }
        if (typeof data.published === 'boolean' ){
            post.published === published
        }

        return post
    }, 
    createComment(parent, args, { db }, info){
        const userExists = db.users.some((user) => user.id === args.data.author )
        const postExists = db.posts.some((post) => post.id === args.data.post && post.published)

    
        if (!userExists){
            throw new Error('User does not exist.')
        }
        if (!postExists){
            throw new Error('Post does not exist.')
        }
        

        const comment = {
            id: uuidv4(),
           ...args.data
        }

        db.comments.push(comment)

        return comment

    },
    deleteComment(parent, args, { db }, info){
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if (commentIndex === -1) {
            throw new Error('Comment not found')
        }

        const deletedComments = db.comments.splice(commentIndex, 1)

        return deletedComments[0]
    }
}

export { Mutation as default }