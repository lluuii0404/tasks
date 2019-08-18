const express     = require("express"),
      morgan      = require("morgan"),
      bodyParser  = require("body-parser");

const database = require("./database.json");

const app = express();
const jsonParser = bodyParser.json();

app.use(morgan('tiny'));

// TODO: posts
// TODO: comments
// TODO: albums
// TODO: photos
// TODO: todos
// TODO: users

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
};

function findAllId (array, id){
    let noRepeatId = [];
    array.forEach(item => noRepeatId.indexOf(item[id]) === -1 && noRepeatId.push(item[id]) );
    return noRepeatId
}

// USERS endpoints
app.get("/users", (req, res) => {
    const { users } = database;
    users ?
        res.send(users) :
        res.status(404).send('Users not found');
});
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const { users } = database;
    const user = users && users.find( item => parseInt(id) === item.id);

    user ?
        res.send(user) :
        res.status(404).send('User not found');
});
app.post("/users", jsonParser, (req, res) => {
    const { users } = database;
    if (!req.body) return res.sendStatus(400);

    const newUserId = getNewId( users );
    let newUser = {};

    let reqUserName      = req.body.name;
    let reqUserUsername  = req.body.username;
    let reqUserEmail     = req.body.email;
    let reqUserStreet = req.body.street;
    let reqUserSuite = req.body.suite;
    let reqUserCity = req.body.city;
    let reqUserZipcode = req.body.zipcode;
    let reqUserLat = req.body.lat;
    let reqUserLng = req.body.lng;
    let reqUserPhone     = req.body.phone;
    let reqUserWebsite = req.body.website;
    let reqUserCompanyName = req.body.companyName;
    let reqUserCatchPhrase= req.body.catchPhrase;
    let reqUserBs = req.body.bs;


    if (reqUserName !== undefined && reqUserUsername !== undefined &&
        reqUserEmail !== undefined && reqUserPhone !== undefined){

        if (reqUserStreet === undefined ) reqUserStreet = '';
        if (reqUserSuite === undefined) reqUserSuite ='';
        if (reqUserCity === undefined) reqUserCity = '';
        if (reqUserZipcode === undefined) reqUserZipcode = '';
        if (reqUserLat === undefined) reqUserLat = '';
        if (reqUserLng === undefined) reqUserLng = '';
        if (reqUserWebsite === undefined) reqUserWebsite = '';
        if (reqUserCompanyName === undefined) reqUserCompanyName = '';
        if (reqUserCatchPhrase === undefined ) reqUserCatchPhrase = '';
        if (reqUserBs === undefined) reqUserBs = '' ;

        newUser = {
            id: newUserId,
            name: reqUserName,
            username: reqUserUsername,
            email: reqUserEmail,
            address: {
                street: reqUserStreet,
                suite: reqUserSuite,
                city: reqUserCity,
                zipcode: reqUserZipcode,
                geo: {
                    lat: reqUserLat,
                    lng: reqUserLng
                }
            },
            phone: reqUserPhone,
            website: reqUserWebsite,
            company: {
                name: reqUserCompanyName,
                catchPhrase: reqUserCatchPhrase,
                bs: reqUserBs
            }
        };
        users.push(newUser);
        res.send(newUser);
    } else {
        res.status(404).send('Can"t add new user. Please write your name, user name, email and phone.')
    }
});
app.patch("/user/:id", jsonParser, (req, res) => {
  // Update user field by id
    const { users } = database;
    const id = req.params.id;
    const queryBody = req.body;

    let currentUser = users && users.find( item => id === item.id);
    if (currentUser) {
        for ( let prop in queryBody ){
            if (prop === "name") currentUser.name = queryBody[prop];
            if (prop === "username") currentUser.username = queryBody[prop];
            if (prop === "email") currentUser.email = queryBody[prop];
            if (prop === "street") currentUser.address.street = queryBody[prop];
            if (prop === "suite") currentUser.address.suite = queryBody[prop];
            if (prop === "city") currentUser.address.city = queryBody[prop];
            if (prop === "zipcode") currentUser.address.zipcode = queryBody[prop];
            if (prop === "lat") currentUser.address.geo.lat = queryBody[prop];
            if (prop === "lng") currentUser.address.geo.lng = queryBody[prop];
            if (prop === "phone") currentUser.phone = queryBody[prop];
            if (prop === "website") currentUser.website = queryBody[prop];
            if (prop === "companyName") currentUser.company.name = queryBody[prop];
            if (prop === "catchPhrase") currentUser.company.catchPhrase = queryBody[prop];
            if (prop === "bs") currentUser.company.bs = queryBody[prop];
        }

        users.find( (item, index, users) => {
            if (currentUser.id === item.id) {
                users.splice(index, 1, currentUser);
            }
        });
        res.send(currentUser);
    } else {
        res.status(404).send('User not found');
    }
});
app.delete("/user/:id", (req, res) => {
    const { users } = database;
    const id = req.params.id;

    const delUser = users && users.find((item, index, users) => {
        return parseInt(id) === item.id && users.splice(index, 1)
    });

    delUser !== undefined ?
        res.send(delUser) :
        res.status(404).send(`User not found`)
});

