/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InstitutionsRouteFragmentContainer_Test_QueryVariables = {};
export type InstitutionsRouteFragmentContainer_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"InstitutionsRoute_viewer">;
    } | null;
};
export type InstitutionsRouteFragmentContainer_Test_Query = {
    readonly response: InstitutionsRouteFragmentContainer_Test_QueryResponse;
    readonly variables: InstitutionsRouteFragmentContainer_Test_QueryVariables;
};



/*
query InstitutionsRouteFragmentContainer_Test_Query {
  viewer {
    ...InstitutionsRoute_viewer
  }
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  is_followed: isFollowed
}

fragment InstitutionsRoute_viewer on Viewer {
  ...PartnersFeaturedCarousel_viewer_3Ao4DD
  partnerCategories(categoryType: INSTITUTION, size: 50, internal: false) {
    name
    slug
    ...PartnersRail_partnerCategory_q3ILp
    id
  }
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
      cropped(width: 325, height: 244, version: ["wide", "large", "featured", "larger"]) {
        src
        srcSet
      }
    }
    id
  }
}

fragment PartnersFeaturedCarouselCell_profile on Profile {
  ...FollowProfileButton_profile
  owner {
    __typename
    ... on Partner {
      internalID
      name
      featuredShow {
        name
        status
        statusUpdate
        startAt(format: "MMM D")
        endAt(format: "MMM D")
        isOnlineExclusive
        location {
          city
          id
        }
        coverImage {
          resized(height: 500, version: ["normalized", "larger", "large"]) {
            src
            srcSet
          }
        }
        id
      }
    }
    ... on Node {
      id
    }
    ... on FairOrganizer {
      id
    }
  }
}

fragment PartnersFeaturedCarousel_viewer_3Ao4DD on Viewer {
  orderedSet(id: "564e181a258faf3d5c000080") {
    items {
      __typename
      ... on Profile {
        internalID
        ...PartnersFeaturedCarouselCell_profile
        id
      }
      ... on Node {
        id
      }
      ... on FeaturedLink {
        id
      }
    }
    id
  }
}

fragment PartnersRail_partnerCategory_q3ILp on PartnerCategory {
  name
  primary: partners(eligibleForListing: true, eligibleForPrimaryBucket: true, type: INSTITUTION, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true) {
    internalID
    ...PartnerCell_partner
    id
  }
  secondary: partners(eligibleForListing: true, eligibleForSecondaryBucket: true, type: INSTITUTION, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true) {
    internalID
    ...PartnerCell_partner
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
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
  "alias": "is_followed",
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowed",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "city",
    "storageKey": null
  },
  (v1/*: any*/)
],
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
  "kind": "Literal",
  "name": "defaultProfilePublic",
  "value": true
},
v10 = {
  "kind": "Literal",
  "name": "eligibleForListing",
  "value": true
},
v11 = {
  "kind": "Literal",
  "name": "sort",
  "value": "RANDOM_SCORE_DESC"
},
v12 = {
  "kind": "Literal",
  "name": "type",
  "value": "INSTITUTION"
},
v13 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/),
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
            "selections": (v7/*: any*/),
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
      (v1/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/),
      (v5/*: any*/),
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
                "value": 244
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
                "value": 325
              }
            ],
            "concreteType": "CroppedImageUrl",
            "kind": "LinkedField",
            "name": "cropped",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": "cropped(height:244,version:[\"wide\",\"large\",\"featured\",\"larger\"],width:325)"
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InstitutionsRouteFragmentContainer_Test_Query",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "InstitutionsRoute_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "InstitutionsRouteFragmentContainer_Test_Query",
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
              {
                "kind": "Literal",
                "name": "id",
                "value": "564e181a258faf3d5c000080"
              }
            ],
            "concreteType": "OrderedSet",
            "kind": "LinkedField",
            "name": "orderedSet",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "items",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "owner",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          (v1/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/),
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Show",
                                "kind": "LinkedField",
                                "name": "featuredShow",
                                "plural": false,
                                "selections": [
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "status",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "statusUpdate",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": (v6/*: any*/),
                                    "kind": "ScalarField",
                                    "name": "startAt",
                                    "storageKey": "startAt(format:\"MMM D\")"
                                  },
                                  {
                                    "alias": null,
                                    "args": (v6/*: any*/),
                                    "kind": "ScalarField",
                                    "name": "endAt",
                                    "storageKey": "endAt(format:\"MMM D\")"
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isOnlineExclusive",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Location",
                                    "kind": "LinkedField",
                                    "name": "location",
                                    "plural": false,
                                    "selections": (v7/*: any*/),
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "coverImage",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "height",
                                            "value": 500
                                          },
                                          {
                                            "kind": "Literal",
                                            "name": "version",
                                            "value": [
                                              "normalized",
                                              "larger",
                                              "large"
                                            ]
                                          }
                                        ],
                                        "concreteType": "ResizedImageUrl",
                                        "kind": "LinkedField",
                                        "name": "resized",
                                        "plural": false,
                                        "selections": (v8/*: any*/),
                                        "storageKey": "resized(height:500,version:[\"normalized\",\"larger\",\"large\"])"
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v1/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "Partner"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "Profile"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": "orderedSet(id:\"564e181a258faf3d5c000080\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "categoryType",
                "value": "INSTITUTION"
              },
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
              (v4/*: any*/),
              (v3/*: any*/),
              {
                "alias": "primary",
                "args": [
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "eligibleForPrimaryBucket",
                    "value": true
                  },
                  (v11/*: any*/),
                  (v12/*: any*/)
                ],
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partners",
                "plural": true,
                "selections": (v13/*: any*/),
                "storageKey": "partners(defaultProfilePublic:true,eligibleForListing:true,eligibleForPrimaryBucket:true,sort:\"RANDOM_SCORE_DESC\",type:\"INSTITUTION\")"
              },
              {
                "alias": "secondary",
                "args": [
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "eligibleForSecondaryBucket",
                    "value": true
                  },
                  (v11/*: any*/),
                  (v12/*: any*/)
                ],
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partners",
                "plural": true,
                "selections": (v13/*: any*/),
                "storageKey": "partners(defaultProfilePublic:true,eligibleForListing:true,eligibleForSecondaryBucket:true,sort:\"RANDOM_SCORE_DESC\",type:\"INSTITUTION\")"
              },
              (v1/*: any*/)
            ],
            "storageKey": "partnerCategories(categoryType:\"INSTITUTION\",internal:false,size:50)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "InstitutionsRouteFragmentContainer_Test_Query",
    "operationKind": "query",
    "text": "query InstitutionsRouteFragmentContainer_Test_Query {\n  viewer {\n    ...InstitutionsRoute_viewer\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment InstitutionsRoute_viewer on Viewer {\n  ...PartnersFeaturedCarousel_viewer_3Ao4DD\n  partnerCategories(categoryType: INSTITUTION, size: 50, internal: false) {\n    name\n    slug\n    ...PartnersRail_partnerCategory_q3ILp\n    id\n  }\n}\n\nfragment PartnerCell_partner on Partner {\n  internalID\n  slug\n  name\n  href\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  profile {\n    ...FollowProfileButton_profile\n    isFollowed\n    image {\n      cropped(width: 325, height: 244, version: [\"wide\", \"large\", \"featured\", \"larger\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment PartnersFeaturedCarouselCell_profile on Profile {\n  ...FollowProfileButton_profile\n  owner {\n    __typename\n    ... on Partner {\n      internalID\n      name\n      featuredShow {\n        name\n        status\n        statusUpdate\n        startAt(format: \"MMM D\")\n        endAt(format: \"MMM D\")\n        isOnlineExclusive\n        location {\n          city\n          id\n        }\n        coverImage {\n          resized(height: 500, version: [\"normalized\", \"larger\", \"large\"]) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    ... on Node {\n      id\n    }\n    ... on FairOrganizer {\n      id\n    }\n  }\n}\n\nfragment PartnersFeaturedCarousel_viewer_3Ao4DD on Viewer {\n  orderedSet(id: \"564e181a258faf3d5c000080\") {\n    items {\n      __typename\n      ... on Profile {\n        internalID\n        ...PartnersFeaturedCarouselCell_profile\n        id\n      }\n      ... on Node {\n        id\n      }\n      ... on FeaturedLink {\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment PartnersRail_partnerCategory_q3ILp on PartnerCategory {\n  name\n  primary: partners(eligibleForListing: true, eligibleForPrimaryBucket: true, type: INSTITUTION, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true) {\n    internalID\n    ...PartnerCell_partner\n    id\n  }\n  secondary: partners(eligibleForListing: true, eligibleForSecondaryBucket: true, type: INSTITUTION, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true) {\n    internalID\n    ...PartnerCell_partner\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '978a70b910e94f284ba793638cd3acd8';
export default node;
