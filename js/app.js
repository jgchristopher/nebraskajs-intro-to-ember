App = Ember.Application.create({});

App.Router.map(function () {
    this.resource("shelves", function () {
        this.resource('shelf', {path: "shelf/:shelf_id"}, function () {
            this.resource('book', { path: 'book/:book_id' });
        });
    });

});

App.IndexRoute = Ember.Route.extend({
    redirect: function () {
        this.transitionTo('shelves');
    }
});

App.ShelvesRoute = Ember.Route.extend({
    model: function () {
        return App.Shelf.find();
    }
});

App.ShelvesController = Ember.ArrayController.extend({
    content: [],
    needs: ["shelf"],
    addBook: function (book) {
        console.log("Adding a Book!");
        var shelf = this.get("controllers.shelf").get('model'), books = shelf.get('books');
        books.createRecord(book);
    }
});

App.ShelfController = Ember.ObjectController.extend({

});

App.ShelvesIndexView = Ember.View.extend({
    layoutName: 'shelfListLayout',
    templateName: 'shelves/index'
});

App.ShelfView = Ember.View.extend({
    layoutName: 'shelfListLayout',
    templateName: 'shelf'
});


// Handlebars Helpers
Ember.Handlebars.registerBoundHelper('shorten', function (value) {
    if (value && typeof value === 'string') {
        if (value.length > 30) {
            value = value.substr(0, 30) + " ...";
        }
    }
    return value;
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
    shelf: DS.belongsTo('App.Shelf'),
    thumbUrl: function () {
        var image = this.get('image');
        if (image) {
            image = "./img/books/" + this.get('image') + '-thumb.png';
        }
        return image;
    }.property('image'),
    imageUrl: function () {
        var image = this.get('image');
        if (image) {
            image = "./img/books/" + this.get('image') + '.png';
        }
        return image;
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
        like: false,
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