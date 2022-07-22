/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MockRelayRendererFixturesQueryVariables = {};
export type MockRelayRendererFixturesQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"MockRelayRendererFixtures_artwork">;
    } | null;
};
export type MockRelayRendererFixturesQueryRawResponse = {
    readonly artwork: ({
        readonly image: ({
            readonly url: string | null;
        }) | null;
        readonly artist: ({
            readonly slug: string;
            readonly id: string;
        }) | null;
        readonly title: string | null;
        readonly id: string;
    }) | null;
};
export type MockRelayRendererFixturesQuery = {
    readonly response: MockRelayRendererFixturesQueryResponse;
    readonly variables: MockRelayRendererFixturesQueryVariables;
    readonly rawResponse: MockRelayRendererFixturesQueryRawResponse;
};



/*
query MockRelayRendererFixturesQuery {
  artwork(id: "mona-lisa") {
    ...MockRelayRendererFixtures_artwork
    id
  }
}

fragment MockRelayRendererFixtures_artwork on Artwork {
  image {
    url
  }
  artist {
    slug
    id
  }
  ...MockRelayRendererFixtures_artworkMetadata
}

fragment MockRelayRendererFixtures_artworkMetadata on Artwork {
  title
}
*/

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
    "metadata": {},
    "name": "MockRelayRendererFixturesQuery",
    "operationKind": "query",
    "text": "query MockRelayRendererFixturesQuery {\n  artwork(id: \"mona-lisa\") {\n    ...MockRelayRendererFixtures_artwork\n    id\n  }\n}\n\nfragment MockRelayRendererFixtures_artwork on Artwork {\n  image {\n    url\n  }\n  artist {\n    slug\n    id\n  }\n  ...MockRelayRendererFixtures_artworkMetadata\n}\n\nfragment MockRelayRendererFixtures_artworkMetadata on Artwork {\n  title\n}\n"
  }
};
})();
(node as any).hash = '4a31d3b3d6964a65983bc5dfd54593de';
export default node;
