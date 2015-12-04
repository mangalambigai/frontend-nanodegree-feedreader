# To run the application

- Launch index.html
- The rss feeds are displayed, and the jasmine test results are shown at the bottom of the page.

# Test specs for future enhancements:
- Click Counter test suite expects an element of class 'count' to be present inside the 'entry' class.
- The second test checks if the content of this element is numeric.
- Adding an element with class count and a numeric value should pass these tests.

```
                <article class="entry">
                    <h2>{{title}}</h2>
                    <p>{{contentSnippet}}</p>
                    <span class="count">3</span>
                </article>
```

- A non numeric value should fail the test.

```
                <article class="entry">
                    <h2>{{title}}</h2>
                    <p>{{contentSnippet}}</p>
                    <span class="count">abc</span>
                </article>
```
