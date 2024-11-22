/**
 * @generated SignedSource<<eb86ed0f2138b7e035b64091ec86cc24>>
 * @relayHash f0645bbed9a6c8ddee36997d501ae9a2
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f0645bbed9a6c8ddee36997d501ae9a2

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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artistSeries(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": "f0645bbed9a6c8ddee36997d501ae9a2",
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
        "artistSeries.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
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
    "text": null
  }
};
})();

(node as any).hash = "11a8ce3ced32b97bd2e308c6b5716ff1";

export default node;
