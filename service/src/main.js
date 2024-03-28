const express = require("express");
const cors = require("cors");

const PORT = 3001;
const HOST = "localhost";

const run = () => {
  const app = express();

  app.use(cors("*"));

  app.get("/coral/:storyID/:storyURL", (req, res) => {
    const { storyID, storyURL } = req.params;

    const decodedURL = decodeURIComponent(storyURL);

    const template = `
      <html>
        <body>
        <div id="coral_thread"></div>
          <script type="text/javascript">
            (function() {
                var d = document, s = d.createElement('script');
                s.src = 'http://localhost:3000/assets/js/embed.js';
                s.async = false;
                s.defer = true;
                s.onload = function() {
                    Coral.createStreamEmbed({
                        id: "coral_thread",
                        autoRender: true,
                        rootURL: 'http://localhost:3000',
                        // Uncomment these lines and replace with the ID of the
                        // story's ID and URL from your CMS to provide the
                        // tightest integration. Refer to our documentation at
                        // https://docs.coralproject.net for all the configuration
                        // options.
                        storyID: '${storyID}',
                        storyURL: '${decodedURL}',
                    });
                };
                (d.head || d.body).appendChild(s);
            })();
          </script>
        </body>
      </html>
    `;

    res.status(200).send(template);
  });

  app.listen(PORT, HOST, () => {
    console.log(`service is listening on ${HOST}:${PORT}...`);
  });
};

run();