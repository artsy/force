/**
 * @generated SignedSource<<6331faf17afb9b7325f6aed7de3ed753>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerClassification = "AUCTION" | "BRAND" | "DEMO" | "GALLERY" | "INSTITUTION" | "INSTITUTIONAL_SELLER" | "PRIVATE_COLLECTOR" | "PRIVATE_DEALER" | "%future added value";
export type PartnersRailQuery$variables = {
  category?: ReadonlyArray<string | null | undefined> | null | undefined;
  id: string;
  type: ReadonlyArray<PartnerClassification>;
};
export type PartnersRailQuery$data = {
  readonly partnerCategory: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnersRail_partnerCategory">;
  } | null | undefined;
};
export type PartnersRailQuery = {
  response: PartnersRailQuery$data;
  variables: PartnersRailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "category"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "type"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v4 = {
  "kind": "Variable",
  "name": "type",
  "variableName": "type"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "defaultProfilePublic",
  "value": true
},
v7 = {
  "kind": "Literal",
  "name": "eligibleForListing",
  "value": true
},
v8 = {
  "kind": "Variable",
  "name": "partnerCategories",
  "variableName": "category"
},
v9 = {
  "kind": "Literal",
  "name": "sort",
  "value": "RANDOM_SCORE_DESC"
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v13 = {
  "kind": "Literal",
  "name": "height",
  "value": 45
},
v14 = {
  "kind": "Literal",
  "name": "width",
  "value": 45
},
v15 = [
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
v16 = [
  (v10/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "type",
    "storageKey": null
  },
  (v11/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "href",
    "storageKey": null
  },
  (v5/*: any*/),
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
              (v12/*: any*/)
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
      (v5/*: any*/),
      (v11/*: any*/),
      (v12/*: any*/)
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
      (v10/*: any*/),
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
              (v13/*: any*/),
              (v14/*: any*/)
            ],
            "concreteType": "CroppedImageUrl",
            "kind": "LinkedField",
            "name": "cropped",
            "plural": false,
            "selections": (v15/*: any*/),
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
              (v13/*: any*/),
              {
                "kind": "Literal",
                "name": "version",
                "value": [
                  "untouched-png",
                  "large",
                  "square"
                ]
              },
              (v14/*: any*/)
            ],
            "concreteType": "CroppedImageUrl",
            "kind": "LinkedField",
            "name": "cropped",
            "plural": false,
            "selections": (v15/*: any*/),
            "storageKey": "cropped(height:45,version:[\"untouched-png\",\"large\",\"square\"],width:45)"
          }
        ],
        "storageKey": null
      },
      (v12/*: any*/),
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
                "value": 334
              },
              {
                "kind": "Literal",
                "name": "version",
                "value": [
                  "wide",
                  "large",
                  "featured",
                  "larger"
                ]
              },
              {
                "kind": "Literal",
                "name": "width",
                "value": 445
              }
            ],
            "concreteType": "CroppedImageUrl",
            "kind": "LinkedField",
            "name": "cropped",
            "plural": false,
            "selections": (v15/*: any*/),
            "storageKey": "cropped(height:334,version:[\"wide\",\"large\",\"featured\",\"larger\"],width:445)"
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v12/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnersRailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "PartnerCategory",
        "kind": "LinkedField",
        "name": "partnerCategory",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "category",
                "variableName": "category"
              },
              (v4/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "PartnersRail_partnerCategory"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "PartnersRailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "PartnerCategory",
        "kind": "LinkedField",
        "name": "partnerCategory",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          {
            "alias": "primary",
            "args": [
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "kind": "Literal",
                "name": "eligibleForPrimaryBucket",
                "value": true
              },
              (v8/*: any*/),
              (v9/*: any*/),
              (v4/*: any*/)
            ],
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partners",
            "plural": true,
            "selections": (v16/*: any*/),
            "storageKey": null
          },
          {
            "alias": "secondary",
            "args": [
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "kind": "Literal",
                "name": "eligibleForSecondaryBucket",
                "value": true
              },
              (v8/*: any*/),
              (v9/*: any*/),
              (v4/*: any*/)
            ],
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partners",
            "plural": true,
            "selections": (v16/*: any*/),
            "storageKey": null
          },
          (v12/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1cf8f4f0a0f94300499a7e6cf6dd3429",
    "id": null,
    "metadata": {},
    "name": "PartnersRailQuery",
    "operationKind": "query",
    "text": "query PartnersRailQuery(\n  $id: String!\n  $category: [String]\n  $type: [PartnerClassification!]!\n) {\n  partnerCategory(id: $id) {\n    ...PartnersRail_partnerCategory_43V8rY\n    id\n  }\n}\n\nfragment CellPartner_partner on Partner {\n  ...EntityHeaderPartner_partner\n  internalID\n  slug\n  name\n  href\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    image {\n      cropped(width: 445, height: 334, version: [\"wide\", \"large\", \"featured\", \"larger\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment EntityHeaderPartner_partner on Partner {\n  internalID\n  type\n  slug\n  href\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    internalID\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    icon {\n      cropped(width: 45, height: 45, version: [\"untouched-png\", \"large\", \"square\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment PartnersRail_partnerCategory_43V8rY on PartnerCategory {\n  name\n  primary: partners(defaultProfilePublic: true, eligibleForListing: true, eligibleForPrimaryBucket: true, partnerCategories: $category, sort: RANDOM_SCORE_DESC, type: $type) {\n    internalID\n    ...CellPartner_partner\n    id\n  }\n  secondary: partners(eligibleForListing: true, eligibleForSecondaryBucket: true, type: $type, partnerCategories: $category, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true) {\n    internalID\n    ...CellPartner_partner\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "29ebfece35c2b5ce41a056edd206fff9";

export default node;
