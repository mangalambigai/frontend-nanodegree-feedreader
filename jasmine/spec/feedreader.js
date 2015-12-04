/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a url that is not empty or blank spaces', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.trim()).not.toBe('');
            });
        })

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name that is not empty or blank spaces', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.trim()).not.toBe('');
            });
        });

    });


    /* This test suite is about the menu*/
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').attr('class')).toBe('menu-hidden');
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('displays and hides when menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).not.toBe('menu-hidden');
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toBe('menu-hidden');
        });
    });

    /* This variable holds the first entry's value for the 'New Feed Selection'
     * test suite
     */
    var val;

    /* This test suite is about "Initial Entries" */
    describe('Initial Entries', function() {

        /* loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function (done) {
            loadFeed(0, function() {
                done();
            });
        });
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('are loaded', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            val = $('.feed .entry').html();
            done();
        });
    });

    /* This test suite is about "New Feed Selection"*/
    describe('New Feed Selection', function() {
        beforeEach(function (done) {
            loadFeed(1, function() {
                done();
            });
        });

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('changes the content', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            var val2 = $('.feed .entry').html();
            expect(val2).not.toBe(val);
            done();
        });

    });
}());
