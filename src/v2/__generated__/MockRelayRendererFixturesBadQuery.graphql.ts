/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MockRelayRendererFixturesBadQueryVariables = {};
export type MockRelayRendererFixturesBadQueryResponse = {
    readonly something_that_is_not_expected: {
        readonly " $fragmentRefs": FragmentRefs<"MockRelayRendererFixtures_artwork">;
    } | null;
};
export type MockRelayRendererFixturesBadQueryRawResponse = {
    readonly something_that_is_not_expected: ({
        readonly image: ({
            readonly url: string | null;
        }) | null;
        readonly artist: ({
            readonly slug: string;
            readonly id: string | null;
        }) | null;
        readonly title: string | null;
        readonly id: string | null;
    }) | null;
};
export type MockRelayRendererFixturesBadQuery = {
    readonly response: MockRelayRendererFixturesBadQueryResponse;
    readonly variables: MockRelayRendererFixturesBadQueryVariables;
    readonly rawResponse: MockRelayRendererFixturesBadQueryRawResponse;
};



/*
query MockRelayRendererFixturesBadQuery {
  something_that_is_not_expected: artwork(id: "mona-lisa") {
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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MockRelayRendererFixturesBadQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "something_that_is_not_expected",
        "name": "artwork",
        "storageKey": "artwork(id:\"mona-lisa\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "MockRelayRendererFixtures_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MockRelayRendererFixturesBadQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "something_that_is_not_expected",
        "name": "artwork",
        "storageKey": "artwork(id:\"mona-lisa\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "image",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "url",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artist",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "slug",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MockRelayRendererFixturesBadQuery",
    "id": null,
    "text": "query MockRelayRendererFixturesBadQuery {\n  something_that_is_not_expected: artwork(id: \"mona-lisa\") {\n    ...MockRelayRendererFixtures_artwork\n    id\n  }\n}\n\nfragment MockRelayRendererFixtures_artwork on Artwork {\n  image {\n    url\n  }\n  artist {\n    slug\n    id\n  }\n  ...MockRelayRendererFixtures_artworkMetadata\n}\n\nfragment MockRelayRendererFixtures_artworkMetadata on Artwork {\n  title\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'e4d07dd6eef5ab7d33ea7fc5986956ac';
export default node;
