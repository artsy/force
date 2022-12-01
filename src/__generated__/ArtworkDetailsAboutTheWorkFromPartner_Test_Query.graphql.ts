/**
 * @generated SignedSource<<37b939303822997b28ffafd33816ad66>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAboutTheWorkFromPartner_Test_Query$variables = {
  slug: string;
};
export type ArtworkDetailsAboutTheWorkFromPartner_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsAboutTheWorkFromPartner_artwork">;
  } | null;
};
export type ArtworkDetailsAboutTheWorkFromPartner_Test_Query = {
  response: ArtworkDetailsAboutTheWorkFromPartner_Test_Query$data;
  variables: ArtworkDetailsAboutTheWorkFromPartner_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "height",
  "value": 45
},
v7 = {
  "kind": "Literal",
  "name": "width",
  "value": 45
},
v8 = [
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
  }
],
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkDetailsAboutTheWorkFromPartner_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkDetailsAboutTheWorkFromPartner_artwork"
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
    "name": "ArtworkDetailsAboutTheWorkFromPartner_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "additionalInformation",
            "storageKey": "additionalInformation(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "href",
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "initials",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 15
                  }
                ],
                "concreteType": "LocationConnection",
                "kind": "LinkedField",
                "name": "locationsConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "LocationEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Location",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "city",
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "locationsConnection(first:15)"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PartnerCategory",
                "kind": "LinkedField",
                "name": "categories",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": "avatar",
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          (v6/*: any*/),
                          (v7/*: any*/)
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": (v8/*: any*/),
                        "storageKey": "cropped(height:45,width:45)"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "icon",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          (v6/*: any*/),
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": [
                              "untouched-png",
                              "large",
                              "square"
                            ]
                          },
                          (v7/*: any*/)
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": (v8/*: any*/),
                        "storageKey": "cropped(height:45,version:[\"untouched-png\",\"large\",\"square\"],width:45)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3e12538d5944580f1cb6086040598591",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.additionalInformation": (v9/*: any*/),
        "artwork.id": (v10/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.categories": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerCategory"
        },
        "artwork.partner.categories.id": (v10/*: any*/),
        "artwork.partner.categories.name": (v9/*: any*/),
        "artwork.partner.categories.slug": (v10/*: any*/),
        "artwork.partner.href": (v9/*: any*/),
        "artwork.partner.id": (v10/*: any*/),
        "artwork.partner.initials": (v9/*: any*/),
        "artwork.partner.internalID": (v10/*: any*/),
        "artwork.partner.locationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LocationConnection"
        },
        "artwork.partner.locationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LocationEdge"
        },
        "artwork.partner.locationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "artwork.partner.locationsConnection.edges.node.city": (v9/*: any*/),
        "artwork.partner.locationsConnection.edges.node.id": (v10/*: any*/),
        "artwork.partner.name": (v9/*: any*/),
        "artwork.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "artwork.partner.profile.avatar": (v11/*: any*/),
        "artwork.partner.profile.avatar.cropped": (v12/*: any*/),
        "artwork.partner.profile.avatar.cropped.src": (v13/*: any*/),
        "artwork.partner.profile.avatar.cropped.srcSet": (v13/*: any*/),
        "artwork.partner.profile.icon": (v11/*: any*/),
        "artwork.partner.profile.icon.cropped": (v12/*: any*/),
        "artwork.partner.profile.icon.cropped.src": (v13/*: any*/),
        "artwork.partner.profile.icon.cropped.srcSet": (v13/*: any*/),
        "artwork.partner.profile.id": (v10/*: any*/),
        "artwork.partner.profile.internalID": (v10/*: any*/),
        "artwork.partner.slug": (v10/*: any*/),
        "artwork.partner.type": (v9/*: any*/)
      }
    },
    "name": "ArtworkDetailsAboutTheWorkFromPartner_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkDetailsAboutTheWorkFromPartner_Test_Query(\n  $slug: String!\n) {\n  artwork(id: $slug) {\n    ...ArtworkDetailsAboutTheWorkFromPartner_artwork\n    id\n  }\n}\n\nfragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {\n  additionalInformation(format: HTML)\n  partner {\n    ...EntityHeaderPartner_partner\n    type\n    internalID\n    profile {\n      internalID\n      id\n    }\n    id\n  }\n}\n\nfragment EntityHeaderPartner_partner on Partner {\n  internalID\n  type\n  slug\n  href\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    internalID\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    icon {\n      cropped(width: 45, height: 45, version: [\"untouched-png\", \"large\", \"square\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "08d32dd4f465012e5dbe55e7afa8ff22";

export default node;