// POSTS endpoints
app.get('/posts',  (req, res) => {
    const {posts} = database;

    posts ?
        res.send(posts) :
        res.status(404).send("Posts not found")
});
app.get('/posts/:id',  (req, res) => {
    const {posts} = database;
    const id = req.params.id;

    const post = posts && posts.find( item => parseInt(id) === item.id);

    post ?
        res.send(post) :
        res.status(404).send('Post not found');
});
app.post('/posts', jsonParser, (req, res) => {
    const { posts } = database;
    if (!req.body) return res.sendStatus(400);

    const newPostId = getNewId( posts );

    const reqPostUserId = req.body.userId;
    const reqPostTitle  = req.body.title;
    const reqPostBody   = req.body.body;

    const arrUsersId = findAllId( posts, 'userId' );

    let  newPost = {};

    arrUsersId.forEach(item => {
        if (item === reqPostUserId &&
            reqPostTitle !== undefined &&
            reqPostBody !== undefined){
            newPost = {
                "userId": reqPostUserId,
                "id":  newPostId,
                "title": reqPostTitle,
                "body": reqPostBody
            }
        }
    });

    if ( Object.keys(newPost).length !== 0 ) {
        posts.push(newPost);
        res.send(newPost);
    } else {
        res.status(404).send(`Can't add post, this user not found`)
    }
});
app.patch('/post/:id', jsonParser, (req, res) => {
    const { posts } = database;
    const id = req.params.id;
    const queryBody = req.body;

    let currentPost = posts && posts.find( item => id == item.id);

    if (currentPost) {
        for(let prop in currentPost) {
            if (prop === "userId") currentPost.userId = queryBody[prop];
            if (prop === "title") currentPost.title = queryBody[prop];
            if (prop === "body") currentPost.body = queryBody[prop];
        }

        posts.find( (item, index, posts) => {
            if (currentPost.id == item.id) {
                posts.splice(index, 1, currentPost);
            }
        });
        res.send(currentPost);
    } else {
        res.status(404).send('Post not found');
    }
});
app.delete('/post/:id',  (req, res) => {
    const { posts } = database;
    const id = req.params.id;

    const delPost = posts && posts.find((item, index, posts) => {
        return parseInt(id) === item.id && posts.splice(index, 1)
    });

    delPost !== undefined ?
        res.send(delPost) :
        res.status(404).send(`Post not found`)
});

