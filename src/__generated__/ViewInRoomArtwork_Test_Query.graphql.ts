/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewInRoomArtwork_Test_QueryVariables = {};
export type ViewInRoomArtwork_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ViewInRoomArtwork_artwork">;
    } | null;
};
export type ViewInRoomArtwork_Test_Query = {
    readonly response: ViewInRoomArtwork_Test_QueryResponse;
    readonly variables: ViewInRoomArtwork_Test_QueryVariables;
};



/*
query ViewInRoomArtwork_Test_Query {
  artwork(id: "example") {
    ...ViewInRoomArtwork_artwork
    id
  }
}

fragment ViewInRoomArtwork_artwork on Artwork {
  widthCm
  heightCm
  image {
    resized(width: 800, height: 800, version: ["normalized", "larger", "large"]) {
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
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewInRoomArtwork_Test_Query",
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
            "name": "ViewInRoomArtwork_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ViewInRoomArtwork_Test_Query",
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
            "kind": "ScalarField",
            "name": "widthCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "heightCm",
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
                    "value": 800
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "normalized",
                      "larger",
                      "large"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 800
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
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
                "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
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
        "storageKey": "artwork(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "c463d5b2664aecdd09c78cb93f0d34f4",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.heightCm": (v1/*: any*/),
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artwork.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artwork.image.resized.height": (v2/*: any*/),
        "artwork.image.resized.src": (v3/*: any*/),
        "artwork.image.resized.srcSet": (v3/*: any*/),
        "artwork.image.resized.width": (v2/*: any*/),
        "artwork.widthCm": (v1/*: any*/)
      }
    },
    "name": "ViewInRoomArtwork_Test_Query",
    "operationKind": "query",
    "text": "query ViewInRoomArtwork_Test_Query {\n  artwork(id: \"example\") {\n    ...ViewInRoomArtwork_artwork\n    id\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c0c76955f46c8946a5856d9746b93d73';
export default node;
