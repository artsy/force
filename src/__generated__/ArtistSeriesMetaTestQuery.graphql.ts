/**
 * @generated SignedSource<<450ab0528d2b03319f82d1a6ef23bf17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesMetaTestQuery$variables = {
  slug: string;
};
export type ArtistSeriesMetaTestQuery$data = {
  readonly artistSeries: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesMeta_artistSeries">;
  } | null | undefined;
};
export type ArtistSeriesMetaTestQuery$rawResponse = {
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
export type ArtistSeriesMetaTestQuery = {
  rawResponse: ArtistSeriesMetaTestQuery$rawResponse;
  response: ArtistSeriesMetaTestQuery$data;
  variables: ArtistSeriesMetaTestQuery$variables;
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
    "name": "ArtistSeriesMetaTestQuery",
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
    "name": "ArtistSeriesMetaTestQuery",
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
    "cacheID": "0dd2b9f408a746eab76ec1c4a097185e",
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
    "name": "ArtistSeriesMetaTestQuery",
    "operationKind": "query",
    "text": "query ArtistSeriesMetaTestQuery(\n  $slug: ID!\n) {\n  artistSeries(id: $slug) {\n    ...ArtistSeriesMeta_artistSeries\n    id\n  }\n}\n\nfragment ArtistSeriesMeta_artistSeries on ArtistSeries {\n  title\n  description\n  slug\n  artists(size: 1) {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b64bc3366b6fd7846b1cf0db94a31ae4";

export default node;
