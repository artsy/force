/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignButtonQueryVariables = {
    artistID: string;
};
export type ArtistConsignButtonQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistConsignButton_artist">;
    } | null;
};
export type ArtistConsignButtonQueryRawResponse = {
    readonly artist: ({
        readonly targetSupply: ({
            readonly isInMicrofunnel: boolean | null;
            readonly isTargetSupply: boolean | null;
        }) | null;
        readonly internalID: string;
        readonly slug: string;
        readonly name: string | null;
        readonly href: string | null;
        readonly image: ({
            readonly cropped: ({
                readonly url: string | null;
            }) | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type ArtistConsignButtonQuery = {
    readonly response: ArtistConsignButtonQueryResponse;
    readonly variables: ArtistConsignButtonQueryVariables;
    readonly rawResponse: ArtistConsignButtonQueryRawResponse;
};



/*
query ArtistConsignButtonQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...ArtistConsignButton_artist
    id
  }
}

fragment ArtistConsignButton_artist on Artist {
  targetSupply {
    isInMicrofunnel
    isTargetSupply
  }
  internalID
  slug
  name
  href
  image {
    cropped(width: 66, height: 66) {
      url
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistConsignButtonQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistConsignButton_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistConsignButtonQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "targetSupply",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistTargetSupply",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isInMicrofunnel",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isTargetSupply",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "internalID",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "href",
            "args": null,
            "storageKey": null
          },
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
                "kind": "LinkedField",
                "alias": null,
                "name": "cropped",
                "storageKey": "cropped(height:66,width:66)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 66
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 66
                  }
                ],
                "concreteType": "CroppedImageUrl",
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
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtistConsignButtonQuery",
    "id": null,
    "text": "query ArtistConsignButtonQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...ArtistConsignButton_artist\n    id\n  }\n}\n\nfragment ArtistConsignButton_artist on Artist {\n  targetSupply {\n    isInMicrofunnel\n    isTargetSupply\n  }\n  internalID\n  slug\n  name\n  href\n  image {\n    cropped(width: 66, height: 66) {\n      url\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f2c53ccf39a1be9bf8279a2588a08b2b';
export default node;
