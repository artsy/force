/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesMeta_TestQueryVariables = {
    slug: string;
};
export type ArtistSeriesMeta_TestQueryResponse = {
    readonly artistSeries: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesMeta_artistSeries">;
    } | null;
};
export type ArtistSeriesMeta_TestQueryRawResponse = {
    readonly artistSeries: ({
        readonly title: string;
        readonly description: string | null;
        readonly slug: string;
        readonly artists: ReadonlyArray<({
            readonly name: string | null;
            readonly id: string | null;
        }) | null> | null;
    }) | null;
};
export type ArtistSeriesMeta_TestQuery = {
    readonly response: ArtistSeriesMeta_TestQueryResponse;
    readonly variables: ArtistSeriesMeta_TestQueryVariables;
    readonly rawResponse: ArtistSeriesMeta_TestQueryRawResponse;
};



/*
query ArtistSeriesMeta_TestQuery(
  $slug: ID!
) {
  artistSeries(id: $slug) {
    ...ArtistSeriesMeta_artistSeries
  }
}

fragment ArtistSeriesMeta_artistSeries on ArtistSeries {
  title
  description
  slug
  artists(size: 1) {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "ID!"
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
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v3 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artistSeries": {
          "type": "ArtistSeries",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artistSeries.title": (v2/*: any*/),
        "artistSeries.description": (v3/*: any*/),
        "artistSeries.slug": (v2/*: any*/),
        "artistSeries.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artistSeries.artists.name": (v3/*: any*/),
        "artistSeries.artists.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        }
      }
    },
    "name": "ArtistSeriesMeta_TestQuery",
    "operationKind": "query",
    "text": "query ArtistSeriesMeta_TestQuery(\n  $slug: ID!\n) {\n  artistSeries(id: $slug) {\n    ...ArtistSeriesMeta_artistSeries\n  }\n}\n\nfragment ArtistSeriesMeta_artistSeries on ArtistSeries {\n  title\n  description\n  slug\n  artists(size: 1) {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '27c6e0b258d7f3cb315cc33ecabbd839';
export default node;
