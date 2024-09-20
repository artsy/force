/**
 * @generated SignedSource<<3a03a5cf568397c560d6937a96c373a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CellArtistSeriesFragmentContainer_Test_Query$variables = Record<PropertyKey, never>;
export type CellArtistSeriesFragmentContainer_Test_Query$data = {
  readonly artistSeries: {
    readonly " $fragmentSpreads": FragmentRefs<"CellArtistSeries_artistSeries">;
  } | null | undefined;
};
export type CellArtistSeriesFragmentContainer_Test_Query = {
  response: CellArtistSeriesFragmentContainer_Test_Query$data;
  variables: CellArtistSeriesFragmentContainer_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CellArtistSeriesFragmentContainer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ArtistSeries",
        "kind": "LinkedField",
        "name": "artistSeries",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CellArtistSeries_artistSeries"
          }
        ],
        "storageKey": "artistSeries(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CellArtistSeriesFragmentContainer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ArtistSeries",
        "kind": "LinkedField",
        "name": "artistSeries",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artworksCountMessage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 334
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "larger",
                      "large"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 445
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
                "storageKey": "cropped(height:334,version:[\"larger\",\"large\"],width:445)"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "artistSeries(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "16e7a262dcfc416a66efac409ac9a7cd",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artistSeries": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistSeries"
        },
        "artistSeries.artworksCountMessage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "artistSeries.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artistSeries.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artistSeries.image.cropped.src": (v1/*: any*/),
        "artistSeries.image.cropped.srcSet": (v1/*: any*/),
        "artistSeries.slug": (v1/*: any*/),
        "artistSeries.title": (v1/*: any*/)
      }
    },
    "name": "CellArtistSeriesFragmentContainer_Test_Query",
    "operationKind": "query",
    "text": "query CellArtistSeriesFragmentContainer_Test_Query {\n  artistSeries(id: \"example\") {\n    ...CellArtistSeries_artistSeries\n  }\n}\n\nfragment CellArtistSeries_artistSeries on ArtistSeries {\n  slug\n  title\n  artworksCountMessage\n  image {\n    cropped(width: 445, height: 334, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "11a8ce3ced32b97bd2e308c6b5716ff1";

export default node;
