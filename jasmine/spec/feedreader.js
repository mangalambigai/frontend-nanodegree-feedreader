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

    /* This test suite is about the Initial Entries */
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
            var $entries = $('.feed .entry');
            expect($entries).not.toBe(0);
            val = $entries.html();
            done();
        });
    });

    /* This test suite is about New Feed Selection*/
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
            var $entries = $('.feed .entry');
            expect($entries.length).not.toBe(0);
            var val2 = $entries.html();
            expect(val2).not.toBe(val);
            done();
        });
    });

    /* This test suite tests a future enhancement -
     * a counter that shows how many times the entry's link is clicked.
     */
    describe('Click Counter', function() {


        /* This test ensures that the counter is present and not empty*/
        it('is present', function() {
            var $countelements = $('.feed .entry .count');
            expect($countelements).toBeDefined();
            expect($countelements.length).not.toBe(0);
            $countelements.each(function() {
                expect($(this).text()).not.toBe('');
            });
        });

        /* This test ensures that the counter has a number*/
        it('shows a number', function() {
            var $countelements = $('.feed .entry .count');
            $countelements.each(function() {
                expect(Number($(this).text())).not.toBeNaN();
            });
        });

    });
}());
