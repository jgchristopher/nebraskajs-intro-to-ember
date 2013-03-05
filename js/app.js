App = Ember.Application.create({});

App.Router.map(function () {
    this.route("shelves", {path: "/shelves"});
    this.route("shelf", {path:"/shelf/:shelf_id"});
    this.route("book", {path:"/book/:book_id"});
});

App.ShelvesRoute = Ember.Route.extend({
    model: function () {
        return App.Shelf.find();
    }
});

// Models
App.Store = DS.Store.extend({
    revision: 11,
    adapter: 'DS.FixtureAdapter'
});

App.Shelf = DS.Model.extend({
    books: DS.hasMany('App.Book'),
    category: DS.attr('string')
});

App.Book = DS.Model.extend({
    title: DS.attr('string'),
    author: DS.attr('string'),
    image: DS.attr('string'),
    read: DS.attr('boolean'),
    like: DS.attr('boolean'),
    shelves: DS.hasMany('App.Shelf'),
    thumbUrl: function () {
        return "./img/books/" + this.get('image') + '-thumb.png'
    }.property('image'),
    imageUrl: function () {
        return "./img/books/" + this.get('image') + '.png'
    }.property('image')
});

App.Shelf.FIXTURES = [
    {
        id: 1,
        books: [1, 2],
        category: 'JavaScript'
    },
    {
        id: 2,
        books: [3],
        category: 'Science-Fiction'
    }
];

App.Book.FIXTURES = [
    {
        id: 1,
        title: 'Ember.js In Action',
        author: 'Joachim Haagen Skeie',
        image: 'ember-js-in-action',
        read: false,
        like: true,
        shelf: 1
    },
    {
        id: 2,
        title: 'Mastering Space and Time with JavaScript Book 4: Ember',
        author: 'Noel Rappin',
        image: 'master_space_and_time_with_javascript_ember',
        read: false,
        like: true,
        shelf: 1
    },
    {
        id: 3,
        title: "2312",
        author: "Kim Stanley Robinson",
        image: "2312",
        read: false,
        like: true,
        shelf: 2
    }
]