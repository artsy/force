/**
 * @generated SignedSource<<d1bdf1868c6d56041b003701ed9f1429>>
 * @relayHash 3481091fc45f362edfbd3ae67c5df81d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3481091fc45f362edfbd3ae67c5df81d

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesMeta_TestQuery$variables = {
  slug: string;
};
export type ArtistSeriesMeta_TestQuery$data = {
  readonly artistSeries: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesMeta_artistSeries">;
  } | null | undefined;
};
export type ArtistSeriesMeta_TestQuery$rawResponse = {
  readonly artistSeries: {
    readonly artists: ReadonlyArray<{
      readonly id: string;
      readonly name: string | null | undefined;
    }>;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly slug: string;
    readonly title: string;
  } | null | undefined;
};
export type ArtistSeriesMeta_TestQuery = {
  rawResponse: ArtistSeriesMeta_TestQuery$rawResponse;
  response: ArtistSeriesMeta_TestQuery$data;
  variables: ArtistSeriesMeta_TestQuery$variables;
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistSeriesMeta_TestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistSeries",
        "kind": "LinkedField",
        "name": "artistSeries",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistSeriesMeta_artistSeries"
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
    "name": "ArtistSeriesMeta_TestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistSeries",
        "kind": "LinkedField",
        "name": "artistSeries",
        "plural": false,
        "selections": [
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
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 1
              }
            ],
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "artists(size:1)"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "3481091fc45f362edfbd3ae67c5df81d",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artistSeries": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistSeries"
        },
        "artistSeries.artists": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Artist"
        },
        "artistSeries.artists.id": (v3/*: any*/),
        "artistSeries.artists.name": (v4/*: any*/),
        "artistSeries.description": (v4/*: any*/),
        "artistSeries.id": (v3/*: any*/),
        "artistSeries.slug": (v5/*: any*/),
        "artistSeries.title": (v5/*: any*/)
      }
    },
    "name": "ArtistSeriesMeta_TestQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "27c6e0b258d7f3cb315cc33ecabbd839";

export default node;
