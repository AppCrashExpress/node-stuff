const express = require("express");
const bParser = require("body-parser");
const ejs     = require("ejs");
const lodash  = require("lodash");

const PORT = 8080;
const postArray = [];

const HOME_STARTING_CONTENT = "Lacus vel facilisis volutpat est velit " +
    "egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet " +
    "cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. " +
    "Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt " +
    "arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat " +
    "pellentesque adipiscing. Magnis dis parturient montes nascetur " +
    "ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus " +
    "sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut " +
    "lectus arcu bibendum at. Odio euismod lacinia at quis risus sed " +
    "vulputate odio ut. Cursus mattis molestie a iaculis at erat " +
    "pellentesque adipiscing.";
const ABOUT_CONTENT = "Hac habitasse platea dictumst vestibulum rhoncus est " +
    "pellentesque. Dictumst vestibulum rhoncus est pellentesque elit " +
    "ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst" +
    "quisque sagittis purus sit. Egestas sed sed risus pretium quam " +
    "vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. " +
    "Semper risus in hendrerit gravida rutrum quisque non tellus orci. " +
    "Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut " +
    "tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis " +
    "massa tincidunt dui.";
const CONTACT_CONTENT = "Scelerisque eleifend donec pretium vulputate " +
    "sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui " +
    "vivamus arcu felis bibendum. Consectetur adipiscing elit duis " +
    "tristique. Risus viverra adipiscing at in tellus integer feugiat. " +
    "Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat " +
    "interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum " +
    "posuere lorem ipsum dolor sit amet consectetur adipiscing elit. " +
    "Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut " +
    "placerat orci nulla. Mauris in aliquam sem fringilla ut morbi " +
    "tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const addPost = function (title, body) {
    postArray.push({title: title, body: body});
};

const app = express();
app.set('view engine', 'ejs');
app.use(bParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    const bodyMaxLen = 100;

    res.render("home", { 
        homeContent: HOME_STARTING_CONTENT,
        postArray: postArray.map((post) => {
            let homePost = {};
            homePost.title = post.title; 
            if (post.body.length > bodyMaxLen) {
                homePost.body = post.body.slice(0, bodyMaxLen) + "..." +
                    `<a href="/posts/${lodash.camelCase(post.title)}">
                        Read more
                    </a>`;
            } else {
                homePost.body = post.body;
            }
            return homePost;
        })
    });
});

app.get("/posts/:postname", (req, res) => {
    const postName = req.params.postname;
    const found = postArray.find(
        (elem) => lodash.lowerCase(elem.title) === lodash.lowerCase(postName)
    );
    if (found === undefined) {
        res.render("post", {
            postTitle: "Post not found",
            postBody: `Post with title "${postName}" not found`
        });
    } else { 
        res.render("post", { postTitle: found.title, postBody: found.body });
    }
});

app.get("/about", (req, res) => {
    res.render("about", { aboutContent: ABOUT_CONTENT });
});

app.get("/contact", (req, res) => {
    res.render("contact", { contactContent: CONTACT_CONTENT });
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const {inputTitle, inputPost} = req.body;
    addPost(inputTitle, inputPost);
    res.redirect("/");
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