// COMMENTS endpoints
app.get('/comments',  (req, res) => {
    const {comments} = database;

    comments ?
        res.send(comments) :
        res.status(404).send("Posts not found")
});
app.get('/comments/:id',  (req, res) => {
    const { comments } = database;
    const id = req.params.id;

    const comment = comments.find( item => parseInt(id) === item.id);

    comment ?
        res.send(comment) :
        res.status(404).send('Post not found');
});
app.post('/comments', jsonParser, (req, res) => {
    const { comments } = database;

    if (!req.body) return res.sendStatus(400);

    const newCommentId = getNewId( comments );

    const reqCommentPostId = req.body.postId;
    const reqCommentName  = req.body.name;
    const reqCommentEmail  = req.body.email;
    const reqCommentBody   = req.body.body;

    const arrPostsId = findAllId( comments, 'postId' );

    let  newComment = {};

    arrPostsId.forEach(item => {
        if (item === reqCommentPostId &&
            reqCommentName !== undefined &&
            reqCommentEmail !== undefined &&
            reqCommentBody !== undefined){
            newComment = {
                "postId": reqCommentPostId,
                "id":  newCommentId,
                "name": reqCommentName,
                "email": reqCommentEmail,
                "body": reqCommentBody
            }
        }
    });

    if ( Object.keys(newComment).length !== 0 ) {
        comments.push(newComment);
        res.send(newComment);
    } else {
        res.status(404).send(`Can't add comment, this post not found`)
    }
});
app.patch('/comment/:id', jsonParser, (req, res) => {
    const { comments } = database;
    const id = req.params.id;
    const queryBody = req.body;

    let currentComment = comments && comments.find( i => id == i.id);

    if (currentComment) {
        for( let prop in currentComment) {
            if (prop === "postId") currentComment.postId = queryBody[prop];
            if (prop === "name") currentComment.name = queryBody[prop];
            if (prop === "email") currentComment.email = queryBody[prop];
            if (prop === "body") currentComment.body = queryBody[prop];
        }

        comments.find( (item, index, comments) => {
            if (currentComment.id == item.id) {
                comments.splice(index, 1, currentComment);
            }
        });
        res.send(currentComment);
    } else {
        res.status(404).send('Post not found');
    }
});
app.delete('/comment/:id',  (req, res) => {
    const { comments } = database;
    const id = req.params.id;
    // debugger;
    const delComment = comments.find((i,ind, comments) => {
        return parseInt(id) === i.id && comments.splice(ind,1);
    });
    delComment !== undefined ?
        res.send(delComment) :
        res.status(404).send('Comment not found')
});

// ALBUMS endpoints
app.get('/albums',  (req, res) => {
    const { albums } = database;
    albums ?
        res.send(albums) :
        res.status(404).send('Albums not found.')
});
app.get('/albums/:id',  (req, res) => {
    const { albums } = database;
    const id = req.params.id;

    const album = albums.find( item => parseInt(id) === item.id);
    album ?
        res.send(album) :
        res.status(404).send('Album not found')
});
app.post('/albums', jsonParser, (req, res) => {
    const { albums } = database;
    if (!req.body) return res.sendStatus(400);
    const newAlbumId = getNewId(albums);

    const reqAlbumUserId = req.body.userId;
    const reqAlbumTitle  = req.body.title;

    const arrUserId = findAllId( albums, 'userId' );
    let newAlbum = {};
    arrUserId.forEach( item => {
        if (item == reqAlbumUserId && reqAlbumTitle !== undefined) {
            newAlbum = {
                "userId": reqAlbumUserId,
                "id" : newAlbumId,
                "title" : reqAlbumTitle
            }
        }
    });

    if ( Object.keys(newAlbum).length !== 0 ) {
        albums.push(newAlbum);
        res.send(newAlbum);
    } else {
        res.status(404).send(`Can't add album, this user not found`)
    }
});
app.patch('/album/:id', jsonParser, (req, res) => {
    const { albums } = database;
    const id = req.params.id;
    const queryBody = req.body;

    let currAlbum = albums.find( i => id == i.id);

    if (currAlbum) {
        for( let prop in currAlbum) {
            if (prop === "userId") currAlbum.userId = queryBody[prop];
            if (prop === "title") currAlbum.title = queryBody[prop];
        }

        albums.find( (i, ind, albums ) => {
            currAlbum.id == i.id && albums.splice(ind, 1, currAlbum);
        });
        res.send(currAlbum)
    } else {
        res.status(404).send('Albums not found')
    }
});
app.delete('/album/:id',  (req, res) => {
    const { albums } = database;
    const { id } = req.params;

    const delAlbum = albums.find( (i, ind, albums) => {
        return parseInt(id) === i.id && albums.splice(ind, 1);
    });
    delAlbum !== undefined ?
        res.send(delAlbum) :
        res.status(404).send('Album not found.')
});

