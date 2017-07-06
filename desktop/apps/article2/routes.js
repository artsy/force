import App from 'desktop/apps/article2/components/App'
import { renderReactLayout } from 'desktop/components/react/utils/render_react_layout'

export function index (req, res, next) {
  const layout = renderReactLayout({
    basePath: req.app.get('views'),
    blocks: {
      head: 'meta.jade',
      body: App
    },
    locals: {
      ...res.locals,
      assetPackage: 'article2'
    },
    data: {
      article: {
        sections: [
          {
            type: 'image_collection',
            layout: 'overflow_fillwidth',
            images: [
              {
                url: "https://d32dm0rphc51dk.cloudfront.net/CpHY-DRr7KW0HGXLslCXHw/larger.jpg",
                type: "image",
                width: 816,
                height: 1024,
                caption: "<p>Photo by Adam Kuehl for Artsy. Image courtesy of the Guggenheim Museum.</p>",
              }
            ]
          }
        ],
        hero_section: {
          layout: 'text',
          title: 'Looking Into the Future',
          url: 'https://artsy-media-uploads.s3.amazonaws.com/YqTtwB7AWqKD95NGItwjJg%2FRachel_Rossin_portrait_2.jpg',
          vertical: 'Market Analysis',
          author: 'Daniel Kunitz',
          date: 'Jan 4, 2017',
          subheader: 'Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.'
        }
      }
    }
  })

  res.send(layout)
}
