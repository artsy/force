/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerCategoryType = "GALLERY" | "INSTITUTION" | "%future added value";
export type PartnerClassification = "AUCTION" | "BRAND" | "DEMO" | "GALLERY" | "INSTITUTION" | "INSTITUTIONAL_SELLER" | "PRIVATE_COLLECTOR" | "PRIVATE_DEALER" | "%future added value";
export type PartnersRailsQueryVariables = {
    categoryType?: PartnerCategoryType | null;
    type?: Array<PartnerClassification | null> | null;
};
export type PartnersRailsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"PartnersRails_viewer">;
    } | null;
};
export type PartnersRailsQuery = {
    readonly response: PartnersRailsQueryResponse;
    readonly variables: PartnersRailsQueryVariables;
};



/*
query PartnersRailsQuery(
  $categoryType: PartnerCategoryType
  $type: [PartnerClassification]
) {
  viewer {
    ...PartnersRails_viewer_1Wcb23
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

fragment PartnersRail_partnerCategory_4ygNFC on PartnerCategory {
  name
  primary: partners(defaultProfilePublic: true, eligibleForListing: true, eligibleForPrimaryBucket: true, sort: RANDOM_SCORE_DESC, type: $type) {
    internalID
    ...PartnerCell_partner
    id
  }
  secondary: partners(eligibleForListing: true, eligibleForSecondaryBucket: true, type: $type, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true) {
    internalID
    ...PartnerCell_partner
    id
  }
}

fragment PartnersRails_viewer_1Wcb23 on Viewer {
  partnerCategories(categoryType: $categoryType, size: 50, internal: false) {
    name
    slug
    ...PartnersRail_partnerCategory_4ygNFC
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categoryType",
    "type": "PartnerCategoryType"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "type",
    "type": "[PartnerClassification]"
  }
],
v1 = {
  "kind": "Variable",
  "name": "categoryType",
  "variableName": "categoryType"
},
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "kind": "Literal",
  "name": "defaultProfilePublic",
  "value": true
},
v6 = {
  "kind": "Literal",
  "name": "eligibleForListing",
  "value": true
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
  "name": "id",
  "storageKey": null
},
v10 = [
  (v8/*: any*/),
  (v4/*: any*/),
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
              (v9/*: any*/)
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
      (v9/*: any*/),
      (v4/*: any*/),
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
  (v9/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnersRailsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "PartnersRails_viewer"
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
    "name": "PartnersRailsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "internal",
                "value": false
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 50
              }
            ],
            "concreteType": "PartnerCategory",
            "kind": "LinkedField",
            "name": "partnerCategories",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": "primary",
                "args": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "eligibleForPrimaryBucket",
                    "value": true
                  },
                  (v7/*: any*/),
                  (v2/*: any*/)
                ],
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partners",
                "plural": true,
                "selections": (v10/*: any*/),
                "storageKey": null
              },
              {
                "alias": "secondary",
                "args": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "eligibleForSecondaryBucket",
                    "value": true
                  },
                  (v7/*: any*/),
                  (v2/*: any*/)
                ],
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partners",
                "plural": true,
                "selections": (v10/*: any*/),
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PartnersRailsQuery",
    "operationKind": "query",
    "text": "query PartnersRailsQuery(\n  $categoryType: PartnerCategoryType\n  $type: [PartnerClassification]\n) {\n  viewer {\n    ...PartnersRails_viewer_1Wcb23\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment PartnerCell_partner on Partner {\n  internalID\n  slug\n  name\n  href\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  profile {\n    ...FollowProfileButton_profile\n    isFollowed\n    image {\n      cropped(width: 445, height: 334, version: [\"wide\", \"large\", \"featured\", \"larger\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment PartnersRail_partnerCategory_4ygNFC on PartnerCategory {\n  name\n  primary: partners(defaultProfilePublic: true, eligibleForListing: true, eligibleForPrimaryBucket: true, sort: RANDOM_SCORE_DESC, type: $type) {\n    internalID\n    ...PartnerCell_partner\n    id\n  }\n  secondary: partners(eligibleForListing: true, eligibleForSecondaryBucket: true, type: $type, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true) {\n    internalID\n    ...PartnerCell_partner\n    id\n  }\n}\n\nfragment PartnersRails_viewer_1Wcb23 on Viewer {\n  partnerCategories(categoryType: $categoryType, size: 50, internal: false) {\n    name\n    slug\n    ...PartnersRail_partnerCategory_4ygNFC\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '52f4cc94a03d9e88e14d1600fee8a203';
export default node;