// PHOTOS endpoints
app.get('/photos',  (req, res) => {
    const { photos } = database;

    photos ?
        res.send(photos) :
        res.status(404).send("Photos not found");
});
app.get('/photos/:id',  (req, res) => {
    const { photos } = database;
    const { id } = req.params;

    const photo = photos.find( it => it.id === parseInt(id));

    photo ?
        res.send(photo) :
        res.status(404).send('Photo not found');
});
app.post('/photos', jsonParser, (req, res) => {
    const { photos } = database;
    if (!req.body) return res.sendStatus( 400);

    const newId = getNewId( photos );

    const  reqPhAlbId = req.body.albumId;
    const  reqPhTitle = req.body.title;
    const  reqPhUrl   = req.body.url;
    const  reqPhThumbnailUrl = req.body.thumbnailUrl;

    const arrAlbId = findAllId( photos, 'albumId');
    let newPhoto = {};
    arrAlbId.forEach( item => {
        if (item === reqPhAlbId &&
            reqPhTitle !== undefined &&
            reqPhUrl !== undefined &&
            reqPhThumbnailUrl !== undefined) {
            newPhoto = {
                "albumId" : reqPhAlbId,
                "id" : newId,
                "title" : reqPhTitle,
                "url" : reqPhUrl,
                "thumbnailUrl" : reqPhThumbnailUrl
            }
        }
    });
    if ( Object.keys(newPhoto).length !== 0 ) {
        photos.push(newPhoto);
        res.send(newPhoto);
    } else {
        res.status(404).send(`Can't add photo, this album not found`)
    }
});
app.patch('/photo/:id', jsonParser, (req, res) => {
    const { photos } = database;
    const { id } =req.params;
    const queryBody = req.body;

    let currPhoto = photos.find(it => it.id === parseInt(id));

    if (currPhoto) {
        for( let prop in currPhoto) {
            if (prop === "albumId") currPhoto.albumId = queryBody[prop];
            if (prop === "title") currPhoto.title = queryBody[prop];
            if (prop === "url") currPhoto.url = queryBody[prop];
            if (prop === "thumbnailUrl") currPhoto.thumbnailUrl = queryBody[prop];
        }

        photos.find( (it, ind, photos) =>
            currPhoto.id === it.id && photos.splice( ind, 1, currPhoto));
        res.send(currPhoto);
    } else {
        res.status(404).send('Photo not found');
    }
});
app.delete('/photo/:id',  (req, res) => {
    const { photos } = database;
    const { id } = req.params;

    const delPhoto = photos.find( ( item, ind, photos) =>
        item.id === parseInt(id) && photos.splice(ind, 1));

    delPhoto !== undefined ?
        res.send(delPhoto) :
        res.status(404).send('Photo not found')
});

// TODOS endpoints
app.get('/todos',  (req, res) => {
    const { todos } = database;

    todos ?
        res.send(todos) :
        res.status(404).send("Todos not found");
});
app.get('/todos/:id',  (req, res) => {
    const { todos } = database;
    const { id } = req.params;

    const todo = todos.find(item => item.id  === parseInt(id));

    todo ?
        res.send(todo) :
        res.status(404).send("Todo not found");
});
app.post('/todos', jsonParser, (req, res) => {
    const { todos } = database;
    // debugger;
    if (!req.body) return res.sendStatus( 400);
    const newId = getNewId( todos );

    const reqTodoUserId = req.body.userId;
    const reqTodoTitle = req.body.title;
    const reqTodoCompleted = req.body.completed;

    const arrUsersId = findAllId( todos, 'userId');
    let newTodo = {};

    arrUsersId.forEach(item =>{
        if (item === reqTodoUserId &&
            reqTodoTitle !== undefined &&
            reqTodoCompleted !== undefined){
            newTodo = {
                "userId" : reqTodoUserId,
                "id" : newId,
                "title" : reqTodoTitle,
                "completed" : reqTodoCompleted
            }
        }
    });
    if (Object.keys(newTodo).length !== 0) {
        todos.push(newTodo);
        res.send(newTodo);
    } else {
        res.status(404).send('Can"t add photo, this user not found');
    }
});
app.patch('/todo/:id', jsonParser, (req, res) => {
    const {todos} = database;
    const {id} = req.params;
    const queryBody = req.body;

    let currentTodo = todos.find(item => item.id === parseInt(id));
    if (currentTodo) {
        for( let prop in currentTodo) {
            if (prop === "userId") currentTodo.userId = queryBody[prop];
            if (prop === "title") currentTodo.title = queryBody[prop];
            if (prop === "completed") currentTodo.completed = queryBody[prop];
        }
        todos.find((item, ind, todos) =>
            currentTodo.id === item.id && todos.splice(ind, 1, currentTodo));
        res.send(currentTodo);
    } else {
        res.status(404).send('Todo not found');
    }
});
app.delete('/todo/:id', (req, res) => {
    const {todos} = database;
    const { id } = req.params;

    const delTodo = todos.find((it, ind, todos) =>
        it.id === parseInt(id) && todos.splice(ind, 1))

    delTodo !== undefined ?
        res.send(delTodo) :
        res.status(404).send("Todo not found");
});

module.exports = app;
