/**
 * @generated SignedSource<<6a5569d0d19d53232ab32cd253d4d50e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MockRelayRendererFixturesBadQuery$variables = {};
export type MockRelayRendererFixturesBadQuery$data = {
  readonly something_that_is_not_expected: {
    readonly " $fragmentSpreads": FragmentRefs<"MockRelayRendererFixtures_artwork">;
  } | null;
};
export type MockRelayRendererFixturesBadQuery$rawResponse = {
  readonly something_that_is_not_expected: {
    readonly image: {
      readonly url: string | null;
    } | null;
    readonly artist: {
      readonly slug: string;
      readonly id: string;
    } | null;
    readonly title: string | null;
    readonly id: string;
  } | null;
};
export type MockRelayRendererFixturesBadQuery = {
  variables: MockRelayRendererFixturesBadQuery$variables;
  response: MockRelayRendererFixturesBadQuery$data;
  rawResponse: MockRelayRendererFixturesBadQuery$rawResponse;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "mona-lisa"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MockRelayRendererFixturesBadQuery",
    "selections": [
      {
        "alias": "something_that_is_not_expected",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MockRelayRendererFixtures_artwork"
          }
        ],
        "storageKey": "artwork(id:\"mona-lisa\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MockRelayRendererFixturesBadQuery",
    "selections": [
      {
        "alias": "something_that_is_not_expected",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
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
                "args": null,
                "kind": "ScalarField",
                "name": "url",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"mona-lisa\")"
      }
    ]
  },
  "params": {
    "cacheID": "fb272ba544200e2e2beef09e1fe0a2f3",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "something_that_is_not_expected": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "something_that_is_not_expected.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "something_that_is_not_expected.artist.id": (v2/*: any*/),
        "something_that_is_not_expected.artist.slug": (v2/*: any*/),
        "something_that_is_not_expected.id": (v2/*: any*/),
        "something_that_is_not_expected.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "something_that_is_not_expected.image.url": (v3/*: any*/),
        "something_that_is_not_expected.title": (v3/*: any*/)
      }
    },
    "name": "MockRelayRendererFixturesBadQuery",
    "operationKind": "query",
    "text": "query MockRelayRendererFixturesBadQuery {\n  something_that_is_not_expected: artwork(id: \"mona-lisa\") {\n    ...MockRelayRendererFixtures_artwork\n    id\n  }\n}\n\nfragment MockRelayRendererFixtures_artwork on Artwork {\n  image {\n    url\n  }\n  artist {\n    slug\n    id\n  }\n  ...MockRelayRendererFixtures_artworkMetadata\n}\n\nfragment MockRelayRendererFixtures_artworkMetadata on Artwork {\n  title\n}\n"
  }
};
})();

(node as any).hash = "02abeab220bd51814f7dcad00002ef43";

export default node;
