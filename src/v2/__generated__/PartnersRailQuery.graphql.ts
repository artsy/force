/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerClassification = "AUCTION" | "BRAND" | "DEMO" | "GALLERY" | "INSTITUTION" | "INSTITUTIONAL_SELLER" | "PRIVATE_COLLECTOR" | "PRIVATE_DEALER" | "%future added value";
export type PartnersRailQueryVariables = {
    id: string;
    category?: Array<string | null> | null;
    type: Array<PartnerClassification>;
};
export type PartnersRailQueryResponse = {
    readonly partnerCategory: {
        readonly " $fragmentRefs": FragmentRefs<"PartnersRail_partnerCategory">;
    } | null;
};
export type PartnersRailQuery = {
    readonly response: PartnersRailQueryResponse;
    readonly variables: PartnersRailQueryVariables;
};



/*
query PartnersRailQuery(
  $id: String!
  $category: [String]
  $type: [PartnerClassification!]!
) {
  partnerCategory(id: $id) {
    ...PartnersRail_partnerCategory_43V8rY
    id
  }
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  is_followed: isFollowed
}

fragment PartnerCell_partner on Partner {
  internalID
  slug
  name
  href
  initials
  locationsConnection(first: 15) {
    edges {
      node {
        city
        id
      }
    }
  }
  profile {
    ...FollowProfileButton_profile
    isFollowed
    image {
      cropped(width: 445, height: 334, version: ["wide", "large", "featured", "larger"]) {
        src
        srcSet
      }
    }
    id
  }
}

fragment PartnersRail_partnerCategory_43V8rY on PartnerCategory {
  name
  primary: partners(defaultProfilePublic: true, eligibleForListing: true, eligibleForPrimaryBucket: true, partnerCategories: $category, sort: RANDOM_SCORE_DESC, type: $type) {
    internalID
    ...PartnerCell_partner
    id
  }
  secondary: partners(eligibleForListing: true, eligibleForSecondaryBucket: true, type: $type, partnerCategories: $category, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true) {
    internalID
    ...PartnerCell_partner
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "category",
    "type": "[String]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "type",
    "type": "[PartnerClassification!]!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "Variable",
  "name": "type",
  "variableName": "type"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "defaultProfilePublic",
  "value": true
},
v5 = {
  "kind": "Literal",
  "name": "eligibleForListing",
  "value": true
},
v6 = {
  "kind": "Variable",
  "name": "partnerCategories",
  "variableName": "category"
},
v7 = {
  "kind": "Literal",
  "name": "sort",
  "value": "RANDOM_SCORE_DESC"
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = [
  (v8/*: any*/),
  (v9/*: any*/),
  (v3/*: any*/),
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
              (v10/*: any*/)
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
    "concreteType": "Profile",
    "kind": "LinkedField",
    "name": "profile",
    "plural": false,
    "selections": [
      (v10/*: any*/),
      (v9/*: any*/),
      (v3/*: any*/),
      (v8/*: any*/),
      {
        "alias": "is_followed",
        "args": null,
        "kind": "ScalarField",
        "name": "isFollowed",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isFollowed",
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
              }
            ],
            "storageKey": "cropped(height:334,version:[\"wide\",\"large\",\"featured\",\"larger\"],width:445)"
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v10/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnersRailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "PartnersRail_partnerCategory"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PartnersRailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PartnerCategory",
        "kind": "LinkedField",
        "name": "partnerCategory",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": "primary",
            "args": [
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "kind": "Literal",
                "name": "eligibleForPrimaryBucket",
                "value": true
              },
              (v6/*: any*/),
              (v7/*: any*/),
              (v2/*: any*/)
            ],
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partners",
            "plural": true,
            "selections": (v11/*: any*/),
            "storageKey": null
          },
          {
            "alias": "secondary",
            "args": [
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "kind": "Literal",
                "name": "eligibleForSecondaryBucket",
                "value": true
              },
              (v6/*: any*/),
              (v7/*: any*/),
              (v2/*: any*/)
            ],
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partners",
            "plural": true,
            "selections": (v11/*: any*/),
            "storageKey": null
          },
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PartnersRailQuery",
    "operationKind": "query",
    "text": "query PartnersRailQuery(\n  $id: String!\n  $category: [String]\n  $type: [PartnerClassification!]!\n) {\n  partnerCategory(id: $id) {\n    ...PartnersRail_partnerCategory_43V8rY\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment PartnerCell_partner on Partner {\n  internalID\n  slug\n  name\n  href\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  profile {\n    ...FollowProfileButton_profile\n    isFollowed\n    image {\n      cropped(width: 445, height: 334, version: [\"wide\", \"large\", \"featured\", \"larger\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment PartnersRail_partnerCategory_43V8rY on PartnerCategory {\n  name\n  primary: partners(defaultProfilePublic: true, eligibleForListing: true, eligibleForPrimaryBucket: true, partnerCategories: $category, sort: RANDOM_SCORE_DESC, type: $type) {\n    internalID\n    ...PartnerCell_partner\n    id\n  }\n  secondary: partners(eligibleForListing: true, eligibleForSecondaryBucket: true, type: $type, partnerCategories: $category, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true) {\n    internalID\n    ...PartnerCell_partner\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '29ebfece35c2b5ce41a056edd206fff9';
export default node;
