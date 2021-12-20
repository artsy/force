/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSellWithArtsyQueryVariables = {
    slug: string;
};
export type ArtistSellWithArtsyQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistSellWithArtsy_artist">;
    } | null;
};
export type ArtistSellWithArtsyQuery = {
    readonly response: ArtistSellWithArtsyQueryResponse;
    readonly variables: ArtistSellWithArtsyQueryVariables;
};



/*
query ArtistSellWithArtsyQuery(
  $slug: String!
) {
  artist(id: $slug) {
    ...ArtistSellWithArtsy_artist
    id
  }
}

fragment ArtistSellWithArtsy_artist on Artist {
  internalID
  slug
  href
  targetSupply {
    isInMicrofunnel
  }
  image {
    cropped(width: 2560, height: 360) {
      src
      srcSet
      width
      height
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistSellWithArtsyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistSellWithArtsy_artist"
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
    "name": "ArtistSellWithArtsyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
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
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistTargetSupply",
            "kind": "LinkedField",
            "name": "targetSupply",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isInMicrofunnel",
                "storageKey": null
              }
            ],
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
                    "value": 360
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 2560
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:360,width:2560)"
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4ca78d4c9c7e5dd63825c34a90064e68",
    "id": null,
    "metadata": {},
    "name": "ArtistSellWithArtsyQuery",
    "operationKind": "query",
    "text": "query ArtistSellWithArtsyQuery(\n  $slug: String!\n) {\n  artist(id: $slug) {\n    ...ArtistSellWithArtsy_artist\n    id\n  }\n}\n\nfragment ArtistSellWithArtsy_artist on Artist {\n  internalID\n  slug\n  href\n  targetSupply {\n    isInMicrofunnel\n  }\n  image {\n    cropped(width: 2560, height: 360) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2236059f5d30a3e41c6b0c49e0f10185';
export default node;
