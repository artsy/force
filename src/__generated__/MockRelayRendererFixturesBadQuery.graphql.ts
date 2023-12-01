/**
 * @generated SignedSource<<d58e7c13f8f12884f993b24540a679ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MockRelayRendererFixturesBadQuery$variables = Record<PropertyKey, never>;
export type MockRelayRendererFixturesBadQuery$data = {
  readonly something_that_is_not_expected: {
    readonly " $fragmentSpreads": FragmentRefs<"MockRelayRendererFixtures_artwork">;
  } | null | undefined;
};
export type MockRelayRendererFixturesBadQuery$rawResponse = {
  readonly something_that_is_not_expected: {
    readonly artist: {
      readonly id: string;
      readonly slug: string;
    } | null | undefined;
    readonly id: string;
    readonly image: {
      readonly url: string | null | undefined;
    } | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
};
export type MockRelayRendererFixturesBadQuery = {
  rawResponse: MockRelayRendererFixturesBadQuery$rawResponse;
  response: MockRelayRendererFixturesBadQuery$data;
  variables: MockRelayRendererFixturesBadQuery$variables;
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
    "metadata": {},
    "name": "MockRelayRendererFixturesBadQuery",
    "operationKind": "query",
    "text": "query MockRelayRendererFixturesBadQuery {\n  something_that_is_not_expected: artwork(id: \"mona-lisa\") {\n    ...MockRelayRendererFixtures_artwork\n    id\n  }\n}\n\nfragment MockRelayRendererFixtures_artwork on Artwork {\n  image {\n    url\n  }\n  artist {\n    slug\n    id\n  }\n  ...MockRelayRendererFixtures_artworkMetadata\n}\n\nfragment MockRelayRendererFixtures_artworkMetadata on Artwork {\n  title\n}\n"
  }
};
})();

(node as any).hash = "e4d07dd6eef5ab7d33ea7fc5986956ac";

export default node;
