/**
 * @generated SignedSource<<fe2828c52abdfc2af4f1cb669da381ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsArticlesQuery$variables = {
  slug: string;
};
export type ArtworkDetailsArticlesQuery$data = {
  readonly artwork: {
    readonly articles: ReadonlyArray<{
      readonly internalID: string;
    } | null | undefined> | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsArticles_artwork">;
  } | null | undefined;
};
export type ArtworkDetailsArticlesQuery = {
  response: ArtworkDetailsArticlesQuery$data;
  variables: ArtworkDetailsArticlesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "size",
    "value": 10
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkDetailsArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkDetailsArticles_artwork"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "articles",
            "plural": true,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": "articles(size:10)"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtworkDetailsArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "articles",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "byline",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "href",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM Do, YYYY"
                  }
                ],
                "kind": "ScalarField",
                "name": "publishedAt",
                "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "thumbnailTitle",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "thumbnailImage",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 150
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 200
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "src",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "srcSet",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "cropped(height:150,width:200)"
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": "articles(size:10)"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7e80fd81a9ee00db2b1f5c99c2e68cd2",
    "id": null,
    "metadata": {},
    "name": "ArtworkDetailsArticlesQuery",
    "operationKind": "query",
    "text": "query ArtworkDetailsArticlesQuery(\n  $slug: String!\n) {\n  artwork(id: $slug) {\n    ...ArtworkDetailsArticles_artwork\n    articles(size: 10) {\n      internalID\n      id\n    }\n    id\n  }\n}\n\nfragment ArtworkDetailsArticles_artwork on Artwork {\n  articles(size: 10) {\n    byline\n    href\n    publishedAt(format: \"MMM Do, YYYY\")\n    thumbnailTitle\n    thumbnailImage {\n      cropped(width: 200, height: 150) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a62bb79e0412a7d519cc8821daf81a37";

export default node;
