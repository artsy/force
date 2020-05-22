/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkBanner_Test_QueryVariables = {};
export type ArtworkBanner_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkBanner_artwork">;
    } | null;
};
export type ArtworkBanner_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly partner: ({
            readonly name: string | null;
            readonly initials: string | null;
            readonly id: string | null;
        }) | null;
        readonly sale: ({
            readonly is_auction: boolean | null;
            readonly isBenefit: boolean | null;
            readonly isGalleryAuction: boolean | null;
            readonly cover_image: ({
                readonly url: string | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly context: ({
            readonly __typename: "Sale";
            readonly id: string | null;
            readonly name: string | null;
            readonly href: string | null;
        } | {
            readonly __typename: "Fair";
            readonly id: string | null;
            readonly name: string | null;
            readonly href: string | null;
            readonly profile: ({
                readonly initials: string | null;
                readonly icon: ({
                    readonly img: ({
                        readonly url: string | null;
                    }) | null;
                }) | null;
                readonly id: string | null;
            }) | null;
        } | {
            readonly __typename: "Show";
            readonly id: string | null;
            readonly name: string | null;
            readonly href: string | null;
            readonly status: string | null;
            readonly thumbnail: ({
                readonly img: ({
                    readonly url: string | null;
                }) | null;
            }) | null;
        } | {
            readonly __typename: string;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type ArtworkBanner_Test_Query = {
    readonly response: ArtworkBanner_Test_QueryResponse;
    readonly variables: ArtworkBanner_Test_QueryVariables;
    readonly rawResponse: ArtworkBanner_Test_QueryRawResponse;
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
    initials
    id
  }
  sale {
    is_auction: isAuction
    isBenefit
    isGalleryAuction
    cover_image: coverImage {
      url(version: "square")
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
        initials
        icon {
          img: resized(width: 70, height: 70, version: "square") {
            url
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
        img: resized(width: 70, height: 70, version: "square") {
          url
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
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "initials",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "version",
  "value": "square"
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v6 = [
  {
    "kind": "LinkedField",
    "alias": "img",
    "name": "resized",
    "storageKey": "resized(height:70,version:\"square\",width:70)",
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 70
      },
      (v4/*: any*/),
      {
        "kind": "Literal",
        "name": "width",
        "value": 70
      }
    ],
    "concreteType": "ResizedImageUrl",
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
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkBanner_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"richard-anuszkiewicz-lino-yellow-318\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkBanner_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkBanner_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"richard-anuszkiewicz-lino-yellow-318\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": "is_auction",
                "name": "isAuction",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isBenefit",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isGalleryAuction",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": "cover_image",
                "name": "coverImage",
                "storageKey": null,
                "args": null,
                "concreteType": "Image",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "url",
                    "args": [
                      (v4/*: any*/)
                    ],
                    "storageKey": "url(version:\"square\")"
                  }
                ]
              },
              (v3/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "context",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "Sale",
                "selections": [
                  (v1/*: any*/),
                  (v5/*: any*/)
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Fair",
                "selections": [
                  (v1/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "profile",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Profile",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "icon",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": (v6/*: any*/)
                      },
                      (v3/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Show",
                "selections": [
                  (v1/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "status",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": "thumbnail",
                    "name": "coverImage",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": (v6/*: any*/)
                  }
                ]
              }
            ]
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkBanner_Test_Query",
    "id": null,
    "text": "query ArtworkBanner_Test_Query {\n  artwork(id: \"richard-anuszkiewicz-lino-yellow-318\") {\n    ...ArtworkBanner_artwork\n    id\n  }\n}\n\nfragment ArtworkBanner_artwork on Artwork {\n  partner {\n    name\n    initials\n    id\n  }\n  sale {\n    is_auction: isAuction\n    isBenefit\n    isGalleryAuction\n    cover_image: coverImage {\n      url(version: \"square\")\n    }\n    id\n  }\n  context {\n    __typename\n    ... on Sale {\n      name\n      href\n    }\n    ... on Fair {\n      name\n      href\n      profile {\n        initials\n        icon {\n          img: resized(width: 70, height: 70, version: \"square\") {\n            url\n          }\n        }\n        id\n      }\n    }\n    ... on Show {\n      name\n      href\n      status\n      thumbnail: coverImage {\n        img: resized(width: 70, height: 70, version: \"square\") {\n          url\n        }\n      }\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'fcd2b446978466c9791f591a01663f27';
export default node;
