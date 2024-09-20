/**
 * @generated SignedSource<<164ab5192c42449f93345b01440332d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    } | null | undefined> | null | undefined;
    readonly description: string | null | undefined;
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
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": "artists(size:1)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "868f3d4385f11ae2bdfc73c06bbae975",
    "id": null,
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
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artistSeries.artists.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artistSeries.artists.name": (v2/*: any*/),
        "artistSeries.description": (v2/*: any*/),
        "artistSeries.slug": (v3/*: any*/),
        "artistSeries.title": (v3/*: any*/)
      }
    },
    "name": "ArtistSeriesMeta_TestQuery",
    "operationKind": "query",
    "text": "query ArtistSeriesMeta_TestQuery(\n  $slug: ID!\n) {\n  artistSeries(id: $slug) {\n    ...ArtistSeriesMeta_artistSeries\n  }\n}\n\nfragment ArtistSeriesMeta_artistSeries on ArtistSeries {\n  title\n  description\n  slug\n  artists(size: 1) {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "27c6e0b258d7f3cb315cc33ecabbd839";

export default node;
