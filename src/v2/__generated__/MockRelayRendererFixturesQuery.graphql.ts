/**
 * @generated SignedSource<<7ffecac1f7843b461e9b4068cfc34bcc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MockRelayRendererFixturesQuery$variables = {};
export type MockRelayRendererFixturesQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"MockRelayRendererFixtures_artwork">;
  } | null;
};
export type MockRelayRendererFixturesQuery$rawResponse = {
  readonly artwork: {
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
export type MockRelayRendererFixturesQuery = {
  variables: MockRelayRendererFixturesQuery$variables;
  response: MockRelayRendererFixturesQuery$data;
  rawResponse: MockRelayRendererFixturesQuery$rawResponse;
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
    "name": "MockRelayRendererFixturesQuery",
    "selections": [
      {
        "alias": null,
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
    "name": "MockRelayRendererFixturesQuery",
    "selections": [
      {
        "alias": null,
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
    "cacheID": "29f343a13f7d1f0892ec223863e1fc6e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artwork.artist.id": (v2/*: any*/),
        "artwork.artist.slug": (v2/*: any*/),
        "artwork.id": (v2/*: any*/),
        "artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artwork.image.url": (v3/*: any*/),
        "artwork.title": (v3/*: any*/)
      }
    },
    "name": "MockRelayRendererFixturesQuery",
    "operationKind": "query",
    "text": "query MockRelayRendererFixturesQuery {\n  artwork(id: \"mona-lisa\") {\n    ...MockRelayRendererFixtures_artwork\n    id\n  }\n}\n\nfragment MockRelayRendererFixtures_artwork on Artwork {\n  image {\n    url\n  }\n  artist {\n    slug\n    id\n  }\n  ...MockRelayRendererFixtures_artworkMetadata\n}\n\nfragment MockRelayRendererFixtures_artworkMetadata on Artwork {\n  title\n}\n"
  }
};
})();

(node as any).hash = "2d746b24d0389f0c3d2b3f6760577803";

export default node;
