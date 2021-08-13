/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkBanner_Test_QueryVariables = {};
export type ArtworkBanner_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkBanner_artwork">;
    } | null;
};
export type ArtworkBanner_Test_Query = {
    readonly response: ArtworkBanner_Test_QueryResponse;
    readonly variables: ArtworkBanner_Test_QueryVariables;
};



/*
query ArtworkBanner_Test_Query {
  artwork(id: "richard-anuszkiewicz-lino-yellow-318") {
    ...ArtworkBanner_artwork
    id
  }
}

fragment ArtworkBanner_artwork on Artwork {
  partner {
    name
    id
  }
  sale {
    isAuction
    isBenefit
    isGalleryAuction
    coverImage {
      cropped(width: 30, height: 30, version: "square") {
        src
        srcSet
        width
        height
      }
    }
    id
  }
  context {
    __typename
    ... on Sale {
      name
      href
    }
    ... on Fair {
      name
      href
      profile {
        icon {
          cropped(width: 30, height: 30, version: "square") {
            src
            srcSet
            width
            height
          }
        }
        id
      }
    }
    ... on Show {
      name
      href
      status
      thumbnail: coverImage {
        cropped(width: 30, height: 30, version: "square") {
          src
          srcSet
          width
          height
        }
      }
    }
    ... on Node {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "richard-anuszkiewicz-lino-yellow-318"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 30
      },
      {
        "kind": "Literal",
        "name": "version",
        "value": "square"
      },
      {
        "kind": "Literal",
        "name": "width",
        "value": 30
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
    "storageKey": "cropped(height:30,version:\"square\",width:30)"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkBanner_Test_Query",
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
            "name": "ArtworkBanner_artwork"
          }
        ],
        "storageKey": "artwork(id:\"richard-anuszkiewicz-lino-yellow-318\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkBanner_Test_Query",
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
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isBenefit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isGalleryAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "coverImage",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "context",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
                  (v4/*: any*/)
                ],
                "type": "Sale"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profile",
                    "kind": "LinkedField",
                    "name": "profile",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "icon",
                        "plural": false,
                        "selections": (v3/*: any*/),
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "Fair"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": "thumbnail",
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "Show"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"richard-anuszkiewicz-lino-yellow-318\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ArtworkBanner_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkBanner_Test_Query {\n  artwork(id: \"richard-anuszkiewicz-lino-yellow-318\") {\n    ...ArtworkBanner_artwork\n    id\n  }\n}\n\nfragment ArtworkBanner_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale {\n    isAuction\n    isBenefit\n    isGalleryAuction\n    coverImage {\n      cropped(width: 30, height: 30, version: \"square\") {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    id\n  }\n  context {\n    __typename\n    ... on Sale {\n      name\n      href\n    }\n    ... on Fair {\n      name\n      href\n      profile {\n        icon {\n          cropped(width: 30, height: 30, version: \"square\") {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        id\n      }\n    }\n    ... on Show {\n      name\n      href\n      status\n      thumbnail: coverImage {\n        cropped(width: 30, height: 30, version: \"square\") {\n          src\n          srcSet\n          width\n          height\n        }\n      }\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b04d01dba04bc362c4bd9213c3fd0505';
export default node;
